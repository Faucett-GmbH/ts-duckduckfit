import { localStorageState } from '$lib/localStorageState.svelte';
import { Numbers } from '$lib/Numbers';
import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';

const locale = localStorageState<Locale>("locale", getLocale());
const numbers = $derived.by(() => new Numbers(locale.value));

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