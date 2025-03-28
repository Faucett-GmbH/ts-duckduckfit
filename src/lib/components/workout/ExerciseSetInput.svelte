<svelte:options immutable />

<script lang="ts" context="module">
	import { create, test, enforce, only, omitWhen } from 'vest';

	export interface ExerciseSetInputParams extends RepsInputParams {
		distanceInMeters?: number;
		distanceUnits?: Units<'METRIC', 'distance'>;
		restAfterInSeconds?: number;
		restAfterUnits?: Units<'METRIC', 'duration'>;
		timeInSeconds?: number;
		timeUnits?: Units<'METRIC', 'duration'>;
		weightInKilograms?: number;
		weightUnits?: Units<'METRIC', 'mass'>;
	}

	const createSuite = (LL: TranslationFunctions) =>
		create(
			(
				data: Partial<ExerciseSetInputParams> = {},
				exercise: Exercise,
				repsInputType: string,
				fields: Set<keyof ExerciseSetInputParams>
			) => {
				if (!fields.size) {
					return;
				}
				if (fields.has('repRangeLow')) {
					fields.add('repRangeHigh');
				}
				if (fields.has('repRangeHigh')) {
					fields.add('repRangeLow');
				}
				only(Array.from(fields));

				let distanceInMeters = false;
				let timeInSeconds = false;
				let reps = false;
				let weightInKilograms = false;
				switch (exercise.execution) {
					case ExerciseExecutionType.DistanceDurationExerciseExecutionType: {
						distanceInMeters = true;
						timeInSeconds = true;
						break;
					}
					case ExerciseExecutionType.DistanceExerciseExecutionType: {
						distanceInMeters = true;
						break;
					}
					case ExerciseExecutionType.DurationExerciseExecutionType: {
						timeInSeconds = true;
						break;
					}
					case ExerciseExecutionType.RepsOnlyExerciseExecutionType: {
						reps = true;
						break;
					}
					case ExerciseExecutionType.WeightDistanceExerciseExecutionType: {
						weightInKilograms = true;
						distanceInMeters = true;
						break;
					}
					case ExerciseExecutionType.WeightDurationExerciseExecutionType: {
						weightInKilograms = true;
						timeInSeconds = true;
						break;
					}
					case ExerciseExecutionType.WeightRepsExerciseExecutionType: {
						weightInKilograms = true;
						reps = true;
						break;
					}
				}
				omitWhen(!distanceInMeters, () => {
					test('distanceInMeters', m.errors_message_required(), () => {
						enforce(data.distanceInMeters).greaterThan(0);
					});
				});
				omitWhen(!timeInSeconds, () => {
					test('timeInSeconds', m.errors_message_required(), () => {
						enforce(data.timeInSeconds).greaterThan(0);
					});
				});
				omitWhen(!reps, () => {
					omitWhen(repsInputType !== 'reps', () => {
						test('reps', m.errors_message_required(), () => {
							enforce(data.reps).greaterThan(0);
						});
					});
					omitWhen(repsInputType !== 'repRange', () => {
						test('repRangeLow', m.errors_message_required(), () => {
							enforce(data.repRangeLow).greaterThan(0);
						});
						test(
							'repRangeLow',
							LL.errors.message.mustBeLessThan(LL.workouts.set.repRangeHighLabel()),
							() => {
								enforce(data.repRangeLow || 0).lessThanOrEquals(data.repRangeHigh);
							}
						);
						test('repRangeHigh', m.errors_message_required(), () => {
							enforce(data.repRangeHigh).greaterThan(0);
						});
						test(
							'repRangeHigh',
							LL.errors.message.mustBeLessThan(LL.workouts.set.repRangeLowLabel()),
							() => {
								enforce(data.repRangeHigh || 0).greaterThanOrEquals(data.repRangeLow);
							}
						);
					});
					omitWhen(repsInputType !== 'asManyRoundsAsPossible', () => {
						test('asManyRoundsAsPossible', m.errors_message_required(), () => {
							enforce(data.asManyRoundsAsPossible).equals(true);
						});
					});
					omitWhen(repsInputType !== 'percentOfOneRepMax', () => {
						test('percentOfOneRepMax', m.errors_message_required(), () => {
							enforce(data.percentOfOneRepMax).greaterThan(0);
						});
					});
				});
				omitWhen(!weightInKilograms, () => {
					test('weightInKilograms', m.errors_message_required(), () => {
						enforce(data.weightInKilograms || 0).greaterThanOrEquals(0);
					});
				});
			}
		);
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ExerciseExecutionType, UnitSystem, type Exercise } from '$lib/openapi/duckduckfit';
	import classnames from 'vest/classnames';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { TranslationFunctions } from '$lib/i18n/i18n-types';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '../InputResults.svelte';
	import MeasurementInput, { type Units } from '../inputs/MeasurementInput.svelte';
	import RepsInput, { type RepsInputParams, type RepsInputType } from './RepsInput.svelte';

	export let setInput: ExerciseSetInputParams;
	export let exercise: Exercise;
	export let valid: boolean | undefined = undefined;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
	export let disabled = false;
	export let restAfter = true;

	const dispatch = createEventDispatcher<{
		input: ExerciseSetInputParams;
		valid: boolean;
	}>();

	let repsInputType: RepsInputType = 'reps';
	$: suite = createSuite($LL);
	$: result = suite.get();
	let loading = false;
	$: disabled = loading;
	$: cn = classnames(result, {
		untested: 'untested',
		tested: 'tested',
		invalid: 'invalid',
		valid: 'valid',
		warning: 'warning'
	});
	const fields = new Set<keyof ExerciseSetInputParams>();
	const validate = debounce(() => {
		suite(setInput, exercise, repsInputType, fields).done((r) => {
			result = r;
			const newValid = result.isValid();
			if (newValid !== valid) {
				valid = newValid;
				dispatch('valid', valid);
			}
		});
		fields.clear();
	}, 300);
	function onMeasurementChange(
		e: CustomEvent<[name: string, value: [metricValue: number, metricUnits: Units<'METRIC', any>]]>
	) {
		let [name, [value, _unit]] = e.detail;
		const field = name as keyof ExerciseSetInputParams;
		onChange(field, value);
	}
	function onTypedInputChange(e: CustomEvent<[name: string, value: string | number]>) {
		const [name, value] = e.detail;
		const field = name as keyof ExerciseSetInputParams;
		onChange(field, value);
	}
	function onChange<K extends keyof ExerciseSetInputParams>(field: K, value: any) {
		setInput = { ...setInput, [field]: value };
		dispatch('input', setInput);
		fields.add(field);
		validate();
	}

	function onInputTypeChange(
		newSetTemplate: ExerciseSetInputParams,
		updatedFields: Array<keyof ExerciseSetInputParams>
	) {
		setInput = newSetTemplate;
		dispatch('input', setInput);
		for (const field of updatedFields) {
			fields.add(field);
		}
		validate();
	}

	onMount(() => {
		fields.add('restAfterInSeconds');

		let distanceInMeters = false;
		let timeInSeconds = false;
		let reps = false;
		let weightInKilograms = false;
		switch (exercise.execution) {
			case ExerciseExecutionType.DistanceDurationExerciseExecutionType: {
				distanceInMeters = true;
				timeInSeconds = true;
				break;
			}
			case ExerciseExecutionType.DistanceExerciseExecutionType: {
				distanceInMeters = true;
				break;
			}
			case ExerciseExecutionType.DurationExerciseExecutionType: {
				timeInSeconds = true;
				break;
			}
			case ExerciseExecutionType.RepsOnlyExerciseExecutionType: {
				reps = true;
				break;
			}
			case ExerciseExecutionType.WeightDistanceExerciseExecutionType: {
				weightInKilograms = true;
				distanceInMeters = true;
				break;
			}
			case ExerciseExecutionType.WeightDurationExerciseExecutionType: {
				weightInKilograms = true;
				timeInSeconds = true;
				break;
			}
			case ExerciseExecutionType.WeightRepsExerciseExecutionType: {
				weightInKilograms = true;
				reps = true;
				break;
			}
		}
		if (distanceInMeters) {
			fields.add('distanceInMeters');
		}
		if (timeInSeconds) {
			fields.add('timeInSeconds');
		}
		if (reps) {
			fields.add('asManyRoundsAsPossible');
			fields.add('percentOfOneRepMax');
			fields.add('repRangeHigh');
			fields.add('repRangeLow');
			fields.add('reps');
			fields.add('repsForTimeInSeconds');
			fields.add('repsInReserve');
		}
		if (weightInKilograms) {
			fields.add('weightInKilograms');
		}

		validate();
		validate.flush();
	});
</script>

<div class="flex flex-shrink flex-row">
	{#if exercise.execution === ExerciseExecutionType.DistanceDurationExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="distanceInMeters">{m.workouts.set.distanceInMetersLabel()}</label>
			<MeasurementInput
				className={cn('distanceInMeters')}
				name="distanceInMeters"
				{disabled}
				metricValue={setInput.distanceInMeters || 0}
				metricUnits="m"
				type="distance"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="distanceInMeters" {result} />
		</div>
		<div class="me-1 ms-2 flex flex-shrink flex-col">
			<label class="text-xs" for="timeInSeconds">{m.workouts.set.timeInSecondsLabel()}</label>
			<MeasurementInput
				className={cn('timeInSeconds')}
				name="timeInSeconds"
				{disabled}
				metricValue={setInput.timeInSeconds || 0}
				metricUnits="s"
				type="duration"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="timeInSeconds" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.DistanceExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="distanceInMeters">{m.workouts.set.distanceInMetersLabel()}</label>
			<MeasurementInput
				className={cn('distanceInMeters')}
				name="distanceInMeters"
				{disabled}
				metricValue={setInput.distanceInMeters || 0}
				metricUnits="m"
				type="distance"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="distanceInMeters" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.DurationExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="timeInSeconds">{m.workouts.set.timeInSecondsLabel()}</label>
			<MeasurementInput
				className={cn('timeInSeconds')}
				name="timeInSeconds"
				{disabled}
				metricValue={setInput.timeInSeconds || 0}
				metricUnits="s"
				type="duration"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="timeInSeconds" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.RepsOnlyExerciseExecutionType}
		<RepsInput
			repsInput={setInput}
			{cn}
			{disabled}
			{onTypedInputChange}
			{onInputTypeChange}
			{result}
		/>
	{:else if exercise.execution === ExerciseExecutionType.WeightDistanceExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="weightInKilograms"
				>{m.workouts.set.weightInKilogramsLabel()}</label
			>
			<MeasurementInput
				className={cn('weightInKilograms')}
				name="weightInKilograms"
				{disabled}
				metricValue={setInput.weightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="weightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="distanceInMeters">{m.workouts.set.distanceInMetersLabel()}</label>
			<MeasurementInput
				className={cn('distanceInMeters')}
				name="distanceInMeters"
				{disabled}
				metricValue={setInput.distanceInMeters || 0}
				metricUnits="m"
				type="distance"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="distanceInMeters" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.WeightDurationExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="weightInKilograms"
				>{m.workouts.set.weightInKilogramsLabel()}</label
			>
			<MeasurementInput
				className={cn('weightInKilograms')}
				name="weightInKilograms"
				{disabled}
				metricValue={setInput.weightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="weightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="timeInSeconds">{m.workouts.set.timeInSecondsLabel()}</label>
			<MeasurementInput
				className={cn('timeInSeconds')}
				name="timeInSeconds"
				{disabled}
				metricValue={setInput.timeInSeconds || 0}
				metricUnits="s"
				type="duration"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="timeInSeconds" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.WeightRepsExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('weightInKilograms')}
				name="weightInKilograms"
				{disabled}
				metricValue={setInput.weightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="weightInKilograms" {result} />
		</div>
		<RepsInput
			repsInput={setInput}
			{cn}
			{disabled}
			{onTypedInputChange}
			{onInputTypeChange}
			bind:inputType={repsInputType}
			{result}
		/>
	{/if}
</div>
<div class="me-1 flex flex-shrink flex-col" class:hidden={!restAfter}>
	<label class="text-xs" for="restAfterInSeconds">{m.workouts.set.restAfterInSecondsLabel()}</label>
	<MeasurementInput
		name="restAfterInSeconds"
		{disabled}
		metricValue={setInput.restAfterInSeconds || 0}
		type="duration"
		metricUnits="s"
		system={unitSystem}
		on:input={onMeasurementChange}
	/>
</div>
