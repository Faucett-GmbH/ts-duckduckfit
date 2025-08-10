<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export type EditSetSeriesTemplateProps = Omit<SortableItemProps<SetSeriesTemplate>, 'item'> & {
		exerciseByGuid: { [guid: string]: Exercise };
		setSeriesTemplate: SetSeriesTemplate;
		valid?: boolean;
		open?: boolean;
		oninput(params: SetSeriesTemplate): void;
		ondelete(params: SetSeriesTemplate): void;
		onvalid(valid: boolean): void;
	};

	const createSuite = () =>
		create((data: Partial<SetSeriesTemplate> = {}, fields: Set<string>) => {
			if (!fields.size) {
				return;
			}
			only(Array.from(fields));

			test('setSeriesType', m.errors_message_required(), () => {
				enforce(data.setSeriesType).isNotBlank();
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
	import EditSetTemplate from './EditSetTemplate.svelte';
	import InputResults from '$lib/components/InputResults.svelte';
	import Grip from 'lucide-svelte/icons/grip';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { getId, unsafeId } from '$lib/util';
	import MeasurementInput from '$lib/components/inputs/MeasurementInput.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SetTypeComponent from '$lib/components/training_session/SetType.svelte';
	import Sortable, { type SortableItemProps } from '$lib/components/Sortable.svelte';
	import { createExercisesByGuid, getRealSetPosition } from '../util';
	import { m } from '$lib/paraglide/messages';
	import type {
		SetSeriesTemplate,
		SetSeriesType,
		SetTemplate,
		SetType
	} from '$lib/state/trainingSessionTemplates.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import type { AutomergeDocumentId } from '$lib/repo';

	let {
		exerciseByGuid = $bindable(),
		setSeriesTemplate = $bindable(),
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
	}: EditSetSeriesTemplateProps = $props();

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
		ondelete(setSeriesTemplate);
	}
	let openDelete = $state(false);
	function onOpenDelete(e: Event) {
		e.stopPropagation();
		openDelete = true;
	}

	let setTemplatesValid: (boolean | undefined)[] = [];

	let exercises = $state(
		[
			...new Set(setSeriesTemplate.setTemplates.map((setTemplate) => setTemplate.exerciseGuid))
		].reduce((exercises, exerciseGuid) => {
			const exercise = exerciseByGuid[exerciseGuid];
			if (exercise) {
				exercises.push(exercise);
			}
			return exercises;
		}, [] as Exercise[])
	);
	$effect(() => {
		if (exercises.length === 1) {
			setSetSeriesType('standard');
		} else if (exercises.length === 2) {
			setSetSeriesType('superset');
		} else if (exercises.length > 2) {
			setSetSeriesType('circuit');
		}
	});
	function setSetSeriesType(setSeriesType: SetSeriesType) {
		if (setSeriesTemplate.setSeriesType !== setSeriesType) {
			setSeriesTemplate = { ...setSeriesTemplate, setSeriesType };
			oninput(setSeriesTemplate);
			fields.add('setSeriesType');
			validate();
		}
	}

	const suite = createSuite();
	let result = $state(suite.get());

	const fields = new Set<keyof SetSeriesTemplate>();
	const validate = debounce(() => {
		suite(setSeriesTemplate, fields).done((r) => {
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
		for (const field of Object.keys(setSeriesTemplate)) {
			fields.add(field as keyof SetSeriesTemplate);
		}
		validate();
		validate.flush();
	}

	let exerciseSelectorOpen = $state(false);
	let shouldAddSetTemplates = $state(false);
	$effect(() => {
		if (!shouldAddSetTemplates && exerciseSelectorOpen) {
			shouldAddSetTemplates = setSeriesTemplate.setTemplates.length === 0;
		}
	});
	$effect(() => {
		if (shouldAddSetTemplates && !exerciseSelectorOpen) {
			shouldAddSetTemplates = false;
			onAddSet();
		}
	});
	function onExercisesChange(newExercies: Exercise[]) {
		const newExerciseByGuid = createExercisesByGuid(newExercies);
		setSeriesTemplate = {
			...setSeriesTemplate,
			setTemplates: setSeriesTemplate.setTemplates.filter(
				(setTemplate) => !!newExerciseByGuid[setTemplate.exerciseGuid]
			)
		};
		exerciseByGuid = { ...exerciseByGuid, ...newExerciseByGuid };
		oninput(setSeriesTemplate);
		exercises = newExercies;
		fields.add('setTemplates');
		validate();
	}
	function createOnSetTemplateChange(index: number) {
		return (params: SetTemplate) => {
			const setTemplates = setSeriesTemplate.setTemplates.slice();
			setTemplates[index] = params;
			setSeriesTemplate = {
				...setSeriesTemplate,
				setTemplates
			};
			oninput(setSeriesTemplate);
			fields.add('setTemplates');
			validate();
		};
	}
	function createOnSetTemplateDelete(index: number) {
		return (_params: SetTemplate) => {
			const setTemplates = setSeriesTemplate.setTemplates.slice();
			setTemplates.splice(index, 1);
			setSeriesTemplate = {
				...setSeriesTemplate,
				setTemplates
			};
			oninput(setSeriesTemplate);
			fields.add('setTemplates');
			validate();
		};
	}
	function createOnSetTemplateValid(index: number) {
		return (setTemplateValid: boolean) => {
			const newSetTemplatesValid = setTemplatesValid.slice(
				0,
				setSeriesTemplate.setTemplates.length
			);
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
		const setTemplates = setSeriesTemplate.setTemplates.slice();
		for (const exercise of exercises) {
			setTemplates.push({
				id: unsafeId(),
				exerciseGuid: exercise.guid,
				setType: setSeriesTemplate.setTemplates.length === 0 ? 'warmup' : 'working'
			} as never);
		}
		setSeriesTemplate = {
			...setSeriesTemplate,
			setTemplates
		};
		oninput(setSeriesTemplate);
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
		setSeriesTemplate = {
			...setSeriesTemplate,
			setTemplates: setSeriesTemplate.setTemplates.map((st) =>
				st.setType === restAfterInSecondsSetType
					? {
							...st,
							restAfterInSeconds
						}
					: st
			)
		};
		oninput(setSeriesTemplate);
		fields.add('setTemplates');
		validate();
	}

	function onMoveSet(fromIndex: number, toIndex: number) {
		const setTemplate = setSeriesTemplate.setTemplates[fromIndex];
		const newSetTemplates = setSeriesTemplate.setTemplates.slice();
		newSetTemplates.splice(fromIndex, 1);
		newSetTemplates.splice(toIndex, 0, setTemplate);
		setSeriesTemplate = { ...setSeriesTemplate, setTemplates: newSetTemplates };
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
				<SetTypeComponent setType={'working_set'} position={index} />
			</div>
		</div>
		<div class="ms-2 flex flex-grow flex-row flex-wrap items-center justify-between">
			<h6 class="mb-0">{setSeriesTemplate.setSeriesType}</h6>
		</div>
		<div class="flex flex-col">
			<button class="btn danger icon" onclick={onOpenDelete}>
				<X size="1rem" />
			</button>
		</div>
	</div>

	<div class="mb-2" class:hidden={!open}>
		<label for="exercise-selector">{m.training_sessions_new_exercises_label()}</label>
		<ExerciseSelector
			id={`exercise-selector-${setSeriesTemplate.id}`}
			bind:open={exerciseSelectorOpen}
			oninput={onExercisesChange}
			{exercises}
		/>
	</div>
	{#if setSeriesTemplate.setTemplates.length}
		<div class="mb-2 flex flex-row items-end" class:hidden={!open}>
			<div class="mb-1 flex flex-shrink flex-col">
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
							class="btn ghost text-left text-nowrap"
							class:active={restAfterInSecondsSetType === 'working'}
							onclick={createOnRestAfterInSecondsSetType('working')}
							>{m.training_sessions_working_set_title()}</button
						>
						<button
							class="btn ghost text-left text-nowrap"
							class:active={restAfterInSecondsSetType === 'warmup'}
							onclick={createOnRestAfterInSecondsSetType('warmup')}
							>{m.training_sessions_warmup_title()}</button
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
						{m.training_sessions_working_set_rest_timers_update()}
					{:else if restAfterInSecondsSetType === 'warmup'}
						{m.training_sessions_warmup_rest_timers_update()}
					{/if}
				</button>
			</div>
		</div>
		<hr />
	{/if}
	<div role="list" class:hidden={!open}>
		<Sortable
			id={`set-templates-${setSeriesTemplate.id}`}
			items={setSeriesTemplate.setTemplates}
			getKey={getId}
			onMove={onMoveSet}
		>
			{#snippet children({ item, index, ...props })}
				<EditSetTemplate
					id={item.id}
					position={getRealSetPosition(setSeriesTemplate.setTemplates, item, index)}
					setTemplate={item}
					exercise={exerciseByGuid[item.exerciseGuid]}
					{...props}
					showExercise={exercises.length > 1}
					canMove={setSeriesTemplate.setTemplates.length > 1}
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
			{m.training_sessions_set_add_title()}
		</button>
	</div>
</div>

<Modal bind:open={openDelete}>
	{#snippet title()}
		<h5>{m.training_sessions_set_series_delete_title()}</h5>
	{/snippet}
	<p>{m.training_sessions_set_series_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.training_sessions_set_series_delete_submit()}
		</button>
	</div>
</Modal>
