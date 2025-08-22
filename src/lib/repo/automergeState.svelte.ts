import type { DocHandleChangePayload } from '@automerge/automerge-repo';
import type { AutomergeDocHandle } from '.';

export type AutomergeState<T> = ReturnType<typeof automergeState<T>>;

export function automergeState<T>(docHandle: AutomergeDocHandle<T>) {
	let doc = $state(docHandle.doc());

	function onChange(payload: DocHandleChangePayload<T>) {
		doc = payload.doc;
	}

	docHandle.addListener('change', onChange);

	$effect(() => () => docHandle.removeListener('change', onChange));

	return {
		get current() {
			return doc;
		},
		change(fn: (d: T) => T) {
			docHandle.change(fn);
		}
	};
}
