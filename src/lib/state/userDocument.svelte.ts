import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import { findDocument, migrate, getRepo, type AutomergeDocumentId, createDocument } from '$lib/repo';
import type { DocHandle } from '@automerge/automerge-repo/slim';
import { userMigrations, type User } from './user.svelte';
import { workoutTemplatesMigrations, type WorkoutTemplates } from './workoutTemplates.svelte';
import { lazy } from '$lib/util';

export interface UserDocument {
	version: number;
	user: AutomergeDocumentId<User>;
	workoutTemplates: AutomergeDocumentId<WorkoutTemplates>;
}

export const userDocumentMigrations = {
	1: (userDocument: UserDocument) => {
		const repo = getRepo();
		userDocument.version = 1;
		userDocument.user = createDocument<User>({}, repo).documentId as AutomergeDocumentId<User>;
		userDocument.workoutTemplates = createDocument<WorkoutTemplates>({}, repo).documentId as AutomergeDocumentId<WorkoutTemplates>;
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
}

const currentUserDocumentId = localStorageState<AutomergeDocumentId<UserDocument> | null>('user-document-id', null);
const currentUserDocument = $derived<CurrentUserDocument | null>(currentUserDocumentId.value ? new CurrentUserDocument(currentUserDocumentId.value) : null);

export const userDocument = {
	get documentId() {
		return currentUserDocumentId;
	},
	get current() {
		return currentUserDocument;
	}
}

export async function initUserDocument() {
	if (currentUserDocumentId.value == null) {
		const userDocument = createDocument<UserDocument>();
		await userDocument.whenReady();
		await runAllMigrations(userDocument);
		currentUserDocumentId.value = userDocument.documentId as AutomergeDocumentId<UserDocument>;
	} else {
		const userDocument = findDocument(currentUserDocumentId.value);
		await userDocument.whenReady();
		await runAllMigrations(userDocument);
	}
	return currentUserDocument!;
}
