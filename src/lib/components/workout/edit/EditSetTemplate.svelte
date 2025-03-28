<svelte:options immutable />

<script lang="ts" context="module">
	export type SetTemplateParams = ExerciseSetInputParams & {
		id?: number;
		localId: string;
		exerciseId: number;
		exercise: Exercise;
		setType: SetType;
	};
</script>

<script lang="ts">
	import { SetType, UnitSystem, type Exercise } from '$lib/openapi/duckduckfit';
	import { createEventDispatcher } from 'svelte';
	import X from 'lucide-svelte/icons/x';
	import Grip from 'lucide-svelte/icons/grip';
	import ExerciseSetInput, { type ExerciseSetInputParams } from '../ExerciseSetInput.svelte';
	import { m } from '$lib/paraglide/messages';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '../SetType.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let position: number;
	export let setTemplate: SetTemplateParams;
	export let showExercise = false;
	export let showDelete = true;
	export let canMove = true;
	export let valid: boolean | undefined = undefined;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
	export let isDragging = false;
	export let isDraggingOver = false;
	export let onDragStart: (e: DragEvent) => void;
	export let onDragEnd: (e: DragEvent) => void;
	export let onDragLeave: (e: DragEvent) => void;
	export let onDragOver: (e: DragEvent) => void;

	let draggable = false;

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	async function onDeleteInternal() {
		openDelete = false;
		dispatch('delete', setTemplate);
	}
	let openDelete = false;
	function onOpenDelete() {
		openDelete = true;
	}

	const dispatch = createEventDispatcher<{
		input: SetTemplateParams;
		delete: SetTemplateParams;
		valid: boolean;
	}>();

	function onInput(event: CustomEvent<ExerciseSetInputParams>) {
		dispatch('input', { ...setTemplate, ...event.detail });
	}
	function onValid(event: CustomEvent<boolean>) {
		dispatch('valid', event.detail);
	}

	let setTypeDropdownOpen = false;
	function createOnSetType(setType: SetType) {
		return () => {
			setTemplate = { ...setTemplate, setType };
			setTypeDropdownOpen = false;
			dispatch('input', setTemplate);
		};
	}
</script>

<div
	class="mb-2 flex flex-grow flex-row"
	role="listitem"
	{draggable}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragleave={onDragLeave}
	on:dragover={onDragOver}
>
	<div class="me-1 flex flex-shrink flex-col items-center justify-center">
		{#if canMove}
			<button
				class="btn icon secondary mb-1 cursor-grab"
				class:cursor-grabbing={isDragging}
				on:pointerdown={onDraggable}
				on:pointerup={onNotDraggable}
			>
				<div class="h-4 w-4"><Grip size="1rem" /></div>
			</button>
		{/if}
		<Dropdown position="top-left" anchorPosition="bottom-left" bind:open={setTypeDropdownOpen}>
			<SetTypeComponent slot="button" setType={setTemplate.setType} {position} />
			<button
				class="btn ghost text-nowrap text-left"
				class:active={setTemplate.setType === 'working'}
				on:click={createOnSetType('working')}>{m.workouts.workingSetTitle()}</button
			>
			<button
				class="btn ghost text-nowrap text-left"
				class:active={setTemplate.setType === 'warmup'}
				on:click={createOnSetType('warmup')}>{m.workouts.warmupTitle()}</button
			>
			<!-- <button
				class="btn ghost text-nowrap text-left"
				class:active={setTemplate.setType === "backoff"}
				on:click={createOnSetType("backoff")}>{m.workouts.backoffTitle()}</button
			> -->
		</Dropdown>
	</div>
	<div
		class="bg-swamp-green-300 me-1 flex flex-grow flex-col rounded-lg p-1 text-black"
		class:!bg-swamp-green-600={isDraggingOver}
	>
		<div class="flex flex-grow flex-row flex-wrap items-center justify-between">
			<ExerciseSetInput
				exercise={setTemplate.exercise}
				setInput={setTemplate}
				{unitSystem}
				bind:valid
				on:valid={onValid}
				on:input={onInput}
			/>
		</div>
		<div
			class="mt-1 flex flex-grow flex-row items-center justify-start"
			class:hidden={!showExercise}
		>
			<div class="badge sm light">{setTemplate.exercise.translation.name}</div>
		</div>
	</div>
	{#if showDelete}
		<div class="flex flex-col items-center justify-center">
			<button class="btn danger icon" on:click={onOpenDelete}>
				<X size="1rem" />
			</button>
		</div>
	{/if}
</div>

<Modal bind:open={openDelete}>
	<h5 slot="title">{m.workouts.set.delete.title()}</h5>
	<p>{m.workouts.set.delete.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" on:click={onDeleteInternal}>
			{m.workouts.set.delete.submit()}
		</button>
	</div>
</Modal>
