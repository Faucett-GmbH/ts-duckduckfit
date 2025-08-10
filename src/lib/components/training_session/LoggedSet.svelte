<script lang="ts" module>
	export interface LoggedSetProps {
		exerciseByGuid: { [guid: string]: Exercise };
		setSeries: LoggedSetSeries;
		set: LoggedSet;
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
		update: (updateFn: (set: LoggedSet) => LoggedSet, debounce?: boolean) => void;
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
	import WorkoutSetInput, {
		type TrainingSessionSetInputParams
	} from './TrainingSessionSetInput.svelte';
	import Modal from '../Modal.svelte';
	import { getRealSetPosition } from './util';
	import type {
		LoggedSet,
		LoggedSetSeries,
		SetResultType
	} from '$lib/state/trainingSessions.svelte';
	import type { SetType } from '$lib/state/trainingSessionTemplates.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { findTranslation } from '$lib/util';
	import { getLocale } from '$lib/state/settings.svelte';
	import type { EventHandler } from 'svelte/elements';
	import TrainingSessionSetInput from './TrainingSessionSetInput.svelte';

	let {
		exerciseByGuid = $bindable(),
		setSeries,
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
	}: LoggedSetProps = $props();

	let draggable = $state(false);
	let setExercise = $derived(exerciseByGuid[set.exerciseGuid]);
	let setExerciseTranslation = $derived(findTranslation(setExercise?.translations ?? []));

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	let position = $derived(getRealSetPosition(setSeries.sets, set, index));

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

	let setResultTypeOpen = $state(false);
	function createOnSetResultType(setResultType: SetResultType | null) {
		return () => {
			update((set) => {
				const newSet = { ...set, setResultType } as LoggedSet;
				if (setResultType == null) {
					newSet.completedAt = null as never;
					activeSetDuration = 0;
				} else {
					newSet.completedAt = new Date();
				}
				return newSet;
			});
			setResultTypeOpen = false;
			menuOpen;
		};
	}
	function onTrainingSessionSetInput(params: TrainingSessionSetInputParams) {
		update((set) => ({ ...set, ...params }));
	}
	let setNoteTranslation = $derived(findTranslation(set.note));
	let notesElement = $state<HTMLTextAreaElement>();
	function onNoteUpdate() {
		update((set) => {
			const translation = findTranslation(set.note);
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
				<button class="btn ghost text-left text-nowrap" onclick={onCopySet}
					>{m.training_sessions_set_duplicate()}</button
				>
				{#if active}
					<button class="btn ghost text-left text-nowrap" onclick={onResetTimer}
						>{m.training_sessions_set_reset_timer()}</button
					>
				{/if}
				<hr class="my-1" />
				<button class="btn ghost text-left text-nowrap" onclick={onOpenDeleteSet}
					>{m.training_sessions_set_delete_title()}</button
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
					class="btn ghost text-left text-nowrap"
					class:active={set.setType === 'working_set'}
					onclick={createOnSetType('working_set')}>{m.training_sessions_working_set_title()}</button
				>
				<button
					class="btn ghost text-left text-nowrap"
					class:active={set.setType === 'warmup'}
					onclick={createOnSetType('warmup')}>{m.training_sessions_warmup_title()}</button
				>
			</Dropdown>
		</div>
		<div class="flex flex-grow flex-row flex-wrap items-center justify-end">
			{#if setExercise}
				<WorkoutSetInput
					setInput={set}
					exercise={setExercise}
					oninput={onTrainingSessionSetInput}
				/>
			{/if}
			<div class="flex flex-col justify-center">
				<Dropdown position="top-right" anchorPosition="bottom-right" bind:open={statusOpen}>
					{#snippet button()}
						<button
							class="btn icon m-w-6 m-h-6 font-h flex h-6 w-6 flex-row items-center justify-center leading-3"
							class:light={!set.setResultType}
							class:success={set.setResultType === 'completed'}
							class:danger={set.setResultType === 'failed'}
							title={set.setResultType === 'completed'
								? m.training_sessions_set_success_title()
								: set.setResultType === 'failed'
									? m.training_sessions_set_failed_title()
									: m.training_sessions_set_incomplete_title()}
						>
							{#if set.setResultType === 'completed'}
								{m.training_sessions_set_success_letter()}
							{:else if set.setResultType === 'failed'}
								{m.training_sessions_set_failed_letter()}
							{:else}
								{m.training_sessions_set_incomplete_letter()}
							{/if}
						</button>
					{/snippet}
					<button
						class="btn ghost text-left text-nowrap"
						class:active={set.setResultType === 'completed'}
						onclick={createOnSetResultType('completed')}
						>{m.training_sessions_set_success_title()}</button
					>
					<button
						class="btn ghost text-left text-nowrap"
						class:active={set.setResultType === 'failed'}
						onclick={createOnSetResultType('failed')}
						>{m.training_sessions_set_failed_title()}</button
					>
					<button
						class="btn ghost text-left text-nowrap"
						class:active={!set.setResultType}
						onclick={createOnSetResultType(null)}
						>{m.training_sessions_set_incomplete_title()}</button
					>
				</Dropdown>
			</div>
		</div>
	</div>
	<div
		class="mt-1 flex flex-grow flex-row items-center justify-start"
		class:hidden={setSeries.setSeriesType === 'standard'}
	>
		{#if setExerciseTranslation}
			<div class="badge sm light">{setExerciseTranslation.name}</div>
		{/if}
	</div>
	{#if active && set.setResultType}
		<div class="mt-2 flex flex-col">
			<!-- svelte-ignore a11y_autofocus -->
			<textarea
				bind:this={notesElement}
				placeholder={m.training_sessions_set_notes_placeholder()}
				value={setNoteTranslation?.note ?? ''}
				maxlength="255"
				oninput={debouncedOnNoteUpdate}
			></textarea>
		</div>
	{/if}
</div>

<Modal bind:open={openDeleteSet}>
	{#snippet title()}
		<h5>{m.training_sessions_set_delete_title()}</h5>
	{/snippet}
	<p>{m.training_sessions_set_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteSet}>
			{m.training_sessions_set_delete_submit()}
		</button>
	</div>
</Modal>
