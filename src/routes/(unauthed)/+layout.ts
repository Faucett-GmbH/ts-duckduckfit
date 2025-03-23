import { userDocumentId } from '$lib/states/userDocumentIds.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	await event.parent();
	if (userDocumentId.documentId) {
		redirect(302, `${base}/`);
	}
};
