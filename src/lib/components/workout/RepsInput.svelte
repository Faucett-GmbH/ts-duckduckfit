<svelte:options immutable />

<script lang="ts" context="module">
	export type RepsInputType = 'reps' | 'asManyRoundsAsPossible' | 'percentOfOneRepMax' | 'repRange';

	export interface RepsInputParams {
		asManyRoundsAsPossible?: boolean;
		percentOfOneRepMax?: number;
		repRangeHigh?: number;
		repRangeLow?: number;
		reps?: number;
		repsForTimeInSeconds?: number;
		repsInReserve?: number;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { SuiteResult } from 'vest';
	import InputResults from '../InputResults.svelte';
	import TypedInput from '../inputs/TypedInput.svelte';
	import { onMount } from 'svelte';

	export let repsInput: RepsInputParams;
	export let disabled = false;
	export let cn: (fieldName: string) => string;
	export let result: SuiteResult<any, any>;
	export let inputType: RepsInputType = 'reps';
	export let onInputTypeChange: (
		repsInput: RepsInputParams,
		fields: Array<keyof RepsInputParams>
	) => void;
	export let onTypedInputChange: (e: CustomEvent<[name: string, value: string | number]>) => void;

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
			repRangeLow: undefined,
			repRangeHigh: undefined,
			percentOfOneRepMax: undefined,
			asManyRoundsAsPossible: undefined,
			reps: undefined
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
				className="flex-grow {cn('reps')}"
				name="reps"
				{disabled}
				value={repsInput.reps || 0}
				on:input={onTypedInputChange}
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
				className="flex-grow {cn('percentOfOneRepMax')}"
				name="percentOfOneRepMax"
				{disabled}
				value={repsInput.percentOfOneRepMax || 0}
				unit={'%'}
				on:input={onTypedInputChange}
			/>
			<InputResults name="percentOfOneRepMax" {result} />
		</div>
	{:else if inputType === 'repRange'}
		<div class="me-1 flex flex-shrink flex-col">
			<div class="flex flex-shrink flex-row">
				<div class="flex flex-shrink flex-col">
					<div class="flex flex-shrink flex-row">
						<TypedInput
							className="flex-grow {cn('repRangeLow')}"
							name="repRangeLow"
							{disabled}
							value={repsInput.repRangeLow || 0}
							on:input={onTypedInputChange}
						/>
					</div>
					<InputResults name="repRangeLow" {result} />
				</div>
				<span class="px-1">-</span>
				<div class="flex flex-shrink flex-col">
					<div class="flex flex-shrink flex-row">
						<TypedInput
							className="flex-grow {cn('repRangeHigh')}"
							name="repRangeHigh"
							{disabled}
							value={repsInput.repRangeHigh || 0}
							on:input={onTypedInputChange}
						/>
					</div>
					<InputResults name="repRangeHigh" {result} />
				</div>
			</div>
		</div>
	{/if}
	<div class="me-1 flex flex-shrink flex-col">
		<select on:change={onSelectRepsInputType} value={inputType}>
			<option value="reps" title={m.workouts.set.repsLabel()}>{m.workouts.set.repsLabel()}</option>
			<!-- <option value="percentOfOneRepMax" title={m.workouts.set.percentOfOneRepMaxLabel()}>{m.workouts.set.percentOfOneRepMaxLabel()}</option> -->
			<option value="repRange" title={m.workouts.set.repRangeLabel()}
				>{m.workouts.set.repRangeLabel()}</option
			>
			<option value="asManyRoundsAsPossible" title={m.workouts.set.asManyRoundsAsPossibleLabel()}
				>{m.workouts.set.asManyRoundsAsPossibleAcronym()}</option
			>
		</select>
	</div>
</div>
