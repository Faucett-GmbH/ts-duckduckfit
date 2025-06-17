import { localStorageState } from '$lib/localStorageState.svelte';

export type MeasurementSystem = "metric" | "imperial";
export type AppTheme = "dark" | "light";
export type SupportedLanguages = "en" | "de";

export interface Settings {
  theme: AppTheme
  language: SupportedLanguages
  measurementSystem: MeasurementSystem
}

const DEFAULT_SETTINGS: Settings = {
  theme: "light",
  language: "en",
  measurementSystem: "metric"
}

export const settings = localStorageState<Settings>("settings", DEFAULT_SETTINGS);
