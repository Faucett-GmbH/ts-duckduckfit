<script lang="ts" module>
	export interface AttemptedSetProps {
		exerciseByGuid: { [guid: string]: Exercise };
		setGroup: AttemptedSetGroup;
		set: AttemptedSet;
		index: number;
		activeSetDuration: number;
		isDragging?: boolean;
		isDraggingOver?: boolean;
		onDragStart: EventHandler<DragEvent>;
		onDragEnd: EventHandler<DragEvent>;
		onDragLeave: EventHandler<DragEvent>;
		onDragOver: EventHandler<DragEvent>;
		active?: boolean;
		onSetActive: () => void;
		update: (updateFn: (set: AttemptedSet) => AttemptedSet, debounce?: boolean) => void;
		copySet: () => Promise<void>;
		deleteSet: () => Promise<void>;
	}
</script>

<script lang="ts">
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import Grip from 'lucide-svelte/icons/grip';
	import { debounce } from '@aicacia/debounce';
	import Dropdown from '../Dropdown.svelte';
	import SetTypeComponent from './SetType.svelte';
	import WorkoutSetInput, { type WorkoutSetInputParams } from './WorkoutSetInput.svelte';
	import Modal from '../Modal.svelte';
	import { getRealSetPosition } from './util';
	import type { AttemptedSet, AttemptedSetGroup, SetStatusType } from '$lib/state/workouts.svelte';
	import type { SetType } from '$lib/state/workoutTemplates.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { findTranslation } from '$lib/util';
	import { getLocale } from '$lib/state/settings.svelte';
	import type { EventHandler } from 'svelte/elements';

	let {
		exerciseByGuid = $bindable(),
		setGroup,
		set,
		index,
		activeSetDuration = $bindable(),
		isDragging = false,
		isDraggingOver = false,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver,
		active = false,
		onSetActive,
		update,
		copySet,
		deleteSet
	}: AttemptedSetProps = $props();

	let draggable = $state(false);
	let setExercise = $derived(exerciseByGuid[set.exerciseGuid]);
	let setExerciseTranslation = $derived(findTranslation(setExercise?.translations ?? []));

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	let position = $derived(getRealSetPosition(setGroup.sets, set, index));

	let menuOpen = $state(false);
	function onCopySet() {
		menuOpen = false;
		return copySet();
	}
	function onResetTimer() {
		menuOpen = false;
		activeSetDuration = 0;
	}
	let openDeleteSet = $state(false);
	function onOpenDeleteSet() {
		openDeleteSet = true;
		menuOpen = false;
	}
	function onDeleteSet() {
		openDeleteSet = false;
		return deleteSet();
	}

	let setTypeDropdownOpen = $state(false);
	function createOnSetType(setType: SetType) {
		return () => {
			update((set) => ({ ...set, setType }));
			setTypeDropdownOpen = false;
		};
	}

	let statusOpen = $state(false);
	function createOnStatus(status: SetStatusType | null) {
		return () => {
			update((set) => {
				const newSet = { ...set, status } as AttemptedSet;
				if (status == null) {
					newSet.startedAt = new Date();
					newSet.completedAt = null as never;
					activeSetDuration = 0;
				} else {
					newSet.completedAt = new Date();
					if (active) {
						newSet.durationInSeconds = activeSetDuration;
						newSet.attemptedTimeInSeconds = activeSetDuration;
					}
				}
				return newSet;
			});
			statusOpen = false;
			menuOpen;
		};
	}
	function onWorkoutSetInput(params: WorkoutSetInputParams) {
		update((set) => ({ ...set, ...params }));
	}
	let setNoteTranslation = $derived(findTranslation(set.notes));
	let notesElement = $state<HTMLTextAreaElement>();
	function onNoteUpdate() {
		update((set) => {
			const translation = findTranslation(set.notes);
			if (translation) {
				translation.note = notesElement?.value || '';
			} else {
				set.notes = [
					...set.notes,
					{
						locale: getLocale(),
						note: notesElement?.value || ''
					}
				];
			}

			return set;
		}, true);
	}
	const debouncedOnNoteUpdate = debounce(onNoteUpdate, 300);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="border-pear-300 mb-2 flex flex-grow flex-col rounded-lg border-2 p-1 text-black"
	class:bg-swamp-green-200={!active}
	class:bg-swamp-green-300={active}
	class:!bg-swamp-green-600={isDraggingOver}
	class:border-transparent={!active}
	class:border-pear-300={active}
	role="listitem"
	{draggable}
	onclick={onSetActive}
	ondragstart={onDragStart}
	ondragend={onDragEnd}
	ondragleave={onDragLeave}
	ondragover={onDragOver}
>
	<div class="flex flex-grow flex-row">
		<div class="flex flex-shrink flex-row items-center justify-center">
			<button
				class="btn icon secondary cursor-grab"
				class:cursor-grabbing={isDragging}
				onpointerdown={onDraggable}
				onpointerup={onNotDraggable}
			>
				<div class="h-4 w-4">
					<Grip size="1rem" />
				</div>
			</button>
			<Dropdown
				className="xs:ms-1"
				position="top-left"
				anchorPosition="bottom-left"
				bind:open={menuOpen}
			>
				{#snippet button()}
					<button class="btn icon primary ghost flex">
						<EllipsisVertical size="1rem" />
					</button>
				{/snippet}
				<button class="btn ghost text-nowrap text-left" onclick={onCopySet}
					>{m.workouts_set_duplicate()}</button
				>
				{#if active}
					<button class="btn ghost text-nowrap text-left" onclick={onResetTimer}
						>{m.workouts_set_reset_timer()}</button
					>
				{/if}
				<hr class="my-1" />
				<button class="btn ghost text-nowrap text-left" onclick={onOpenDeleteSet}
					>{m.workouts_set_delete_title()}</button
				>
			</Dropdown>
			<Dropdown
				className="ms-1"
				position="top-left"
				anchorPosition="bottom-left"
				bind:open={setTypeDropdownOpen}
			>
				{#snippet button()}
					<SetTypeComponent setType={set.setType} {position} />
				{/snippet}
				<button
					class="btn ghost text-nowrap text-left"
					class:active={set.setType === 'working'}
					onclick={createOnSetType('working')}>{m.workouts_working_set_title()}</button
				>
				<button
					class="btn ghost text-nowrap text-left"
					class:active={set.setType === 'warmup'}
					onclick={createOnSetType('warmup')}>{m.workouts_warmup_title()}</button
				>
				<!-- <button
            class="btn ghost text-nowrap text-left"
            class:active={set.setType === SetType.BackoffSetType}
            on:click={createOnSetType(SetType.BackoffSetType)}>{m.workouts_backoff_title()}</button
          > -->
			</Dropdown>
		</div>
		<div class="flex flex-grow flex-row flex-wrap items-center justify-end">
			{#if setExercise}
				<WorkoutSetInput setInput={set} exercise={setExercise} oninput={onWorkoutSetInput} />
			{/if}
			<div class="flex flex-col justify-center">
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
						class="btn ghost text-nowrap text-left"
						class:active={set.status === 'success'}
						onclick={createOnStatus('success')}>{m.workouts_set_success_title()}</button
					>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={set.status === 'failed'}
						onclick={createOnStatus('failed')}>{m.workouts_set_failed_title()}</button
					>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={!set.status}
						onclick={createOnStatus(null)}>{m.workouts_set_incomplete_title()}</button
					>
				</Dropdown>
			</div>
		</div>
	</div>
	<div
		class="mt-1 flex flex-grow flex-row items-center justify-start"
		class:hidden={setGroup.setGroupType === 'straight'}
	>
		{#if setExerciseTranslation}
			<div class="badge sm light">{setExerciseTranslation.name}</div>
		{/if}
	</div>
	{#if active && set.status}
		<div class="mt-2 flex flex-col">
			<!-- svelte-ignore a11y_autofocus -->
			<textarea
				bind:this={notesElement}
				placeholder={m.workouts_set_notes_placeholder()}
				value={setNoteTranslation.note || ''}
				maxlength="255"
				oninput={debouncedOnNoteUpdate}
			></textarea>
		</div>
	{/if}
</div>

<Modal bind:open={openDeleteSet}>
	{#snippet title()}
		<h5>{m.workouts_set_delete_title()}</h5>
	{/snippet}
	<p>{m.workouts_set_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteSet}>
			{m.workouts_set_delete_submit()}
		</button>
	</div>
</Modal>
