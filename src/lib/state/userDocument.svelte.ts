import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import { findDocument, getRepo, createDocument, type AutomergeDocumentId, initDocument, type AutomergeDocHandle } from '$lib/repo';
import type { DocHandle } from '@automerge/automerge-repo/slim';
import { userConfig, type User } from './user.svelte';
import { workoutTemplatesConfig, type WorkoutTemplates } from './workoutTemplates.svelte';
import { initSync, syncConfig, type Sync } from './sync.svelte';
import { PUBLIC_URL } from '$env/static/public';
import { exercisesConfig, type Exercises } from './exercises.svelte';
import { settingsConfig, type Settings } from './setttings.svelte';

export interface UserDocument {
	version: number;
	settings: AutomergeDocumentId<Settings>;
	user: AutomergeDocumentId<User>;
	sync: AutomergeDocumentId<Sync>;
	workoutTemplates: AutomergeDocumentId<WorkoutTemplates>;
	exercises: AutomergeDocumentId<Exercises>;
}

export const userDocumentConfig = {
	migrations: {
		1: () => (userDocument: UserDocument) => {
			const repo = getRepo();
			userDocument.settings = createDocument<Settings>({}, repo).documentId;
			userDocument.user = createDocument<User>({}, repo).documentId;
			userDocument.sync = createDocument<Sync>({}, repo).documentId;
			userDocument.workoutTemplates = createDocument<WorkoutTemplates>({}, repo).documentId;
			userDocument.exercises = createDocument<Exercises>({}, repo).documentId;
		}
	}
};

async function initAllDocuments(userDocumentHandle: AutomergeDocHandle<UserDocument>) {
	await initDocument(userDocumentHandle, userDocumentConfig);
	const userDocument = userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	await initDocument(await findDocument(userDocument.settings), settingsConfig);
	await initDocument(await findDocument(userDocument.user), userConfig);
	await initDocument(await findDocument(userDocument.sync), syncConfig);
	await initDocument(await findDocument(userDocument.workoutTemplates), workoutTemplatesConfig);
	await initDocument(await findDocument(userDocument.exercises), exercisesConfig);
}

export class CurrentUserDocument {
	#userDocumentId: AutomergeDocumentId<UserDocument>;
	#userDocumentDocHandle: Promise<DocHandle<UserDocument>>;

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
	async userDocumentHandle() {
		return await this.#userDocumentDocHandle;
	}
	async userDocument() {
		const userDocumentHandle = await this.userDocumentHandle();
		const userDocument = userDocumentHandle.doc();
		if (!userDocument) {
			throw InternalError.from('errors_name_application', 'errors_message_application');
		}
		return userDocument;
	}
	async settings() {
		return findDocument((await this.userDocument()).settings);
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
	async exercises() {
		return findDocument((await this.userDocument()).exercises);
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

async function initUserDocument() {
	if (currentUserDocumentId.value == null) {
		const userDocument = createDocument<UserDocument>();
		await userDocument.whenReady();
		await initAllDocuments(userDocument);
		currentUserDocumentId.value = userDocument.documentId;
	} else {
		const userDocument = await findDocument(currentUserDocumentId.value);
		await userDocument.whenReady();
		await initAllDocuments(userDocument);
	}
	await initSync(await currentUserDocument!.sync());
	return currentUserDocument!;
}

let userDocumentPromise: Promise<CurrentUserDocument>;

export async function getUserDocument() {
	if (!userDocumentPromise) {
		userDocumentPromise = initUserDocument();
	}
	return userDocumentPromise;
}

export async function setUserDocumentId(userDocumentId: AutomergeDocumentId<UserDocument>) {
	currentUserDocumentId.value = userDocumentId;
	const userDocument = await findDocument(userDocumentId);
	await userDocument.whenReady();
	await initAllDocuments(userDocument);
	return currentUserDocument!;
}
