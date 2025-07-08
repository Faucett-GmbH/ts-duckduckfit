<script lang="ts" module>
	export interface WeightProps {
		value: number | null;
		onChange: (metricValue: number) => void;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { kgToLbs, lbsToKg } from '$lib/utils/units';
	import { getMeasurementSystem } from '$lib/state/settings.svelte';

	let { value, onChange }: WeightProps = $props();

	let kgValue = $state(value || 0);
	let lbValue = $derived(kgToLbs(kgValue));

	const onChangeKg = () => {
		lbValue = kgToLbs(kgValue);
		onChange(kgValue);
	};

	const onChangeLb = () => {
		kgValue = lbsToKg(lbValue);
		onChange(kgValue);
	};
</script>

{#if getMeasurementSystem() == 'metric'}
	<div class="Kilograms MetricInput flex items-center gap-1">
		<input
			id="kg"
			type="number"
			class="w-20 text-right"
			bind:value={kgValue}
			min="0"
			max="1000"
			step="0.1"
			oninput={onChangeKg}
		/>
		<label for="kg" class="ms-1">{m.components_inputs_weight_input_kg()}</label>
	</div>
{:else if getMeasurementSystem() == 'imperial'}
	<div class="Pounds ImperialInput flex items-center gap-1">
		<input
			id="lb"
			type="number"
			class="w-22 text-right"
			bind:value={lbValue}
			step="1"
			min="0"
			max="10"
			oninput={onChangeLb}
		/>
		<label for="lb" class="ms-1">{m.components_inputs_weight_input_lb()}</label>
	</div>
{/if}
