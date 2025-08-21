import { InternalError } from '$lib/error';
import { localStorageState } from '$lib/localStorageState.svelte';
import {
	findDocument,
	getRepo,
	createDocument,
	type AutomergeDocumentId,
	initDocument,
	type AutomergeDocHandle
} from '$lib/repo';
import { userConfig, type User } from './user.svelte';
import { workoutTemplatesConfig, type WorkoutTemplates } from './workoutTemplates.svelte';
import { initSync, syncConfig, type Sync } from './sync.svelte';
import { PUBLIC_URL } from '$env/static/public';
import { exercisesConfig, type Exercises } from './exercises.svelte';
import { settingsConfig, type Settings } from './settings.svelte';
import { workoutsConfig, type Workouts } from './workouts.svelte';
import { lazy } from '$lib/lazy';
import { getWebRTCClientAdapter } from '$lib/sync';

export interface UserDocument {
	version: number;
	settings: AutomergeDocumentId<Settings>;
	user: AutomergeDocumentId<User>;
	sync: AutomergeDocumentId<Sync>;
	workoutTemplates: AutomergeDocumentId<WorkoutTemplates>;
	workouts: AutomergeDocumentId<Workouts>;
	exercises: AutomergeDocumentId<Exercises>;
	updatedAt: Date;
	createdAt: Date;
}

export const userDocumentConfig = {
	migrations: {
		1: async () => {
			const repo = getRepo();

			return (userDocument: UserDocument) => {
				userDocument.settings = createDocument<Settings>({ version: 0 }, repo).documentId;
				userDocument.user = createDocument<User>({ version: 0 }, repo).documentId;
				userDocument.sync = createDocument<Sync>({ version: 0 }, repo).documentId;
				userDocument.workoutTemplates = createDocument<WorkoutTemplates>(
					{ version: 0 },
					repo
				).documentId;
				userDocument.workouts = createDocument<Workouts>({ version: 0 }, repo).documentId;
				userDocument.exercises = createDocument<Exercises>({ version: 0 }, repo).documentId;
				// eslint-disable-next-line svelte/prefer-svelte-reactivity
				userDocument.updatedAt = new Date();
				// eslint-disable-next-line svelte/prefer-svelte-reactivity
				userDocument.createdAt = new Date();
			};
		}
	}
};

async function initAllDocuments(userDocumentHandle: AutomergeDocHandle<UserDocument>) {
	await initDocument(userDocumentHandle, userDocumentConfig);
	const userDocument = userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	const repo = getRepo();
	await initDocument(await findDocument(userDocument.settings, repo), settingsConfig);
	await initDocument(await findDocument(userDocument.user, repo), userConfig);
	await initDocument(await findDocument(userDocument.sync, repo), syncConfig);
	await initDocument(
		await findDocument(userDocument.workoutTemplates, repo),
		workoutTemplatesConfig
	);
	await initDocument(await findDocument(userDocument.workouts, repo), workoutsConfig);
	await initDocument(await findDocument(userDocument.exercises, repo), exercisesConfig);
	await repo.flush();
}

export class CurrentUserDocument {
	#userDocumentId: AutomergeDocumentId<UserDocument>;
	#userDocumentDocHandle: Promise<AutomergeDocHandle<UserDocument>>;

	constructor(userDocumentId: AutomergeDocumentId<UserDocument>) {
		this.#userDocumentId = userDocumentId;
		this.#userDocumentDocHandle = findDocument(userDocumentId, getRepo());
	}

	syncUrl(room: string, password: string) {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
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
		return findDocument((await this.userDocument()).settings, getRepo());
	}
	async user() {
		return findDocument((await this.userDocument()).user, getRepo());
	}
	async sync() {
		return findDocument((await this.userDocument()).sync, getRepo());
	}
	async workoutTemplates() {
		return findDocument((await this.userDocument()).workoutTemplates, getRepo());
	}
	async workouts() {
		return findDocument((await this.userDocument()).workouts, getRepo());
	}
	async exercises() {
		return findDocument((await this.userDocument()).exercises, getRepo());
	}
}

const currentUserDocumentId = localStorageState<AutomergeDocumentId<UserDocument> | null>(
	'user-document-id',
	null
);
const currentUserDocument = $derived<CurrentUserDocument | null>(
	currentUserDocumentId.value ? new CurrentUserDocument(currentUserDocumentId.value) : null
);

export const userDocument = {
	get documentId() {
		return currentUserDocumentId;
	},
	get current() {
		return currentUserDocument;
	}
};

async function initUserDocument() {
	const repo = getRepo();

	if (currentUserDocumentId.value == null) {
		const userDocument = createDocument<UserDocument>({ version: 0 }, repo);
		await userDocument.whenReady();
		await initAllDocuments(userDocument);
		currentUserDocumentId.value = userDocument.documentId;
	} else {
		const userDocument = await findDocument(currentUserDocumentId.value, repo);
		await userDocument.whenReady();
		await initAllDocuments(userDocument);
	}
	await initSync(await currentUserDocument!.sync());
	return currentUserDocument!;
}

export const getUserDocument = lazy(initUserDocument);

export async function setUserDocumentId(userDocumentId: AutomergeDocumentId<UserDocument>) {
	currentUserDocumentId.value = userDocumentId;
	const userDocument = await findDocument(userDocumentId, getRepo());
	await userDocument.whenReady();
	await initAllDocuments(userDocument);
	return currentUserDocument!;
}
