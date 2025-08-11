<script lang="ts" module>
	import { create, enforce, test } from 'vest';

	export type NewSetsParams = {
		setTemplates: SetTemplate[];
	};

	export interface NewSetProps {
		exercises?: Exercise[];
		exerciseByGuid?: { [guid: string]: Exercise };
		setTemplates?: SetTemplate[];
		valid?: boolean | undefined;
		oninput?(params: SetTemplate[]): void;
		onvalid?(valid: boolean): void;
	}

	const createSuite = () =>
		create((data: Partial<NewSetsParams> = {}) => {
			test('setTemplates', m.errors_message_required(), () => {
				enforce(data.setTemplates?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import { unsafeId, getId } from '$lib/util';
	import Sortable from '../Sortable.svelte';
	import ExerciseSelector from './ExerciseSelector.svelte';
	import { getRealSetPosition } from './util';
	import { debounce } from '@aicacia/debounce';
	import { onMount } from 'svelte';
	import EditSetTemplate from './edit/EditSetTemplate.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { SetTemplate } from '$lib/state/workoutTemplates.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';

	let {
		exercises = [],
		exerciseByGuid = $bindable({}),
		setTemplates = $bindable([]),
		valid = $bindable(undefined),
		oninput,
		onvalid
	}: NewSetProps = $props();

	let setExercises = $state(exercises);
	let hasMultipleSets = $derived(setTemplates.length > 1);

	let suite = $derived(createSuite());
	let result = $derived(suite.get());

	const validate = debounce(
		() =>
			new Promise((resolve) => {
				suite({ setTemplates }).done((r) => {
					result = r;
					const newValid = result.isValid() && isSetsValid();
					if (newValid !== valid) {
						valid = newValid;
						onvalid?.(valid);
					}
					resolve(valid);
				});
			}),
		300
	);
	function validateAll() {
		validate();
		validate.flush();
	}

	function createOnSetChange(index: number) {
		return (setTemplate: SetTemplate) => {
			const newSetTemplates = setTemplates.slice();
			newSetTemplates[index] = setTemplate;
			setTemplates = newSetTemplates;
			oninput?.(newSetTemplates);
			validate();
		};
	}
	function createOnSetDelete(index: number) {
		return (_setTemplate: SetTemplate) => {
			const newSetTemplates = setTemplates.slice();
			newSetTemplates.splice(index, 1);
			setTemplates = newSetTemplates;
			oninput?.(newSetTemplates);
			validate();
		};
	}
	let setTemplatesValid: (boolean | undefined)[] = [];
	function createOnSetValid(index: number) {
		return (setValid: boolean) => {
			const newSetTemplatesValid = setTemplatesValid.slice(0, setTemplates.length);
			newSetTemplatesValid[index] = setValid;
			setTemplatesValid = newSetTemplatesValid;
			const newValid = result.isValid() && isSetsValid();
			if (newValid !== valid) {
				valid = newValid;
				onvalid?.(valid);
			}
		};
	}
	function isSetsValid() {
		return setTemplatesValid.every((valid) => valid === true);
	}

	function onExercisesInput(newSetExercises: Exercise[]) {
		const newSetTemplates = setTemplates.slice(0, newSetExercises.length);
		for (let i = 0; i < newSetExercises.length; i++) {
			const exercise = newSetExercises[i];
			const set = newSetTemplates[i];
			if (set) {
				set.exerciseGuid = exercise.guid;
			} else {
				newSetTemplates[i] = {
					id: unsafeId(),
					setType: 'working_set',
					exerciseGuid: exercise.guid
				} as SetTemplate;
			}
			exerciseByGuid[exercise.guid] = exercise;
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

<ExerciseSelector exercises={setExercises} oninput={onExercisesInput} />
<div role="list" class="mt-2">
	<Sortable items={setTemplates} getKey={getId} onMove={onMoveSet}>
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
			<EditSetTemplate
				id={item.id}
				exercise={exerciseByGuid[item.exerciseGuid]}
				position={getRealSetPosition(setTemplates, item, index)}
				setTemplate={item}
				{isDragging}
				{isDraggingOver}
				{onDragStart}
				{onDragEnd}
				{onDragLeave}
				{onDragOver}
				showExercise={hasMultipleSets}
				showDelete={false}
				canMove={hasMultipleSets}
				oninput={createOnSetChange(index)}
				ondelete={createOnSetDelete(index)}
				onvalid={createOnSetValid(index)}
			/>
		{/snippet}
	</Sortable>
</div>
