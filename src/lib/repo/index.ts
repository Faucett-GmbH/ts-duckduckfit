import type { ChangeFn, Doc } from '@automerge/automerge';
import { Repo, type DocHandle, type DocumentId } from '@automerge/automerge-repo';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import { lazy } from '$lib/shared/util/lazy';
import { browser } from '$app/environment';

export type AutomergeDocumentId<T> = DocumentId & { _type: T };
export type AutomergeDocument<T extends AutomergeDocumentId<never>> =
	T extends AutomergeDocumentId<infer U> ? U : never;
export type AutomergeDocHandle<T> = DocHandle<T> & {
	documentId: AutomergeDocumentId<T>;
};

export const getRepo = lazy(
	() =>
		new Repo({
			network: [],
			storage: browser ? new IndexedDBStorageAdapter('duckduckfit', 'automerge') : undefined
		})
);

export async function findDocument<T>(docId: AutomergeDocumentId<T>, repo: Repo) {
	return (await repo.find<T>(docId)) as AutomergeDocHandle<T>;
}

export function createDocument<T>(initialValue: Partial<T>, repo: Repo): AutomergeDocHandle<T> {
	return repo.create<Partial<T>>(initialValue) as AutomergeDocHandle<T>;
}

export async function deleteDocument<T>(docId: AutomergeDocumentId<T>, repo: Repo) {
	return (await findDocument(docId, repo)).delete();
}

export type Migrations<T> = Record<number, (doc: Doc<T>) => Promise<ChangeFn<T>> | ChangeFn<T>>;

export async function migrate<T extends { version: number }>(
	docHandle: AutomergeDocHandle<T>,
	migrations: Migrations<T>
) {
	let doc = docHandle.doc();
	const migrationsSize = Object.keys(migrations).length;
	let updated = false;
	for (let version = (doc.version ?? 0) + 1; version <= migrationsSize; version++) {
		const migrationFn = migrations[version];
		if (migrationFn) {
			const changeFn = await migrationFn(doc);
			docHandle.change(changeFn);
			docHandle.change((state) => {
				state.version = version;
			});
			doc = docHandle.doc();
			updated = true;
		}
	}
	return updated;
}

export interface RepoConfig<T> {
	migrations: Migrations<T>;
	onInit?(doc: Doc<T>): Promise<void> | void;
	onChange?(doc: Doc<T>): Promise<void> | void;
}

export async function initDocument<T extends { version: number }>(
	docHandle: AutomergeDocHandle<T>,
	config: RepoConfig<T>
) {
	const updated = await migrate(docHandle, config.migrations);
	await config.onInit?.(docHandle.doc());
	if (config.onChange) {
		const onChange = config.onChange;
		docHandle.addListener('change', (payload) => onChange(payload.doc));
	}
	return updated;
}
