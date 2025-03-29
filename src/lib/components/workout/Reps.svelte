<script lang="ts" module>
	export type RepsProps = {
		reps: Reps;
		inputType?: RepsInputType;
	};

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
	import { language } from '$lib/state/language.svelte';

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
	<span>{language.numbers.format(reps.percentOfOneRepMax || 0, 1)}%</span>
{:else if inputType === 'repRange'}
	<span
		>{reps.repRangeLow || 0} - {reps.repRangeHigh || 0}
		{m.workouts_set_reps_label()}</span
	>
{/if}
