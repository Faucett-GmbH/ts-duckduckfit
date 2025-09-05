import { localStorageState } from '$lib/shared/util/localStorageState.svelte';
import {
	findDocument,
	getRepo,
	createDocument,
	type AutomergeDocumentId,
	initDocument,
	type AutomergeDocHandle
} from '$lib/repo';
import { settingsConfig, type Settings } from './settings.svelte';
import { workoutTemplatesConfig, type WorkoutTemplates } from './workoutTemplates.svelte';
import { InternalError } from '$lib/shared/util/error';
import { workoutsConfig, type Workouts } from './workouts.svelte';
import { exercisesConfig, type Exercises } from './exercises.svelte';

export interface UserDocument {
	version: number;
	settings: AutomergeDocumentId<Settings>;
	exercises: AutomergeDocumentId<Exercises>;
	workouts: AutomergeDocumentId<Workouts>;
	workoutTemplates: AutomergeDocumentId<WorkoutTemplates>;
}

export const userDocumentConfig = {
	migrations: {
		1: async () => {
			const repo = getRepo();

			return (userDocument: UserDocument) => {
				userDocument.settings = createDocument<Settings>({ version: 0 }, repo).documentId;
				userDocument.exercises = createDocument<Exercises>({ version: 0 }, repo).documentId;
				userDocument.workouts = createDocument<Workouts>({ version: 0 }, repo).documentId;
				userDocument.workoutTemplates = createDocument<WorkoutTemplates>(
					{ version: 0 },
					repo
				).documentId;
			};
		}
	}
};

const userDocumentId = localStorageState<AutomergeDocumentId<UserDocument> | null>(
	'user-document-id',
	null
);
const userDocumentHandle = $derived.by(initUserDocumentHandle);

async function initUserDocumentHandle() {
	let userDocumentHandle: AutomergeDocHandle<UserDocument>;

	if (userDocumentId.value == null) {
		userDocumentHandle = createDocument<UserDocument>({ version: 0 }, getRepo());
		await userDocumentHandle.whenReady();
		await initAllDocuments(userDocumentHandle);
		userDocumentId.value = userDocumentHandle.documentId;
	} else {
		userDocumentHandle = await findDocument(userDocumentId.value, getRepo());
		await userDocumentHandle.whenReady();
		await initAllDocuments(userDocumentHandle);
	}

	return userDocumentHandle;
}

async function initAllDocuments(userDocumentHandle: AutomergeDocHandle<UserDocument>) {
	await initDocument(userDocumentHandle, userDocumentConfig);
	const userDocument = userDocumentHandle.doc();
	if (!userDocument) {
		throw InternalError.from('errors_name_application', 'errors_message_application');
	}
	const repo = getRepo();
	await initDocument(await findDocument(userDocument.settings, repo), settingsConfig);
	await initDocument(await findDocument(userDocument.exercises, repo), exercisesConfig);
	await initDocument(await findDocument(userDocument.workouts, repo), workoutsConfig);
	await initDocument(
		await findDocument(userDocument.workoutTemplates, repo),
		workoutTemplatesConfig
	);
	await repo.flush();
}

const userDocumentDoc = $derived.by(async () => (await userDocumentHandle).doc());

export const userDocument = {
	async id() {
		return (await userDocumentHandle).documentId;
	},
	async settings() {
		return findDocument((await userDocumentDoc).settings, getRepo());
	},
	async exercises() {
		return findDocument((await userDocumentDoc).exercises, getRepo());
	},
	async workouts() {
		return findDocument((await userDocumentDoc).workouts, getRepo());
	},
	async workoutTemplates() {
		return findDocument((await userDocumentDoc).workoutTemplates, getRepo());
	}
};
