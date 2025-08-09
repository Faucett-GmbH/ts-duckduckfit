<script lang="ts">
	import { getId, setUrlParams, toHHMMSS } from '$lib/util';
	import CirclePause from 'lucide-svelte/icons/circle-pause';
	import CirclePlay from 'lucide-svelte/icons/circle-play';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Plus from 'lucide-svelte/icons/plus';
	import Check from 'lucide-svelte/icons/check';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Ban from 'lucide-svelte/icons/ban';
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount, tick } from 'svelte';
	import Sortable from '$lib/components/Sortable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { createWorkoutSession } from '$lib/state/workoutSession.svelte';
	import type { PageProps } from './$types';
	import type { AttemptedSet } from '$lib/state/workouts.svelte';
	import { handleError } from '$lib/error';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import AttemptedSetGroup from '$lib/components/workout/AttemptedSetGroup.svelte';

	let { data }: PageProps = $props();

	const workoutSession = createWorkoutSession(data.workout, data.workoutId);

	let initted = $state(false);
	let startedFirst = $state(false);

	function onTogglePause() {
		workoutSession.paused = !workoutSession.paused;
	}
	let openEndWorkout = $state(false);
	function onOpenEndWorkout() {
		openEndWorkout = true;
	}
	function createOnSelectSet(setGroupIndex: number, setIndex: number) {
		return async () => {
			if (
				workoutSession.activeSetGroupIndex === setGroupIndex &&
				workoutSession.activeSetIndex === setIndex
			) {
				return;
			}
			workoutSession.setSet(setGroupIndex, setIndex);
			await tick();
			if (!workoutSession.activeSet.status) {
				workoutSession.updateActiveSet((set) => ({
					...set,
					startedAt: new Date(),
					durationInSeconds: 0,
					attemptedTimeInSeconds: 0
				}));
				workoutSession.activeSetDuration = 0;
			} else {
				workoutSession.activeSetDuration = workoutSession.activeSet.attemptedTimeInSeconds || 0;
			}
		};
	}
	function createUpdate(setGroupIndex: number, setIndex: number) {
		return (updateFn: (set: AttemptedSet) => AttemptedSet, debounce = false) => {
			workoutSession.updateSet(setGroupIndex, setIndex, updateFn, debounce);
		};
	}
	function createCopySet(setGroupIndex: number, setIndex: number) {
		return () => workoutSession.copySet(setGroupIndex, setIndex);
	}
	function createDeleteSet(setGroupIndex: number, setIndex: number) {
		return () => workoutSession.deleteSet(setGroupIndex, setIndex);
	}
	function onFail() {
		workoutSession.updateActiveSet((set) => ({
			...set,
			status: 'failed',
			completedAt: new Date(),
			durationInSeconds: workoutSession.activeSetDuration,
			attemptedTimeInSeconds: workoutSession.activeSetDuration
		}));
	}
	function onSuccess() {
		workoutSession.updateActiveSet((set) => ({
			...set,
			status: 'success',
			completedAt: new Date(),
			durationInSeconds: workoutSession.activeSetDuration,
			attemptedTimeInSeconds: workoutSession.activeSetDuration
		}));
	}
	async function onNext() {
		if (workoutSession.next()) {
			await tick();
			workoutSession.updateActiveSet((set) => ({
				...set,
				startedAt: new Date()
			}));
		}
	}

	let finishing = $state(false);
	async function onFinish() {
		try {
			finishing = true;
			workoutSession.update((w) => ({
				...w,
				durationInSeconds: workoutSession.duration,
				completedAt: new Date()
			}));
			await goto(`${base}/workouts`);
		} catch (error) {
			await handleError(error);
		} finally {
			finishing = false;
		}
	}

	let addingSetGroup = $state(false);
	async function onAddSetGroup(e: Event) {
		e.stopPropagation();
		try {
			addingSetGroup = true;
			await workoutSession.addSetGroup();
		} catch (error) {
			await handleError(error);
		} finally {
			addingSetGroup = false;
		}
	}

	let mounted = $state(false);
	let navigated = $state(false);
	let now = $state(Date.now());
	onMount(() => {
		mounted = true;

		const intervalId = setInterval(() => {
			now = Date.now();
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	});
	afterNavigate(() => {
		navigated = true;
	});
	// svelte-ignore state_referenced_locally
	let lastNow = now;
	$effect(() => {
		if (lastNow === now) {
			return;
		}
		lastNow = now;
		if (!workoutSession.paused) {
			workoutSession.duration += 1;
			if (!workoutSession.activeSet.status) {
				workoutSession.activeSetDuration += 1;
			}
			if (workoutSession.restTimer > 0) {
				workoutSession.restTimer -= 1;
			}
		}
	});
	let lastDuration = workoutSession.duration;
	$effect(() => {
		if (lastDuration === workoutSession.duration) {
			return;
		}
		lastDuration = workoutSession.duration;
		if (!workoutSession.paused) {
			const d = workoutSession.duration;
			if (d % 5 === 0) {
				workoutSession.update((workout) => ({ ...workout, durationInSeconds: d }));
			}
		}
	});
	let isHydrated = $derived(mounted && navigated);
	$effect(() => {
		if (isHydrated) {
			setUrlParams(workoutSession.urlSearchParams);
		}
	});
	$effect(() => {
		if (isHydrated) {
			workoutSession.fromURLSearchParams(page.url.searchParams);
			initted = true;
		}
	});
	$effect(() => {
		if (!startedFirst && initted) {
			startedFirst = true;
			if (!workoutSession.activeSet.status) {
				workoutSession.updateActiveSet((set) => ({
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
	<title>{m.workouts_workout_title()}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-hidden">
	<div class="flex w-full flex-grow flex-col overflow-hidden sm:container sm:mx-auto">
		<div class="card flex h-full flex-grow flex-col overflow-hidden !rounded-none !p-0 sm:!px-2">
			<div class="card secondary flex flex-row justify-between !rounded-t-none !p-2">
				<div>
					<h6 class="mb-0">{toHHMMSS(workoutSession.duration)}</h6>
				</div>
				<div class="flex flex-row flex-wrap">
					<button class="btn ghost flex flex-row" onclick={onTogglePause}>
						<span class="me-1">
							{#if workoutSession.paused}
								<CirclePlay />
							{:else}
								<CirclePause />
							{/if}
						</span>
						{#if workoutSession.paused}
							{m.workouts_workout_resume()}
						{:else}
							{m.workouts_workout_pause()}
						{/if}
					</button>
					<button class="btn danger flex flex-row" disabled={finishing} onclick={onOpenEndWorkout}>
						{#if finishing}<div class="inline-block h-6 w-6 animate-spin">
								<LoaderCircle />
							</div>{/if}
						{m.workouts_workout_end_open()}
					</button>
				</div>
			</div>
			<div class="flex flex-grow flex-col overflow-x-hidden overflow-y-auto pt-2 pb-4" role="list">
				<Sortable
					id={`set-groups-workout.{workout.workout.id}`}
					items={workoutSession.workout.setGroups}
					getKey={getId}
					onMove={workoutSession.moveSetGroups}
				>
					{#snippet children({
						isDragging,
						isDraggingOver,
						index,
						item,
						onDragStart,
						onDragEnd,
						onDragLeave,
						onDragOver
					})}
						<AttemptedSetGroup
							bind:exerciseByGuid={data.exerciseByGuid}
							setGroup={item}
							setGroupIndex={index}
							activeSetIndex={workoutSession.activeSetIndex}
							activeSetGroupIndex={workoutSession.activeSetGroupIndex}
							activeSetDuration={workoutSession.activeSetDuration}
							{isDragging}
							{isDraggingOver}
							{onDragStart}
							{onDragEnd}
							{onDragLeave}
							{onDragOver}
							moveSets={workoutSession.moveSets}
							deleteSetGroup={workoutSession.deleteSetGroup}
							createSets={workoutSession.createSets}
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
						onclick={onAddSetGroup}
					>
						<Plus />
						{m.workouts_set_group_add()}
					</button>
				</div>
			</div>
			<div class="card secondary flex flex-shrink flex-col !rounded-b-none !p-2">
				<div class="flex flex-col">
					{#if !workoutSession.activeSet.status}
						<h6 class="mb-0">{toHHMMSS(workoutSession.activeSetDuration)}</h6>
					{/if}
				</div>
				<div class="flex flex-row justify-between">
					{#if workoutSession.activeSet.status}
						<button
							class="btn ghost flex flex-row"
							disabled={workoutSession.restTimer == 0}
							onclick={onTogglePause}
						>
							{toHHMMSS(workoutSession.restTimer)}
							{#if workoutSession.restTimer > 0}
								<span class="ms-1">
									{#if workoutSession.paused}
										<CirclePlay />
									{:else}
										<CirclePause />
									{/if}
								</span>
							{/if}
						</button>
						{#if workoutSession.done}
							<button class="btn info flex flex-row" disabled={finishing} onclick={onFinish}>
								{#if finishing}<div class="inline-block h-6 w-6 animate-spin">
										<LoaderCircle />
									</div>{/if}
								{m.workouts_workout_finish()}
								<ArrowRight />
							</button>
						{:else}
							<button class="btn info flex flex-row" onclick={onNext}>
								{#if workoutSession.restTimer == 0}
									{m.workouts_workout_next()}
								{:else}
									{m.workouts_workout_skip_rest_start_next()}
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
		<h5>{m.workouts_workout_end_title()}</h5>
	{/snippet}
	<p>{m.workouts_workout_end_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" disabled={finishing} onclick={onFinish}>
			{m.workouts_workout_end_submit()}
		</button>
	</div>
</Modal>
