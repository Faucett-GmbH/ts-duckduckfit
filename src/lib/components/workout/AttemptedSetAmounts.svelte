<script lang="ts" module>
	import type { Exercise } from '$lib/state/exerciseTypes';
	import type { AttemptedSet } from '$lib/state/workouts.svelte';

	interface AttemptedSetAmountsProps {
		execution: Exercise['execution'];
		set: AttemptedSet;
	}
</script>

<script lang="ts">
	import SetAmounts from './SetAmounts.svelte';

	let { execution, set }: AttemptedSetAmountsProps = $props();
</script>

<SetAmounts
	{execution}
	set={{
		reps: set.attemptedReps,
		distanceInMeters: set.attemptedDistanceInMeters,
		timeInSeconds: set.attemptedTimeInSeconds,
		weightInKilograms: set.attemptedWeightInKilograms,
		asManyRoundsAsPossible: set.asManyRoundsAsPossible,
		percentOfOneRepMax: set.percentOfOneRepMax,
		repRangeHigh: set.repRangeHigh,
		repRangeLow: set.repRangeLow
	}}
/>
