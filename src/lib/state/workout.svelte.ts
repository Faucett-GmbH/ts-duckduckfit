import type { SetParams } from '$lib/components/workout/edit/EditSet.svelte';
import { debounce } from '@aicacia/debounce';
import { upsertWorkout, type AttemptedSet, type AttemptedSetGroup, type Workout } from './workouts.svelte';
import type { AutomergeDocumentId } from '$lib/repo';

export function createWorkout(w: Workout, workoutId: AutomergeDocumentId<Workout>) {
	let workout = $state(w);
	let duration = $state(w.durationInSeconds || 0);
	let restTimer = $state(0);
	let paused = $state(false);
	let done = $state(w.setGroups.every((sg) => sg.sets.every((s) => s.status)));
	const initialIndexes = getNext(w, 0, 0);
	let setGroupIndex = $state(initialIndexes?.[0] || 0);
	let setIndex = $state(initialIndexes?.[1] || 0);
	const setGroup = $derived(workout.setGroups[setGroupIndex]);
	const set = $derived(setGroup.sets[setIndex]);
	let activeSetDuration = $state(set.durationInSeconds || 0);
	const urlSearchParams = $derived({
		d: duration.toString(),
		p: paused.toString(),
		r: restTimer.toString(),
		sg: setGroupIndex.toString(),
		s: setIndex.toString()
	});

	function getNext(workout: Workout, setGroupIndex: number, setIndex: number) {
		let setGroup = workout.setGroups[setGroupIndex];
		let set = setGroup.sets[setIndex];
		let shouldBreakOnEnd = false;
		while (true) {
			setIndex += 1;
			if (setIndex >= setGroup.sets.length) {
				setGroupIndex += 1;
				if (setGroupIndex >= workout.setGroups.length) {
					if (shouldBreakOnEnd) {
						return;
					}
					shouldBreakOnEnd = true;
					setGroupIndex = 0;
				}
				setIndex = 0;
				setGroup = workout.setGroups[setGroupIndex];
			}
			set = setGroup.sets[setIndex];
			if (!set.status) {
				break;
			}
		}
		return [setGroupIndex, setIndex] as const;
	}

	function next() {
		if (done) {
			return false;
		}
		const result = getNext(workout, setGroupIndex, setIndex);
		if (!result) {
			return false;
		}
		setSet(result[0], result[1]);
		return true;
	}

	function fromURLSearchParams(params: URLSearchParams) {
		duration = parseInt(params.get('d') ?? '0');
		paused = params.get('p') === 'true';
		setGroupIndex = parseInt(params.get('sg') ?? '0');
		setIndex = parseInt(params.get('s') ?? '0');
	}

	function setSet(newSetGroupIndex: number, newSetIndex: number) {
		setGroupIndex = newSetGroupIndex;
		setIndex = newSetIndex;
		activeSetDuration = set.durationInSeconds || 0;
		restTimer = 0;
		paused = false;
	}

	function update(updateFn: (workout: Workout) => Workout) {
		const updatedWorkout = updateFn(workout);
		workout = updatedWorkout;
		return updatedWorkout;
	}

	function internalUpdateSet(
		setGroupIndex: number,
		setIndex: number,
		updateFn: (set: AttemptedSet) => AttemptedSet
	) {
		const newSetGroups = workout.setGroups.slice();
		const setGroup = newSetGroups[setGroupIndex];
		const newSets = setGroup.sets.slice();
		const set = setGroup.sets[setIndex];
		const newSet = updateFn(set);
		const newSetGroup = {
			...setGroup,
			sets: newSets
		};
		newSets[setIndex] = newSet;
		newSetGroups[setGroupIndex] = newSetGroup;
		const updatedWorkout = {
			...workout,
			setGroups: newSetGroups
		};
		done = newSetGroups.every((sg) => sg.sets.every((s) => s.status));
		workout = updatedWorkout;
		if (!set.status && newSet.status) {
			restTimer = newSet.restAfterInSeconds || 0;
		}
		return newSet;
	}

	async function updateSet(
		setGroupIndex: number,
		setIndex: number,
		updateFn: (set: AttemptedSet) => AttemptedSet,
		debounce = false
	) {
		const set = internalUpdateSet(setGroupIndex, setIndex, updateFn);
		if (debounce) {
			debouncedUpdate();
		} else {
			await internalUpdate();
		}
		return set;
	}

	async function internalUpdate() {
		await upsertWorkout(workout, workoutId);
	}
	const debouncedUpdate = debounce(internalUpdate, 1000);

	async function createSets(setGroupIndex: number, newSets: SetParams[]) {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
		const setGroup = workout.setGroups[setGroupIndex];
		const sets = [...setGroup.sets, ...newSets];
		const exercises = new Set<string>();
		for (const set of sets) {
			exercises.add(set.exerciseGuid);
		}
		let setGroupType = setGroup.setGroupType;
		switch (exercises.size) {
			case 1:
				setGroupType = 'straight';
				break;
			case 2:
				setGroupType = 'superset';
				break;
			default:
				setGroupType = 'circuit';
				break;
		}
		newSetGroups[setGroupIndex] = {
			id: setGroup.id,
			setGroupType,
			sets
		} as AttemptedSetGroup;
		await internalUpdate();
	}

	async function moveSets(setGroupIndex: number, fromIndex: number, toIndex: number) {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
		const setGroup = workout.setGroups[setGroupIndex];
		const newSets = setGroup.sets.slice();
		const set = newSets[fromIndex];
		newSets.splice(fromIndex, 1);
		newSets.splice(toIndex, 0, set);
		newSetGroups[setGroupIndex] = {
			id: setGroup.id,
			sets: newSets
		} as AttemptedSetGroup;
		workout = { ...workout, setGroups: newSetGroups };
		await internalUpdate();
		if (setGroupIndex === setGroupIndex) {
			if (fromIndex === setIndex) {
				setIndex = toIndex;
			}
		}
	}

	async function deleteSetGroup(groupIndex: number) {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
		newSetGroups.splice(groupIndex, 1);
		workout = {
			...workout,
			setGroups: newSetGroups
		};
		await internalUpdate();
		if (groupIndex === setGroupIndex) {
			setGroupIndex = 0;
			setIndex = 0;
			next();
		}
	}

	async function addSetGroup() {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
		newSetGroups.push({ setGroupType: 'straight' } as AttemptedSetGroup);
		workout = {
			...workout,
			setGroups: newSetGroups
		};
		await internalUpdate();
	}

	async function moveSetGroups(fromIndex: number, toIndex: number) {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
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
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
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
		done = workout.setGroups.every((sg) => sg.sets.every((s) => s.status));
		if (setGroupIndex === activeSetGroupIndex && setIndex === activeSetIndex) {
			setGroupIndex = 0;
			setIndex = 0;
			next();
		}
	}

	async function copySet(setGroupIndex: number, setIndex: number) {
		const newSetGroups = workout.setGroups.map((sg) => ({ id: sg.id }) as AttemptedSetGroup);
		const setGroup = workout.setGroups[setGroupIndex];
		const newSets = setGroup.sets.slice();
		const set = setGroup.sets[setIndex];
		const newSet = {
			...set,
			id: undefined,
			startedAt: undefined,
			completedAt: undefined,
			status: undefined
		};
		newSets.splice(setIndex + 1, 0, newSet as never);
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
	}

	function updateActiveSet(updateFn: (set: AttemptedSet) => AttemptedSet) {
		return updateSet(setGroupIndex, setIndex, updateFn);
	}

	return {
		get workout() {
			return workout;
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
			return done
		},
		get activeSetGroupIndex() {
			return setGroupIndex;
		},
		get activeSetIndex() {
			return setIndex;
		},
		get activeSetGroup() {
			return setGroup;
		},
		get activeSet() {
			return set;
		},
		get fromURLSearchParams() {
			return fromURLSearchParams;
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
		moveSetGroups,
		addSetGroup,
		deleteSetGroup
	};
}
