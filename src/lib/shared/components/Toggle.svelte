<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface ToggleProps extends HTMLInputAttributes {
		children: Snippet;
	}
</script>

<script lang="ts">
	let { children, checked = $bindable(false), ...props } = $props();
</script>

<label class="inline-flex cursor-pointer items-center">
	<input type="checkbox" class="peer sr-only" bind:checked {...props} />
	<div
		class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600"
	></div>
	<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{@render children()}</span
	>
</label>
