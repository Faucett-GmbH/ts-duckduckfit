import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import { findDocument, migrate, getRepo, type AutomergeDocumentId } from '$lib/repo';
import type { DocHandle } from '@automerge/automerge-repo/slim';
import { userMigrations, type User } from './user.svelte';

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

export interface UserDocumentIds {
	[username: string]: AutomergeDocumentId<UserDocument>;
}

export class CurrentUserDocument {
	#userDocumentId: AutomergeDocumentId<UserDocument>;
	#userDocumentDocHandle: DocHandle<UserDocument>;

	constructor(userDocumentId: AutomergeDocumentId<UserDocument>) {
		this.#userDocumentId = userDocumentId;
		this.#userDocumentDocHandle = findDocument(userDocumentId);
	}

	userDocumentId() {
		return this.#userDocumentId;
	}
	userDocument() {
		return this.#userDocumentDocHandle;
	}
	async user() {
		const userDocument = await this.#userDocumentDocHandle.doc();
		if (!userDocument) {
			throw InternalError.from('errors_name_application', 'errors_message_application');
		}
		return findDocument(userDocument.user);
	}
}

const userDocumentIds = localStorageState<UserDocumentIds>('user-document-ids', {});
const currentUsername = localStorageState<string | null>('current-username', null);
const currentUserDocumentId = $derived<AutomergeDocumentId<UserDocument> | null>(userDocumentIds.value[currentUsername.value || ''] || null);
const currentUserDocument = $derived<CurrentUserDocument | null>(currentUserDocumentId ? new CurrentUserDocument(currentUserDocumentId) : null);

export const userDocument = {
	get username() {
		return currentUsername.value;
	},
	get documentId() {
		return currentUserDocumentId;
	},
	get current() {
		return currentUserDocument;
	},
	clear() {
		currentUsername.value = null;
	}
}

export async function signUp(username: string) {
	const state = userDocumentIds.value;
	if (state[username]) {
		throw InternalError.from('errors_name_user', 'errors_message_already_exists');
	}
	const userDocument = getRepo().create<UserDocument>();
	await userDocument.whenReady();
	await runAllMigrations(userDocument);

	const user = findDocument<User>(userDocument.docSync()!.user);
	await user.whenReady();

	state[username] = userDocument.documentId as AutomergeDocumentId<UserDocument>;

	userDocumentIds.value = state;
	currentUsername.value = username;
}

export async function signIn(username: string) {
	const state = userDocumentIds.value;
	const userDocumentId = state[username];
	if (!userDocumentId) {
		throw InternalError.from('errors_name_user', 'errors_message_invalid_credentials');
	}
	const repo = getRepo();
	const userDocument = findDocument<UserDocument>(userDocumentId);
	await userDocument.whenReady();
	await runAllMigrations(userDocument);
	currentUsername.value = username;
}

export async function signInWithDocumentId(username: string, userDocumentId: AutomergeDocumentId<UserDocument>) {
	const state = userDocumentIds.value;
	const repo = getRepo();
	const userDocument = findDocument<UserDocument>(userDocumentId);
	await userDocument.whenReady();
	await runAllMigrations(userDocument);

	state[username] = userDocument.documentId as AutomergeDocumentId<UserDocument>;
	currentUsername.value = username;
}

async function runAllMigrations(userDocumentHandle: DocHandle<UserDocument>) {
	await migrate(userDocumentHandle, userDocumentMigrations);
	const userDocument = await userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	const repo = getRepo();
	await migrate(findDocument<User>(userDocument.user), userMigrations);
}