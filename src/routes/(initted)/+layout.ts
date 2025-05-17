import { getOrInitUserDocument } from '$lib/state/userDocument.svelte';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const ssr = false;

export const load: LayoutLoad = async (event) => {
	await event.parent();
	const currentUserDocument = await getOrInitUserDocument();
	return {
		currentUserDocument,
		user: await currentUserDocument.user(),
	};
};
