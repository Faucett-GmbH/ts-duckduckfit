<script lang="ts" module>
	export interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { PageData } from './$types';

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{m.routines_title()}</title>
</svelte:head>

<div class="container mx-auto p-4">
	<div class="card flex flex-col"></div>
</div>
