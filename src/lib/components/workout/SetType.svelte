<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { SetType } from '$lib/state/workoutTemplates.svelte';

	export let setType: SetType;
	export let position: number | undefined = undefined;
</script>

<div
	class="badge flex h-6 max-h-6 w-6 max-w-6 min-w-6 flex-row items-center justify-center p-0 leading-none"
	class:dark={setType === 'working'}
	class:warning={setType === 'warmup'}
	class:danger={setType === 'backoff'}
	title={setType === 'warmup'
		? m.workouts_warmup_title()
		: setType === 'backoff'
			? m.workouts_backoff_title()
			: m.workouts_working_set_title()}
>
	{#if setType === 'working'}
		{#if position != null}
			{position + 1}
		{:else}
			<span title={m.workouts_working_set_title()}>{m.workouts_working_set_letter()}</span>
		{/if}
	{:else if setType === 'warmup'}
		<span title={m.workouts_warmup_title()}>{m.workouts_warmup_letter()}</span>
	{:else if setType === 'backoff'}
		<span title={m.workouts_backoff_title()}>{m.workouts_backoff_letter()}</span>
	{/if}
</div>
