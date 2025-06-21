import { browser } from '$app/environment';
import type { Locale } from '$lib/paraglide/runtime';

export interface Settings {
  version: number;
  theme: "dark" | "light";
  language: Locale;
  measurementSystem: "metric" | "imperial";
}

export const settingsMigrations = {
  1: async () => (settings: Settings) => {
    settings.version = 1;
    settings.theme = browser && window.matchMedia('(prefers-color-scheme: dark)')?.matches ? "dark" : "light";
    settings.language = "en";
    settings.measurementSystem = "metric";
  }
};
