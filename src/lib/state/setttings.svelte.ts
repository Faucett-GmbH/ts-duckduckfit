import { browser } from '$app/environment';
import { localStorageState } from '$lib/localStorageState.svelte';
import { locales } from '$lib/paraglide/runtime';

export const MEASUREMENT_SYSTEMS = ["metric", "imperial"];
export type MeasurementSystem = "metric" | "imperial";
export type AppTheme = "dark" | "light";
export type AvailableLocales = typeof locales[number];

export interface Settings {
  theme: AppTheme
  language: AvailableLocales
  measurementSystem: MeasurementSystem
}

const DEFAULT_SETTINGS: Settings = {
  theme: browser && window.matchMedia('(prefers-color-scheme: dark)')?.matches ? "dark" : "light",
  language: "en",
  measurementSystem: "metric"
}

export const settings = localStorageState<Settings>("settings", DEFAULT_SETTINGS);
