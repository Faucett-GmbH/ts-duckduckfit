
import wasmUrl from "@automerge/automerge/automerge.wasm?url";
import { next as Automerge, type ChangeFn, type Doc } from "@automerge/automerge/slim";
import { type DocHandle, Repo, type DocumentId } from "@automerge/automerge-repo/slim";
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import { lazy } from './util';
import { webRTCClientAdapter } from "./sync";
//import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";

export type AutomergeDocumentId<T> = DocumentId & { _type: T };
export type AutomergeDocument<T extends AutomergeDocumentId<never>> = T extends AutomergeDocumentId<infer U> ? U : never;
export type AutomergeDocHandle<T> = DocHandle<T> & { documentId: AutomergeDocumentId<T> };

export const initAutomerge = lazy(async () =>
  await Automerge.initializeWasm(wasmUrl)
);

export const getRepo = lazy(() => new Repo({
  //network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
  network: [webRTCClientAdapter],
  storage: new IndexedDBStorageAdapter()
}));

export function findDocument<T>(docId: AutomergeDocumentId<T>, repo = getRepo()): AutomergeDocHandle<T> {
  return repo.find<T>(docId) as AutomergeDocHandle<T>;
}

export function createDocument<T>(initialValue?: Partial<T>, repo = getRepo()): AutomergeDocHandle<T> {
  return repo.create<T>(initialValue as T) as AutomergeDocHandle<T>;
}

export function deleteDocument<T>(docId: AutomergeDocumentId<T>, repo = getRepo()) {
  return repo.find<T>(docId).delete();
}

export async function migrate<T extends { version: number }>(docHandle: DocHandle<T>, migrations: Record<number, (doc: Doc<T>) => (Promise<ChangeFn<T>> | ChangeFn<T>)>) {
  let doc = await docHandle.doc() as Doc<T>;
  const version = doc.version || 0;
  for (let i = version + 1; i <= Object.keys(migrations).length; i++) {
    const migrationFn = migrations[i];
    if (migrationFn) {
      const changeFn = await migrationFn(doc);
      docHandle.change(changeFn);
      doc = await docHandle.docSync()!;
    }
  }
}
