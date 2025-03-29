<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export type EditSetGroupTemplateProps = Omit<
		SortableItemProps<SetGroupTemplateParams>,
		'item'
	> & {
		setGroupTemplate: SetGroupTemplateParams;
		valid?: boolean;
		open?: boolean;
		oninput(params: SetGroupTemplateParams): void;
		ondelete(params: SetGroupTemplateParams): void;
		onvalid(valid: boolean): void;
	};

	export type SetGroupTemplateParams = {
		id?: number;
		localId: string;
		setGroupType: SetGroupType;
		setTemplates: Array<SetTemplateParams>;
	};

	const createSuite = () =>
		create((data: Partial<SetGroupTemplateParams> = {}, fields: Set<string>) => {
			if (!fields.size) {
				return;
			}
			only(Array.from(fields));

			test('setGroupType', m.errors_message_required(), () => {
				enforce(data.setGroupType).isNotBlank();
			});
			test('setTemplates', m.errors_message_required(), () => {
				enforce(data.setTemplates?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import { debounce } from '@aicacia/debounce';
	import { onMount } from 'svelte';
	import X from 'lucide-svelte/icons/x';
	import Plus from 'lucide-svelte/icons/plus';
	import ExerciseSelector from '../ExerciseSelector.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import EditSetTemplate, { type SetTemplateParams } from './EditSetTemplate.svelte';
	import InputResults from '$lib/components/InputResults.svelte';
	import Grip from 'lucide-svelte/icons/grip';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { getLocalId, unsafeId } from '$lib/util';
	import MeasurementInput from '$lib/components/inputs/MeasurementInput.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '$lib/components/workout/SetType.svelte';
	import Sortable, { type SortableItemProps } from '$lib/components/Sortable.svelte';
	import { createExercisesById, getRealSetPosition, getUniqueExercises } from '../util';
	import { m } from '$lib/paraglide/messages';
	import type { SetGroupType, SetType } from '$lib/state/workoutTemplates.svelte';
	import type { Exercise } from '$lib/openapi/exdb';

	let {
		setGroupTemplate = $bindable(),
		index,
		valid = $bindable(),
		open = $bindable(true),
		isDragging,
		isDraggingOver,
		onDragStart,
		onDragEnd,
		onDragLeave,
		onDragOver,
		oninput,
		ondelete,
		onvalid
	}: EditSetGroupTemplateProps = $props();

	let draggable = $state(false);

	function onDraggable() {
		draggable = true;
	}
	function onNotDraggable() {
		draggable = false;
	}

	function onOpen(e: Event) {
		e.stopPropagation();
		open = !open;
	}

	async function onDeleteInternal() {
		openDelete = false;
		ondelete(setGroupTemplate);
	}
	let openDelete = $state(false);
	function onOpenDelete(e: Event) {
		e.stopPropagation();
		openDelete = true;
	}

	let setTemplatesValid: (boolean | undefined)[] = [];

	let exercises = $state(getUniqueExercises(setGroupTemplate.setTemplates));
	$effect(() => {
		if (exercises.length === 1) {
			setSetGroupType('straight');
		} else if (exercises.length === 2) {
			setSetGroupType('superset');
		} else if (exercises.length > 2) {
			setSetGroupType('circuit');
		}
	});
	function setSetGroupType(setGroupType: SetGroupType) {
		if (setGroupTemplate.setGroupType !== setGroupType) {
			setGroupTemplate = { ...setGroupTemplate, setGroupType };
			oninput(setGroupTemplate);
			fields.add('setGroupType');
			validate();
		}
	}

	const suite = createSuite();
	let result = $state(suite.get());

	const fields = new Set<keyof SetGroupTemplateParams>();
	const validate = debounce(() => {
		suite(setGroupTemplate, fields).done((r) => {
			result = r;
			const newValid = result.isValid() && isSetTemplatesValid();
			if (newValid !== valid) {
				valid = newValid;
				onvalid(valid);
			}
		});
		fields.clear();
	}, 300);

	function validateAll() {
		for (const field of Object.keys(setGroupTemplate)) {
			fields.add(field as keyof SetGroupTemplateParams);
		}
		validate();
		validate.flush();
	}

	let exerciseSelectorOpen = $state(false);
	let shouldAddSetTemplates = $state(false);
	$effect(() => {
		if (!shouldAddSetTemplates && exerciseSelectorOpen) {
			shouldAddSetTemplates = setGroupTemplate.setTemplates.length === 0;
		}
	});
	$effect(() => {
		if (shouldAddSetTemplates && !exerciseSelectorOpen) {
			shouldAddSetTemplates = false;
			onAddSet();
		}
	});
	function onExercisesChange(newExercies: Exercise[]) {
		const exercisesById = createExercisesById(newExercies);
		setGroupTemplate = {
			...setGroupTemplate,
			setTemplates: setGroupTemplate.setTemplates.filter(
				(setTemplate) => !!exercisesById[setTemplate.exerciseId]
			)
		};
		oninput(setGroupTemplate);
		exercises = newExercies;
		fields.add('setTemplates');
		validate();
	}
	function createOnSetTemplateChange(index: number) {
		return (params: SetTemplateParams) => {
			const setTemplates = setGroupTemplate.setTemplates.slice();
			setTemplates[index] = params;
			setGroupTemplate = {
				...setGroupTemplate,
				setTemplates
			};
			oninput(setGroupTemplate);
			fields.add('setTemplates');
			validate();
		};
	}
	function createOnSetTemplateDelete(index: number) {
		return (_params: SetTemplateParams) => {
			const setTemplates = setGroupTemplate.setTemplates.slice();
			setTemplates.splice(index, 1);
			setGroupTemplate = {
				...setGroupTemplate,
				setTemplates
			};
			oninput(setGroupTemplate);
			fields.add('setTemplates');
			validate();
		};
	}
	function createOnSetTemplateValid(index: number) {
		return (setTemplateValid: boolean) => {
			const newSetTemplatesValid = setTemplatesValid.slice(0, setGroupTemplate.setTemplates.length);
			newSetTemplatesValid[index] = setTemplateValid;
			setTemplatesValid = newSetTemplatesValid;
			const newValid = result.isValid() && isSetTemplatesValid();
			if (newValid !== valid) {
				valid = newValid;
				onvalid(valid);
			}
		};
	}
	function isSetTemplatesValid() {
		return setTemplatesValid.every((valid) => valid === true);
	}
	function onAddSet(e?: Event) {
		e?.stopPropagation();
		const setTemplates = setGroupTemplate.setTemplates.slice();
		for (const exercise of exercises) {
			setTemplates.push({
				localId: unsafeId('set-template'),
				exerciseId: exercise.id,
				exercise: exercise,
				setType: setGroupTemplate.setTemplates.length === 0 ? 'warmup' : 'working'
			});
		}
		setGroupTemplate = {
			...setGroupTemplate,
			setTemplates
		};
		oninput(setGroupTemplate);
		fields.add('setTemplates');
		validate();
	}

	let restAfterInSeconds = $state(0);
	let restAfterInSecondsDropdownOpen = $state(false);
	let restAfterInSecondsSetType: SetType = $state('warmup');
	function createOnRestAfterInSecondsSetType(setType: SetType) {
		return () => {
			restAfterInSecondsSetType = setType;
			restAfterInSecondsDropdownOpen = false;
		};
	}
	function onSetAllRestAfterInSeconds() {
		setGroupTemplate = {
			...setGroupTemplate,
			setTemplates: setGroupTemplate.setTemplates.map((st) =>
				st.setType === restAfterInSecondsSetType
					? {
							...st,
							restAfterInSeconds
						}
					: st
			)
		};
		oninput(setGroupTemplate);
		fields.add('setTemplates');
		validate();
	}

	function onMoveSet(fromIndex: number, toIndex: number) {
		const setTemplate = setGroupTemplate.setTemplates[fromIndex];
		const newSetTemplates = setGroupTemplate.setTemplates.slice();
		newSetTemplates.splice(fromIndex, 1);
		newSetTemplates.splice(toIndex, 0, setTemplate);
		setGroupTemplate = { ...setGroupTemplate, setTemplates: newSetTemplates };
	}

	onMount(() => {
		exerciseSelectorOpen = exercises.length === 0;
		validateAll();
	});
</script>

<div
	class="mb-2 rounded-lg border-2"
	class:border-transparent={!isDraggingOver}
	class:border-pear-300={isDraggingOver}
	{draggable}
	role="listitem"
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
			<h6 class="mb-0">{setGroupTemplate.setGroupType}</h6>
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
			id={`exercise-selector-${setGroupTemplate.id}`}
			bind:open={exerciseSelectorOpen}
			oninput={onExercisesChange}
			{exercises}
		/>
	</div>
	{#if setGroupTemplate.setTemplates.length}
		<div class="mb-2 flex flex-row items-end" class:hidden={!open}>
			<div class="flex flex-shrink flex-col mb-1">
				<div class="cursor-pointer">
					<Dropdown
						position="top-left"
						anchorPosition="bottom-left"
						bind:open={restAfterInSecondsDropdownOpen}
					>
						{#snippet button()}
							<SetTypeComponent setType={restAfterInSecondsSetType} />
						{/snippet}
						<button
							class="btn ghost text-nowrap text-left"
							class:active={restAfterInSecondsSetType === 'working'}
							onclick={createOnRestAfterInSecondsSetType('working')}
							>{m.workouts_working_set_title()}</button
						>
						<button
							class="btn ghost text-nowrap text-left"
							class:active={restAfterInSecondsSetType === 'warmup'}
							onclick={createOnRestAfterInSecondsSetType('warmup')}
							>{m.workouts_warmup_title()}</button
						>
						<button
							class="btn ghost text-nowrap text-left"
							class:active={restAfterInSecondsSetType === 'backoff'}
							onclick={createOnRestAfterInSecondsSetType('backoff')}
							>{m.workouts_backoff_title()}</button
						>
					</Dropdown>
				</div>
			</div>
			<div class="mx-1 flex flex-shrink flex-col">
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
					{#if restAfterInSecondsSetType === 'working'}
						{m.workouts_working_set_rest_timers_update()}
					{:else if restAfterInSecondsSetType === 'warmup'}
						{m.workouts_warmup_rest_timers_update()}
					{:else}
						{m.workouts_backoff_rest_timers_update()}
					{/if}
				</button>
			</div>
		</div>
		<hr />
	{/if}
	<div role="list" class:hidden={!open}>
		<Sortable
			id={`set-templates-${setGroupTemplate.id}`}
			items={setGroupTemplate.setTemplates}
			getKey={getLocalId}
			onMove={onMoveSet}
		>
			{#snippet child({ item, index, ...props })}
				<EditSetTemplate
					position={getRealSetPosition(setGroupTemplate.setTemplates, item, index)}
					setTemplate={item}
					{...props}
					showExercise={exercises.length > 1}
					canMove={setGroupTemplate.setTemplates.length > 1}
					oninput={createOnSetTemplateChange(index)}
					ondelete={createOnSetTemplateDelete(index)}
					onvalid={createOnSetTemplateValid(index)}
				/>
			{/snippet}
		</Sortable>
	</div>
	<div class="flex flex-row items-center justify-center" class:hidden={!open}>
		<InputResults name="setTemplates" {result} />
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
