<script lang="ts" module>
	let draggingId: string | undefined;

	export interface SortableItemProps<T> {
		item: T;
		index: number;
		isDragging: boolean;
		isDraggingOver: boolean;
		onDragStart: EventHandler<DragEvent>;
		onDragEnd: EventHandler<DragEvent>;
		onDragLeave: EventHandler<DragEvent>;
		onDragOver: EventHandler<DragEvent>;
	}

	export interface SortableProps<T> {
		id?: string;
		items: T[];
		children: Snippet<[props: SortableItemProps<T>]>;
		onMove(from: number, to: number): void;
		getKey(item: T, index: number): string | number;
	}
</script>

<script lang="ts" generics="T">
	import { unsafeId } from '../util/unsafeId';
	import type { Snippet } from 'svelte';
	import type { EventHandler } from 'svelte/elements';

	let { id = unsafeId(), items, children, getKey, onMove }: SortableProps<T> = $props();

	let dragLeaveTimeoutId: ReturnType<typeof setTimeout> | undefined;
	let draggingIndex: number = $state(-1);
	let draggingOverIndex: number = $state(-1);
	function onDragStartInternal(e: DragEvent, currentId: string, index: number) {
		if (draggingId) {
			return;
		}
		draggingId = currentId;
		draggingOverIndex = -1;
		draggingIndex = index;
	}
	function onDragEndInternal(e: DragEvent, currentId: string) {
		if (currentId !== draggingId || draggingIndex === -1) {
			return;
		}
		if (draggingOverIndex !== -1) {
			onMove(draggingIndex, draggingOverIndex);
		}
		draggingIndex = draggingOverIndex = -1;
		draggingId = undefined;
	}
	function onDragLeaveInternal(e: DragEvent, currentId: string, index: number) {
		if (currentId !== draggingId || draggingIndex === index) {
			return;
		}
		if (draggingOverIndex === index) {
			clearTimeout(dragLeaveTimeoutId);
			dragLeaveTimeoutId = setTimeout(() => {
				if (draggingOverIndex === index) {
					draggingOverIndex = -1;
				}
				dragLeaveTimeoutId = undefined;
			}, 600);
		}
	}
	function onDragOverInternal(e: DragEvent, currentId: string, index: number) {
		if (currentId !== draggingId || draggingIndex === index) {
			return;
		}
		draggingOverIndex = index;
	}

	function createOnDragStart(id: string, index: number) {
		return (e: DragEvent) => onDragStartInternal(e, id, index);
	}
	function createOnDragEnd(id: string) {
		return (e: DragEvent) => onDragEndInternal(e, id);
	}
	function createOnDragLeave(id: string, index: number) {
		return (e: DragEvent) => onDragLeaveInternal(e, id, index);
	}
	function createOnDragOver(id: string, index: number) {
		return (e: DragEvent) => onDragOverInternal(e, id, index);
	}
</script>

{#each items as item, index (getKey(item, index))}
	{@const isDragging = draggingIndex === index}
	{@const isDraggingOver = !isDragging && draggingOverIndex === index}
	{@render children({
		item,
		index,
		isDragging,
		isDraggingOver,
		onDragStart: createOnDragStart(id, index),
		onDragEnd: createOnDragEnd(id),
		onDragLeave: createOnDragLeave(id, index),
		onDragOver: createOnDragOver(id, index)
	})}
{/each}
