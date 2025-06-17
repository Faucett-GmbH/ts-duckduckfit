<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '$lib/state/setttings.svelte';

	let bodyElement: HTMLBodyElement | null = null;
	let isDark = settings.value.theme == 'dark' ? true : false;

	onMount(() => {
		bodyElement = document.querySelector('body');
		updateTheme();
	});

	function toggleDarkMode() {
		isDark = !isDark;
		settings.update((s) => {
			s.theme = isDark ? 'dark' : 'light';
			return s;
		});
		updateTheme();
	}

	function updateTheme() {
		if (isDark) {
			bodyElement?.classList.add('dark');
		} else {
			bodyElement?.classList.remove('dark');
		}
	}
</script>

<label>Enable Mode: </label>
<button on:click={toggleDarkMode} class="p-2 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer">
	{isDark ? 'Light' : 'Dark'} Mode
</button>
