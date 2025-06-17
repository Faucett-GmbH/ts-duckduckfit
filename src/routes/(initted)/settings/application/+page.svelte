<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import ThemeModeToggle from '$lib/components/ThemeModeToggle.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);
</script>

<div class="form">
	{#if userState.doc}
		<h2>{m.application_settings_title()}</h2>

		<h4>{m.application_settings_theme_mode()}</h4>

		<ThemeModeToggle />

		<h4>{m.application_settings_language()}</h4>

		<h4>{m.application_settings_measurement_system()}</h4>
	{/if}
</div>
