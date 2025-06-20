<script lang="ts" module>
	export type NumericInputWithUnitsProps = {
		metricValue: number;
		unitType: 'height' | 'weight' | 'length' | 'long-distance';
		onChange: (metricValue: number) => void;
	};
</script>

<script lang="ts">
	let { metricValue, unitType, onChange }: NumericInputWithUnitsProps = $props();

	import {
		cmToFeetInches,
		feetInchesToCm,
		kgToLbs,
		lbsToKg,
		cmToInches,
		inchesToCm,
		kmToMiles,
		milesToKm
	} from '$lib/utils/units';

	let measurementSystem = $state('metric');
	// todo: get global measurementSystem and update things accordingly

	// Derived imperial state
	let feet = $state(0);
	let inches = $state(0);
	let miles = $state(0);
	let pounds = $state(0);

	$effect(() => {
		if (measurementSystem === 'imperial') {
			if (unitType === 'height' || unitType === 'length') {
				const { feet: f, inches: i } = cmToFeetInches(metricValue);
				feet = f;
				inches = i;
			} else if (unitType === 'weight') {
				pounds = kgToLbs(metricValue);
			} else if (unitType === 'long-distance') {
				miles = kmToMiles(metricValue);
			}
		}
	});

	function updateImperial() {
		let newMetric = metricValue;
		if (unitType === 'height' || unitType === 'length') {
			newMetric = feetInchesToCm(feet, inches);
		} else if (unitType === 'weight') {
			newMetric = lbsToKg(pounds);
		} else if (unitType === 'long-distance') {
			newMetric = milesToKm(miles);
		}
		onChange(newMetric);
	}

	function updateMetric(event: Event) {
		const value = parseFloat((event.target as HTMLInputElement).value);
		if (!isNaN(value)) {
			onChange(value);
		}
	}
</script>

{#if measurementSystem === 'metric'}
	{#if unitType === 'weight'}
		<input type="number" value={metricValue} oninput={updateMetric} placeholder="kg" />
	{:else if unitType === 'long-distance'}
		<input type="number" value={metricValue} oninput={updateMetric} placeholder="km" />
	{:else}
		<input type="number" value={metricValue} oninput={updateMetric} placeholder="cm" />
	{/if}
{:else if unitType === 'weight'}
	<input type="number" bind:value={pounds} oninput={updateImperial} placeholder="lbs" />
{:else if unitType === 'height' || unitType === 'length'}
	<div style="display: flex; gap: 0.5rem;">
		<input type="number" bind:value={feet} oninput={updateImperial} placeholder="ft" />
		<input type="number" bind:value={inches} oninput={updateImperial} placeholder="in" />
	</div>
{:else if unitType === 'long-distance'}
	<input type="number" bind:value={miles} oninput={updateImperial} placeholder="mi" />
{/if}
