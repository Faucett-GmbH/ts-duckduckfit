<svelte:options immutable />

<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';
	import type { Exercise, PaginationExercise } from '$lib/openapi/duckduckfit';
	import X from 'lucide-svelte/icons/x';
	import Plus from 'lucide-svelte/icons/plus';
	import Modal from '../Modal.svelte';
	import { exerciseApi } from '$lib/openapi';
	import { handleError } from '$lib/errors';
	import { debounce } from '@aicacia/debounce';
	import { createEventDispatcher, onMount } from 'svelte';
	import Sortable from '../Sortable.svelte';
	import { getId } from '$lib/util';
	import ExerciseSelectorItem from './ExerciseSelectorItem.svelte';
	import { createExercisesById } from './util';

	export let id: string | undefined = undefined;
	export let exercises: Exercise[] = [];
	export let open = false;

	const dispatch = createEventDispatcher<{ input: Exercise[] }>();

	let search = '';
	let limit = 20;
	let offset = 0;
	let results: PaginationExercise = { items: [], hasMore: false };
	$: exercisesById = createExercisesById(exercises);

	function onOpen() {
		open = true;
	}
	function onClose() {
		open = false;
	}
	let inputElement: HTMLInputElement;
	$: if (open && inputElement) {
		inputElement.focus();
	}
	async function onSearch() {
		try {
			results = await exerciseApi.exercises(undefined, limit, offset, search);
		} catch (e) {
			await handleError(e);
		}
	}

	const debouncedOnSearch = debounce(onSearch, 300);
	function onDelete(exercise: Exercise) {
		const index = exercises.findIndex((e) => e.id === exercise.id);
		if (index !== -1) {
			const newExercises = exercises.slice();
			newExercises.splice(index, 1);
			dispatch('input', newExercises);
			exercises = newExercises;
		}
	}

	function createOnAdd(exercise: Exercise) {
		return () => {
			const index = exercises.findIndex((e) => e.id === exercise.id);
			if (index === -1) {
				const newExercises = exercises.slice();
				newExercises.push(exercise);
				dispatch('input', newExercises);
				exercises = newExercises;
			}
		};
	}
	function createOnRemove(exercise: Exercise) {
		return () => {
			const index = exercises.findIndex((e) => e.id === exercise.id);
			if (index !== -1) {
				const newExercises = exercises.slice();
				newExercises.splice(index, 1);
				dispatch('input', newExercises);
				exercises = newExercises;
			}
		};
	}
	function onMoveExercise(fromIndex: number, toIndex: number) {
		const exercise = exercises[fromIndex];
		const newExercises = exercises.slice();
		newExercises.splice(fromIndex, 1);
		newExercises.splice(toIndex, 0, exercise);
		dispatch('input', newExercises);
		exercises = newExercises;
	}

	onMount(() => {
		onSearch();
	});
</script>

<div {id} class="exercise-selector flex flex-row flex-wrap" on:click|stopPropagation={onOpen}>
	<Sortable
		id={`${id}-exercises`}
		items={exercises}
		getKey={getId}
		onMove={onMoveExercise}
		let:isDragging
		let:isDraggingOver
		let:index
		let:item
		let:onDragStart
		let:onDragEnd
		let:onDragLeave
		let:onDragOver
	>
		<ExerciseSelectorItem
			exercise={item}
			canDrag={exercises.length > 1}
			{onDelete}
			{isDragging}
			{isDraggingOver}
			{onDragStart}
			{onDragEnd}
			{onDragLeave}
			{onDragOver}
		/>
	</Sortable>
	{#if exercises.length === 0}
		<p class="m-0 mt-1 cursor-text select-none opacity-10">
			{$LL.exercises.selector.searchPlaceholder()}
		</p>
	{/if}
</div>

<Modal bind:open>
	<h5 slot="title">
		<span>{$LL.exercises.selector.addExercises()}</span>
		<span>{$LL.exercises.selector.selectedExercises(exercises.length)}</span>
	</h5>
	<div class="flex flex-grow flex-col overflow-hidden">
		<input
			type="text"
			class="w-100"
			placeholder={$LL.exercises.searchPlaceholder()}
			bind:this={inputElement}
			bind:value={search}
			on:input|stopPropagation={debouncedOnSearch}
		/>
		<ul class="h-64 list-none overflow-y-auto overflow-x-hidden p-0">
			{#each results.items as exercise, index (exercise.id)}
				{@const selectedExercise = exercisesById[exercise.id]}
				<li class="flex flex-row items-center justify-between py-2 pe-1 ps-2">
					<span>{exercise.translation.name}</span>
					{#if selectedExercise}
						<button class="btn sm danger icon" on:click|stopPropagation={createOnRemove(exercise)}>
							<X size="1rem" />
						</button>
					{:else}
						<button class="btn sm success icon" on:click|stopPropagation={createOnAdd(exercise)}>
							<Plus size="1rem" />
						</button>
					{/if}
				</li>
				{#if index !== results.items.length - 1}
					<hr />
				{/if}
			{/each}
		</ul>
		<div class="mt-2 flex flex-row justify-end">
			<button class="btn success" on:click|stopPropagation={onClose}>
				{$LL.exercises.selector.finish()}
			</button>
		</div>
	</div>
</Modal>

<style lang="postcss">
	.exercise-selector {
		@apply cursor-text rounded-lg border border-gray-600 bg-gray-50 px-3 pb-1 pt-0 text-sm text-gray-950 placeholder-gray-600 outline-none focus:outline-none dark:bg-gray-900 dark:text-white;
	}
</style>
