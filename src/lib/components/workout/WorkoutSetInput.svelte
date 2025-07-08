<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type WorkoutSetInputParams = {
		attemptedDistanceInMeters?: number;
		attemptedTimeInSeconds?: number;
		attemptedReps?: number;
		attemptedWeightInKilograms?: number;
	};

	const createSuite = (LL: TranslationFunctions) =>
		create(
			(
				data: Partial<WorkoutSetInputParams> = {},
				exercise: Exercise,
				fields: Set<keyof WorkoutSetInputParams>
			) => {
				if (!fields.size) {
					return;
				}
				only(Array.from(fields));

				let attemptedDistanceInMeters = false;
				let attemptedTimeInSeconds = false;
				let attemptedReps = false;
				let attemptedWeightInKilograms = false;
				switch (exercise.execution) {
					case ExerciseExecutionType.DistanceDurationExerciseExecutionType: {
						attemptedDistanceInMeters = true;
						attemptedTimeInSeconds = true;
						break;
					}
					case ExerciseExecutionType.DistanceExerciseExecutionType: {
						attemptedDistanceInMeters = true;
						break;
					}
					case ExerciseExecutionType.DurationExerciseExecutionType: {
						attemptedTimeInSeconds = true;
						break;
					}
					case ExerciseExecutionType.RepsOnlyExerciseExecutionType: {
						attemptedReps = true;
						break;
					}
					case ExerciseExecutionType.WeightDistanceExerciseExecutionType: {
						attemptedWeightInKilograms = true;
						attemptedDistanceInMeters = true;
						break;
					}
					case ExerciseExecutionType.WeightDurationExerciseExecutionType: {
						attemptedWeightInKilograms = true;
						attemptedTimeInSeconds = true;
						break;
					}
					case ExerciseExecutionType.WeightRepsExerciseExecutionType: {
						attemptedWeightInKilograms = true;
						attemptedReps = true;
						break;
					}
				}
				omitWhen(!attemptedDistanceInMeters, () => {
					test('attemptedDistanceInMeters', LL.errors.message.required(), () => {
						enforce(data.attemptedDistanceInMeters).greaterThan(0);
					});
				});
				omitWhen(!attemptedTimeInSeconds, () => {
					test('attemptedTimeInSeconds', LL.errors.message.required(), () => {
						enforce(data.attemptedTimeInSeconds).greaterThan(0);
					});
				});
				omitWhen(!attemptedReps, () => {
					test('attemptedReps', LL.errors.message.required(), () => {
						enforce(data.attemptedReps).greaterThan(0);
					});
				});
				omitWhen(!attemptedWeightInKilograms, () => {
					test('attemptedWeightInKilograms', LL.errors.message.required(), () => {
						enforce(data.attemptedWeightInKilograms || 0).greaterThanOrEquals(0);
					});
				});
			}
		);
</script>

<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';
	import { ExerciseExecutionType, UnitSystem, type Exercise } from '$lib/openapi/duckduckfit';
	import classnames from 'vest/classnames';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { TranslationFunctions } from '$lib/i18n/i18n-types';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '../InputResults.svelte';
	import MeasurementInput, { type Units } from '../inputs/MeasurementInput.svelte';
	import TypedInput from '../inputs/TypedInput.svelte';

	interface Props {
		setInput: WorkoutSetInputParams;
		exercise: Exercise;
		valid?: boolean | undefined;
		unitSystem?: UnitSystem;
	}

	let {
		setInput = $bindable(),
		exercise,
		valid = $bindable(undefined),
		unitSystem = UnitSystem.MetricUnitSystem
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		input: WorkoutSetInputParams;
		valid: boolean;
	}>();

	let suite = $derived(createSuite($LL));
	let result = $derived(suite.get());
	let loading = false;
	let disabled = $derived(loading);
	let cn = $derived(
		classnames(result, {
			untested: 'untested',
			tested: 'tested',
			invalid: 'invalid',
			valid: 'valid',
			warning: 'warning'
		})
	);
	const fields = new Set<keyof WorkoutSetInputParams>();
	const validate = debounce(() => {
		suite(setInput, exercise, fields).done((r) => {
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
		const field = name as keyof WorkoutSetInputParams;
		onChange(field, value);
	}
	function onTypedInputChange(e: CustomEvent<[name: string, value: string | number]>) {
		const [name, value] = e.detail;
		const field = name as keyof WorkoutSetInputParams;
		onChange(field, value);
	}
	function onChange<K extends keyof WorkoutSetInputParams>(field: K, value: any) {
		setInput = { ...setInput, [field]: value };
		dispatch('input', setInput);
		fields.add(field);
		validate();
	}

	onMount(() => {
		for (const field of Object.keys(setInput)) {
			fields.add(field as keyof WorkoutSetInputParams);
		}
		validate();
		validate.flush();
	});
</script>

<div class="flex flex-shrink flex-row">
	{#if exercise.execution === ExerciseExecutionType.DistanceDurationExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedDistanceInMeters')}
				name="attemptedDistanceInMeters"
				{disabled}
				metricValue={setInput.attemptedDistanceInMeters || 0}
				metricUnits="m"
				type="distance"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedDistanceInMeters" {result} />
		</div>
		<div class="flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedTimeInSeconds')}
				name="attemptedTimeInSeconds"
				{disabled}
				metricValue={setInput.attemptedTimeInSeconds || 0}
				metricUnits="s"
				type="duration"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedTimeInSeconds" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.DistanceExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedDistanceInMeters')}
				name="attemptedDistanceInMeters"
				{disabled}
				metricValue={setInput.attemptedDistanceInMeters || 0}
				metricUnits="m"
				type="distance"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedDistanceInMeters" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.DurationExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedTimeInSeconds')}
				name="attemptedTimeInSeconds"
				{disabled}
				metricValue={setInput.attemptedTimeInSeconds || 0}
				metricUnits="s"
				type="duration"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedTimeInSeconds" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.RepsOnlyExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				className="flex-grow {cn('attemptedReps')}"
				name="attemptedReps"
				{disabled}
				value={setInput.attemptedReps || 0}
				unit={$LL.workouts.set.repsLabel()}
				on:input={onTypedInputChange}
			/>
			<InputResults name="attemptedReps" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.WeightDistanceExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedWeightInKilograms')}
				name="attemptedWeightInKilograms"
				{disabled}
				metricValue={setInput.attemptedWeightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedWeightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedDistanceInMeters')}
				name="attemptedDistanceInMeters"
				{disabled}
				metricValue={setInput.attemptedDistanceInMeters || 0}
				metricUnits="m"
				type="distance"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedDistanceInMeters" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.WeightDurationExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedWeightInKilograms')}
				name="attemptedWeightInKilograms"
				{disabled}
				metricValue={setInput.attemptedWeightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedWeightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedTimeInSeconds')}
				name="attemptedTimeInSeconds"
				{disabled}
				metricValue={setInput.attemptedTimeInSeconds || 0}
				metricUnits="s"
				type="duration"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedTimeInSeconds" {result} />
		</div>
	{:else if exercise.execution === ExerciseExecutionType.WeightRepsExerciseExecutionType}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				className={cn('attemptedWeightInKilograms')}
				name="attemptedWeightInKilograms"
				{disabled}
				metricValue={setInput.attemptedWeightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				system={unitSystem}
				on:input={onMeasurementChange}
			/>
			<InputResults name="attemptedWeightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				className="flex-grow {cn('attemptedReps')}"
				name="attemptedReps"
				{disabled}
				value={setInput.attemptedReps || 0}
				unit={$LL.workouts.set.repsLabel()}
				on:input={onTypedInputChange}
			/>
			<InputResults name="attemptedReps" {result} />
		</div>
	{/if}
</div>
