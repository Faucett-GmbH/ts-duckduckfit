<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import ThemeModeToggle from '$lib/components/ThemeModeToggle.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';
	import { setLocale, type Locale, locales } from '$lib/paraglide/runtime';
	import { language } from '$lib/state/language.svelte';
	import {
		MEASUREMENT_SYSTEMS,
		settings,
		type MeasurementSystem
	} from '$lib/state/setttings.svelte';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);
	let currentLocale: Locale = $state(language.locale);
	let currentMeasurementSystem: MeasurementSystem = $state(settings.value.measurementSystem);

	const onChangeLocale = (e: Event) => {
		if (currentLocale == null) {
			return;
		}

		setLocale(currentLocale);

		settings.update((k) => {
			k.language = currentLocale;
			return k;
		});
	};

	const onUpdateMeasurementSystem = (e: Event) => {
		settings.update((k) => {
			k.measurementSystem = currentMeasurementSystem;
			return k;
		});
	};
</script>

<div class="card">
	{#if userState.doc}
		<h2>{m.application_settings_title()}</h2>

		<h4>{m.application_settings_theme_mode()}</h4>

		<ThemeModeToggle />

		<h4>{m.application_settings_language()}</h4>

		<select bind:value={currentLocale} onchange={onChangeLocale}>
			{#each locales as locale}
				<option value={locale} selected={currentLocale == locale ? true : false}>{locale}</option>
			{/each}
		</select>

		<h4>{m.application_settings_measurement_system()}</h4>

		<select bind:value={currentMeasurementSystem} onchange={onUpdateMeasurementSystem}>
			{#each MEASUREMENT_SYSTEMS as measurement_system}
				<option
					value={measurement_system}
					selected={currentMeasurementSystem == measurement_system ? true : false}
					>{measurement_system}</option
				>
			{/each}
		</select>
	{/if}
</div>
