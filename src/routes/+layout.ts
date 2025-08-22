import { browser } from '$app/environment';
import { userDocument } from '$lib/repo/userDocument.svelte';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const ssr = true;

export const load: LayoutLoad = async (event) => {
	await event.parent();
	if (browser) {
		// make sure user document is ready
		await userDocument.id();
	}
};
