<script lang="ts" module>
	import type { Reps } from './Reps.svelte';

	export interface SetAmounts extends Reps {
		distanceInMeters: number | null;
		timeInSeconds: number | null;
		weightInKilograms: number | null;
		reps: number | null;
	}

	export interface SetAmmountsProps {
		execution: Exercise['execution'];
		set: SetAmounts;
		unitSystem?: MeasurementSystem;
	}
</script>

<script lang="ts">
	import Measurement from '../inputs/Measurement.svelte';
	import RepsComponent from './Reps.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import type { MeasurementSystem } from '../inputs/MeasurementInput.svelte';

	let { execution, set, unitSystem = 'metric' }: SetAmmountsProps = $props();
</script>

<div class="flex flex-shrink flex-col justify-end sm:flex-row">
	{#if execution === 'DISTANCE_DURATION'}
		<div class="badge info">
			<Measurement type="distance" metricValue={set.distanceInMeters || 0} metricUnits="m" />
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<Measurement type="duration" metricValue={set.timeInSeconds || 0} metricUnits="s" />
		</div>
	{:else if execution === 'DISTANCE'}
		<div class="badge info">
			<Measurement type="distance" metricValue={set.distanceInMeters || 0} metricUnits="m" />
		</div>
	{:else if execution === 'DURATION'}
		<div class="badge info">
			<Measurement type="duration" metricValue={set.timeInSeconds || 0} metricUnits="s" />
		</div>
	{:else if execution === 'REPS_ONLY'}
		<div class="badge info">
			{set.reps}
		</div>
	{:else if execution === 'WEIGHT_DISTANCE'}
		<div class="badge info">
			<Measurement type="mass" metricValue={set.weightInKilograms || 0} metricUnits="kg" />
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<Measurement type="distance" metricValue={set.distanceInMeters || 0} metricUnits="m" />
		</div>
	{:else if execution === 'WEIGHT_DURATION'}
		<div class="badge info">
			<Measurement type="mass" metricValue={set.weightInKilograms || 0} metricUnits="kg" />
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<Measurement type="duration" metricValue={set.timeInSeconds || 0} metricUnits="s" />
		</div>
	{:else if execution === 'WEIGHT_REPS'}
		<div class="badge info">
			<Measurement type="mass" metricValue={set.weightInKilograms || 0} metricUnits="kg" />
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<RepsComponent reps={set} />
		</div>
	{/if}
</div>
