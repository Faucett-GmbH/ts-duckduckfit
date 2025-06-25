import { browser } from '$app/environment';
import { Numbers } from '$lib/Numbers';
import { getLocale as getParaglideLocale, setLocale as setParaglideLocale, type Locale } from '$lib/paraglide/runtime';
import { userDocument } from './userDocument.svelte';

export type MeasurementSystemType = "metric" | "imperial";
export type ThemeType = "dark" | "light"

let theme = $state<ThemeType>(browser && window.matchMedia('(prefers-color-scheme: dark)')?.matches ? "dark" : "light");
let measurementSystem = $state<'metric' | 'imperial'>("metric");
let locale = $state<Locale>(getParaglideLocale());
const numbers = $derived.by(() => new Numbers(locale));


export interface Settings {
  version: number;
  theme: ThemeType;
  locale: Locale;
  measurementSystem: MeasurementSystemType;
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

export async function setTheme(newTheme: ThemeType) {
  const settings = await userDocument.current!.settings();
  settings.change(state => {
    state.theme = newTheme;
  });
  theme = newTheme;
}

export function getTheme() {
  return theme;
}

export async function setMeasurementSystem(newMeasurementSystem: MeasurementSystemType) {
  const settings = await userDocument.current!.settings();
  settings.change(state => {
    state.measurementSystem = newMeasurementSystem;
  });
  measurementSystem = newMeasurementSystem;
}

export function getMeasurementSystem() {
  return measurementSystem;
}
