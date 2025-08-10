<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export interface TrainingSessionSetInputProps {
		setInput: TrainingSessionSetInputParams;
		exercise: Exercise;
		valid?: boolean | undefined;
		oninput?(params: TrainingSessionSetInputParams): void;
		onvalid?(valid: boolean): void;
	}

	export interface TrainingSessionSetInputParams {
		actualReps: number | null;
		actualWeight: number | null;
	}

	const createSuite = () =>
		create(
			(
				data: Partial<TrainingSessionSetInputParams> = {},
				exercise: Exercise,
				fields: Set<keyof TrainingSessionSetInputParams>
			) => {
				if (!fields.size) {
					return;
				}
				only(Array.from(fields));

				let actualReps = false;
				let actualWeight = false;
				switch (exercise.execution) {
					case 'DISTANCE_DURATION': {
						// noop
						break;
					}
					case 'DISTANCE': {
						// noop
						break;
					}
					case 'DURATION': {
						// noop
						break;
					}
					case 'REPS_ONLY': {
						actualReps = true;
						break;
					}
					case 'WEIGHT_DISTANCE': {
						// noop
						break;
					}
					case 'WEIGHT_DURATION': {
						// noop
						break;
					}
					case 'WEIGHT_REPS': {
						actualWeight = true;
						actualReps = true;
						break;
					}
				}
				omitWhen(!actualReps, () => {
					test('actualReps', m.errors_message_required(), () => {
						enforce(data.actualReps).greaterThan(0);
					});
				});
				omitWhen(!actualWeight, () => {
					test('actualWeight', m.errors_message_required(), () => {
						enforce(data.actualWeight || 0).greaterThanOrEquals(0);
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
	}: TrainingSessionSetInputProps = $props();

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
	const fields = new Set<keyof TrainingSessionSetInputParams>();
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
		const field = name as keyof TrainingSessionSetInputParams;
		onChange(field, metricValue);
	}
	function onTypedInputChange(value: number, name?: string) {
		const field = name as keyof TrainingSessionSetInputParams;
		onChange(field, value);
	}
	function onChange<K extends keyof TrainingSessionSetInputParams>(field: K, value: any) {
		setInput = { ...setInput, [field]: value };
		oninput?.(setInput);
		fields.add(field);
		validate();
	}

	onMount(() => {
		for (const field of Object.keys(setInput)) {
			fields.add(field as keyof TrainingSessionSetInputParams);
		}
		validate();
		validate.flush();
	});
</script>

<div class="flex flex-shrink flex-row">
	{#if exercise.execution === 'REPS_ONLY'}
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				class="flex-grow {cn('actualReps')}"
				name="actualReps"
				{disabled}
				value={setInput.actualReps || 0}
				unit={m.workouts_set_reps_label()}
				oninput={onTypedInputChange}
			/>
			<InputResults name="actualReps" {result} />
		</div>
	{:else if exercise.execution === 'WEIGHT_REPS'}
		<div class="me-1 flex flex-shrink flex-col">
			<MeasurementInput
				class={cn('actualWeight')}
				name="actualWeight"
				{disabled}
				metricValue={setInput.actualWeight || 0}
				metricUnits="kg"
				type="mass"
				oninput={onMeasurementChange}
			/>
			<InputResults name="actualWeight" {result} />
		</div>
		<div class="me-1 flex flex-shrink flex-col">
			<TypedInput
				class="flex-grow {cn('actualReps')}"
				name="actualReps"
				{disabled}
				value={setInput.actualReps || 0}
				unit={m.workouts_set_reps_label()}
				oninput={onTypedInputChange}
			/>
			<InputResults name="actualReps" {result} />
		</div>
	{/if}
</div>
