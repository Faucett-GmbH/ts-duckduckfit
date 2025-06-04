<script lang="ts" module>
	import type { Reps } from './Reps.svelte';

	export type SetAmounts = Reps & {
		distanceInMeters?: number;
		timeInSeconds?: number;
		weightInKilograms?: number;
		reps?: number;
	};

	export type SetAmmountsProps = {
		execution: Exercise['execution'];
		set: SetAmounts;
		unitSystem?: MeasurementSystem;
	};
</script>

<script lang="ts">
	import Measurement from '../inputs/Measurement.svelte';
	import RepsComponent from './Reps.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import type { MeasurementSystem } from '../inputs/MeasurementInput.svelte';

	let { execution, set, unitSystem = 'METRIC' }: SetAmmountsProps = $props();
</script>

<div class="flex flex-shrink flex-col justify-end sm:flex-row">
	{#if execution === 'DISTANCE_DURATION'}
		<div class="badge info">
			<Measurement
				type="distance"
				metricValue={set.distanceInMeters}
				metricUnits="m"
				system={unitSystem}
			/>
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<Measurement
				type="duration"
				metricValue={set.timeInSeconds}
				metricUnits="s"
				system={unitSystem}
			/>
		</div>
	{:else if execution === 'DISTANCE'}
		<div class="badge info">
			<Measurement
				type="distance"
				metricValue={set.distanceInMeters}
				metricUnits="m"
				system={unitSystem}
			/>
		</div>
	{:else if execution === 'DURATION'}
		<div class="badge info">
			<Measurement
				type="duration"
				metricValue={set.timeInSeconds}
				metricUnits="s"
				system={unitSystem}
			/>
		</div>
	{:else if execution === 'REPS_ONLY'}
		<div class="badge info">
			{set.reps}
		</div>
	{:else if execution === 'WEIGHT_DISTANCE'}
		<div class="badge info">
			<Measurement
				type="mass"
				metricValue={set.weightInKilograms}
				metricUnits="kg"
				system={unitSystem}
			/>
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<Measurement
				type="distance"
				metricValue={set.distanceInMeters}
				metricUnits="m"
				system={unitSystem}
			/>
		</div>
	{:else if execution === 'WEIGHT_DURATION'}
		<div class="badge info">
			<Measurement
				type="mass"
				metricValue={set.weightInKilograms}
				metricUnits="kg"
				system={unitSystem}
			/>
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<Measurement
				type="duration"
				metricValue={set.timeInSeconds}
				metricUnits="s"
				system={unitSystem}
			/>
		</div>
	{:else if execution === 'WEIGHT_REPS'}
		<div class="badge info">
			<Measurement
				type="mass"
				metricValue={set.weightInKilograms}
				metricUnits="kg"
				system={unitSystem}
			/>
		</div>
		<div class="badge info max-sm:mt-1 sm:ms-1">
			<RepsComponent reps={set} />
		</div>
	{/if}
</div>
