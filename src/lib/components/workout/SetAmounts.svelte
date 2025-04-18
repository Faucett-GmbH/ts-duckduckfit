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
	{#if execution === ExerciseExecutionTypeEnum.DistanceDuration}
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
	{:else if execution === ExerciseExecutionTypeEnum.Distance}
		<div class="badge info">
			<Measurement
				type="distance"
				metricValue={set.distanceInMeters}
				metricUnits="m"
				system={unitSystem}
			/>
		</div>
	{:else if execution === ExerciseExecutionTypeEnum.Duration}
		<div class="badge info">
			<Measurement
				type="duration"
				metricValue={set.timeInSeconds}
				metricUnits="s"
				system={unitSystem}
			/>
		</div>
	{:else if execution === ExerciseExecutionTypeEnum.RepsOnly}
		<div class="badge info">
			{set.reps}
		</div>
	{:else if execution === ExerciseExecutionTypeEnum.WeightDistance}
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
	{:else if execution === ExerciseExecutionTypeEnum.WeightDuration}
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
	{:else if execution === ExerciseExecutionTypeEnum.WeightReps}
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
