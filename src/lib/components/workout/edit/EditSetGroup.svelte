<svelte:options immutable />

<script lang="ts" context="module">
	import { create, test, enforce, only } from 'vest';
	import { type Exercise, SetGroupType, SetType, UnitSystem } from '$lib/openapi/duckduckfit';

	export type SetGroupParams = {
		id?: number;
		localId: string;
		setGroupType: SetGroupType;
		sets: Array<SetParams>;
	};

	const createSuite = (LL: TranslationFunctions) =>
		create((data: Partial<SetGroupParams> = {}, fields: Set<string>) => {
			if (!fields.size) {
				return;
			}
			only(Array.from(fields));

			test('setGroupType', m.errors_message_required(), () => {
				enforce(data.setGroupType).isNotBlank();
			});
			test('sets', m.errors_message_required(), () => {
				enforce(data.sets?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';
	import type { TranslationFunctions } from '$lib/i18n/i18n-types';
	import { debounce } from '@aicacia/debounce';
	import { createEventDispatcher, onMount } from 'svelte';
	import X from 'lucide-svelte/icons/x';
	import Plus from 'lucide-svelte/icons/plus';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ExerciseSelector from '../ExerciseSelector.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import EditSet, { type SetParams } from './EditSet.svelte';
	import InputResults from '$lib/components/InputResults.svelte';
	import Grip from 'lucide-svelte/icons/grip';
	import { getLocalId, unsafeId } from '$lib/util';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '$lib/components/workout/SetType.svelte';
	import MeasurementInput from '$lib/components/inputs/MeasurementInput.svelte';
	import Sortable from '$lib/components/Sortable.svelte';
	import { createExercisesById, getRealSetPosition, getUniqueExercises } from '../util';

	export let setGroup: SetGroupParams;
	export let index: number;
	export let valid: boolean | undefined = undefined;
	export let isDragging = false;
	export let isDraggingOver = false;
	export let onDragStart: (e: DragEvent) => void;
	export let onDragEnd: (e: DragEvent) => void;
	export let onDragLeave: (e: DragEvent) => void;
	export let onDragOver: (e: DragEvent) => void;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
	export let open = true;

	let draggable = false;

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	function onOpen() {
		open = !open;
	}

	async function onDeleteInternal() {
		openDelete = false;
		dispatch('delete', setGroup);
	}
	let openDelete = false;
	function onOpenDelete() {
		openDelete = true;
	}

	let setsValid: (boolean | undefined)[] = [];

	let exercises = getUniqueExercises(setGroup.sets);
	$: if (exercises.length === 1) {
		setSetGroupType('straight');
	} else if (exercises.length === 2) {
		setSetGroupType('superset');
	} else if (exercises.length > 2) {
		setSetGroupType('circuit');
	}
	function setSetGroupType(setGroupType: SetGroupType) {
		if (setGroup.setGroupType !== setGroupType) {
			setGroup = { ...setGroup, setGroupType };
			dispatch('input', setGroup);
			fields.add('setGroupType');
			validate();
		}
	}

	const dispatch = createEventDispatcher<{
		input: SetGroupParams;
		delete: SetGroupParams;
		valid: boolean;
	}>();

	$: suite = createSuite($LL);
	$: result = suite.get();

	const fields = new Set<keyof SetGroupParams>();
	const validate = debounce(() => {
		suite(setGroup, fields).done((r) => {
			result = r;
			const newValid = result.isValid() && isSetsValid();
			if (newValid !== valid) {
				valid = newValid;
				dispatch('valid', valid);
			}
		});
		fields.clear();
	}, 300);

	function validateAll() {
		for (const field of Object.keys(setGroup)) {
			fields.add(field as keyof SetGroupParams);
		}
		validate();
		validate.flush();
	}

	let exerciseSelectorOpen = exercises.length === 0;
	let shouldAddSets = false;
	$: if (!shouldAddSets && exerciseSelectorOpen) {
		shouldAddSets = setGroup.sets.length === 0;
	}
	$: if (shouldAddSets && !exerciseSelectorOpen) {
		shouldAddSets = false;
		onAddSet();
	}
	function onExercisesChange(event: CustomEvent<Exercise[]>) {
		const exercisesById = createExercisesById(event.detail);
		setGroup = {
			...setGroup,
			sets: setGroup.sets.filter((set) => !!exercisesById[set.exerciseId])
		};
		dispatch('input', setGroup);
		exercises = event.detail;
		fields.add('sets');
		validate();
	}
	function createOnSetChange(index: number) {
		return (event: CustomEvent<SetParams>) => {
			const sets = setGroup.sets.slice();
			sets[index] = event.detail;
			setGroup = {
				...setGroup,
				sets
			};
			dispatch('input', setGroup);
			fields.add('sets');
			validate();
		};
	}
	function createOnSetDelete(index: number) {
		return (event: CustomEvent<SetParams>) => {
			const sets = setGroup.sets.slice();
			sets.splice(index, 1);
			setGroup = {
				...setGroup,
				sets
			};
			dispatch('input', setGroup);
			fields.add('sets');
			validate();
		};
	}
	function createOnSetValid(index: number) {
		return (event: CustomEvent<boolean>) => {
			const newSetsValid = setsValid.slice(0, setGroup.sets.length);
			newSetsValid[index] = event.detail;
			setsValid = newSetsValid;
			const newValid = result.isValid() && isSetsValid();
			if (newValid !== valid) {
				valid = newValid;
				dispatch('valid', valid);
			}
		};
	}
	function isSetsValid() {
		return setsValid.every((valid) => valid === true);
	}
	function onAddSet() {
		const sets = setGroup.sets.slice();
		for (const exercise of exercises) {
			sets.push({
				localId: unsafeId(sets.length),
				exerciseId: exercise.id,
				exercise: exercise,
				setType: setGroup.sets.length === 0 ? 'warmup' : 'working'
			} as SetParams);
		}
		setGroup = {
			...setGroup,
			sets
		};
		dispatch('input', setGroup);
		fields.add('sets');
		validate();
	}

	let restAfterInSeconds = 0;
	let restAfterInSecondsDropdownOpen = false;
	let restAfterInSecondsSetType: SetType = 'warmup';
	function createOnRestAfterInSecondsSetType(setType: SetType) {
		return () => {
			restAfterInSecondsSetType = setType;
			restAfterInSecondsDropdownOpen = false;
		};
	}
	function onSetAllRestAfterInSeconds() {
		setGroup = {
			...setGroup,
			sets: setGroup.sets.map((s) =>
				s.setType === restAfterInSecondsSetType
					? {
							...s,
							restAfterInSeconds
						}
					: s
			)
		};
		dispatch('input', setGroup);
		fields.add('sets');
		validate();
	}

	function onMoveSet(fromIndex: number, toIndex: number) {
		const newSets = setGroup.sets.slice();
		const set = setGroup.sets[fromIndex];
		newSets.splice(fromIndex, 1);
		newSets.splice(toIndex, 0, set);
		setGroup = { ...setGroup, sets: newSets };
	}

	onMount(() => {
		validateAll();
	});
</script>

<div
	class="flex flex-col rounded-lg border-2"
	class:border-transparent={!isDraggingOver}
	class:border-pear-300={isDraggingOver}
	role="listitem"
	{draggable}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragleave={onDragLeave}
	on:dragover={onDragOver}
>
	<div class="flex flex-row justify-between">
		<div class="flex flex-shrink flex-col items-center justify-center">
			<button class="btn icon ghost me-1" on:click={onOpen}>
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
					on:pointerdown={onDraggable}
					on:pointerup={onNotDraggable}
				>
					<div class="h-4 w-4">
						<Grip size="1rem" />
					</div>
				</button>
			</div>
			<div class="flex flex-col justify-center">
				<SetTypeComponent setType={'working'} position={index} />
			</div>
		</div>
		<div class="ms-2 flex flex-grow flex-row flex-wrap items-center justify-between">
			<h6 class="mb-0">{setGroup.setGroupType}</h6>
		</div>
		<div class="flex flex-col">
			<button class="btn danger icon" on:click={onOpenDelete}>
				<X size="1rem" />
			</button>
		</div>
	</div>

	<div class="mb-2" class:hidden={!open}>
		<label for="exercise-selector">{$LL.workouts.new.exercisesLabel()}</label>
		<ExerciseSelector
			id={`exercise-selector-${setGroup.id}`}
			bind:open={exerciseSelectorOpen}
			on:input={onExercisesChange}
			{exercises}
		/>
	</div>
	{#if setGroup.sets.length}
		<div class="mb-2 flex flex-row items-end" class:hidden={!open}>
			<div class="me-1 flex flex-shrink flex-col items-center justify-center">
				<Dropdown
					position="top-left"
					anchorPosition="bottom-left"
					bind:open={restAfterInSecondsDropdownOpen}
				>
					<SetTypeComponent slot="button" setType={restAfterInSecondsSetType} />
					<button
						class="btn ghost text-nowrap text-left"
						class:active={restAfterInSecondsSetType === 'working'}
						on:click={createOnRestAfterInSecondsSetType('working')}
						>{$LL.workouts.workingSetTitle()}</button
					>
					<button
						class="btn ghost text-nowrap text-left"
						class:active={restAfterInSecondsSetType === 'warmup'}
						on:click={createOnRestAfterInSecondsSetType('warmup')}
						>{$LL.workouts.warmupTitle()}</button
					>
				</Dropdown>
			</div>
			<div class="me-1 flex flex-shrink flex-col">
				<label class="text-xs" for="restAfterInSeconds"
					>{$LL.workouts.set.restAfterInSecondsLabel()}</label
				>
				<MeasurementInput
					name="restAfterInSeconds"
					type="duration"
					metricUnits="s"
					bind:metricValue={restAfterInSeconds}
					system={unitSystem}
				/>
			</div>
			<div class="me-1 flex flex-shrink flex-col">
				<button class="btn secondary text-sm" on:click={onSetAllRestAfterInSeconds}>
					{#if restAfterInSecondsSetType === 'warmup'}
						{$LL.workouts.setGroup.setWarmUpRestTimers()}
					{:else}
						{$LL.workouts.setGroup.setWorkingSetRestTimers()}
					{/if}
				</button>
			</div>
		</div>
	{/if}
	<div role="list" class:hidden={!open}>
		<Sortable
			id={`sets-${setGroup.id}`}
			items={setGroup.sets}
			getKey={getLocalId}
			onMove={onMoveSet}
			let:isDragging
			let:isDraggingOver
			let:index
			let:item
			let:onDragStart
			let:onDragEnd
			let:onDragLeave
			let:onDragOver
		>
			<EditSet
				set={item}
				position={getRealSetPosition(setGroup.sets, item, index)}
				{isDragging}
				{isDraggingOver}
				{onDragStart}
				{onDragEnd}
				{onDragLeave}
				{onDragOver}
				{unitSystem}
				showExercise={exercises.length > 1}
				canMove={setGroup.sets.length > 1}
				on:input={createOnSetChange(index)}
				on:delete={createOnSetDelete(index)}
				on:valid={createOnSetValid(index)}
			/>
		</Sortable>
	</div>
	<div class="flex flex-row items-center justify-center" class:hidden={!open}>
		<InputResults name="sets" {result} />
	</div>
	<div class="mt-2 flex flex-row justify-center" class:hidden={!open}>
		<button
			class="btn success flex flex-row"
			disabled={exercises.length === 0}
			on:click|stopPropagation={onAddSet}
		>
			<Plus />
			{$LL.workouts.set.add.title()}
		</button>
	</div>
</div>

<Modal bind:open={openDelete}>
	<h5 slot="title">{$LL.workouts.setGroup.delete.title()}</h5>
	<p>{$LL.workouts.setGroup.delete.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" on:click={onDeleteInternal}>
			{$LL.workouts.setGroup.delete.submit()}
		</button>
	</div>
</Modal>
