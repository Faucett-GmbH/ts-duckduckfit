import { env } from '$env/dynamic/public';
import { PUBLIC_URL } from '$env/static/public';
import { building, browser } from '$app/environment';

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

const LAZY_UNINIT = {};
export function lazy<R>(init: () => R): () => R {
	let value: R = LAZY_UNINIT as never;
	return () => {
		if (value === LAZY_UNINIT) {
			value = init();
		}
		return value;
	}
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
