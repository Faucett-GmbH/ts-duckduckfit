<svelte:options immutable />

<script lang="ts">
	import { UnitSystem, type AttemptedSet, ExerciseExecutionType } from '$lib/openapi/duckduckfit';
	import SetAmounts from './SetAmounts.svelte';

	interface Props {
		execution: ExerciseExecutionType;
		set: AttemptedSet;
		unitSystem?: UnitSystem;
	}

	let { execution, set, unitSystem = UnitSystem.MetricUnitSystem }: Props = $props();
</script>

<SetAmounts
	{execution}
	{unitSystem}
	set={{
		reps: set.attemptedReps,
		distanceInMeters: set.attemptedDistanceInMeters,
		timeInSeconds: set.attemptedTimeInSeconds,
		weightInKilograms: set.attemptedWeightInKilograms
	}}
/>
