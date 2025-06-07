<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type EditUserPreferencesProps = {
		measurementSystem: 'metric' | 'imperial' | null;
		onUpdate(updates: EditUserPreferencesForm): void;
	};

	export type EditUserPreferencesForm = {
		measurementSystem: 'metric' | 'imperial' | null;
	};

	const createSuite = () =>
		create((data: Partial<EditUserPreferencesForm> = {}, fields: string[]) => {
			if (!fields.length) {
				return;
			}
			only(fields);

			omitWhen(!data.measurementSystem, () => {
				test('measurementSystem', m.errors_message_required(), () => {
					enforce(data.measurementSystem).isNotBlank();
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

	let { measurementSystem, onUpdate }: EditUserPreferencesProps = $props();

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
		suite({ measurementSystem }, Array.from(fields)).done((r) => {
			result = r;
		});
		fields.clear();
	}, 300);
	export function validateAll() {
		fields.add('measurementSystem');
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
				onUpdate({ measurementSystem } as never);
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

<h3>{m.user_preferences_title()}</h3>
<form class="flex flex-col" onsubmit={onSubmit}>
	<div class="mb-2">
		<label for="measurementSystem">{m.measurement_system_label()}</label>
		<select
			class="w-full {cn('measurementSystem')}"
			name="measurementSystem"
			bind:value={measurementSystem}
			oninput={onChange}
		>
			<option value={null}>{m.measurement_system_placeholder()}</option>
			<option value="metric">{m.measurement_system_metric()}</option>
			<option value="imperial">{m.measurement_system_imperial()}</option>
		</select>
		<InputResults name="measurementSystem" {result} />
	</div>
	<div class="mb-2">
		<label for="distanceUnits">{m.distance_units_label()}</label>
		{#if measurementSystem == 'metric'}
			{m.distance_units_kilometers_label()}
		{:else if measurementSystem == 'imperial'}
			{m.distance_units_miles_label()}
		{:else}
			<!-- noop -->
		{/if}
	</div>
	<div class="mb-2">
		<label for="weightUnit">{m.weight_units_label()}: </label>
		{#if measurementSystem == 'metric'}
			{m.weight_units_kilograms_label()}
		{:else if measurementSystem == 'imperial'}
			{m.weight_units_pounds_label()}
		{:else}
			<!-- noop -->
		{/if}
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
