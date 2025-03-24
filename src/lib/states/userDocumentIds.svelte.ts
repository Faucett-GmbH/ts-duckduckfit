import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import { getRepo } from '$lib/repo';
import type { DocHandle, DocumentId } from '@automerge/automerge-repo/slim';
import { migrate, type AutomergeDocumentId } from '$lib/automergeState.svelte';
import { userDocumentMigrations, type UserDocument } from './userDocument.svelte';
import { userMigrations, type User } from './user.svelte';

export interface UserDocumentIds {
	[username: string]: AutomergeDocumentId<UserDocument>;
}

const userDocumentIdsState = localStorageState<UserDocumentIds>('user-document-ids', {});
const currentUsernameState = localStorageState<string | null>('current-username', null);
const currentDocumentIdState = $derived<DocumentId | null>(userDocumentIdsState.value[currentUsernameState.value || ''] || null);

export const userDocumentId = {
	get username() {
		return currentUsernameState.value;
	},
	get documentId() {
		return currentDocumentIdState;
	},
	clear() {
		currentUsernameState.value = null;
	}
}

export async function signUp(username: string) {
	const state = userDocumentIdsState.value;
	if (state[username]) {
		throw InternalError.from('errors_name_user', 'errors_message_already_exists');
	}
	const repo = getRepo();
	const userDocument = repo.create<UserDocument>();
	await userDocument.whenReady();
	await runAllMigrations(userDocument);

	const user = repo.find<User>(userDocument.docSync()!.user);
	await user.whenReady();

	state[username] = userDocument.documentId as AutomergeDocumentId<UserDocument>;

	userDocumentIdsState.value = state;
	currentUsernameState.value = username;
}

export async function signIn(username: string) {
	const state = userDocumentIdsState.value;
	const userDocumentId = state[username];
	if (!userDocumentId) {
		throw InternalError.from('errors_name_user', 'errors_message_invalid_credentials');
	}
	const repo = getRepo();
	const userDocument = repo.find<UserDocument>(userDocumentId);
	await userDocument.whenReady();
	await runAllMigrations(userDocument);
	currentUsernameState.value = username;
}

export async function signInWithDocumentId(username: string, userDocumentId: AutomergeDocumentId<UserDocument>) {
	const state = userDocumentIdsState.value;
	const repo = getRepo();
	const userDocument = repo.find<UserDocument>(userDocumentId);
	await userDocument.whenReady();
	await runAllMigrations(userDocument);

	state[username] = userDocument.documentId as AutomergeDocumentId<UserDocument>;
	currentUsernameState.value = username;
}

async function runAllMigrations(userDocumentHandle: DocHandle<UserDocument>) {
	await migrate(userDocumentHandle, userDocumentMigrations);
	const userDocument = await userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	const repo = getRepo();
	await migrate(repo.find<User>(userDocument.user), userMigrations);
}