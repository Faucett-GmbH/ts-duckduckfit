<svelte:options immutable />

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import Grip from 'lucide-svelte/icons/grip';
	import {
		SetGroupType,
		SetStatusType,
		SetType,
		UnitSystem,
		type AttemptedSet,
		type SetGroup
	} from '$lib/openapi/duckduckfit';
	import { debounce } from '@aicacia/debounce';
	import Dropdown from '../Dropdown.svelte';
	import SetAmounts from './SetAmounts.svelte';
	import SetTypeComponent from './SetType.svelte';
	import WorkoutSetInput, { type WorkoutSetInputParams } from './WorkoutSetInput.svelte';
	import type { Writable } from 'svelte/store';
	import Modal from '../Modal.svelte';
	import { getRealSetPosition } from './util';

	export let setGroup: SetGroup;
	export let set: AttemptedSet;
	export let index: number;
	export let activeSetDuration: Writable<number>;
	export let isDragging = false;
	export let isDraggingOver = false;
	export let onDragStart: (e: DragEvent) => void;
	export let onDragEnd: (e: DragEvent) => void;
	export let onDragLeave: (e: DragEvent) => void;
	export let onDragOver: (e: DragEvent) => void;
	export let active = false;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
	export let onSetActive: () => void;
	export let update: (updateFn: (set: AttemptedSet) => AttemptedSet, debounce?: boolean) => void;
	export let copySet: () => Promise<void>;
	export let deleteSet: () => Promise<void>;

	let draggable = false;

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	$: position = getRealSetPosition(setGroup.sets, set, index);

	let menuOpen = false;
	function onCopySet() {
		menuOpen = false;
		return copySet();
	}
	function onResetTimer() {
		menuOpen = false;
		activeSetDuration.set(0);
	}
	let openDeleteSet = false;
	function onOpenDeleteSet() {
		openDeleteSet = true;
		menuOpen = false;
	}
	function onDeleteSet() {
		openDeleteSet = false;
		return deleteSet();
	}

	let setTypeDropdownOpen = false;
	function createOnSetType(setType: SetType) {
		return () => {
			update((set) => ({ ...set, setType }));
			setTypeDropdownOpen = false;
		};
	}

	let statusOpen = false;
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
	let notesElement: HTMLTextAreaElement;
	function onNoteUpdate() {
		update((set) => ({ ...set, notes: (notesElement.value || '').trim() }), true);
	}
	const debouncedOnNoteUpdate = debounce(onNoteUpdate, 300);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	class="border-pear-300 mb-2 flex flex-grow flex-col rounded-lg border-2 p-1 text-black"
	class:bg-swamp-green-200={!active}
	class:bg-swamp-green-300={active}
	class:!bg-swamp-green-600={isDraggingOver}
	class:border-transparent={!active}
	class:border-pear-300={active}
	role="listitem"
	{draggable}
	on:click={onSetActive}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragleave={onDragLeave}
	on:dragover={onDragOver}
>
	<div class="flex flex-grow flex-row">
		<div class="flex flex-shrink flex-row items-center justify-center">
			<button
				class="btn icon secondary cursor-grab"
				class:cursor-grabbing={isDragging}
				on:pointerdown={onDraggable}
				on:pointerup={onNotDraggable}
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
				<button class="btn ghost text-nowrap text-left" on:click={onCopySet}
					>{m.workouts.set.duplicate()}</button
				>
				{#if active}
					<button class="btn ghost text-nowrap text-left" on:click={onResetTimer}
						>{m.workouts.set.resetTimer()}</button
					>
				{/if}
				<hr class="my-1" />
				<button class="btn ghost text-nowrap text-left" on:click={onOpenDeleteSet}
					>{m.workouts.set.delete.title()}</button
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
					on:click={createOnSetType('working')}>{m.workouts.workingSetTitle()}</button
				>
				<button
					class="btn ghost text-nowrap text-left"
					class:active={set.setType === 'warmup'}
					on:click={createOnSetType('warmup')}>{m.workouts.warmupTitle()}</button
				>
				<!-- <button
            class="btn ghost text-nowrap text-left"
            class:active={set.setType === "backoff"}
            on:click={createOnSetType("backoff")}>{m.workouts.backoffTitle()}</button
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
					<button
						slot="button"
						class="btn icon m-w-6 m-h-6 font-h flex h-6 w-6 flex-row items-center justify-center leading-3"
						class:light={!set.status}
						class:success={set.status === SetStatusType.SuccessSetStatusType}
						class:danger={set.status === SetStatusType.FailedSetStatusType}
						title={set.status === SetStatusType.SuccessSetStatusType
							? m.workouts.set.successTitle()
							: set.status === SetStatusType.FailedSetStatusType
								? m.workouts.set.failedTitle()
								: ''}
					>
						{#if set.status === SetStatusType.SuccessSetStatusType}
							{m.workouts.set.successLetter()}
						{:else if set.status === SetStatusType.FailedSetStatusType}
							{m.workouts.set.failedLetter()}
						{/if}
					</button>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={set.status === SetStatusType.SuccessSetStatusType}
						on:click={createOnStatus(SetStatusType.SuccessSetStatusType)}
						>{m.workouts.set.successTitle()}</button
					>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={set.status === SetStatusType.FailedSetStatusType}
						on:click={createOnStatus(SetStatusType.FailedSetStatusType)}
						>{m.workouts.set.failedTitle()}</button
					>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={!set.status}
						on:click={createOnStatus(null)}>{m.workouts.set.incompleteTitle()}</button
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
			<!-- svelte-ignore a11y-autofocus -->
			<textarea
				bind:this={notesElement}
				placeholder={m.workouts.set.notesPlaceholder()}
				value={set.notes || ''}
				maxlength="255"
				on:input={debouncedOnNoteUpdate}
			></textarea>
		</div>
	{/if}
</div>

<Modal bind:open={openDeleteSet}>
	<h5 slot="title">{m.workouts.set.delete.title()}</h5>
	<p>{m.workouts.set.delete.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" on:click={onDeleteSet}>
			{m.workouts.set.delete.submit()}
		</button>
	</div>
</Modal>
