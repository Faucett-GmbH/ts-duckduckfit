<script lang="ts" module>
	export interface ExerciseSelectorProps {
		id?: string;
		exercises?: Exercise[];
		open?: boolean;
		oninput(exercises: Exercise[]): void;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import X from 'lucide-svelte/icons/x';
	import Plus from 'lucide-svelte/icons/plus';
	import Modal from '../Modal.svelte';
	import { handleError } from '$lib/error';
	import { debounce } from '@aicacia/debounce';
	import { onMount } from 'svelte';
	import Sortable from '../Sortable.svelte';
	import ExerciseSelectorItem from './ExerciseSelectorItem.svelte';
	import { createExercisesByGuid } from './util';
	import { findTranslation, getGuid } from '$lib/util';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { getExercises } from '$lib/state/exercises.svelte';

	let {
		id = undefined,
		exercises = $bindable([]),
		open = $bindable(false),
		oninput
	}: ExerciseSelectorProps = $props();

	let search = $state('');
	let limit = $state(20);
	let offset = $state(0);
	let results = $state<Exercise[]>([]);
	let exercisesById = $derived(createExercisesByGuid(exercises));

	function onOpen(e: Event) {
		e.stopPropagation();
		open = true;
	}
	function onClose(e: Event) {
		e.stopPropagation();
		open = false;
	}
	let inputElement: HTMLInputElement;
	$effect(() => {
		if (open && inputElement) {
			inputElement.focus();
		}
	});
	async function onSearch() {
		try {
			const exercises = await getExercises(offset, limit, search);
			const newResults: Exercise[] = [];
			for (const [_documentId, exercise] of exercises) {
				newResults.push(exercise);
			}
			results = newResults;
		} catch (e) {
			await handleError(e);
		}
	}
	const debouncedOnSearch = debounce(onSearch, 300);
	function onSearchListener(e: Event) {
		e.stopPropagation();
		debouncedOnSearch();
	}
	function onDelete(exercise: Exercise) {
		const index = exercises.findIndex((e) => e.guid === exercise.guid);
		if (index !== -1) {
			const newExercises = exercises.slice();
			newExercises.splice(index, 1);
			oninput(newExercises);
			exercises = newExercises;
		}
	}

	function createOnAdd(exercise: Exercise) {
		return (e: Event) => {
			e.stopPropagation();
			const index = exercises.findIndex((e) => e.guid === exercise.guid);
			if (index === -1) {
				const newExercises = exercises.slice();
				newExercises.push(exercise);
				oninput(newExercises);
				exercises = newExercises;
			}
		};
	}
	function createOnRemove(exercise: Exercise) {
		return (e: Event) => {
			e.stopPropagation();
			const index = exercises.findIndex((e) => e.guid === exercise.guid);
			if (index !== -1) {
				const newExercises = exercises.slice();
				newExercises.splice(index, 1);
				oninput(newExercises);
				exercises = newExercises;
			}
		};
	}
	function onMoveExercise(fromIndex: number, toIndex: number) {
		const exercise = exercises[fromIndex];
		const newExercises = exercises.slice();
		newExercises.splice(fromIndex, 1);
		newExercises.splice(toIndex, 0, exercise);
		oninput(newExercises);
		exercises = newExercises;
	}

	onMount(onSearch);
</script>

<div
	{id}
	class="exercise-selector flex flex-row flex-wrap"
	role="button"
	tabindex="-1"
	onkeypress={onOpen}
	onclick={onOpen}
>
	<Sortable id={`${id}-exercises`} items={exercises} getKey={getGuid} onMove={onMoveExercise}>
		{#snippet children({ item, ...props })}
			<ExerciseSelectorItem exercise={item} canDrag={exercises.length > 1} {onDelete} {...props} />
		{/snippet}
	</Sortable>
	{#if exercises.length === 0}
		<p class="m-0 mt-1 cursor-text select-none opacity-10">
			{m.exercises_selector_search_placeholder()}
		</p>
	{/if}
</div>

<Modal bind:open>
	{#snippet title()}
		<h5>
			<span>{m.exercises_selector_add_exercises()}</span>
			<span>{m.exercises_selector_selected_exercises({ count: exercises.length })}</span>
		</h5>
	{/snippet}
	<div class="flex flex-grow flex-col overflow-hidden">
		<input
			type="text"
			class="w-full"
			placeholder={m.exercises_selector_search_placeholder()}
			bind:this={inputElement}
			bind:value={search}
			oninput={onSearchListener}
		/>
		<ul class="h-64 list-none overflow-y-auto overflow-x-hidden p-0">
			{#each results as exercise, index (exercise.guid)}
				{@const selectedExercise = exercisesById[exercise.guid]}
				{@const translation = findTranslation(exercise.translations)}
				<li class="flex flex-row items-center justify-between py-2 pe-1 ps-2">
					<span>{translation?.name}</span>
					{#if selectedExercise}
						<button class="btn sm danger icon" onclick={createOnRemove(exercise)}>
							<X size="1rem" />
						</button>
					{:else}
						<button class="btn sm success icon" onclick={createOnAdd(exercise)}>
							<Plus size="1rem" />
						</button>
					{/if}
				</li>
				{#if index !== results.length - 1}
					<hr />
				{/if}
			{/each}
		</ul>
		<div class="mt-2 flex flex-row justify-end">
			<button class="btn success" onclick={onClose}>
				{m.exercises_selector_finish()}
			</button>
		</div>
	</div>
</Modal>

<style lang="postcss">
	@reference "tailwindcss";

	.exercise-selector {
		@apply cursor-text rounded-lg border border-gray-600 bg-gray-50 px-3 pb-1 pt-0 text-sm text-gray-950 placeholder-gray-600 outline-none focus:outline-none dark:bg-gray-900 dark:text-white;
	}
</style>
