<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';
	import { setLocale, type Locale, locales } from '$lib/paraglide/runtime';
	import type { ChangeEventHandler } from 'svelte/elements';
	import Toggle from '$lib/components/inputs/Toggle.svelte';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { setTheme } from '$lib/state/setttings.svelte';

	let { data }: PageProps = $props();

	const settingsState = automergeDocHandleState(data.settings);

	const onThemeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setTheme(e.currentTarget.checked ? 'light' : 'dark');
	};

	const onLanguageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const language = e.currentTarget.value as Locale;
		settingsState.change((settings) => {
			settings.language = language;
			return settings;
		});
		setLocale(language);
	};

	const onMeasurementSystemChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const measurementSystem = e.currentTarget.value as 'metric' | 'imperial';
		settingsState.change((settings) => {
			settings.measurementSystem = measurementSystem;
			return settings;
		});
	};
</script>

<form class="card flex flex-col">
	<h2>{m.application_settings_title()}</h2>
	{#if settingsState.doc}
		<div class="flex flex-row items-center flex-grow mb-2">
			<label for="theme" class="me-2">{m.application_settings_theme_mode()}</label>
			<Toggle name="theme" checked={settingsState.doc.theme === 'light'} onchange={onThemeChange}
				>{#if settingsState.doc.theme === 'light'}<Sun />{:else}<Moon />{/if}</Toggle
			>
		</div>

		<div class="flex flex-row items-center flex-grow mb-2">
			<label for="language">{m.application_settings_language()}</label>
			<select
				name="language"
				class="ms-2"
				value={settingsState.doc.language}
				onchange={onLanguageChange}
			>
				{#each locales as locale (locale)}
					<option value={locale} selected={settingsState.doc.language == locale}>{locale}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-row items-center flex-grow mb-2">
			<label for="measurementSystem">{m.application_settings_measurement_system()}</label>
			<select
				class="ms-2"
				name="measurementSystem"
				value={settingsState.doc.measurementSystem}
				onchange={onMeasurementSystemChange}
			>
				{#each ['metric', 'imperial'] as measurementSystem}
					<option
						value={measurementSystem}
						selected={settingsState.doc.measurementSystem == measurementSystem}
						>{m[`${measurementSystem}_system`]()}</option
					>
				{/each}
			</select>
		</div>
	{/if}
</form>
