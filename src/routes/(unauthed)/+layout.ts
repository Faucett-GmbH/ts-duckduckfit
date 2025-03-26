import { userDocument } from '$lib/state/userDocument.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { base } from '$app/paths';

export const load: LayoutLoad = async (event) => {
	await event.parent();
	if (userDocument.current) {
		redirect(302, `${base}/`);
	}
};
