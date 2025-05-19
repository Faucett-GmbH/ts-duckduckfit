import type { DocHandle, DocHandleChangePayload } from '@automerge/automerge-repo/slim';
import type { AutomergeDocHandle } from './repo';

export type AutomergeState<T> = ReturnType<typeof automergeDocHandleState<T>>;

export function automergeDocHandleState<T>(docHandle: DocHandle<T>) {
  let doc = $state(docHandle.doc());

  function onChange(payload: DocHandleChangePayload<T>) {
    console.log(payload);
    doc = payload.doc;
  }

  docHandle.addListener("change", onChange);

  $effect(() => {
    return () => docHandle.removeListener("change", onChange);
  });

  return {
    get doc() {
      return doc;
    },
    get docHandle() {
      return docHandle as AutomergeDocHandle<T>;
    },
    change(fn: (d: T) => T) {
      docHandle.change(fn);
    }
  };
}
