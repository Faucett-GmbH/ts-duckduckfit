import { browser } from '$app/environment';
import { initAutomerge } from '$lib/repo';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const ssr = false;

export const load: LayoutLoad = async (event) => {
	if (browser) {
		await initAutomerge();
	}
	await event.parent();
};
