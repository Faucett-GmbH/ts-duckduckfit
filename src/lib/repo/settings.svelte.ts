import { browser } from '$app/environment';
import { Numbers } from '$lib/shared/util/Numbers';
import {
	baseLocale,
	getLocale as getParaglideLocale,
	setLocale as setParaglideLocale,
	type Locale
} from '$lib/paraglide/runtime';
import { userDocument } from './userDocument.svelte';

export type MeasurementSystemType = 'metric' | 'imperial';
export type ThemeType = 'dark' | 'light';

let theme = $state<ThemeType>(
	browser && window.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
);
let measurementSystem = $state<'metric' | 'imperial'>('metric');
let locale = $state<Locale>(getParaglideLocale());
const numbers = $derived.by(() => new Numbers(locale));

export interface Settings {
	version: number;
	theme: ThemeType;
	locale: Locale;
	measurementSystem: MeasurementSystemType;
}

async function onChange(settings: Settings) {
	if (theme !== settings.theme) {
		theme = settings.theme;
	}
	if (measurementSystem !== settings.measurementSystem) {
		measurementSystem = settings.measurementSystem;
	}
	if (locale !== settings.locale) {
		locale = settings.locale;
		setParaglideLocale(locale);
	}
}

export const settingsConfig = {
	migrations: {
		1: async () => (settings: Settings) => {
			settings.theme = theme;
			settings.locale = baseLocale;
			settings.measurementSystem = measurementSystem;
		}
	},
	onInit: onChange,
	onChange
};

export async function setLocale(newLocale: Locale) {
	const settings = await userDocument.settings();
	settings.change((state) => {
		state.locale = newLocale;
	});
}

export function getLocale() {
	return locale;
}

export function getNumbers() {
	return numbers;
}

export async function setTheme(newTheme: ThemeType) {
	const settings = await userDocument.settings();
	settings.change((state) => {
		state.theme = newTheme;
	});
}

export function getTheme() {
	return theme;
}

export async function setMeasurementSystem(newMeasurementSystem: MeasurementSystemType) {
	const settings = await userDocument.settings();
	settings.change((state) => {
		state.measurementSystem = newMeasurementSystem;
	});
}

export function getMeasurementSystem() {
	return measurementSystem;
}
