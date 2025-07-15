<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export type SetGroupParams = {
		id: string;
		setGroupType: SetGroupType;
		sets: Array<SetParams>;
	};

	export interface EditSetGroupProps {
		setGroup: SetGroupParams;
		exerciseByGuid: { [guid: string]: Exercise };
		index: number;
		valid?: boolean | undefined;
		isDragging?: boolean;
		isDraggingOver?: boolean;
		onDragStart(e: DragEvent): void;
		onDragEnd(e: DragEvent): void;
		onDragLeave(e: DragEvent): void;
		onDragOver(e: DragEvent): void;
		open?: boolean;
		oninput?(params: SetGroupParams): void;
		ondelete?(params: SetGroupParams): void;
		onvalid?(valid: boolean): void;
	}

	const createSuite = () =>
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
	import { debounce } from '@aicacia/debounce';
	import { onMount } from 'svelte';
	import X from 'lucide-svelte/icons/x';
	import Plus from 'lucide-svelte/icons/plus';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ExerciseSelector from '../ExerciseSelector.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import EditSet, { type SetParams } from './EditSet.svelte';
	import InputResults from '$lib/components/InputResults.svelte';
	import Grip from 'lucide-svelte/icons/grip';
	import { getId, unsafeId } from '$lib/util';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '$lib/components/workout/SetType.svelte';
	import MeasurementInput from '$lib/components/inputs/MeasurementInput.svelte';
	import Sortable from '$lib/components/Sortable.svelte';
	import { createExercisesByGuid, getRealSetPosition, getUniqueExercises } from '../util';
	import type { SetGroupType, SetType } from '$lib/state/workoutTemplates.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { Exercise } from '$lib/state/exerciseTypes';

	let {
		setGroup = $bindable(),
		exerciseByGuid = $bindable(),
		index,
		valid = $bindable(undefined),
		isDragging = false,
		isDraggingOver = false,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver,
		open = $bindable(true),
		oninput,
		ondelete,
		onvalid
	}: EditSetGroupProps = $props();

	let draggable = $state(false);

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
		ondelete?.(setGroup);
	}
	let openDelete = $state(false);
	function onOpenDelete() {
		openDelete = true;
	}

	let setsValid: (boolean | undefined)[] = [];

	let exercises = $state(getUniqueExercises(setGroup.sets, exerciseByGuid));
	function setSetGroupType(setGroupType: SetGroupType) {
		if (setGroup.setGroupType !== setGroupType) {
			setGroup = { ...setGroup, setGroupType };
			oninput?.(setGroup);
			fields.add('setGroupType');
			validate();
		}
	}

	const fields = new Set<keyof SetGroupParams>();
	const validate = debounce(() => {
		suite(setGroup, fields).done((r) => {
			result = r;
			const newValid = result.isValid() && isSetsValid();
			if (newValid !== valid) {
				valid = newValid;
				onvalid?.(valid);
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

	let exerciseSelectorOpen = $derived(exercises.length === 0);
	let shouldAddSets = $state(false);
	function onExercisesChange(newExercises: Exercise[]) {
		const newExerciseByGuid = createExercisesByGuid(newExercises);
		setGroup = {
			...setGroup,
			sets: setGroup.sets.filter((set) => !!newExerciseByGuid[set.exerciseGuid])
		};
		oninput?.(setGroup);
		exercises = newExercises;
		exerciseByGuid = Object.assign(exerciseByGuid, newExerciseByGuid);
		fields.add('sets');
		validate();
	}
	function createOnSetChange(index: number) {
		return (newSet: SetParams) => {
			const sets = setGroup.sets.slice();
			sets[index] = newSet;
			setGroup = {
				...setGroup,
				sets
			};
			oninput?.(setGroup);
			fields.add('sets');
			validate();
		};
	}
	function createOnSetDelete(index: number) {
		return (_deletedSet: SetParams) => {
			const sets = setGroup.sets.slice();
			sets.splice(index, 1);
			setGroup = {
				...setGroup,
				sets
			};
			oninput?.(setGroup);
			fields.add('sets');
			validate();
		};
	}
	function createOnSetValid(index: number) {
		return (setValid: boolean) => {
			const newSetsValid = setsValid.slice(0, setGroup.sets.length);
			newSetsValid[index] = setValid;
			setsValid = newSetsValid;
			const newValid = result.isValid() && isSetsValid();
			if (newValid !== valid) {
				valid = newValid;
				onvalid?.(valid);
			}
		};
	}
	function isSetsValid() {
		return setsValid.every((valid) => valid === true);
	}
	function onAddSet(e?: Event) {
		e?.stopPropagation();
		const sets = setGroup.sets.slice();
		for (const exercise of exercises) {
			sets.push({
				id: unsafeId(),
				exerciseId: exercise.guid,
				setType: setGroup.sets.length === 0 ? 'warmup' : 'working'
			} as never as SetParams);
		}
		setGroup = {
			...setGroup,
			sets
		};
		oninput?.(setGroup);
		fields.add('sets');
		validate();
	}

	let restAfterInSeconds = $state(0);
	let restAfterInSecondsDropdownOpen = $state(false);
	let restAfterInSecondsSetType = $state<SetType>('warmup');
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
		oninput?.(setGroup);
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
	$effect(() => {
		if (exercises.length === 1) {
			setSetGroupType('straight');
		} else if (exercises.length === 2) {
			setSetGroupType('superset');
		} else if (exercises.length > 2) {
			setSetGroupType('circuit');
		}
	});
	let suite = $derived(createSuite());
	let result = $derived(suite.get());
	$effect(() => {
		if (!shouldAddSets && exerciseSelectorOpen) {
			shouldAddSets = setGroup.sets.length === 0;
		}
	});
	$effect(() => {
		if (shouldAddSets && !exerciseSelectorOpen) {
			shouldAddSets = false;
			onAddSet();
		}
	});
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
	<div class="flex flex-row justify-between">
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
				<SetTypeComponent setType={'working'} position={index} />
			</div>
		</div>
		<div class="ms-2 flex flex-grow flex-row flex-wrap items-center justify-between">
			<h6 class="mb-0">{setGroup.setGroupType}</h6>
		</div>
		<div class="flex flex-col">
			<button class="btn danger icon" onclick={onOpenDelete}>
				<X size="1rem" />
			</button>
		</div>
	</div>

	<div class="mb-2" class:hidden={!open}>
		<label for="exercise-selector">{m.workouts_new_exercises_label()}</label>
		<ExerciseSelector
			id={`exercise-selector-${setGroup.id}`}
			bind:open={exerciseSelectorOpen}
			oninput={onExercisesChange}
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
					{#snippet button()}
						<SetTypeComponent setType={restAfterInSecondsSetType} />
					{/snippet}
					<button
						class="btn ghost text-left text-nowrap"
						class:active={restAfterInSecondsSetType === 'working'}
						onclick={createOnRestAfterInSecondsSetType('working')}
						>{m.workouts_working_set_title()}</button
					>
					<button
						class="btn ghost text-left text-nowrap"
						class:active={restAfterInSecondsSetType === 'warmup'}
						onclick={createOnRestAfterInSecondsSetType('warmup')}
						>{m.workouts_warmup_title()}</button
					>
				</Dropdown>
			</div>
			<div class="me-1 flex flex-shrink flex-col">
				<label class="text-xs" for="restAfterInSeconds"
					>{m.workouts_set_rest_after_in_seconds_label()}</label
				>
				<MeasurementInput
					name="restAfterInSeconds"
					type="duration"
					metricUnits="s"
					bind:metricValue={restAfterInSeconds}
				/>
			</div>
			<div class="me-1 flex flex-shrink flex-col">
				<button class="btn secondary text-sm" onclick={onSetAllRestAfterInSeconds}>
					{#if restAfterInSecondsSetType === 'warmup'}
						{m.workouts_set_group_set_warm_up_rest_timers()}
					{:else}
						{m.workouts_set_group_set_working_set_rest_timers()}
					{/if}
				</button>
			</div>
		</div>
	{/if}
	<div role="list" class:hidden={!open}>
		<Sortable id={`sets-${setGroup.id}`} items={setGroup.sets} getKey={getId} onMove={onMoveSet}>
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
				<EditSet
					set={item}
					{exerciseByGuid}
					position={getRealSetPosition(setGroup.sets, item, index)}
					{isDragging}
					{isDraggingOver}
					{onDragStart}
					{onDragEnd}
					{onDragLeave}
					{onDragOver}
					showExercise={exercises.length > 1}
					canMove={setGroup.sets.length > 1}
					oninput={createOnSetChange(index)}
					ondelete={createOnSetDelete(index)}
					onvalid={createOnSetValid(index)}
				/>
			{/snippet}
		</Sortable>
	</div>
	<div class="flex flex-row items-center justify-center" class:hidden={!open}>
		<InputResults name="sets" {result} />
	</div>
	<div class="mt-2 flex flex-row justify-center" class:hidden={!open}>
		<button class="btn success flex flex-row" disabled={exercises.length === 0} onclick={onAddSet}>
			<Plus />
			{m.workouts_set_add_title()}
		</button>
	</div>
</div>

<Modal bind:open={openDelete}>
	{#snippet title()}
		<h5>{m.workouts_set_group_delete_title()}</h5>
	{/snippet}
	<p>{m.workouts_set_group_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.workouts_set_group_delete_submit()}
		</button>
	</div>
</Modal>
