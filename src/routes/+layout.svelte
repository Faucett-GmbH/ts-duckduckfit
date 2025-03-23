<script lang="ts" module>
	import '../app.css';

	interface Props {
		children: Snippet<[]>;
	}
</script>

<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import type { Snippet } from 'svelte';

	let { children }: Props = $props();

	$effect(() => {
		document.body.classList.add('hydrated');
	});
</script>

<Header />
{@render children()}
<Notifications />
