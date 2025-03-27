<svelte:options immutable />

<script lang="ts">
	import type { Exercise } from '$lib/openapi/duckduckfit';
	import X from 'lucide-svelte/icons/x';
	import Grip from 'lucide-svelte/icons/grip';
	import Modal from '../Modal.svelte';
	import LL from '$lib/i18n/i18n-svelte';

	export let canDrag = false;
	export let exercise: Exercise;
	export let onDelete: (exercise: Exercise) => void;
	export let isDragging = false;
	export let isDraggingOver = false;
	export let onDragStart: (e: DragEvent) => void;
	export let onDragEnd: (e: DragEvent) => void;
	export let onDragLeave: (e: DragEvent) => void;
	export let onDragOver: (e: DragEvent) => void;

	function onDeleteInternal() {
		return onDelete(exercise);
	}
	let openDelete = false;
	function onOpenDelete() {
		openDelete = true;
	}

	let draggable = false;

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
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragleave={onDragLeave}
	on:dragover={onDragOver}
>
	{#if canDrag}
		<button
			class="btn icon me-2 cursor-grab"
			class:cursor-grabbing={isDragging}
			on:pointerdown={onDraggable}
			on:pointerup={onNotDraggable}
		>
			<div class="h-4 w-4"><Grip size="1rem" /></div>
		</button>
	{/if}
	<span class="me-2 text-xs">{exercise.translation.name}</span>
	<button class="btn sm danger icon" on:click|stopPropagation={onOpenDelete}>
		<X size="1rem" />
	</button>
</div>

<Modal bind:open={openDelete}>
	<h5 slot="title">{$LL.exercises.selector.remove.title()}</h5>
	<p>{$LL.exercises.selector.remove.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" on:click={onDeleteInternal}>
			{$LL.exercises.selector.remove.submit()}
		</button>
	</div>
</Modal>
