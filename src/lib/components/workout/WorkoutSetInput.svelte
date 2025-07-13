<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export interface WorkoutSetInputProps {
		setInput: WorkoutSetInputParams;
		exercise: Exercise;
		valid?: boolean | undefined;
		oninput?(params: WorkoutSetInputParams): void;
		onvalid?(valid: boolean): void;
	}

	export interface WorkoutSetInputParams {
		attemptedDistanceInMeters: number | null;
		attemptedTimeInSeconds: number | null;
		attemptedReps: number | null;
		attemptedWeightInKilograms: number | null;
	}

	const createSuite = () =>
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
					case 'DISTANCE_DURATION': {
						attemptedDistanceInMeters = true;
						attemptedTimeInSeconds = true;
						break;
					}
					case 'DISTANCE': {
						attemptedDistanceInMeters = true;
						break;
					}
					case 'DURATION': {
						attemptedTimeInSeconds = true;
						break;
					}
					case 'REPS_ONLY': {
						attemptedReps = true;
						break;
					}
					case 'WEIGHT_DISTANCE': {
						attemptedWeightInKilograms = true;
						attemptedDistanceInMeters = true;
						break;
					}
					case 'WEIGHT_DURATION': {
						attemptedWeightInKilograms = true;
						attemptedTimeInSeconds = true;
						break;
					}
					case 'WEIGHT_REPS': {
						attemptedWeightInKilograms = true;
						attemptedReps = true;
						break;
					}
				}
				omitWhen(!attemptedDistanceInMeters, () => {
					test('attemptedDistanceInMeters', m.errors_message_required(), () => {
						enforce(data.attemptedDistanceInMeters).greaterThan(0);
					});
				});
				omitWhen(!attemptedTimeInSeconds, () => {
					test('attemptedTimeInSeconds', m.errors_message_required(), () => {
						enforce(data.attemptedTimeInSeconds).greaterThan(0);
					});
				});
				omitWhen(!attemptedReps, () => {
					test('attemptedReps', m.errors_message_required(), () => {
						enforce(data.attemptedReps).greaterThan(0);
					});
				});
				omitWhen(!attemptedWeightInKilograms, () => {
					test('attemptedWeightInKilograms', m.errors_message_required(), () => {
						enforce(data.attemptedWeightInKilograms || 0).greaterThanOrEquals(0);
					});
				});
			}
		);
</script>

<script lang="ts">
	import classnames from 'vest/classnames';
	import { onMount } from 'svelte';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '../InputResults.svelte';
	import MeasurementInput, { type Units } from '../inputs/MeasurementInput.svelte';
	import TypedInput from '../inputs/TypedInput.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { m } from '$lib/paraglide/messages';

	let {
		setInput = $bindable(),
		exercise,
		valid = $bindable(undefined),
		oninput,
		onvalid
	}: WorkoutSetInputProps = $props();

	let suite = $derived(createSuite());
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
				onvalid?.(valid);
			}
		});
		fields.clear();
	}, 300);
	function onMeasurementChange(
		metricValue: number,
		_metricUnits: Units<'metric', any>,
		name?: string
	) {
		const field = name as keyof WorkoutSetInputParams;
		onChange(field, metricValue);
	}
	function onTypedInputChange(value: number, name?: string) {
		const field = name as keyof WorkoutSetInputParams;
		onChange(field, value);
	}
	function onChange<K extends keyof WorkoutSetInputParams>(field: K, value: any) {
		setInput = { ...setInput, [field]: value };
		oninput?.(setInput);
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
	{#if exercise.execution === 'DISTANCE_DURATION'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedDistanceInMeters')}
				name="attemptedDistanceInMeters"
				{disabled}
				metricValue={setInput.attemptedDistanceInMeters || 0}
				metricUnits="m"
				type="distance"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedDistanceInMeters" {result} />
		</div>
		<div class="flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedTimeInSeconds')}
				name="attemptedTimeInSeconds"
				{disabled}
				metricValue={setInput.attemptedTimeInSeconds || 0}
				metricUnits="s"
				type="duration"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedTimeInSeconds" {result} />
		</div>
	{:else if exercise.execution === 'DISTANCE'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedDistanceInMeters')}
				name="attemptedDistanceInMeters"
				{disabled}
				metricValue={setInput.attemptedDistanceInMeters || 0}
				metricUnits="m"
				type="distance"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedDistanceInMeters" {result} />
		</div>
	{:else if exercise.execution === 'DURATION'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedTimeInSeconds')}
				name="attemptedTimeInSeconds"
				{disabled}
				metricValue={setInput.attemptedTimeInSeconds || 0}
				metricUnits="s"
				type="duration"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedTimeInSeconds" {result} />
		</div>
	{:else if exercise.execution === 'REPS_ONLY'}
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				class="flex-grow {cn('attemptedReps')}"
				name="attemptedReps"
				{disabled}
				value={setInput.attemptedReps || 0}
				unit={m.workouts_set_reps_label()}
				oninput={onTypedInputChange}
			/>
			<InputResults name="attemptedReps" {result} />
		</div>
	{:else if exercise.execution === 'WEIGHT_DISTANCE'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedWeightInKilograms')}
				name="attemptedWeightInKilograms"
				{disabled}
				metricValue={setInput.attemptedWeightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedWeightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedDistanceInMeters')}
				name="attemptedDistanceInMeters"
				{disabled}
				metricValue={setInput.attemptedDistanceInMeters || 0}
				metricUnits="m"
				type="distance"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedDistanceInMeters" {result} />
		</div>
	{:else if exercise.execution === 'WEIGHT_DURATION'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedWeightInKilograms')}
				name="attemptedWeightInKilograms"
				{disabled}
				metricValue={setInput.attemptedWeightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedWeightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedTimeInSeconds')}
				name="attemptedTimeInSeconds"
				{disabled}
				metricValue={setInput.attemptedTimeInSeconds || 0}
				metricUnits="s"
				type="duration"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedTimeInSeconds" {result} />
		</div>
	{:else if exercise.execution === 'WEIGHT_REPS'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('attemptedWeightInKilograms')}
				name="attemptedWeightInKilograms"
				{disabled}
				metricValue={setInput.attemptedWeightInKilograms || 0}
				metricUnits="kg"
				type="mass"
				oninput={onMeasurementChange}
			/>
			<InputResults name="attemptedWeightInKilograms" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				class="flex-grow {cn('attemptedReps')}"
				name="attemptedReps"
				{disabled}
				value={setInput.attemptedReps || 0}
				unit={m.workouts_set_reps_label()}
				oninput={onTypedInputChange}
			/>
			<InputResults name="attemptedReps" {result} />
		</div>
	{/if}
</div>
