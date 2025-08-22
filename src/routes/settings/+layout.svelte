<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="flex grow flex-col items-center">
	<div class="container flex flex-col p-8">
		{@render children()}
	</div>
</div>
