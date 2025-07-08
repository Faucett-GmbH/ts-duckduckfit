<svelte:options immutable />

<script lang="ts">
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import Grip from 'lucide-svelte/icons/grip';
	import { debounce } from '@aicacia/debounce';
	import Dropdown from '../Dropdown.svelte';
	import SetAmounts from './SetAmounts.svelte';
	import SetTypeComponent from './SetType.svelte';
	import WorkoutSetInput, { type WorkoutSetInputParams } from './WorkoutSetInput.svelte';
	import type { Writable } from 'svelte/store';
	import Modal from '../Modal.svelte';
	import { getRealSetPosition } from './util';

	interface Props {
		setGroup: SetGroup;
		set: AttemptedSet;
		index: number;
		activeSetDuration: Writable<number>;
		isDragging?: boolean;
		isDraggingOver?: boolean;
		onDragStart: (e: DragEvent) => void;
		onDragEnd: (e: DragEvent) => void;
		onDragLeave: (e: DragEvent) => void;
		onDragOver: (e: DragEvent) => void;
		active?: boolean;
		unitSystem?: UnitSystem;
		onSetActive: () => void;
		update: (updateFn: (set: AttemptedSet) => AttemptedSet, debounce?: boolean) => void;
		copySet: () => Promise<void>;
		deleteSet: () => Promise<void>;
	}

	let {
		setGroup,
		set,
		index,
		activeSetDuration,
		isDragging = false,
		isDraggingOver = false,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver,
		active = false,
		unitSystem = UnitSystem.MetricUnitSystem,
		onSetActive,
		update,
		copySet,
		deleteSet
	}: Props = $props();

	let draggable = $state(false);

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
		activeSetDuration.set(0);
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
					activeSetDuration.set(0);
				} else {
					newSet.completedAt = new Date();
					if (active) {
						newSet.durationInSeconds = $activeSetDuration;
						newSet.attemptedTimeInSeconds = $activeSetDuration;
					}
				}
				return newSet;
			});
			statusOpen = false;
			menuOpen;
		};
	}
	function onWorkoutSetInput(e: CustomEvent<WorkoutSetInputParams>) {
		update((set) => ({ ...set, ...e.detail }));
	}
	let notesElement: HTMLTextAreaElement = $state();
	function onNoteUpdate() {
		update((set) => ({ ...set, notes: (notesElement.value || '').trim() }), true);
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
					>{$LL.workouts.set.duplicate()}</button
				>
				{#if active}
					<button class="btn ghost text-nowrap text-left" onclick={onResetTimer}
						>{$LL.workouts.set.resetTimer()}</button
					>
				{/if}
				<hr class="my-1" />
				<button class="btn ghost text-nowrap text-left" onclick={onOpenDeleteSet}
					>{$LL.workouts.set.delete.title()}</button
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
					class:active={set.setType === SetType.WorkingSetType}
					onclick={createOnSetType(SetType.WorkingSetType)}>{$LL.workouts.workingSetTitle()}</button
				>
				<button
					class="btn ghost text-nowrap text-left"
					class:active={set.setType === SetType.WarmUpSetType}
					onclick={createOnSetType(SetType.WarmUpSetType)}>{$LL.workouts.warmupTitle()}</button
				>
				<!-- <button
            class="btn ghost text-nowrap text-left"
            class:active={set.setType === SetType.BackoffSetType}
            on:click={createOnSetType(SetType.BackoffSetType)}>{$LL.workouts.backoffTitle()}</button
          > -->
			</Dropdown>
		</div>
		<div class="flex flex-grow flex-row flex-wrap items-center justify-end">
			<WorkoutSetInput
				setInput={set}
				exercise={set.exercise}
				{unitSystem}
				on:input={onWorkoutSetInput}
			/>
			<div class="flex flex-col justify-center">
				<Dropdown position="top-right" anchorPosition="bottom-right" bind:open={statusOpen}>
					{#snippet button()}
						<button
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
					{/snippet}
					<button
						class="btn ghost text-nowrap text-left"
						class:active={set.status === SetStatusType.SuccessSetStatusType}
						onclick={createOnStatus(SetStatusType.SuccessSetStatusType)}
						>{$LL.workouts.set.successTitle()}</button
					>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={set.status === SetStatusType.FailedSetStatusType}
						onclick={createOnStatus(SetStatusType.FailedSetStatusType)}
						>{$LL.workouts.set.failedTitle()}</button
					>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={!set.status}
						onclick={createOnStatus(null)}>{$LL.workouts.set.incompleteTitle()}</button
					>
				</Dropdown>
			</div>
		</div>
	</div>
	<div
		class="mt-1 flex flex-grow flex-row items-center justify-start"
		class:hidden={setGroup.setGroupType === 'straight'}
	>
		<div class="badge sm light">{set.exercise.translation.name}</div>
	</div>
	{#if active && set.status}
		<div class="mt-2 flex flex-col">
			<!-- svelte-ignore a11y_autofocus -->
			<textarea
				bind:this={notesElement}
				placeholder={$LL.workouts.set.notesPlaceholder()}
				value={set.notes || ''}
				maxlength="255"
				oninput={debouncedOnNoteUpdate}
			></textarea>
		</div>
	{/if}
</div>

<Modal bind:open={openDeleteSet}>
	{#snippet title()}
		<h5>{$LL.workouts.set.delete.title()}</h5>
	{/snippet}
	<p>{$LL.workouts.set.delete.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteSet}>
			{$LL.workouts.set.delete.submit()}
		</button>
	</div>
</Modal>
