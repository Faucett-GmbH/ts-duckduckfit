<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		document.body.classList.add('hydrated');
	});
</script>

<Header />
{@render children()}
<Notifications />
