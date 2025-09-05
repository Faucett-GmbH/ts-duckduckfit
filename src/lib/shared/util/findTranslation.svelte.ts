import type { Locale } from '$lib/paraglide/runtime';
import { getLocale } from '$lib/repo/settings.svelte';

export function findTranslation<T extends { locale: Locale }>(translations: T[]) {
	const locale = getLocale();
	let translation: T | undefined;
	for (const t of translations) {
		if (!translation || t.locale.includes(locale)) {
			translation = t;
		}
		if (t.locale === locale) {
			break;
		}
	}
	return translation!;
}
