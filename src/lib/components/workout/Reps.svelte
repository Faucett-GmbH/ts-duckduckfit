<svelte:options immutable />

<script lang="ts" context="module">
	export type Reps = {
		asManyRoundsAsPossible?: boolean;
		percentOfOneRepMax?: number;
		repRangeHigh?: number;
		repRangeLow?: number;
		reps?: number;
	};
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import type { RepsInputType } from './RepsInput.svelte';
	import { numbers } from '$lib/stores/language';

	export let reps: Reps;
	export let inputType: RepsInputType = 'reps';

	onMount(() => {
		if (reps.reps) {
			inputType = 'reps';
		} else if (reps.asManyRoundsAsPossible === true) {
			inputType = 'asManyRoundsAsPossible';
		} else if (reps.percentOfOneRepMax) {
			inputType = 'percentOfOneRepMax';
		} else if (reps.repRangeLow && reps.repRangeHigh) {
			inputType = 'repRange';
		}
	});
</script>

{#if inputType === 'reps'}
	<span>{reps.reps || 0} {m.workouts.set.repsLabel()}</span>
{:else if inputType === 'asManyRoundsAsPossible'}
	<span title={m.workouts.set.asManyRoundsAsPossibleLabel()}
		>{m.workouts.set.asManyRoundsAsPossibleAcronym()}</span
	>
{:else if inputType === 'percentOfOneRepMax'}
	<span>{$numbers.format(reps.percentOfOneRepMax || 0, 1)}%</span>
{:else if inputType === 'repRange'}
	<span
		>{reps.repRangeLow || 0} - {reps.repRangeHigh || 0}
		{m.workouts.set.repsLabel()}</span
	>
{/if}
