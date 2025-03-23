import { userDocumentId } from '$lib/states/userDocumentIds.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import type { UserDocument } from '$lib/states/userDocument.svelte';
import { getRepo } from '$lib/repo';
import { base } from '$app/paths';

export const load: LayoutLoad = async (event) => {
	await event.parent();
	if (!userDocumentId.documentId) {
		redirect(302, `${base}/signin`);
	}
	const repo = getRepo();
	const userDocument = repo.find<UserDocument>(userDocumentId.documentId);
	await userDocument.whenReady();
	return {
		userDocument,
		userDocumentId: userDocument.docSync()!.user
	};
};
