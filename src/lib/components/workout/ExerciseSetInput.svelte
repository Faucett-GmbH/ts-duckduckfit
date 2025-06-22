<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export interface ExerciseSetInputProps {
		setInput: ExerciseSetInputParams;
		exercise: Exercise;
		valid?: boolean;
		disabled?: boolean;
		restAfter?: boolean;
		oninput(params: ExerciseSetInputParams): void;
		onvalid(valid: boolean): void;
	}

	export interface ExerciseSetInputParams extends RepsInputParams {
		distanceInMeters?: number;
		distanceUnits?: Units<'metric', 'distance'>;
		restAfterInSeconds?: number;
		restAfterUnits?: Units<'metric', 'duration'>;
		timeInSeconds?: number;
		timeUnits?: Units<'metric', 'duration'>;
		weightInKilograms?: number;
		weightUnits?: Units<'metric', 'mass'>;
	}

	const createSuite = () =>
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
					case 'DISTANCE_DURATION': {
						distanceInMeters = true;
						timeInSeconds = true;
						break;
					}
					case 'DISTANCE': {
						distanceInMeters = true;
						break;
					}
					case 'DURATION': {
						timeInSeconds = true;
						break;
					}
					case 'REPS_ONLY': {
						reps = true;
						break;
					}
					case 'WEIGHT_DISTANCE': {
						weightInKilograms = true;
						distanceInMeters = true;
						break;
					}
					case 'WEIGHT_DURATION': {
						weightInKilograms = true;
						timeInSeconds = true;
						break;
					}
					case 'WEIGHT_REPS': {
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
							m.errors_message_must_be_less_than({ value: m.workouts_set_rep_range_high_label() }),
							() => {
								enforce(data.repRangeLow || 0).lessThanOrEquals(data.repRangeHigh);
							}
						);
						test('repRangeHigh', m.errors_message_required(), () => {
							enforce(data.repRangeHigh).greaterThan(0);
						});
						test(
							'repRangeHigh',
							m.errors_message_must_be_less_than({ value: m.workouts_set_rep_range_low_label() }),
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
	import classnames from 'vest/classnames';
	import { onMount } from 'svelte';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '../InputResults.svelte';
	import MeasurementInput, { type Units } from '../inputs/MeasurementInput.svelte';
	import RepsInput, { type RepsInputParams, type RepsInputType } from './RepsInput.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';

	let {
		setInput,
		exercise,
		valid = $bindable(),
		disabled = $bindable(false),
		restAfter = true,
		onvalid,
		oninput
	}: ExerciseSetInputProps = $props();

	let repsInputType: RepsInputType = $state('reps');
	let suite = createSuite();
	let result = $state(suite.get());
	let loading = $state(false);
	let cn = $derived(
		classnames(result, {
			untested: 'untested',
			tested: 'tested',
			invalid: 'invalid',
			valid: 'valid',
			warning: 'warning'
		})
	);

	const fields = new Set<keyof ExerciseSetInputParams>();
	const validate = debounce(() => {
		suite(setInput, exercise, repsInputType, fields).done((r) => {
			result = r;
			const newValid = result.isValid();
			if (newValid !== valid) {
				valid = newValid;
				onvalid(valid);
			}
		});
		fields.clear();
	}, 300);
	function onMeasurementChange(
		metricValue: number,
		_metricUnits: Units<'metric', any>,
		name?: string
	) {
		const field = name as keyof ExerciseSetInputParams;
		onChange(field, metricValue);
	}
	function onTypedInputChange(value: number, name?: string) {
		const field = name as keyof ExerciseSetInputParams;
		onChange(field, value);
	}
	function onChange<K extends keyof ExerciseSetInputParams>(field: K, value: any) {
		setInput = { ...setInput, [field]: value };
		oninput(setInput);
		fields.add(field);
		validate();
	}

	function onInputTypeChange(
		newSetTemplate: ExerciseSetInputParams,
		updatedFields: Array<keyof ExerciseSetInputParams>
	) {
		setInput = newSetTemplate;
		oninput(setInput);
		for (const field of updatedFields) {
			fields.add(field);
		}
		validate();
	}

	$effect(() => {
		disabled = loading || result.isValid();
	});

	onMount(() => {
		fields.add('restAfterInSeconds');

		let distanceInMeters = false;
		let timeInSeconds = false;
		let reps = false;
		let weightInKilograms = false;
		switch (exercise.execution) {
			case 'DISTANCE_DURATION': {
				distanceInMeters = true;
				timeInSeconds = true;
				break;
			}
			case 'DISTANCE': {
				distanceInMeters = true;
				break;
			}
			case 'DURATION': {
				timeInSeconds = true;
				break;
			}
			case 'REPS_ONLY': {
				reps = true;
				break;
			}
			case 'WEIGHT_DISTANCE': {
				weightInKilograms = true;
				distanceInMeters = true;
				break;
			}
			case 'WEIGHT_DURATION': {
				weightInKilograms = true;
				timeInSeconds = true;
				break;
			}
			case 'WEIGHT_REPS': {
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
	{#if exercise.execution === 'DISTANCE_DURATION'}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="distanceInMeters"
				>{m.workouts_set_distance_in_meters_label()}</label
			>
			<MeasurementInput
				class={cn('distanceInMeters')}
				name="distanceInMeters"
				{disabled}
				metricValue={setInput.distanceInMeters || 0}
				metricUnits="m"
				type="distance"
				oninput={onMeasurementChange}
			/>
			<InputResults name="distanceInMeters" {result} />
		</div>
		<div class="me-1 ms-2 flex flex-shrink flex-col">
			<label class="text-xs" for="timeInSeconds">{m.workouts_set_time_in_seconds_label()}</label>
			<MeasurementInput
				class={cn('timeInSeconds')}
				name="timeInSeconds"
				{disabled}
				metricValue={setInput.timeInSeconds || 0}
				metricUnits="s"
				type="duration"
				oninput={onMeasurementChange}
			/>
			<InputResults name="timeInSeconds" {result} />
		</div>
	{:else if exercise.execution === 'DISTANCE'}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="distanceInMeters"
				>{m.workouts_set_distance_in_meters_label()}</label
			>
			<MeasurementInput
				class={cn('distanceInMeters')}
				name="distanceInMeters"
				{disabled}
				metricValue={setInput.distanceInMeters || 0}
				metricUnits="m"
				type="distance"
				oninput={onMeasurementChange}
			/>
			<InputResults name="distanceInMeters" {result} />
		</div>
	{:else if exercise.execution === 'DURATION'}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="timeInSeconds">{m.workouts_set_time_in_seconds_label()}</label>
			<MeasurementInput
				class={cn('timeInSeconds')}
				name="timeInSeconds"
				{disabled}
				metricValue={setInput.timeInSeconds || 0}
				metricUnits="s"
				type="duration"
				oninput={onMeasurementChange}
			/>
			<InputResults name="timeInSeconds" {result} />
		</div>
	{:else if exercise.execution === 'REPS_ONLY'}
		<RepsInput
			repsInput={setInput}
			{cn}
			{disabled}
			{onTypedInputChange}
			{onInputTypeChange}
			{result}
		/>
	{:else if exercise.execution === 'WEIGHT_DISTANCE'}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="weightInKilograms"
				>{m.workouts_set_weight_in_kilograms_label()}</label
			>
			<MeasurementInput
				class={cn('weightInKilograms')}
				name="weightInKilograms"
				{disabled}
				metricValue={setInput.weightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				oninput={onMeasurementChange}
			/>
			<InputResults name="weightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="distanceInMeters"
				>{m.workouts_set_distance_in_meters_label()}</label
			>
			<MeasurementInput
				class={cn('distanceInMeters')}
				name="distanceInMeters"
				{disabled}
				metricValue={setInput.distanceInMeters || 0}
				metricUnits="m"
				type="distance"
				oninput={onMeasurementChange}
			/>
			<InputResults name="distanceInMeters" {result} />
		</div>
	{:else if exercise.execution === 'WEIGHT_DURATION'}
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="weightInKilograms"
				>{m.workouts_set_weight_in_kilograms_label()}</label
			>
			<MeasurementInput
				class={cn('weightInKilograms')}
				name="weightInKilograms"
				{disabled}
				metricValue={setInput.weightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				oninput={onMeasurementChange}
			/>
			<InputResults name="weightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<label class="text-xs" for="timeInSeconds">{m.workouts_set_time_in_seconds_label()}</label>
			<MeasurementInput
				class={cn('timeInSeconds')}
				name="timeInSeconds"
				{disabled}
				metricValue={setInput.timeInSeconds || 0}
				metricUnits="s"
				type="duration"
				oninput={onMeasurementChange}
			/>
			<InputResults name="timeInSeconds" {result} />
		</div>
	{:else if exercise.execution === 'WEIGHT_REPS'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('weightInKilograms')}
				name="weightInKilograms"
				{disabled}
				metricValue={setInput.weightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				oninput={onMeasurementChange}
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
	<label class="text-xs" for="restAfterInSeconds"
		>{m.workouts_set_rest_after_in_seconds_label()}</label
	>
	<MeasurementInput
		name="restAfterInSeconds"
		{disabled}
		metricValue={setInput.restAfterInSeconds || 0}
		type="duration"
		metricUnits="s"
		oninput={onMeasurementChange}
	/>
</div>
