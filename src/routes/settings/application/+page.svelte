<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { type Locale, locales } from '$lib/paraglide/runtime';
	import type { ChangeEventHandler } from 'svelte/elements';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import {
		setLocale,
		setMeasurementSystem,
		setTheme,
		getTheme,
		getMeasurementSystem,
		getLocale
	} from '$lib/repo/settings.svelte';
	import Toggle from '$lib/shared/components/Toggle.svelte';

	const onThemeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setTheme(e.currentTarget.checked ? 'light' : 'dark');
	};

	const onLanguageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		setLocale(e.currentTarget.value as Locale);
	};

	const onMeasurementSystemChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		setMeasurementSystem(e.currentTarget.value as 'metric' | 'imperial');
	};
</script>

<form class="card flex flex-col">
	<h2>{m.application_settings_title()}</h2>
	<div class="mb-2 flex flex-grow flex-row items-center">
		<label for="theme" class="me-2">{m.application_settings_theme_mode()}</label>
		<Toggle name="theme" checked={getTheme() === 'light'} onchange={onThemeChange}
			>{#if getTheme() === 'light'}<Sun />{:else}<Moon />{/if}</Toggle
		>
	</div>

	<div class="mb-2 flex flex-grow flex-row items-center">
		<label for="language">{m.application_settings_language()}</label>
		<select name="language" class="ms-2" value={getLocale()} onchange={onLanguageChange}>
			{#each locales as locale (locale)}
				<option value={locale} selected={getLocale() == locale}>{locale}</option>
			{/each}
		</select>
	</div>

	<div class="mb-2 flex flex-grow flex-row items-center">
		<label for="measurementSystem">{m.application_settings_measurement_system()}</label>
		<select
			class="ms-2"
			name="measurementSystem"
			value={getMeasurementSystem()}
			onchange={onMeasurementSystemChange}
		>
			{#each ['metric', 'imperial'] as measurementSystem}
				<option value={measurementSystem} selected={getMeasurementSystem() == measurementSystem}
					>{#if measurementSystem === 'imperial'}{m.imperial_system()}{:else}{m.metric_system()}{/if}</option
				>
			{/each}
		</select>
	</div>
</form>
