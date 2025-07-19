import { env } from '$env/dynamic/public';
import { PUBLIC_URL } from '$env/static/public';
import { building, browser } from '$app/environment';
import type { Locale } from './paraglide/runtime';
import { getLocale } from './state/settings.svelte';
import { page } from '$app/state';
import { replaceState } from '$app/navigation';

export type ExtractPromise<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;

export const DEFAULT_SIZE = 20;

export function unsafeId() {
	return Math.random().toString(36).substring(2);
}

export function getOrigin() {
	if (typeof __DEV_AUTH_URL__ !== 'undefined') {
		return __DEV_AUTH_URL__;
	}
	if (browser) {
		return window.location.origin;
	}
	if (building) {
		return PUBLIC_URL;
	}
	return env.PUBLIC_URL;
}

export async function copyToClipboard(value: string) {
	if (!navigator.clipboard) {
		throw new Error("Browser don't have support for native clipboard.");
	}
	await navigator.clipboard.writeText(value);
}

export function isVisible(element: HTMLElement) {
	const rect = element.getBoundingClientRect(),
		width = window.innerWidth || document.documentElement.clientWidth,
		height = window.innerHeight || document.documentElement.clientHeight;

	if (rect.right < 0 || rect.bottom < 0 || rect.left > width || rect.top > height) {
		return false;
	}

	return (
		element.contains(document.elementFromPoint(rect.left, rect.top)) ||
		element.contains(document.elementFromPoint(rect.right, rect.top)) ||
		element.contains(document.elementFromPoint(rect.right, rect.bottom)) ||
		element.contains(document.elementFromPoint(rect.left, rect.bottom))
	);
}

export function scrollIntoViewIfNeed(element: HTMLElement) {
	if (!isVisible(element)) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
}

export function waitMS(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function selectElementContents(el: HTMLElement) {
	const range = document.createRange();
	range.selectNodeContents(el);
	const selection = window.getSelection();
	if (selection) {
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

export function getId<T extends { id: string | number }>(value: T) {
	return value.id;
}
export function getGuid<T extends { guid: string }>(value: T) {
	return value.guid;
}
export function getName<T extends { name: string }>(value: T) {
	return value.name;
}

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

export function setUrlParams(params: { [key: string]: string | null | undefined }) {
	const url = page.url;
	Object.entries(params).forEach(([key, value]) => {
		if (value == null) {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value);
		}
	});
	replaceState(url, page.state);
}

export function toHHMMSS(timeInSeconds: number) {
	const seconds = Math.floor(timeInSeconds);
	const h = Math.floor(seconds / 3600) % 60;
	const m = Math.floor(seconds / 60) % 60;
	const s = seconds % 60;
	return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}