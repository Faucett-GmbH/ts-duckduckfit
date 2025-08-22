import type { Locale } from "$lib/paraglide/runtime";

export type MeasurementSystemType = 'metric' | 'imperial';

export type ThemeType = 'dark' | 'light';

export interface ISettings {
  version: number;
  theme: ThemeType;
  locale: Locale;
  measurementSystem: MeasurementSystemType;
}
