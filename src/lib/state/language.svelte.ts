import { browser } from '$app/environment';
import { localStorageState } from '$lib/localStorageState.svelte';
import { Numbers } from '$lib/Numbers';
import { baseLocale, locales, setLocale, type Locale } from '$lib/paraglide/runtime';

let browserLanguage = $state(browser && navigator.language ? navigator.language : 'en-US');
let browserLocale = $derived(browserLanguage.split('-')[0]);

const locale = localStorageState<Locale>("locale", locales.includes(browserLocale as Locale) ? browserLocale as Locale : baseLocale);
let numbers = $derived(new Numbers(locale.value));

export const language = {
	get locale() {
		return locale.value;
	},
	get numbers() {
		return numbers;
	},
};

$effect.root(() => {
	$effect(() => {
		setLocale(locale.value);
	});
});

if (browser) {
	window.addEventListener('languagechange', () => {
		browserLanguage = navigator.language;
	});
}
