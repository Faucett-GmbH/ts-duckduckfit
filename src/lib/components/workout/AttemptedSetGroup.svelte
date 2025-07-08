<svelte:options immutable />

<script lang="ts">
	import { run, stopPropagation } from 'svelte/legacy';

	import {
		SetType,
		type AttemptedSet,
		type Exercise,
		type SetGroup,
		type UnitSystem
	} from '$lib/openapi/duckduckfit';
	import AttemptedSetComponent from '$lib/components/workout/AttemptedSet.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Grip from 'lucide-svelte/icons/grip';
	import Plus from 'lucide-svelte/icons/plus';
	import X from 'lucide-svelte/icons/x';
	import { getId, unsafeId } from '$lib/util';
	import Sortable from '../Sortable.svelte';
	import type { Writable } from 'svelte/store';
	import LL from '$lib/i18n/i18n-svelte';
	import Modal from '../Modal.svelte';
	import { getUniqueExercises } from './util';
	import NewSet from './NewSet.svelte';
	import type { SetParams } from './edit/EditSet.svelte';
	import { handleError } from '$lib/error';
	import Spinner from '../Spinner.svelte';
	import SetTypeComponent from './SetType.svelte';
	import type { SetTemplateParams } from './edit/EditSetTemplate.svelte';

	interface Props {
		setGroup: SetGroup;
		setGroupIndex: number;
		activeSetIndex: number;
		activeSetGroupIndex: number;
		unitSystem?: UnitSystem | undefined;
		activeSetDuration: Writable<number>;
		open?: boolean;
		isDragging?: boolean;
		isDraggingOver?: boolean;
		onDragStart: (e: DragEvent) => void;
		onDragEnd: (e: DragEvent) => void;
		onDragLeave: (e: DragEvent) => void;
		onDragOver: (e: DragEvent) => void;
		deleteSetGroup: (groupIndex: number) => Promise<void>;
		createSets: (groupIndex: number, newSets: SetParams[]) => Promise<void>;
		moveSets: (groupIndex: number, fromIndex: number, toIndex: number) => Promise<void>;
		createOnSelectSet: (setGroupIndex: number, setIndex: number) => () => void;
		createUpdate: (
			setGroupIndex: number,
			setIndex: number
		) => (updateFn: (set: AttemptedSet) => AttemptedSet, debounce?: boolean) => void;
		createCopySet: (setGroupIndex: number, setIndex: number) => () => Promise<void>;
		createDeleteSet: (setGroupIndex: number, setIndex: number) => () => Promise<void>;
	}

	let {
		setGroup,
		setGroupIndex,
		activeSetIndex,
		activeSetGroupIndex,
		unitSystem = undefined,
		activeSetDuration,
		open = $bindable(false),
		isDragging = false,
		isDraggingOver = false,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver,
		deleteSetGroup,
		createSets,
		moveSets,
		createOnSelectSet,
		createUpdate,
		createCopySet,
		createDeleteSet
	}: Props = $props();

	let draggable = $state(false);
	let exercises = $derived(getUniqueExercises(setGroup.sets));

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	function onMoveSets(fromIndex: number, toIndex: number) {
		try {
			return moveSets(setGroupIndex, fromIndex, toIndex);
		} catch (error) {
			handleError(error);
		}
	}

	run(() => {
		if (setGroupIndex === activeSetGroupIndex) {
			open = true;
		}
	});
	function onOpen() {
		open = !open;
	}

	let openDelete = $state(false);
	function onOpenDelete() {
		openDelete = true;
	}
	function onDelete() {
		open = false;
		return deleteSetGroup(setGroupIndex);
	}

	let isActiveSetGroup = $derived(activeSetGroupIndex === setGroupIndex);

	let addSetsOpen = $state(false);
	let addSetsValid = $state(false);
	let addingSets = $state(false);
	let setTemplates: SetTemplateParams[] = $state([]);
	function onOpenAddSet() {
		setTemplates = exercises.map(
			(exercise) =>
				({
					...(setGroup.sets.findLast((s) => s.exerciseId === exercise.id) || {}),
					id: undefined,
					notes: undefined,
					status: undefined,
					startedAt: undefined,
					completedAt: undefined,
					createdAt: undefined,
					updatedAt: undefined,
					durationInSeconds: undefined,
					localId: unsafeId(),
					exercise,
					exerciseId: exercise.id
				}) as SetTemplateParams
		);
		addSetsOpen = true;
	}
	function onAddSetsInput(e: CustomEvent<SetTemplateParams[]>) {
		setTemplates = e.detail;
	}
	async function onAddSets() {
		try {
			addingSets = true;
			await createSets(
				setGroupIndex,
				setTemplates.map(
					(setTemplate) =>
						({
							...setTemplate,
							attemptedDistanceInMeters: setTemplate.distanceInMeters,
							attemptedReps:
								setTemplate.reps || setTemplate.repRangeLow || setTemplate.repRangeHigh,
							attemptedRepsInReserve: setTemplate.repsInReserve,
							attemptedTimeInSeconds: setTemplate.timeInSeconds,
							attemptedWeightInKilograms: setTemplate.weightInKilograms
						}) as SetParams
				)
			);
			addSetsValid = false;
			setTemplates = [];
			addSetsOpen = false;
		} catch (error) {
			await handleError(error);
		} finally {
			addingSets = false;
		}
	}
</script>

<div
	class="flex flex-col rounded-lg border-2"
	class:border-transparent={!isDraggingOver}
	class:border-pear-300={isDraggingOver}
	role="listitem"
	{draggable}
	ondragstart={onDragStart}
	ondragend={onDragEnd}
	ondragleave={onDragLeave}
	ondragover={onDragOver}
>
	<div class="mb-2 flex flex-row items-center">
		<div class="flex flex-shrink flex-col items-center justify-center">
			<button class="btn icon ghost me-1" onclick={onOpen}>
				<div class="h-4 w-4">
					{#if open}<ChevronDown size="1rem" />{:else}<ChevronRight size="1rem" />{/if}
				</div>
			</button>
		</div>
		<div class="flex flex-shrink flex-row items-center justify-center">
			<div class="flex flex-col justify-center">
				<button
					class="btn icon secondary me-1 cursor-grab"
					class:cursor-grabbing={isDragging}
					onpointerdown={onDraggable}
					onpointerup={onNotDraggable}
				>
					<div class="h-4 w-4">
						<Grip size="1rem" />
					</div>
				</button>
			</div>
			<div class="flex flex-col justify-center">
				<SetTypeComponent setType={SetType.WorkingSetType} position={setGroup.position} />
			</div>
		</div>
		<div class="ms-2 flex flex-grow flex-row flex-wrap items-center justify-between">
			<h6 class="mb-0">{setGroup.setGroupType}</h6>
			<div class="flex-flex flex">
				{#if exercises.length === 1}
					<div class="me-2 flex flex-col items-center justify-center">
						<div class="badge sm light">{exercises[0].translation.name}</div>
					</div>
				{/if}
				<div class="flex flex-col">
					<button class="btn danger icon" onclick={onOpenDelete}>
						<X size="1rem" />
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col" role="list" class:hidden={!open}>
		<Sortable id={`sets-${setGroup.id}`} items={setGroup.sets} getKey={getId} onMove={onMoveSets}>
			{#snippet children({
				isDragging,
				isDraggingOver,
				index,
				item,
				onDragStart,
				onDragEnd,
				onDragLeave,
				onDragOver
			})}
				<AttemptedSetComponent
					{setGroup}
					set={item}
					{index}
					{activeSetDuration}
					{isDragging}
					{isDraggingOver}
					{onDragStart}
					{onDragEnd}
					{onDragLeave}
					{onDragOver}
					{unitSystem}
					active={isActiveSetGroup && activeSetIndex === index}
					onSetActive={createOnSelectSet(setGroupIndex, index)}
					update={createUpdate(setGroupIndex, index)}
					copySet={createCopySet(setGroupIndex, index)}
					deleteSet={createDeleteSet(setGroupIndex, index)}
				/>
			{/snippet}
		</Sortable>
	</div>
	<div class="mt-2 flex flex-row justify-center" class:hidden={!open}>
		<button class="btn success flex flex-row" onclick={stopPropagation(onOpenAddSet)}>
			<Plus />
			{$LL.workouts.set.add.title()}
		</button>
	</div>
</div>

<Modal bind:open={addSetsOpen}>
	{#snippet title()}
		<h5>{$LL.workouts.set.add.title()}</h5>
	{/snippet}
	<NewSet
		{exercises}
		{unitSystem}
		bind:valid={addSetsValid}
		bind:setTemplates
		on:input={onAddSetsInput}
	/>
	<div class="flex flex-row justify-end">
		<button
			class="btn success flex flex-row"
			disabled={addingSets || !addSetsValid}
			onclick={onAddSets}
		>
			{#if addingSets}<Spinner />{/if}
			{$LL.workouts.set.add.submit()}
		</button>
	</div>
</Modal>

<Modal bind:open={openDelete}>
	{#snippet title()}
		<h5>{$LL.workouts.setGroup.delete.title()}</h5>
	{/snippet}
	<p>{$LL.workouts.setGroup.delete.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDelete}>
			{$LL.workouts.setGroup.delete.submit()}
		</button>
	</div>
</Modal>
