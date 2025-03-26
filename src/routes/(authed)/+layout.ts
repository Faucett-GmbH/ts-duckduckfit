import { userDocument } from '$lib/state/userDocument.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { base } from '$app/paths';

export const load: LayoutLoad = async (event) => {
	await event.parent();
	const currentUserDocument = userDocument.current;
	if (!currentUserDocument) {
		redirect(302, `${base}/signin`);
	}
	return {
		user: await currentUserDocument.user(),
	};
};
