<script lang="ts" module>
	export type EditSetTemplateProps = Omit<SortableItemProps<SetTemplate>, 'item' | 'index'> & {
		id: string;
		position: number;
		setTemplate: SetTemplate;
		showExercise?: boolean;
		showDelete?: boolean;
		canMove?: boolean;
		valid?: boolean;
		exercise: Exercise;
		oninput(params: SetTemplate): void;
		ondelete(params: SetTemplate): void;
		onvalid(valid: boolean): void;
	};
</script>

<script lang="ts">
	import X from 'lucide-svelte/icons/x';
	import Grip from 'lucide-svelte/icons/grip';
	import ExerciseSetInput, { type ExerciseSetInputParams } from '../ExerciseSetInput.svelte';
	import { m } from '$lib/paraglide/messages';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '../SetType.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SortableItemProps } from '$lib/components/Sortable.svelte';
	import type { SetTemplate, SetType } from '$lib/state/workoutTemplates.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { findTranslation } from '$lib/util';

	let {
		position,
		setTemplate,
		exercise,
		showExercise = $bindable(false),
		showDelete = $bindable(true),
		canMove = true,
		valid = $bindable(false),
		isDragging,
		isDraggingOver,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver,
		oninput,
		ondelete,
		onvalid
	}: EditSetTemplateProps = $props();

	let draggable = $state(false);
	let translation = $derived(findTranslation(exercise.translations));

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	async function onDeleteInternal() {
		openDelete = false;
		ondelete(setTemplate);
	}
	let openDelete = $state(false);
	function onOpenDelete() {
		openDelete = true;
	}

	function onInput(params: ExerciseSetInputParams) {
		oninput({ ...setTemplate, ...params });
	}

	let setTypeDropdownOpen = $state(false);
	function createOnSetType(setType: SetType) {
		return () => {
			setTemplate = { ...setTemplate, setType };
			setTypeDropdownOpen = false;
			oninput(setTemplate);
		};
	}
</script>

<div
	class="mb-2 flex flex-grow flex-row"
	role="listitem"
	{draggable}
	ondragstart={onDragStart}
	ondragend={onDragEnd}
	ondragleave={onDragLeave}
	ondragover={onDragOver}
>
	<div class="me-1 flex flex-shrink flex-col items-center justify-center">
		{#if canMove}
			<button
				class="btn icon secondary mb-1 cursor-grab"
				class:cursor-grabbing={isDragging}
				onpointerdown={onDraggable}
				onpointerup={onNotDraggable}
			>
				<div class="h-4 w-4"><Grip size="1rem" /></div>
			</button>
		{/if}
		<Dropdown position="top-left" anchorPosition="bottom-left" bind:open={setTypeDropdownOpen}>
			{#snippet button()}
				<SetTypeComponent setType={setTemplate.setType} {position} />
			{/snippet}
			<button
				class="btn ghost text-left text-nowrap"
				class:active={setTemplate.setType === 'working'}
				onclick={createOnSetType('working')}>{m.workouts_working_set_title()}</button
			>
			<button
				class="btn ghost text-left text-nowrap"
				class:active={setTemplate.setType === 'warmup'}
				onclick={createOnSetType('warmup')}>{m.workouts_warmup_title()}</button
			>
			<button
				class="btn ghost text-left text-nowrap"
				class:active={setTemplate.setType === 'backoff'}
				onclick={createOnSetType('backoff')}>{m.workouts_backoff_title()}</button
			>
		</Dropdown>
	</div>
	<div
		class="bg-swamp-green-300 me-1 flex flex-grow flex-col rounded-lg p-1"
		class:!bg-swamp-green-600={isDraggingOver}
	>
		<div class="flex flex-grow flex-row flex-wrap items-center justify-between">
			<ExerciseSetInput {exercise} setInput={setTemplate} bind:valid {onvalid} oninput={onInput} />
		</div>
		<div
			class="mt-1 flex flex-grow flex-row items-center justify-start"
			class:hidden={!showExercise}
		>
			<div class="badge sm light">{translation?.name}</div>
		</div>
	</div>
	{#if showDelete}
		<div class="flex flex-col items-center justify-center">
			<button class="btn danger icon" onclick={onOpenDelete}>
				<X size="1rem" />
			</button>
		</div>
	{/if}
</div>

<Modal bind:open={openDelete}>
	{#snippet title()}
		<h5>{m.workouts_set_delete_title()}</h5>
	{/snippet}
	<p>{m.workouts_set_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.workouts_set_delete_submit()}
		</button>
	</div>
</Modal>
