import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import { findDocument, migrate, getRepo, createDocument, type AutomergeDocumentId } from '$lib/repo';
import type { DocHandle } from '@automerge/automerge-repo/slim';
import { userMigrations, type User } from './user.svelte';
import { workoutTemplatesMigrations, type WorkoutTemplates } from './workoutTemplates.svelte';
import { initSync, syncMigrations, type Sync } from './sync.svelte';
import { PUBLIC_URL } from '$env/static/public';

export interface UserDocument {
	version: number;
	user: AutomergeDocumentId<User>;
	sync: AutomergeDocumentId<Sync>;
	workoutTemplates: AutomergeDocumentId<WorkoutTemplates>;
}

export const userDocumentMigrations = {
	1: () => (userDocument: UserDocument) => {
		const repo = getRepo();
		userDocument.version = 1;
		userDocument.user = createDocument<User>({}, repo).documentId;
		userDocument.sync = createDocument<Sync>({}, repo).documentId;
		userDocument.workoutTemplates = createDocument<WorkoutTemplates>({}, repo).documentId;
	}
};

async function runAllMigrations(userDocumentHandle: DocHandle<UserDocument>) {
	await migrate(userDocumentHandle, userDocumentMigrations);
	const userDocument = await userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	await migrate(findDocument(userDocument.user), userMigrations);
	await migrate(findDocument(userDocument.sync), syncMigrations);
	await migrate(findDocument(userDocument.workoutTemplates), workoutTemplatesMigrations);
}

export class CurrentUserDocument {
	#userDocumentId: AutomergeDocumentId<UserDocument>;
	#userDocumentDocHandle: DocHandle<UserDocument>;

	constructor(userDocumentId: AutomergeDocumentId<UserDocument>) {
		this.#userDocumentId = userDocumentId;
		this.#userDocumentDocHandle = findDocument(userDocumentId);
	}

	syncUrl(room: string, password: string) {
		const url = new URL(`${PUBLIC_URL}/sync`);
		url.searchParams.set('room', room);
		url.searchParams.set('password', password);
		return url.toString();
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
	async sync() {
		return findDocument((await this.userDocument()).sync);
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

let initted = false;

export async function getOrInitUserDocument() {
	if (initted && currentUserDocument) {
		return currentUserDocument;
	}
	if (currentUserDocumentId.value == null) {
		const userDocument = createDocument<UserDocument>();
		await userDocument.whenReady();
		await runAllMigrations(userDocument);
		currentUserDocumentId.value = userDocument.documentId;
	} else {
		const userDocument = findDocument(currentUserDocumentId.value);
		await userDocument.whenReady();
		await runAllMigrations(userDocument);
	}
	await initSync(await currentUserDocument!.sync());
	initted = true;
	return currentUserDocument!;
}

export async function setUserDocumentId(userDocumentId: AutomergeDocumentId<UserDocument>) {
	currentUserDocumentId.value = userDocumentId;
	const userDocument = findDocument(userDocumentId);
	await userDocument.whenReady();
	await runAllMigrations(userDocument);
	return currentUserDocument!;
}
