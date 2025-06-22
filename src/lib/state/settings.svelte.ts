import { browser } from '$app/environment';
import { Numbers } from '$lib/Numbers';
import { getLocale as getParaglideLocale, setLocale as setParaglideLocale, type Locale } from '$lib/paraglide/runtime';
import { userDocument } from './userDocument.svelte';

let theme = $state<'dark' | 'light'>(browser && window.matchMedia('(prefers-color-scheme: dark)')?.matches ? "dark" : "light");
let measurementSystem = $state<'metric' | 'imperial'>("metric");
let locale = $state<Locale>(getParaglideLocale());
const numbers = $derived.by(() => new Numbers(locale));

export interface Settings {
  version: number;
  theme: "dark" | "light";
  locale: Locale;
  measurementSystem: "metric" | "imperial";
}

export const settingsConfig = {
  migrations: {
    1: async () => (settings: Settings) => {
      settings.theme = theme;
      settings.locale = "en";
      settings.measurementSystem = measurementSystem;
    }
  },
  onReady(settings: Settings) {
    theme = settings.theme;
    measurementSystem = settings.measurementSystem;
    if (settings.locale !== locale) {
      setLocale(settings.locale);
    }
  }
};

export async function setLocale(newLocale: Locale) {
  const settings = await userDocument.current!.settings();
  settings.change(state => {
    state.locale = newLocale;
  });
  locale = newLocale;
  setParaglideLocale(newLocale);
}

export function getLocale() {
  return locale;
}

export function getNumbers() {
  return numbers;
}

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

export async function setMeasurementSystem(newMeasurementSystem: 'metric' | 'imperial') {
  const settings = await userDocument.current!.settings();
  settings.change(state => {
    state.measurementSystem = newMeasurementSystem;
  });
  measurementSystem = newMeasurementSystem;
}

export function getMeasurementSystem() {
  return measurementSystem;
}
