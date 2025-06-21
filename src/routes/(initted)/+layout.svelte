<script lang="ts">
	import type { LayoutProps } from './$types';
	import { getTheme } from '$lib/state/setttings.svelte';

	let { children }: LayoutProps = $props();

	$effect(() => {
		if (getTheme() === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	});
</script>

{@render children()}
