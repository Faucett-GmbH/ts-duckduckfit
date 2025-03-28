<svelte:options immutable />

<script lang="ts" context="module">
	import type { TranslationFunctions } from '$lib/i18n/i18n-types';
	import { create, enforce, test } from 'vest';

	export type NewSetsParams = {
		setTemplates: SetTemplateParams[];
	};

	const createSuite = (LL: TranslationFunctions) =>
		create((data: Partial<NewSetsParams> = {}) => {
			test('setTemplates', m.errors_message_required(), () => {
				enforce(data.setTemplates?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import { SetType, type Exercise, type UnitSystem } from '$lib/openapi/duckduckfit';
	import { unsafeId, getLocalId } from '$lib/util';
	import Sortable from '../Sortable.svelte';
	import ExerciseSelector from './ExerciseSelector.svelte';
	import { getRealSetPosition } from './util';
	import { m } from '$lib/paraglide/messages';
	import { debounce } from '@aicacia/debounce';
	import { createEventDispatcher, onMount } from 'svelte';
	import EditSetTemplate, { type SetTemplateParams } from './edit/EditSetTemplate.svelte';

	export let exercises: Exercise[] = [];
	export let setTemplates: SetTemplateParams[] = [];
	export let unitSystem: UnitSystem | undefined = undefined;
	export let valid: boolean | undefined = undefined;

	let setExercises = exercises;
	$: hasMultipleSets = setTemplates.length > 1;

	$: suite = createSuite($LL);
	$: result = suite.get();

	const dispatch = createEventDispatcher<{
		input: SetTemplateParams[];
		valid: boolean;
	}>();

	const validate = debounce(() => {
		suite({ setTemplates }).done((r) => {
			result = r;
			const newValid = result.isValid() && isSetsValid();
			if (newValid !== valid) {
				valid = newValid;
				dispatch('valid', valid);
			}
		});
	}, 300);
	function validateAll() {
		validate();
		validate.flush();
	}

	function createOnSetChange(index: number) {
		return (event: CustomEvent<SetTemplateParams>) => {
			const newSetTemplates = setTemplates.slice();
			newSetTemplates[index] = event.detail;
			setTemplates = newSetTemplates;
			dispatch('input', newSetTemplates);
			validate();
		};
	}
	function createOnSetDelete(index: number) {
		return (_event: CustomEvent<SetTemplateParams>) => {
			const newSetTemplates = setTemplates.slice();
			newSetTemplates.splice(index, 1);
			setTemplates = newSetTemplates;
			dispatch('input', newSetTemplates);
			validate();
		};
	}
	let setTemplatesValid: (boolean | undefined)[] = [];
	function createOnSetValid(index: number) {
		return (event: CustomEvent<boolean>) => {
			const newSetTemplatesValid = setTemplatesValid.slice(0, setTemplates.length);
			newSetTemplatesValid[index] = event.detail;
			setTemplatesValid = newSetTemplatesValid;
			const newValid = result.isValid() && isSetsValid();
			if (newValid !== valid) {
				valid = newValid;
				dispatch('valid', valid);
			}
		};
	}
	function isSetsValid() {
		return setTemplatesValid.every((valid) => valid === true);
	}

	function onExercisesInput(e: CustomEvent<Exercise[]>) {
		const newSetExercises = e.detail;
		const newSetTemplates = setTemplates.slice(0, newSetExercises.length);
		for (let i = 0; i < newSetExercises.length; i++) {
			const exercise = newSetExercises[i];
			const set = newSetTemplates[i];
			if (set) {
				set.exercise = exercise;
				set.exerciseId = exercise.id;
			} else {
				newSetTemplates[i] = {
					localId: unsafeId(),
					setType: 'working',
					exercise,
					exerciseId: exercise.id
				} as SetTemplateParams;
			}
		}
		setExercises = newSetExercises;
		setTemplates = newSetTemplates;
	}

	function onMoveSet(fromIndex: number, toIndex: number) {
		const newSetTemplates = setTemplates.slice();
		const set = newSetTemplates[fromIndex];
		newSetTemplates.splice(fromIndex, 1);
		newSetTemplates.splice(toIndex, 0, set);
		setTemplates = newSetTemplates;
	}

	onMount(validateAll);
</script>

<ExerciseSelector exercises={setExercises} on:input={onExercisesInput} />
<div role="list" class="mt-2">
	<Sortable
		items={setTemplates}
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
		<EditSetTemplate
			position={getRealSetPosition(setTemplates, item, index)}
			setTemplate={item}
			{isDragging}
			{isDraggingOver}
			{onDragStart}
			{onDragEnd}
			{onDragLeave}
			{onDragOver}
			{unitSystem}
			showExercise={hasMultipleSets}
			showDelete={false}
			canMove={hasMultipleSets}
			on:input={createOnSetChange(index)}
			on:delete={createOnSetDelete(index)}
			on:valid={createOnSetValid(index)}
		/>
	</Sortable>
</div>
