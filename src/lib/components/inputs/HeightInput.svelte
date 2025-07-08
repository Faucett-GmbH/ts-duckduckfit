<script lang="ts" module>
	import { m } from '$lib/paraglide/messages';
	import type { MeasurementSystemType } from '$lib/state/settings.svelte';

	export interface HumanLengthProps {
		value: number | null;
		system: MeasurementSystemType;
		onChange: (metricValue: number) => void;
	}
</script>

<script lang="ts">
	import { cmToFeetInches, feetInchesToCm } from '$lib/utils/units';
	let { value, system, onChange }: HumanLengthProps = $props();

	let cmValue = $state(value || 0);
	let ftIn = $derived(cmToFeetInches(cmValue));
	let feetValue = $derived(ftIn.feet);
	let inchesValue = $derived(ftIn.inches);

	const onChangeCm = () => {
		ftIn = cmToFeetInches(cmValue);
		feetValue = ftIn.feet;
		inchesValue = ftIn.inches;
		onChange(cmValue);
	};

	const onChangeFeet = () => {
		cmValue = feetInchesToCm({ feet: feetValue, inches: inchesValue });
		onChange(cmValue);
	};

	const onChangeInches = () => {
		cmValue = feetInchesToCm({ feet: feetValue, inches: inchesValue });
		onChange(cmValue);
	};
</script>

{#if system == 'metric'}
	<div class="MetricInput flex items-center gap-1">
		<input
			id="cm"
			type="number"
			class="w-20 text-right"
			bind:value={cmValue}
			min="0"
			max="400"
			step="0.1"
			oninput={onChangeCm}
		/>
		<label for="cm" class="ms-1">{m.components_inputs_height_input_cm()}</label>
	</div>
{:else if system == 'imperial'}
	<div class="ImperialInput flex items-end gap-2">
		<div class="flex items-center gap-1">
			<input
				id="feet"
				type="number"
				class="w-22 text-right"
				bind:value={feetValue}
				step="1"
				min="0"
				max="10"
				oninput={onChangeFeet}
			/>
			<label for="feet" class="ms-1">{m.components_inputs_height_input_ft()}</label>
		</div>
		<div class="flex items-center gap-1">
			<input
				id="inches"
				type="number"
				class="w-22 text-right"
				bind:value={inchesValue}
				min="0"
				max="10.875"
				step="0.125"
				oninput={onChangeInches}
			/>
			<label for="inches" class="ms-1">{m.components_inputs_height_input_in()}</label>
		</div>
	</div>
{/if}
