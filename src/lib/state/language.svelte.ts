import { Numbers } from '$lib/Numbers';
import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';

const locale = $state<Locale>(getLocale());
const numbers = $derived.by(() => new Numbers(locale));

export const language = {
	get locale() {
		return locale;
	},
	get numbers() {
		return numbers;
	},
};

$effect.root(() => {
	$effect(() => {
		setLocale(locale);
	});
});