<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '$lib/state/setttings.svelte';

	let bodyElement: HTMLBodyElement | null = null;
	let isDark = $derived(settings.value.theme === 'dark' ? true : false);

	onMount(() => {
		bodyElement = document.querySelector('body');
		updateTheme();
	});

	function toggleDarkMode() {
		settings.update((s) => {
			s.theme = isDark ? 'light' : 'dark';
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
<button onclick={toggleDarkMode} class="btn primary">
	{isDark ? 'Light' : 'Dark'} Mode
</button>
