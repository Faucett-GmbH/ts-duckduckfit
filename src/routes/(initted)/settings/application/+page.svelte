<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);
</script>

<div class="form">
	{#if userState.doc}
		<h2>{m.application_settings_title()}</h2>

		<h3>TODO: Set App Theme (Dark / Light)</h3>

		<h3>TODO: Set App Language</h3>

		<h3>TODO: Set Measurement System (Metric / Imperial)</h3>
	{/if}
</div>
