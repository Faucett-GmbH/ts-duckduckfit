import type { SetParams } from '$lib/components/training_session/edit/EditSet.svelte';
import { debounce } from '@aicacia/debounce';
import {
	upsertTrainingSession,
	type LoggedSet,
	type LoggedSetSeries,
	type TrainingSession
} from './trainingSessions.svelte';
import type { AutomergeDocumentId } from '$lib/repo';

export function createTrainingSession(ts: TrainingSession, trainingSessionId: AutomergeDocumentId<TrainingSession>) {
	let trainingSession = $state(ts);
	let duration = $state(ts.durationInSeconds || 0);
	let restTimer = $state(0);
	let paused = $state(false);
	const done = $derived.by(() => ts.setSeries.every((sg) => sg.sets.every((s) => s.setResultType)));
	const initialIndexes = getNext(ts, 0, 0);
	let setSeriesIndex = $state(initialIndexes?.[0] || 0);
	let setIndex = $state(initialIndexes?.[1] || 0);
	const setSeries = $derived.by(() => trainingSession.setSeries[setSeriesIndex]);
	const set = $derived.by(() => setSeries.sets[setIndex]);
	// svelte-ignore state_referenced_locally
	let activeSetDuration = $state(set.durationInSeconds || 0);
	const urlSearchParams = $derived.by(() => ({
		d: duration.toString(),
		p: paused.toString(),
		r: restTimer.toString(),
		sg: setSeriesIndex.toString(),
		s: setIndex.toString()
	}));

	function getNext(trainingSession: TrainingSession, setSeriesIndex: number, setIndex: number) {
		let setSeries = trainingSession.setSeries[setSeriesIndex];
		let set = setSeries.sets[setIndex];
		let shouldBreakOnEnd = false;
		while (true) {
			setIndex += 1;
			if (setIndex >= setSeries.sets.length) {
				setSeriesIndex += 1;
				if (setSeriesIndex >= trainingSession.setSeries.length) {
					if (shouldBreakOnEnd) {
						return;
					}
					shouldBreakOnEnd = true;
					setSeriesIndex = 0;
				}
				setIndex = 0;
				setSeries = trainingSession.setSeries[setSeriesIndex];
			}
			set = setSeries.sets[setIndex];
			if (!set.setResultType) {
				break;
			}
		}
		return [setSeriesIndex, setIndex] as const;
	}

	function next() {
		if (done) {
			return false;
		}
		const result = getNext(trainingSession, setSeriesIndex, setIndex);
		if (!result) {
			return false;
		}
		setSet(result[0], result[1]);
		return true;
	}

	function fromURLSearchParams(params: URLSearchParams) {
		duration = parseInt(params.get('d') ?? '0');
		paused = params.get('p') === 'true';
		setSeriesIndex = parseInt(params.get('sg') ?? '0');
		setIndex = parseInt(params.get('s') ?? '0');
	}

	function setSet(newSetSeriesIndex: number, newSetIndex: number) {
		setSeriesIndex = newSetSeriesIndex;
		setIndex = newSetIndex;
		activeSetDuration = set.durationInSeconds || 0;
		restTimer = 0;
		paused = false;
	}

	async function update(updateFn: (trainingSession: TrainingSession) => TrainingSession, debounce = false) {
		trainingSession = updateFn(trainingSession);
		if (debounce) {
			debouncedUpdate();
		} else {
			await internalUpdate();
		}
	}

	function internalUpdateSet(
		setSeriesIndex: number,
		setIndex: number,
		updateFn: (set: LoggedSet) => LoggedSet
	) {
		const newSetSeriesList = trainingSession.setSeries.slice();
		const setSeries = newSetSeriesList[setSeriesIndex];
		const newSets = setSeries.sets.slice();
		const set = setSeries.sets[setIndex];
		const newSet = updateFn(set);
		const newSetSeries = {
			...setSeries,
			sets: newSets
		};
		newSets[setIndex] = newSet;
		newSetSeriesList[setSeriesIndex] = newSetSeries;
		const updatedTrainingSession = {
			...trainingSession,
			setSeries: newSetSeriesList
		};
		trainingSession = updatedTrainingSession;
		if (!set.setResultType && newSet.setResultType) {
			restTimer = newSet.restAfterInSeconds || 0;
		}
		return newSet;
	}

	async function updateSet(
		setSeriesIndex: number,
		setIndex: number,
		updateFn: (set: LoggedSet) => LoggedSet,
		debounce = false
	) {
		const set = internalUpdateSet(setSeriesIndex, setIndex, updateFn);
		if (debounce) {
			debouncedUpdate();
		} else {
			await internalUpdate();
		}
		return set;
	}

	async function internalUpdate() {
		await upsertTrainingSession(trainingSession, trainingSessionId);
	}
	const debouncedUpdate = debounce(internalUpdate, 1000);

	async function createSets(setSeriesIndex: number, newSets: SetParams[]) {
		const newSetSeries = trainingSession.setSeries.map((sg) => ({ id: sg.id }) as LoggedSetSeries);
		const setSeries = trainingSession.setSeries[setSeriesIndex];
		const sets = [...setSeries.sets, ...newSets];
		const exercises = new Set<string>();

		for (const set of sets) {
			exercises.add(set.exerciseGuid);
		}
		let setSeriesType = setSeries.setSeriesType;
		switch (exercises.size) {
			case 1:
				setSeriesType = 'standard';
				break;
			case 2:
				setSeriesType = 'superset';
				break;
			default:
				setSeriesType = 'circuit';
				break;
		}
		newSetSeries[setSeriesIndex] = {
			id: setSeries.id,
			setSeriesType,
			sets
		} as LoggedSetSeries;

		await internalUpdate();
	}

	async function moveSets(newSetSeriesIndex: number, fromIndex: number, toIndex: number) {
		const newSetSeries = trainingSession.setSeries.map((sg) => ({ id: sg.id }) as LoggedSetSeries);
		const setSeries = trainingSession.setSeries[newSetSeriesIndex];
		const newSets = setSeries.sets.slice();
		const set = newSets[fromIndex];

		newSets.splice(fromIndex, 1);
		newSets.splice(toIndex, 0, set);

		newSetSeries[setSeriesIndex] = {
			id: setSeries.id,
			sets: newSets
		} as LoggedSetSeries;

		trainingSession = { ...trainingSession, setSeries: newSetSeries };

		await internalUpdate();

		if (newSetSeriesIndex === setSeriesIndex) {
			if (fromIndex === setIndex) {
				setIndex = toIndex;
			}
		}
	}

	async function deleteSetSeries(seriesIndex: number) {
		const newSetSeries = trainingSession.setSeries.map((sg) => ({ id: sg.id }) as LoggedSetSeries);
		newSetSeries.splice(seriesIndex, 1);
		trainingSession = {
			...trainingSession,
			setSeries: newSetSeries
		};
		await internalUpdate();
		if (seriesIndex === setSeriesIndex) {
			setSeriesIndex = 0;
			setIndex = 0;
			next();
		}
	}

	async function addSetSeries() {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
		newSetGroups.push({ setGroupType: 'straight' } as AttemptedSetGroup);
		workout = {
			...workout,
			setGroups: newSetGroups
		};
		await internalUpdate();
	}

	async function moveSetSeries(fromIndex: number, toIndex: number) {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as LoggedSetSeries);
		const setGroup = newSetGroups[fromIndex];
		newSetGroups.splice(fromIndex, 1);
		newSetGroups.splice(toIndex, 0, setGroup);
		workout = {
			...workout,
			setGroups: newSetGroups
		};
		await internalUpdate();
	}

	async function deleteSet(setGroupIndex: number, setIndex: number) {
		const activeSetGroupIndex = setGroupIndex;
		const activeSetIndex = setIndex;
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as LoggedSetSeries);
		const setGroup = workout.setGroups[setGroupIndex];
		const newSets = setGroup.sets.slice();
		newSets.splice(setIndex, 1);
		const newSetGroup = {
			id: setGroup.id,
			sets: newSets
		};
		newSetGroups[setGroupIndex] = newSetGroup as never;
		workout = {
			...workout,
			setGroups: newSetGroups
		};
		await internalUpdate();
		if (setGroupIndex === activeSetGroupIndex && setIndex === activeSetIndex) {
			setGroupIndex = 0;
			setIndex = 0;
			next();
		}
	}

	async function copySet(setSeriesIndex: number, setIndex: number) {
		const newSetSeriesList = trainingSession.setSeries.map((sg) => ({ id: sg.id }) as LoggedSetSeries);
		const setSeries = trainingSession.setSeries[setSeriesIndex];
		const newSets = setSeries.sets.slice();
		const set = setSeries.sets[setIndex];
		const newSet = {
			...set,
			id: undefined,
			startedAt: undefined,
			completedAt: undefined,
			status: undefined
		};

		newSets.splice(setIndex + 1, 0, newSet as never);

		const newSetSeriesItem = {
			id: setSeries.id,
			sets: newSets
		};
		newSetSeriesList[setSeriesIndex] = newSetSeriesItem as never;
		trainingSession = {
			...trainingSession,
			setSeries: newSetSeriesList
		};
		await internalUpdate();
	}

	function updateActiveSet(updateFn: (set: LoggedSet) => LoggedSet) {
		return updateSet(setSeriesIndex, setIndex, updateFn);
	}

	return {
		get trainingSession() {
			return trainingSession;
		},
		get duration() {
			return duration;
		},
		set duration(value: number) {
			duration = value;
		},
		get activeSetDuration() {
			return activeSetDuration;
		},
		set activeSetDuration(value: number) {
			activeSetDuration = value;
		},
		get paused() {
			return paused;
		},
		set paused(value: boolean) {
			paused = value;
		},
		get restTimer() {
			return restTimer;
		},
		set restTimer(value: number) {
			restTimer = value;
		},
		get done() {
			return done;
		},
		get activeSetSeriesIndex() {
			return setSeriesIndex;
		},
		get activeSetIndex() {
			return setIndex;
		},
		get activeSetSeries() {
			return setSeries;
		},
		get activeSet() {
			return set;
		},
		get urlSearchParams() {
			return urlSearchParams;
		},
		next,
		setSet,
		updateSet,
		createSets,
		updateActiveSet,
		update,
		deleteSet,
		copySet,
		moveSets,
		moveSetSeries,
		addSetSeries,
		deleteSetSeries,
		fromURLSearchParams
	};
}
