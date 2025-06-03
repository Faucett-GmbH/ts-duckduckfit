<script lang="ts" module>
	export type ExerciseSelectorItemProps = Omit<SortableItemProps<Exercise>, 'item'> & {
		canDrag: boolean;
		exercise: Exercise;
		onDelete: (exercise: Exercise) => void;
	};
</script>

<script lang="ts">
	import X from 'lucide-svelte/icons/x';
	import Grip from 'lucide-svelte/icons/grip';
	import Modal from '../Modal.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { SortableItemProps } from '../Sortable.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { findTranslation } from '$lib/state/exercises.svelte';

	let {
		canDrag,
		exercise,
		onDelete,
		isDragging,
		isDraggingOver,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver
	}: ExerciseSelectorItemProps = $props();

	let translation = $derived(findTranslation(exercise));

	function onDeleteInternal(e: Event) {
		e.stopPropagation();
		return onDelete(exercise);
	}
	let openDelete = $state(false);
	function onOpenDelete(e: Event) {
		e.stopPropagation();
		openDelete = true;
	}

	let draggable = $state(false);

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}
</script>

<div
	class="badge lg success me-1 mt-1 cursor-pointer border-2"
	class:!border-pear-300={isDraggingOver}
	role="listitem"
	{draggable}
	ondragstart={onDragStart}
	ondragend={onDragEnd}
	ondragleave={onDragLeave}
	ondragover={onDragOver}
>
	{#if canDrag}
		<button
			class="btn icon me-2 cursor-grab"
			class:cursor-grabbing={isDragging}
			onpointerdown={onDraggable}
			onpointerup={onNotDraggable}
		>
			<div class="h-4 w-4"><Grip size="1rem" /></div>
		</button>
	{/if}
	<span class="me-2 text-xs">{translation?.name}</span>
	<button class="btn sm danger icon" onclick={onOpenDelete}>
		<X size="1rem" />
	</button>
</div>

<Modal bind:open={openDelete}>
	{#snippet title()}
		<h5>{m.exercises_selector_remove_title()}</h5>
	{/snippet}
	<p>{m.exercises_selector_remove_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.exercises_selector_remove_submit()}
		</button>
	</div>
</Modal>
