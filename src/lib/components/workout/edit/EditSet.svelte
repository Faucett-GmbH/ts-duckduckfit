<script lang="ts" module>
	export interface SetParams extends AttemptedSet {
		id: string;
	}

	export interface EditProps {
		set: SetParams;
		exerciseByGuid: { [guid: string]: Exercise };
		position: number;
		showStatus?: boolean;
		showExercise?: boolean;
		showDelete?: boolean;
		canMove?: boolean;
		valid?: boolean | undefined;
		isDragging?: boolean;
		isDraggingOver?: boolean;
		onDragStart(e: DragEvent): void;
		onDragEnd(e: DragEvent): void;
		onDragLeave(e: DragEvent): void;
		onDragOver(e: DragEvent): void;
		oninput?(params: SetParams): void;
		ondelete?(params: SetParams): void;
		onvalid?(valid: boolean): void;
	}
</script>

<script lang="ts">
	import X from 'lucide-svelte/icons/x';
	import Grip from 'lucide-svelte/icons/grip';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '../SetType.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import WorkoutSetInput, { type WorkoutSetInputParams } from '../WorkoutSetInput.svelte';
	import ExerciseSetInput, { type ExerciseSetInputParams } from '../ExerciseSetInput.svelte';
	import type { AttemptedSet, SetStatusType } from '$lib/state/workouts.svelte';
	import type { SetType } from '$lib/state/workoutTemplates.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { m } from '$lib/paraglide/messages';
	import { findTranslation } from '$lib/util';

	let {
		set = $bindable(),
		exerciseByGuid = $bindable(),
		position,
		showStatus = true,
		showExercise = false,
		showDelete = true,
		canMove = true,
		valid = $bindable(undefined),
		isDragging = false,
		isDraggingOver = false,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver,
		oninput,
		ondelete,
		onvalid
	}: EditProps = $props();

	let draggable = $state(false);
	let exercise = $derived(exerciseByGuid[set.exerciseGuid]);
	let exerciseTranslation = $derived(findTranslation(exercise.translations));

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	async function onDeleteInternal() {
		openDelete = false;
		ondelete?.(set);
	}
	let openDelete = $state(false);
	function onOpenDelete() {
		openDelete = true;
	}

	let exerciseSetInputValid: boolean | undefined = $state(undefined);
	let workoutSetInputValid: boolean | undefined = $state(undefined);
	function onValid(_newValid: boolean) {
		valid = exerciseSetInputValid && workoutSetInputValid;
		onvalid?.(valid === true);
	}
	function onExerciseSetInput(params: ExerciseSetInputParams) {
		oninput?.({ ...set, ...params });
	}
	function onWorkoutSetInput(params: WorkoutSetInputParams) {
		oninput?.({ ...set, ...params });
	}

	let setTypeDropdownOpen = $state(false);
	function createOnSetType(setType: SetType) {
		return () => {
			set = { ...set, setType };
			setTypeDropdownOpen = false;
			oninput?.(set);
		};
	}

	let statusOpen = $state(false);
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
			oninput?.(set);
			statusOpen = false;
		};
	}
</script>

<div
	class="mb-2 flex flex-grow flex-row"
	role="listitem"
	{draggable}
	ondragstart={onDragStart}
	ondragend={onDragEnd}
	ondragleave={onDragLeave}
	ondragover={onDragOver}
>
	<div class="me-1 flex flex-shrink flex-col items-center justify-center">
		{#if canMove}
			<button
				class="btn icon secondary mb-1 cursor-grab"
				class:cursor-grabbing={isDragging}
				onpointerdown={onDraggable}
				onpointerup={onNotDraggable}
			>
				<div class="h-4 w-4"><Grip size="1rem" /></div>
			</button>
		{/if}
		<Dropdown position="top-left" anchorPosition="bottom-left" bind:open={setTypeDropdownOpen}>
			{#snippet button()}
				<SetTypeComponent setType={set.setType} {position} />
			{/snippet}
			<button
				class="btn ghost text-left text-nowrap"
				class:active={set.setType === 'working'}
				onclick={createOnSetType('working')}>{m.workouts_working_set_title()}</button
			>
			<button
				class="btn ghost text-left text-nowrap"
				class:active={set.setType === 'warmup'}
				onclick={createOnSetType('warmup')}>{m.workouts_warmup_title()}</button
			>
			<!-- <button
				class="btn ghost text-nowrap text-left"
				class:active={set.setType === SetType.BackoffSetType}
				on:click={createOnSetType(SetType.BackoffSetType)}>{m.workouts_backoffTitle()}</button
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
					<p class="m-0 text-xs">{m.workouts_set_expected()}</p>
					{#if exercise}
						<ExerciseSetInput
							setInput={set}
							{exercise}
							disabled
							restAfter={false}
							bind:valid={exerciseSetInputValid}
							oninput={onExerciseSetInput}
							onvalid={onValid}
						/>
					{/if}
				</div>
				<div class="flex flex-shrink flex-col">
					<p class="m-0 text-xs">{m.workouts_set_actual()}</p>
					{#if exercise}
						<WorkoutSetInput
							setInput={set}
							{exercise}
							bind:valid={workoutSetInputValid}
							oninput={onWorkoutSetInput}
							onvalid={onValid}
						/>
					{/if}
				</div>
			</div>
			{#if showStatus}
				<div class="flex flex-shrink flex-col items-center justify-center">
					<Dropdown position="top-right" anchorPosition="bottom-right" bind:open={statusOpen}>
						{#snippet button()}
							<button
								class="btn icon m-w-6 m-h-6 font-h flex h-6 w-6 flex-row items-center justify-center leading-3"
								class:light={!set.status}
								class:success={set.status === 'success'}
								class:danger={set.status === 'failed'}
								title={set.status === 'success'
									? m.workouts_set_success_title()
									: set.status === 'failed'
										? m.workouts_set_failed_title()
										: m.workouts_set_incomplete_title()}
							>
								{#if set.status === 'success'}
									{m.workouts_set_success_letter()}
								{:else if set.status === 'failed'}
									{m.workouts_set_failed_letter()}
								{:else}
									{m.workouts_set_incomplete_letter()}
								{/if}
							</button>
						{/snippet}
						<button
							class="btn ghost text-left text-nowrap"
							class:active={set.status === 'success'}
							onclick={createOnStatus('success')}>{m.workouts_set_success_title()}</button
						>
						<button
							class="btn ghost text-left text-nowrap"
							class:active={set.status === 'failed'}
							onclick={createOnStatus('failed')}>{m.workouts_set_failed_title()}</button
						>
						<button
							class="btn ghost text-left text-nowrap"
							class:active={!set.status}
							onclick={createOnStatus(null)}>{m.workouts_set_incomplete_title()}</button
						>
					</Dropdown>
				</div>
			{/if}
		</div>
		<div
			class="mt-1 flex flex-grow flex-row items-center justify-start"
			class:hidden={!showExercise}
		>
			<div class="badge sm light">{exerciseTranslation?.name || ''}</div>
		</div>
	</div>
	{#if showDelete}
		<div class="flex flex-col items-center justify-center">
			<button class="btn danger icon" onclick={onOpenDelete}>
				<X size="1rem" />
			</button>
		</div>
	{/if}
</div>

<Modal bind:open={openDelete}>
	{#snippet title()}
		<h5>{m.workouts_set_delete_title()}</h5>
	{/snippet}
	<p>{m.workouts_set_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.workouts_set_delete_submit()}
		</button>
	</div>
</Modal>
