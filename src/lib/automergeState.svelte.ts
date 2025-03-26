import type { DocHandle, DocHandleChangePayload } from '@automerge/automerge-repo/slim';
import { findDocument, type AutomergeDocumentId } from './repo';

export type AutomergeState<T> = ReturnType<typeof automergeState<T>>;

export function automergeState<T>(documentId: AutomergeDocumentId<T>) {
  return automergeDocHandleState(findDocument(documentId));
}

export function automergeDocHandleState<T>(docHandle: DocHandle<T>) {
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
