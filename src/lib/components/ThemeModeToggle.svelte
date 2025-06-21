<script lang="ts" module>
	export interface ThemeModeToggleProps {
		name?: string;
		theme: 'dark' | 'light';
		onchange?(value: 'dark' | 'light'): void;
	}
</script>

<script lang="ts">
	import Toggle from './inputs/Toggle.svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	let { name, theme = $bindable('dark'), onchange }: ThemeModeToggleProps = $props();

	let checked = $state(theme === 'light' ? true : false);

	$effect(() => {
		if (checked) {
			theme = 'light';
			document.body.classList.remove('dark');
		} else {
			theme = 'dark';
			document.body.classList.add('dark');
		}
		onchange?.(theme);
	});
</script>

<Toggle {name} bind:checked
	>{#if checked}<Sun />{:else}<Moon />{/if}</Toggle
>
