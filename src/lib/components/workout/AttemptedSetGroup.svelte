<script lang="ts" module>
	export interface AttemptedSetGroupProps {
		setGroup: SetGroupParams;
		setGroupIndex: number;
		activeSetIndex: number;
		activeSetGroupIndex: number;
		activeSetDuration: number;
		exerciseByGuid: { [guid: string]: Exercise };
		open?: boolean;
		isDragging?: boolean;
		isDraggingOver?: boolean;
		onDragStart: EventHandler<DragEvent>;
		onDragEnd: EventHandler<DragEvent>;
		onDragLeave: EventHandler<DragEvent>;
		onDragOver: EventHandler<DragEvent>;
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
</script>

<script lang="ts">
	import AttemptedSetComponent from '$lib/components/workout/AttemptedSet.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Grip from 'lucide-svelte/icons/grip';
	import Plus from 'lucide-svelte/icons/plus';
	import X from 'lucide-svelte/icons/x';
	import { findTranslation, getId, unsafeId } from '$lib/util';
	import Sortable from '../Sortable.svelte';
	import Modal from '../Modal.svelte';
	import { getUniqueExercises } from './util';
	import NewSet from './NewSet.svelte';
	import type { SetParams } from './edit/EditSet.svelte';
	import { handleError } from '$lib/error';
	import SetTypeComponent from './SetType.svelte';
	import type { SetGroupParams } from './edit/EditSetGroup.svelte';
	import type { AttemptedSet } from '$lib/state/workouts.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import type { SetTemplate } from '$lib/state/workoutTemplates.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { EventHandler } from 'svelte/elements';

	let {
		setGroup,
		setGroupIndex,
		activeSetIndex,
		activeSetGroupIndex,
		activeSetDuration = $bindable(),
		open = $bindable(false),
		exerciseByGuid = $bindable(),
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
	}: AttemptedSetGroupProps = $props();

	let draggable = $state(false);
	let exercises = $derived(getUniqueExercises(setGroup.sets, exerciseByGuid));

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

	$effect(() => {
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
	let setTemplates: SetTemplate[] = $state([]);
	function onOpenAddSet(e: Event) {
		e.stopPropagation();
		setTemplates = exercises.map(
			(exercise) =>
				({
					...(setGroup.sets.findLast((s) => s.exerciseGuid === exercise.guid) || {}),
					id: unsafeId(),
					notes: [],
					status: null,
					startedAt: null,
					completedAt: null,
					createdAt: null,
					updatedAt: null,
					durationInSeconds: null,
					exerciseGuid: exercise.guid
				}) as SetTemplate
		);
		addSetsOpen = true;
	}
	function onAddSetsInput(newSetTemplates: SetTemplate[]) {
		setTemplates = newSetTemplates;
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
				<SetTypeComponent setType={'working'} position={setGroupIndex + 1} />
			</div>
		</div>
		<div class="ms-2 flex flex-grow flex-row flex-wrap items-center justify-between">
			<h6 class="mb-0">{setGroup.setGroupType}</h6>
			<div class="flex-flex flex">
				{#if exercises.length === 1}
					{@const exercise = exercises[0]}
					{@const translation = findTranslation(exercise.translations)}
					<div class="me-2 flex flex-col items-center justify-center">
						<div class="badge sm light">{translation.name}</div>
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
					bind:exerciseByGuid
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
		<button class="btn success flex flex-row" onclick={onOpenAddSet}>
			<Plus />
			{m.workouts_set_add_title()}
		</button>
	</div>
</div>

<Modal bind:open={addSetsOpen}>
	{#snippet title()}
		<h5>{m.workouts_set_add_title()}</h5>
	{/snippet}
	<NewSet {exercises} bind:valid={addSetsValid} bind:setTemplates oninput={onAddSetsInput} />
	<div class="flex flex-row justify-end">
		<button
			class="btn success flex flex-row"
			disabled={addingSets || !addSetsValid}
			onclick={onAddSets}
		>
			{#if addingSets}<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>{/if}
			{m.workouts_set_add_submit()}
		</button>
	</div>
</Modal>

<Modal bind:open={openDelete}>
	{#snippet title()}
		<h5>{m.workouts_set_group_delete_title()}</h5>
	{/snippet}
	<p>{m.workouts_set_group_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDelete}>
			{m.workouts_set_group_delete_submit()}
		</button>
	</div>
</Modal>
