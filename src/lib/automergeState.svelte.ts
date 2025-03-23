import type { DocumentId, DocHandle, Doc, DocHandleChangePayload } from '@automerge/automerge-repo/slim';
import { getRepo } from './repo';
import type { ExtractPromise } from './util';

export type AutomergeDocumentId<T> = DocumentId & { _type: T };
export type AutomergeDocument<T extends AutomergeDocumentId<never>> = T extends AutomergeDocumentId<infer U> ? U : never;
export type AutomergeState<T> = ReturnType<typeof automergeState<T>>;

export function automergeState<T>(documentId: AutomergeDocumentId<T>) {
  const repo = getRepo();
  let docHandle = repo.find<T>(documentId);
  let doc = $state(docHandle.docSync());

  function onChange(payload: DocHandleChangePayload<T>) {
    doc = payload.doc;
  }

  docHandle.addListener("change", onChange);

  $effect(() => {
    return () => docHandle.removeListener("change", onChange);
  });

  if (!doc) {
    docHandle.doc().then(d => {
      doc = d;
    });
  }

  return {
    get doc() {
      return doc;
    },
    get docHandle() {
      return docHandle;
    },
    change(fn: (d: T) => T) {
      docHandle.change(fn);
    }
  };
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