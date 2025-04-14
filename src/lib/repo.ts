
import wasmUrl from "@automerge/automerge/automerge.wasm?url";
import { next as Automerge } from "@automerge/automerge/slim";
import { DocHandle, Repo, type DocumentId } from "@automerge/automerge-repo/slim";
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import { lazy } from './util';

export type AutomergeDocumentId<T> = DocumentId & { _type: T };
export type AutomergeDocument<T extends AutomergeDocumentId<never>> = T extends AutomergeDocumentId<infer U> ? U : never;

export const initAutomerge = lazy(async () =>
  await Automerge.initializeWasm(wasmUrl)
);

export const getRepo = lazy(() => {
  return new Repo({
    network: [new BrowserWebSocketClientAdapter('wss://sync.automerge.org')],
    storage: new IndexedDBStorageAdapter()
  });
});

export function findDocument<T>(docId: AutomergeDocumentId<T>, repo = getRepo()): DocHandle<T> {
  return repo.find<T>(docId);
}

export function createDocument<T>(initialValue?: Partial<T>, repo = getRepo()): DocHandle<T> {
  return repo.create<T>(initialValue as T);
}

export function deleteDocument<T>(docId: AutomergeDocumentId<T>, repo = getRepo()) {
  return repo.find<T>(docId).delete();
}

export function migrate<T extends { version: number }>(docHandle: DocHandle<T>, migrations: Record<number, (doc: T) => (Promise<void> | void)>) {
  docHandle.change(async (doc) => {
    const version = doc.version || 0;
    for (let i = version + 1; i <= Object.keys(migrations).length; i++) {
      const migration = migrations[i];
      if (migration) {
        await migration(doc);
      }
    }
  });
}