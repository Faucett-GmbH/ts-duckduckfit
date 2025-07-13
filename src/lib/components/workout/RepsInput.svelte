<script lang="ts" module>
	export type RepsInputType = 'reps' | 'asManyRoundsAsPossible' | 'percentOfOneRepMax' | 'repRange';

	export interface RepsInputProps {
		repsInput: RepsInputParams;
		disabled?: boolean;
		cn: (fieldName: string) => string;
		result: SuiteResult<any, any>;
		inputType?: RepsInputType;
		onInputTypeChange(repsInput: RepsInputParams, fields: Array<keyof RepsInputParams>): void;
		onTypedInputChange(value: number, name?: string): void;
	}

	export interface RepsInputParams {
		asManyRoundsAsPossible: boolean | null;
		percentOfOneRepMax: number | null;
		repRangeHigh: number | null;
		repRangeLow: number | null;
		reps: number | null;
		repsForTimeInSeconds: number | null;
		repsInReserve: number | null;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { SuiteResult } from 'vest';
	import InputResults from '../InputResults.svelte';
	import TypedInput from '../inputs/TypedInput.svelte';
	import { onMount } from 'svelte';

	let {
		repsInput,
		disabled = $bindable(false),
		cn,
		result,
		inputType = $bindable(),
		onInputTypeChange,
		onTypedInputChange
	}: RepsInputProps = $props();

	onMount(() => {
		if (repsInput.reps) {
			inputType = 'reps';
		} else if (repsInput.asManyRoundsAsPossible === true) {
			inputType = 'asManyRoundsAsPossible';
		} else if (repsInput.percentOfOneRepMax) {
			inputType = 'percentOfOneRepMax';
		} else if (repsInput.repRangeLow && repsInput.repRangeHigh) {
			inputType = 'repRange';
		}
	});

	function onSelectRepsInputType(e: Event & { currentTarget: HTMLSelectElement }) {
		const newSetTemplate: RepsInputParams = {
			...repsInput,
			repRangeLow: null,
			repRangeHigh: null,
			percentOfOneRepMax: null,
			asManyRoundsAsPossible: null,
			reps: null
		};
		const newInputType = e.currentTarget.value as RepsInputType;
		const fields: Array<keyof RepsInputParams> = [];
		switch (newInputType) {
			case 'reps':
				newSetTemplate.reps = 0;
				fields.push('reps');
				break;
			case 'asManyRoundsAsPossible':
				newSetTemplate.asManyRoundsAsPossible = true;
				fields.push('asManyRoundsAsPossible');
				break;
			case 'percentOfOneRepMax':
				newSetTemplate.percentOfOneRepMax = 0;
				fields.push('percentOfOneRepMax');
				break;
			case 'repRange':
				newSetTemplate.repRangeLow = 0;
				newSetTemplate.repRangeHigh = 0;
				fields.push('repRangeLow', 'repRangeHigh');
				break;
		}
		inputType = newInputType;
		repsInput = newSetTemplate;
		onInputTypeChange(repsInput, fields);
	}
</script>

<div class="flex flex-shrink flex-row flex-wrap items-start">
	{#if inputType === 'reps'}
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				class="flex-grow {cn('reps')}"
				name="reps"
				{disabled}
				value={repsInput.reps || 0}
				oninput={onTypedInputChange}
			/>
			<InputResults name="reps" {result} />
		</div>
	{:else if inputType === 'asManyRoundsAsPossible'}
		<div class="me-1 flex flex-shrink flex-col">
			<InputResults name="asManyRoundsAsPossible" {result} />
		</div>
	{:else if inputType === 'percentOfOneRepMax'}
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				class="flex-grow {cn('percentOfOneRepMax')}"
				name="percentOfOneRepMax"
				{disabled}
				value={repsInput.percentOfOneRepMax || 0}
				unit={'%'}
				oninput={onTypedInputChange}
			/>
			<InputResults name="percentOfOneRepMax" {result} />
		</div>
	{:else if inputType === 'repRange'}
		<div class="me-1 flex flex-shrink flex-col">
			<div class="flex flex-shrink flex-row">
				<div class="flex flex-shrink flex-col">
					<div class="flex flex-shrink flex-row">
						<TypedInput
							class="flex-grow {cn('repRangeLow')}"
							name="repRangeLow"
							{disabled}
							value={repsInput.repRangeLow || 0}
							oninput={onTypedInputChange}
						/>
					</div>
					<InputResults name="repRangeLow" {result} />
				</div>
				<span class="px-1">-</span>
				<div class="flex flex-shrink flex-col">
					<div class="flex flex-shrink flex-row">
						<TypedInput
							class="flex-grow {cn('repRangeHigh')}"
							name="repRangeHigh"
							{disabled}
							value={repsInput.repRangeHigh || 0}
							oninput={onTypedInputChange}
						/>
					</div>
					<InputResults name="repRangeHigh" {result} />
				</div>
			</div>
		</div>
	{/if}
	<div class="me-1 flex flex-shrink flex-col">
		<select {disabled} onchange={onSelectRepsInputType} value={inputType}>
			<option value="reps" title={m.workouts_set_reps_label()}>{m.workouts_set_reps_label()}</option
			>
			<!-- <option value="percentOfOneRepMax" title={m.workouts_set_percentOfOneRepMaxLabel()}>{m.workouts_set_percentOfOneRepMaxLabel()}</option> -->
			<option value="repRange" title={m.workouts_set_rep_range_label()}
				>{m.workouts_set_rep_range_label()}</option
			>
			<option
				value="asManyRoundsAsPossible"
				title={m.workouts_set_as_many_rounds_as_possible_label()}
				>{m.workouts_set_as_many_rounds_as_possible_acronym()}</option
			>
		</select>
	</div>
</div>
