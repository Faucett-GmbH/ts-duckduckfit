import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import { findDocument, migrate, getRepo, createDocument, type AutomergeDocumentId } from '$lib/repo';
import type { DocHandle } from '@automerge/automerge-repo/slim';
import { userMigrations, type User } from './user.svelte';
import { workoutTemplatesMigrations, type WorkoutTemplates } from './workoutTemplates.svelte';
import { initSync, syncMigrations, type Sync } from './sync.svelte';
import { PUBLIC_URL } from '$env/static/public';
import { exercisesMigrations, type Exercises } from './exericese.svelte';

export interface UserDocument {
	version: number;
	user: AutomergeDocumentId<User>;
	sync: AutomergeDocumentId<Sync>;
	workoutTemplates: AutomergeDocumentId<WorkoutTemplates>;
	exercises: AutomergeDocumentId<Exercises>;
}

export const userDocumentMigrations = {
	1: () => (userDocument: UserDocument) => {
		const repo = getRepo();
		userDocument.version = 1;
		userDocument.user = createDocument<User>({}, repo).documentId;
		userDocument.sync = createDocument<Sync>({}, repo).documentId;
		userDocument.workoutTemplates = createDocument<WorkoutTemplates>({}, repo).documentId;
		userDocument.exercises = createDocument<Exercises>({}, repo).documentId;
	}
};

async function runAllMigrations(userDocumentHandle: DocHandle<UserDocument>) {
	await migrate(userDocumentHandle, userDocumentMigrations);
	const userDocument = userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	await migrate(await findDocument(userDocument.user), userMigrations);
	await migrate(await findDocument(userDocument.sync), syncMigrations);
	await migrate(await findDocument(userDocument.workoutTemplates), workoutTemplatesMigrations);
	await migrate(await findDocument(userDocument.exercises), exercisesMigrations);
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
	if (currentUserDocument) {
		return currentUserDocument;
	}
	if (currentUserDocumentId.value == null) {
		const userDocument = createDocument<UserDocument>();
		await userDocument.whenReady();
		await runAllMigrations(userDocument);
		currentUserDocumentId.value = userDocument.documentId;
	} else {
		const userDocument = await findDocument(currentUserDocumentId.value);
		await userDocument.whenReady();
		await runAllMigrations(userDocument);
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
	await runAllMigrations(userDocument);
	return currentUserDocument!;
}
