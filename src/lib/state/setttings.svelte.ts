import { browser } from '$app/environment';
import type { Locale } from '$lib/paraglide/runtime';
import { userDocument } from './userDocument.svelte';

let theme = $state<'dark' | 'light'>(browser && window.matchMedia('(prefers-color-scheme: dark)')?.matches ? "dark" : "light");

export interface Settings {
  version: number;
  theme: "dark" | "light";
  language: Locale;
  measurementSystem: "metric" | "imperial";
}

export const settingsConfig = {
  migrations: {
    1: async () => (settings: Settings) => {
      settings.theme = theme;
      settings.language = "en";
      settings.measurementSystem = "metric";
    }
  },
  onReady(settings: Settings) {
    theme = settings.theme;
  }
};

export async function setTheme(newTheme: 'light' | 'dark') {
  const settings = await userDocument.current!.settings();
  settings.change(state => {
    state.theme = newTheme;
  });
  theme = newTheme;
}

export function getTheme() {
  return theme;
}