<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type EditUserPreferencesProps = {
		weightUnit: 'kg' | 'lbs' | null;
		distanceUnits: 'km' | 'mi' | null;
		bodyMeasurementUnit: 'cm' | 'in' | null;
		onUpdate(updates: EditUserPreferencesForm): void;
	};

	export type EditUserPreferencesForm = {
		weightUnit: 'kg' | 'lbs' | null;
		distanceUnits: 'km' | 'mi' | null;
		bodyMeasurementUnit: 'cm' | 'in' | null;
	};

	const createSuite = () =>
		create((data: Partial<EditUserPreferencesForm> = {}, fields: string[]) => {
			if (!fields.length) {
				return;
			}
			only(fields);

			omitWhen(!data.weightUnit, () => {
				test('weightUnit', m.errors_message_required(), () => {
					enforce(data.weightUnit).isNotBlank();
				});
			});
			omitWhen(!data.distanceUnits, () => {
				test('distanceUnits', m.errors_message_required(), () => {
					enforce(data.distanceUnits).isNotBlank();
				});
			});
			omitWhen(!data.bodyMeasurementUnit, () => {
				test('bodyMeasurementUnit', m.errors_message_required(), () => {
					enforce(data.bodyMeasurementUnit).isNotBlank();
				});
			});
		});
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import classNames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '$lib/components/InputResults.svelte';
	import { handleError } from '$lib/error';

	let { weightUnit, distanceUnits, bodyMeasurementUnit, onUpdate }: EditUserPreferencesProps =
		$props();

	let suite = createSuite();
	let result = $state(suite.get());
	let loading = $state(false);
	let disabled = $derived(loading || !result.isValid());
	let cn = $derived(
		classNames(result, {
			untested: 'untested',
			tested: 'tested',
			invalid: 'invalid',
			valid: 'valid',
			warning: 'warning'
		})
	);

	const fields = new Set<string>();
	const validate = debounce(() => {
		suite({ weightUnit, distanceUnits, bodyMeasurementUnit }, Array.from(fields)).done((r) => {
			result = r;
		});
		fields.clear();
	}, 300);
	export function validateAll() {
		fields.add('weightUnit');
		fields.add('distanceUnits');
		fields.add('bodyMeasurementUnit');
		validate();
		validate.flush();
	}
	function onChange(e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }) {
		fields.add(e.currentTarget.name);
		validate();
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			validateAll();
			if (result.isValid()) {
				onUpdate({ weightUnit, distanceUnits, bodyMeasurementUnit } as never);
				suite.reset();
				result = suite.get();
			}
		} catch (error) {
			handleError(error);
		} finally {
			loading = false;
		}
	}
</script>

<form class="flex flex-col" onsubmit={onSubmit}>
	<div class="mb-2">
		<label for="weightUnit">{m.weight_units_label()}</label>
		<select
			class="w-full {cn('weightUnit')}"
			name="weightUnit"
			bind:value={weightUnit}
			oninput={onChange}
		>
			<option>{m.weight_units_placeholder()}</option>
			<option value="kg">{m.weight_units_kilograms_label()}</option>
			<option value="lbs">{m.weight_units_pounds_label()}</option>
		</select>
		<InputResults name="weightUnit" {result} />
	</div>
	<div class="mb-2">
		<label for="distanceUnits">{m.distance_units_label()}</label>
		<select
			class="w-full {cn('distanceUnits')}"
			name="distanceUnits"
			bind:value={distanceUnits}
			oninput={onChange}
		>
			<option>{m.distance_units_placeholder()}</option>
			<option value="km">{m.distance_units_kilometers_label()}</option>
			<option value="m">{m.distance_units_miles_label()}</option>
		</select>
		<InputResults name="distanceUnits" {result} />
	</div>
	<div class="mb-2">
		<label for="bodyMeasurementUnit">{m.body_measurement_units_label()}</label>
		<select
			class="w-full {cn('bodyMeasurementUnit')}"
			name="bodyMeasurementUnit"
			bind:value={bodyMeasurementUnit}
			oninput={onChange}
		>
			<option>{m.body_measurement_units_placeholder()}</option>
			<option value="cm">{m.body_measurement_units_centimeters_unit()}</option>
			<option value="in">{m.body_measurement_units_inches_unit()}</option>
		</select>
		<InputResults name="bodyMeasurementUnit" {result} />
	</div>
	<div class="flex flex-row ms-2 justify-end">
		<button type="submit" class="btn primary flex flex-shrink" {disabled}>
			{#if loading}
				<div class="mr-2 flex flex-row justify-center">
					<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
				</div>
			{/if}
			{m.user_preferences_update()}
		</button>
	</div>
</form>
