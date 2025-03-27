<svelte:options immutable />

<script lang="ts">
	import { UnitSystem, type AttemptedSet, ExerciseExecutionType } from '$lib/openapi/duckduckfit';
	import SetAmounts from './SetAmounts.svelte';

	export let execution: ExerciseExecutionType;
	export let set: AttemptedSet;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
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
