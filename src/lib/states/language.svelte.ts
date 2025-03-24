import { browser } from '$app/environment';
import { localStorageState } from '$lib/localStorageState.svelte';
import { Numbers } from '$lib/Numbers';

const languageState = localStorageState('language', browser ? navigator.language : 'en-US');
const locale = $derived(languageState.value.split('-')[0]);
const numbers = $derived(new Numbers(languageState.value));

export const language = {
	get language() {
		return languageState.value;
	},
	set language(value: string) {
		languageState.value = value;
	},
	get locale() {
		return locale;
	},
	get numbers() {
		return numbers;
	},
	useBrowserlanguage() {
		languageState.value = navigator.language;
	}
};

if (browser) {
	window.addEventListener('languagechange', () => {
		language.language = navigator.language;
	});
}
