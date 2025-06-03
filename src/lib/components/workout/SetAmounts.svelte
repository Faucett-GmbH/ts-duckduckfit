<script lang="ts" module>
	import type { Reps } from './Reps.svelte';

	export type SetAmounts = Reps & {
		distanceInMeters?: number;
		timeInSeconds?: number;
		weightInKilograms?: number;
		reps?: number;
	};
</script>

<script lang="ts">
	import Measurement from '../inputs/Measurement.svelte';
	import RepsComponent from './Reps.svelte';

	export let execution: ExerciseExecutionType;
	export let set: SetAmounts;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
</script>

<div class="flex flex-shrink flex-col justify-end sm:flex-row">
	{#if execution === ExerciseExecutionEnum.DistanceDuration}
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
	{:else if execution === ExerciseExecutionEnum.Distance}
		<div class="badge info">
			<Measurement
				type="distance"
				metricValue={set.distanceInMeters}
				metricUnits="m"
				system={unitSystem}
			/>
		</div>
	{:else if execution === ExerciseExecutionEnum.Duration}
		<div class="badge info">
			<Measurement
				type="duration"
				metricValue={set.timeInSeconds}
				metricUnits="s"
				system={unitSystem}
			/>
		</div>
	{:else if execution === ExerciseExecutionEnum.RepsOnly}
		<div class="badge info">
			{set.reps}
		</div>
	{:else if execution === ExerciseExecutionEnum.WeightDistance}
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
	{:else if execution === ExerciseExecutionEnum.WeightDuration}
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
	{:else if execution === ExerciseExecutionEnum.WeightReps}
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
