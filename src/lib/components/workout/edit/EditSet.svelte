<svelte:options immutable />

<script lang="ts" context="module">
	export type SetParams = AttemptedSet & {
		id?: number;
		localId: string;
	};
</script>

<script lang="ts">
	import { SetStatusType, SetType, UnitSystem, type AttemptedSet } from '$lib/openapi/duckduckfit';
	import { createEventDispatcher } from 'svelte';
	import X from 'lucide-svelte/icons/x';
	import Grip from 'lucide-svelte/icons/grip';
	import LL from '$lib/i18n/i18n-svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '../SetType.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import WorkoutSetInput, { type WorkoutSetInputParams } from '../WorkoutSetInput.svelte';
	import ExerciseSetInput, { type ExerciseSetInputParams } from '../ExerciseSetInput.svelte';

	export let set: SetParams;
	export let position: number;
	export let showStatus = true;
	export let showExercise = false;
	export let showDelete = true;
	export let canMove = true;
	export let valid: boolean | undefined = undefined;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
	export let isDragging = false;
	export let isDraggingOver = false;
	export let onDragStart: (e: DragEvent) => void;
	export let onDragEnd: (e: DragEvent) => void;
	export let onDragLeave: (e: DragEvent) => void;
	export let onDragOver: (e: DragEvent) => void;

	let draggable = false;

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	async function onDeleteInternal() {
		openDelete = false;
		dispatch('delete', set);
	}
	let openDelete = false;
	function onOpenDelete() {
		openDelete = true;
	}

	const dispatch = createEventDispatcher<{
		input: SetParams;
		delete: SetParams;
		valid: boolean;
	}>();

	let exerciseSetInputValid: boolean | undefined = undefined;
	let workoutSetInputValid: boolean | undefined = undefined;
	function onValid(_event: CustomEvent<boolean>) {
		valid = exerciseSetInputValid && workoutSetInputValid;
		dispatch('valid', valid === true);
	}
	function onExerciseSetInput(event: CustomEvent<ExerciseSetInputParams>) {
		dispatch('input', { ...set, ...event.detail });
	}
	function onWorkoutSetInput(event: CustomEvent<WorkoutSetInputParams>) {
		dispatch('input', { ...set, ...event.detail });
	}

	let setTypeDropdownOpen = false;
	function createOnSetType(setType: SetType) {
		return () => {
			set = { ...set, setType };
			setTypeDropdownOpen = false;
			dispatch('input', set);
		};
	}

	let statusOpen = false;
	function createOnStatus(status: SetStatusType | null) {
		return () => {
			const newSet = { ...set, status } as SetParams;
			if (status == null) {
				newSet.startedAt = new Date();
				newSet.completedAt = null as never;
			} else {
				newSet.completedAt = new Date();
			}
			set = newSet;
			dispatch('input', set);
			statusOpen = false;
		};
	}
</script>

<div
	class="mb-2 flex flex-grow flex-row"
	role="listitem"
	{draggable}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragleave={onDragLeave}
	on:dragover={onDragOver}
>
	<div class="me-1 flex flex-shrink flex-col items-center justify-center">
		{#if canMove}
			<button
				class="btn icon secondary mb-1 cursor-grab"
				class:cursor-grabbing={isDragging}
				on:pointerdown={onDraggable}
				on:pointerup={onNotDraggable}
			>
				<div class="h-4 w-4"><Grip size="1rem" /></div>
			</button>
		{/if}
		<Dropdown position="top-left" anchorPosition="bottom-left" bind:open={setTypeDropdownOpen}>
			<SetTypeComponent slot="button" setType={set.setType} {position} />
			<button
				class="btn ghost text-nowrap text-left"
				class:active={set.setType === 'working'}
				on:click={createOnSetType('working')}>{$LL.workouts.workingSetTitle()}</button
			>
			<button
				class="btn ghost text-nowrap text-left"
				class:active={set.setType === 'warmup'}
				on:click={createOnSetType('warmup')}>{$LL.workouts.warmupTitle()}</button
			>
			<!-- <button
				class="btn ghost text-nowrap text-left"
				class:active={set.setType === "backoff"}
				on:click={createOnSetType("backoff")}>{$LL.workouts.backoffTitle()}</button
			> -->
		</Dropdown>
	</div>
	<div
		class="bg-swamp-green-300 me-1 flex flex-grow flex-col rounded-lg p-1 text-black"
		class:!bg-swamp-green-600={isDraggingOver}
	>
		<div class="flex flex-grow flex-row flex-wrap items-center justify-between">
			<div class="flex flex-grow flex-row flex-wrap items-start justify-between">
				<div class="flex flex-shrink flex-col">
					<p class="m-0 text-xs">{$LL.workouts.set.expected()}</p>
					<ExerciseSetInput
						setInput={set}
						exercise={set.exercise}
						{unitSystem}
						disabled
						restAfter={false}
						bind:valid={exerciseSetInputValid}
						on:input={onExerciseSetInput}
						on:valid={onValid}
					/>
				</div>
				<div class="flex flex-shrink flex-col">
					<p class="m-0 text-xs">{$LL.workouts.set.actual()}</p>
					<WorkoutSetInput
						setInput={set}
						exercise={set.exercise}
						{unitSystem}
						bind:valid={workoutSetInputValid}
						on:input={onWorkoutSetInput}
						on:valid={onValid}
					/>
				</div>
			</div>
			{#if showStatus}
				<div class="flex flex-shrink flex-col items-center justify-center">
					<Dropdown position="top-right" anchorPosition="bottom-right" bind:open={statusOpen}>
						<button
							slot="button"
							class="btn icon m-w-6 m-h-6 font-h flex h-6 w-6 flex-row items-center justify-center leading-3"
							class:light={!set.status}
							class:success={set.status === SetStatusType.SuccessSetStatusType}
							class:danger={set.status === SetStatusType.FailedSetStatusType}
							title={set.status === SetStatusType.SuccessSetStatusType
								? $LL.workouts.set.successTitle()
								: set.status === SetStatusType.FailedSetStatusType
									? $LL.workouts.set.failedTitle()
									: ''}
						>
							{#if set.status === SetStatusType.SuccessSetStatusType}
								{$LL.workouts.set.successLetter()}
							{:else if set.status === SetStatusType.FailedSetStatusType}
								{$LL.workouts.set.failedLetter()}
							{/if}
						</button>
						<button
							class="btn ghost text-nowrap text-left"
							class:active={set.status === SetStatusType.SuccessSetStatusType}
							on:click={createOnStatus(SetStatusType.SuccessSetStatusType)}
							>{$LL.workouts.set.successTitle()}</button
						>
						<button
							class="btn ghost text-nowrap text-left"
							class:active={set.status === SetStatusType.FailedSetStatusType}
							on:click={createOnStatus(SetStatusType.FailedSetStatusType)}
							>{$LL.workouts.set.failedTitle()}</button
						>
						<button
							class="btn ghost text-nowrap text-left"
							class:active={!set.status}
							on:click={createOnStatus(null)}>{$LL.workouts.set.incompleteTitle()}</button
						>
					</Dropdown>
				</div>
			{/if}
		</div>
		<div
			class="mt-1 flex flex-grow flex-row items-center justify-start"
			class:hidden={!showExercise}
		>
			<div class="badge sm light">{set.exercise.translation.name}</div>
		</div>
	</div>
	{#if showDelete}
		<div class="flex flex-col items-center justify-center">
			<button class="btn danger icon" on:click={onOpenDelete}>
				<X size="1rem" />
			</button>
		</div>
	{/if}
</div>

<Modal bind:open={openDelete}>
	<h5 slot="title">{$LL.workouts.set.delete.title()}</h5>
	<p>{$LL.workouts.set.delete.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" on:click={onDeleteInternal}>
			{$LL.workouts.set.delete.submit()}
		</button>
	</div>
</Modal>
