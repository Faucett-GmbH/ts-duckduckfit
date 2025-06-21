import { getUserDocument } from '$lib/state/userDocument.svelte';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const ssr = false;

export const load: LayoutLoad = async (event) => {
	await event.parent();
	const currentUserDocument = await getUserDocument();
	const [settings, user] = await Promise.all([currentUserDocument.settings(), currentUserDocument.user()]);
	return {
		currentUserDocument,
		settings,
		user,
	};
};
