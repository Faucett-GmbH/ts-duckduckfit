import { userMigrations, type User } from './user.svelte';
import { migrate, type AutomergeDocumentId } from '$lib/automergeState.svelte';
import { getRepo } from '$lib/repo';

export const USER_DOCUMENT_VERSION = 1;

export interface UserDocument {
	version: number;
	user: AutomergeDocumentId<User>;
}

export const userDocumentMigrations = {
	1: (userDocument: UserDocument) => {
		const repo = getRepo();
		userDocument.version = 1;
		userDocument.user = repo.create<User>().documentId as AutomergeDocumentId<User>;
	}
};
