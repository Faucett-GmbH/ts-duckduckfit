<svelte:options immutable />

<script lang="ts">
	import { run, stopPropagation } from 'svelte/legacy';

	import LL from '$lib/i18n/i18n-svelte';
	import { getId, setUrlParams, toHHMMSS } from '$lib/util';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import CirclePause from 'lucide-svelte/icons/circle-pause';
	import CirclePlay from 'lucide-svelte/icons/circle-play';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Plus from 'lucide-svelte/icons/plus';
	import Check from 'lucide-svelte/icons/check';
	import Ban from 'lucide-svelte/icons/ban';
	import { createWorkout } from '$lib/stores/workout';
	import { now } from '$lib/stores/now';
	import AttemptedSetGroup from '$lib/components/workout/AttemptedSetGroup.svelte';
	import { SetStatusType, type AttemptedSet, type Workout } from '$lib/openapi/duckduckfit';
	import { workoutApi } from '$lib/openapi';
	import { handleError } from '$lib/errors';
	import { get } from 'svelte/store';
	import { afterNavigate, goto } from '$app/navigation';
	import { locale } from '$lib/stores/language';
	import { base } from '$app/paths';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount, tick } from 'svelte';
	import Sortable from '$lib/components/Sortable.svelte';
	import Modal from '$lib/components/Modal.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const {
		workout,
		done,
		duration,
		activeSetDuration,
		restTimer,
		paused,
		activeSetGroupIndex,
		activeSetIndex,
		activeSet,
		fromURLSearchParams,
		urlSearchParams,
		setSet,
		next,
		updateSet,
		createSets,
		updateActiveSet,
		update,
		deleteSet,
		copySet,
		addSetGroup,
		moveSetGroups,
		moveSets,
		deleteSetGroup
	} = createWorkout(data.workout);

	let initted = $state(false);
	let startedFirst = $state(false);

	function onTogglePause() {
		paused.update((paused) => !paused);
	}
	let openEndWorkout = $state(false);
	function onOpenEndWorkout() {
		openEndWorkout = true;
	}
	function createOnSelectSet(setGroupIndex: number, setIndex: number) {
		return async () => {
			if ($activeSetGroupIndex === setGroupIndex && $activeSetIndex === setIndex) {
				return;
			}
			setSet(setGroupIndex, setIndex);
			await tick();
			if (!$activeSet.status) {
				updateActiveSet((set) => ({
					...set,
					startedAt: new Date(),
					durationInSeconds: 0,
					attemptedTimeInSeconds: 0
				}));
				activeSetDuration.set(0);
			} else {
				activeSetDuration.set($activeSet.attemptedTimeInSeconds || 0);
			}
		};
	}
	function createUpdate(setGroupIndex: number, setIndex: number) {
		return (updateFn: (set: AttemptedSet) => AttemptedSet, debounce = false) => {
			updateSet(setGroupIndex, setIndex, updateFn, debounce);
		};
	}
	function createCopySet(setGroupIndex: number, setIndex: number) {
		return () => copySet(setGroupIndex, setIndex);
	}
	function createDeleteSet(setGroupIndex: number, setIndex: number) {
		return () => deleteSet(setGroupIndex, setIndex);
	}
	function onFail() {
		updateActiveSet((set) => ({
			...set,
			status: SetStatusType.FailedSetStatusType,
			completedAt: new Date(),
			durationInSeconds: $activeSetDuration,
			attemptedTimeInSeconds: $activeSetDuration
		}));
	}
	function onSuccess() {
		updateActiveSet((set) => ({
			...set,
			status: SetStatusType.SuccessSetStatusType,
			completedAt: new Date(),
			durationInSeconds: $activeSetDuration,
			attemptedTimeInSeconds: $activeSetDuration
		}));
	}
	async function onNext() {
		if (next()) {
			await tick();
			updateActiveSet((set) => ({
				...set,
				startedAt: new Date()
			}));
		}
	}

	async function updateWorkout(workout: Workout) {
		try {
			await workoutApi.updateWorkout(
				workout.id,
				{
					...workout,
					setGroups: undefined
				},
				true
			);
		} catch (error) {
			await handleError(error);
		}
	}

	let finishing = $state(false);
	async function onFinish() {
		try {
			finishing = true;
			await updateWorkout(
				update((workout) => ({
					...workout,
					durationInSeconds: get(duration),
					completedAt: new Date()
				}))
			);
			await goto(`${base}/${$locale}/workouts`);
		} catch (error) {
			await handleError(error);
		} finally {
			finishing = false;
		}
	}

	let addingSetGroup = $state(false);
	async function onAddSetGroup() {
		try {
			addingSetGroup = true;
			await addSetGroup();
		} catch (error) {
			await handleError(error);
		} finally {
			addingSetGroup = false;
		}
	}

	let mounted = $state(false);
	let navigated = $state(false);
	onMount(() => {
		mounted = true;
	});
	afterNavigate(() => {
		navigated = true;
	});
	run(() => {
		if (!$paused) {
			const _now = $now;
			duration.update((d) => d + 1);
			if (!$activeSet.status) {
				activeSetDuration.update((d) => d + 1);
			}
			restTimer.update((d) => (d > 0 ? d - 1 : 0));
			const d = get(duration);
			if (d % 10 === 0) {
				const workout = update((workout) => ({ ...workout, durationInSeconds: d }));
				updateWorkout({
					id: workout.id,
					durationInSeconds: workout.durationInSeconds
				} as Workout);
			}
		}
	});
	let isHydrated = $derived(mounted && navigated);
	run(() => {
		if (isHydrated) {
			fromURLSearchParams($page.url.searchParams);
			initted = true;
		}
	});
	run(() => {
		if (isHydrated) {
			setUrlParams($urlSearchParams);
		}
	});
	run(() => {
		if (!startedFirst && initted) {
			startedFirst = true;
			if (!$activeSet.status) {
				updateActiveSet((set) => ({
					...set,
					startedAt: new Date(),
					durationInSeconds: 0,
					attemptedTimeInSeconds: 0
				}));
			}
		}
	});
</script>

<svelte:head>
	<title>{$LL.workouts.workout.title()}: {$workout.name}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-hidden">
	<div class="flex w-full flex-grow flex-col overflow-hidden sm:container sm:mx-auto">
		<div class="card flex h-full flex-grow flex-col overflow-hidden !rounded-none !p-0 sm:!px-2">
			<div class="card secondary flex flex-row justify-between !rounded-t-none !p-2">
				<div>
					<h6 class="mb-0">{toHHMMSS($duration)}</h6>
				</div>
				<div class="flex flex-row flex-wrap">
					<button class="btn ghost flex flex-row" onclick={onTogglePause}>
						<span class="me-1">
							{#if $paused}
								<CirclePlay />
							{:else}
								<CirclePause />
							{/if}
						</span>
						{#if $paused}
							{$LL.workouts.workout.resume()}
						{:else}
							{$LL.workouts.workout.pause()}
						{/if}
					</button>
					<button class="btn danger flex flex-row" disabled={finishing} onclick={onOpenEndWorkout}>
						{#if finishing}<Spinner />{/if}
						{$LL.workouts.workout.end.open()}
					</button>
				</div>
			</div>
			<div class="flex flex-grow flex-col overflow-y-auto overflow-x-hidden pb-4 pt-2" role="list">
				<Sortable
					id={`set-groups-${$workout.id}`}
					items={$workout.setGroups}
					getKey={getId}
					onMove={moveSetGroups}
					
					
					
					
					
					
					
					
				>
					{#snippet children({ isDragging, isDraggingOver, index, item, onDragStart, onDragEnd, onDragLeave, onDragOver })}
										<AttemptedSetGroup
							setGroup={item}
							setGroupIndex={index}
							activeSetIndex={$activeSetIndex}
							activeSetGroupIndex={$activeSetGroupIndex}
							unitSystem={data.user.unitSystem}
							{activeSetDuration}
							{isDragging}
							{isDraggingOver}
							{onDragStart}
							{onDragEnd}
							{onDragLeave}
							{onDragOver}
							{moveSets}
							{deleteSetGroup}
							{createSets}
							{createOnSelectSet}
							{createUpdate}
							{createCopySet}
							{createDeleteSet}
						/>
														{/snippet}
								</Sortable>
				<div class="ms-7 mt-2 flex flex-row justify-start">
					<button
						class="btn success flex flex-row"
						disabled={addingSetGroup}
						onclick={stopPropagation(onAddSetGroup)}
					>
						<Plus />
						{$LL.workouts.setGroup.add()}
					</button>
				</div>
			</div>
			<div class="card secondary flex flex-shrink flex-col !rounded-b-none !p-2">
				<div class="flex flex-col">
					{#if !$activeSet.status}
						<h6 class="mb-0">{toHHMMSS($activeSetDuration)}</h6>
					{/if}
				</div>
				<div class="flex flex-row justify-between">
					{#if $activeSet.status}
						<button
							class="btn ghost flex flex-row"
							disabled={$restTimer == 0}
							onclick={onTogglePause}
						>
							{toHHMMSS($restTimer)}
							{#if $restTimer > 0}
								<span class="ms-1">
									{#if $paused}
										<CirclePlay />
									{:else}
										<CirclePause />
									{/if}
								</span>
							{/if}
						</button>
						{#if $done}
							<button class="btn info flex flex-row" disabled={finishing} onclick={onFinish}>
								{#if finishing}<Spinner />{/if}
								{$LL.workouts.workout.finish()}
								<ArrowRight />
							</button>
						{:else}
							<button class="btn info flex flex-row" onclick={onNext}>
								{#if $restTimer == 0}
									{$LL.workouts.workout.next()}
								{:else}
									{$LL.workouts.workout.skipRestStartNext()}
								{/if}
								<ArrowRight />
							</button>
						{/if}
					{:else}
						<button class="btn danger icon me-4" onclick={onFail}>
							<Ban />
						</button>
						<button class="btn success icon" onclick={onSuccess}>
							<Check />
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<Modal bind:open={openEndWorkout}>
	{#snippet title()}
		<h5 >{$LL.workouts.workout.end.title()}</h5>
	{/snippet}
	<p>{$LL.workouts.workout.end.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onFinish}>
			{$LL.workouts.workout.end.submit()}
		</button>
	</div>
</Modal>
