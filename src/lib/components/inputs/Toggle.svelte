<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface ToggleProps extends HTMLInputAttributes {
		children: Snippet<[]>;
	}
</script>

<script lang="ts">
	let { children, checked = $bindable(false), ...props } = $props();
</script>

<label class="inline-flex items-center cursor-pointer">
	<input type="checkbox" class="sr-only peer" bind:checked {...props} />
	<div
		class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
	></div>
	<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{@render children()}</span
	>
</label>
