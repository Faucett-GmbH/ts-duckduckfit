<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.png';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';
	import { resolve } from '$app/paths';
	import Header from '$lib/shared/components/Header.svelte';
	import Notifications from '$lib/shared/components/Notifications.svelte';
	import { getTheme } from '$lib/repo/settings.svelte';

	let { children }: LayoutProps = $props();

	$effect(() => {
		if (getTheme() === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	});

	onMount(() => {
		document.body.classList.add('hydrated');
	});
</script>

<svelte:head>
	<link rel="shortcut icon" href={favicon} />
	<link rel="manifest" crossorigin="use-credentials" href={resolve('/manifest.json')} />
</svelte:head>

<Header />
{@render children()}
<Notifications />
