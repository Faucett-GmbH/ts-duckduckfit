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
import { InternalError } from '$lib/shared/util/error';

export interface UserDocument {
	version: number;
	settings: AutomergeDocumentId<Settings>;
}

export const userDocumentConfig = {
	migrations: {
		1: async () => {
			const repo = getRepo();

			return (userDocument: UserDocument) => {
				userDocument.settings = createDocument<Settings>({ version: 0 }, repo).documentId;
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
	await repo.flush();
}

const userDocumentDoc = $derived.by(async () => (await userDocumentHandle).doc());

export const userDocument = {
	async id() {
		return (await userDocumentHandle).documentId;
	},
	async settings() {
		return findDocument((await userDocumentDoc).settings, getRepo());
	}
};
