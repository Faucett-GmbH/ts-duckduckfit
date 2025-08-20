import type { DocHandleChangePayload } from '@automerge/automerge-repo';
import type { AutomergeDocHandle } from './repo';

export type AutomergeState<T> = ReturnType<typeof automergeDocHandleState<T>>;

export function automergeDocHandleState<T>(docHandle: AutomergeDocHandle<T>) {
	let doc = $state(docHandle.doc());

	function onChange(payload: DocHandleChangePayload<T>) {
		doc = payload.doc;
	}

	docHandle.addListener('change', onChange);

	$effect(() => {
		return () => docHandle.removeListener('change', onChange);
	});

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
