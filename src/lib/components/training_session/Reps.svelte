<script lang="ts" module>
	export type RepsProps = {
		reps: Reps;
		inputType?: RepsInputType;
	};

	export type Reps = {
		asManyRoundsAsPossible: boolean | null;
		percentOfOneRepMax: number | null;
		repRangeHigh: number | null;
		repRangeLow: number | null;
		reps: number | null;
	};
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import type { RepsInputType } from './RepsInput.svelte';
	import { getNumbers } from '$lib/state/settings.svelte';

	let { reps, inputType }: RepsProps = $props();

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
	<span>{reps.reps || 0} {m.workouts_set_reps_label()}</span>
{:else if inputType === 'asManyRoundsAsPossible'}
	<span title={m.workouts_set_as_many_rounds_as_possible_label()}
		>{m.workouts_set_as_many_rounds_as_possible_acronym()}</span
	>
{:else if inputType === 'percentOfOneRepMax'}
	<span>{getNumbers().format(reps.percentOfOneRepMax || 0, 1)}%</span>
{:else if inputType === 'repRange'}
	<span
		>{reps.repRangeLow || 0} - {reps.repRangeHigh || 0}
		{m.workouts_set_reps_label()}</span
	>
{/if}
