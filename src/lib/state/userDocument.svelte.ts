import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import { findDocument, migrate, getRepo, type AutomergeDocumentId } from '$lib/repo';
import type { DocHandle } from '@automerge/automerge-repo/slim';
import { userMigrations, type User } from './user.svelte';
import { workoutTemplatesMigrations, type WorkoutTemplates } from './workoutTemplates.svelte';
import { exercisesMigrations, type Exercises } from './exercises.svelte';

export interface UserDocument {
	version: number;
	user: AutomergeDocumentId<User>;
	workoutTemplates: AutomergeDocumentId<WorkoutTemplates>;
	exercises: AutomergeDocumentId<Exercises>;
}

export const userDocumentMigrations = {
	1: (userDocument: UserDocument) => {
		userDocument.version = 1;
		userDocument.user = getRepo().create<User>().documentId as AutomergeDocumentId<User>;
		userDocument.workoutTemplates = getRepo().create<WorkoutTemplates>().documentId as AutomergeDocumentId<WorkoutTemplates>;
		userDocument.exercises = getRepo().create<Exercises>().documentId as AutomergeDocumentId<Exercises>;
	}
};

async function runAllMigrations(userDocumentHandle: DocHandle<UserDocument>) {
	await migrate(userDocumentHandle, userDocumentMigrations);
	const userDocument = await userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	await migrate(findDocument(userDocument.user), userMigrations);
	await migrate(findDocument(userDocument.workoutTemplates), workoutTemplatesMigrations);
	await migrate(findDocument(userDocument.exercises), exercisesMigrations);
}

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
	userDocumentHandle() {
		return this.#userDocumentDocHandle;
	}
	async userDocument() {
		const userDocument = await this.#userDocumentDocHandle.doc();
		if (!userDocument) {
			throw InternalError.from('errors_name_application', 'errors_message_application');
		}
		return userDocument;
	}
	async user() {
		return findDocument((await this.userDocument()).user);
	}
	async workoutTemplates() {
		return findDocument((await this.userDocument()).workoutTemplates);
	}
	async exercises() {
		return findDocument((await this.userDocument()).exercises);
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

	const user = findDocument(userDocument.docSync()!.user);
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
	const userDocument = findDocument(userDocumentId);
	await userDocument.whenReady();
	await runAllMigrations(userDocument);
	currentUsername.value = username;
}

export async function signInWithDocumentId(username: string, userDocumentId: AutomergeDocumentId<UserDocument>) {
	const state = userDocumentIds.value;
	const userDocument = findDocument(userDocumentId);
	await userDocument.whenReady();
	await runAllMigrations(userDocument);

	state[username] = userDocument.documentId as AutomergeDocumentId<UserDocument>;
	currentUsername.value = username;
}
