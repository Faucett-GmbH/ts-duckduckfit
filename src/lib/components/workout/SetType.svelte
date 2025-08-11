<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { SetType } from '$lib/state/workoutTemplates.svelte';

	export let setType: SetType;
	export let position: number | undefined = undefined;
</script>

<div
	data-component="SetType"
	class="badge flex h-6 max-h-6 w-6 max-w-6 min-w-6 flex-row items-center justify-center p-0 leading-none"
	class:dark={setType === 'working_set'}
	class:warning={setType === 'warmup'}
	title={setType === 'warmup' ? m.workouts_warmup_title() : m.workouts_working_set_title()}
>
	{#if setType === 'working_set'}
		{#if position != null}
			{position + 1}
		{:else}
			<span title={m.workouts_working_set_title()}>{m.workouts_working_set_letter()}</span>
		{/if}
	{:else if setType === 'warmup'}
		<span title={m.workouts_warmup_title()}>{m.workouts_warmup_letter()}</span>
	{/if}
</div>
