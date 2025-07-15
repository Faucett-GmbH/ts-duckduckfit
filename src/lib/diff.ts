// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetKeyFn = (value: any, index: number, array: any[]) => string | number;

export type Change<T> = ObjectChange<T> | ArrayChange<ArrayInner<T>>;

export function getChanges<T>(
	a: T,
	b: T,
	getKey: GetKeyFn
): { type: 'replace'; value: T } | Change<T>[] {
	const aValue = typeof a?.valueOf === 'function' ? (a.valueOf() as never) : a;
	const bValue = typeof b?.valueOf === 'function' ? (b.valueOf() as never) : b;
	const aType = typeof aValue;
	const bType = typeof bValue;
	if (aType !== bType) {
		return { type: 'replace', value: b };
	}
	if (Array.isArray(aValue) && Array.isArray(bValue)) {
		return getArrayChanges(aValue, bValue, getKey) as never;
	}
	if (aType === 'object' && aValue != null && bValue != null) {
		return getObjectChanges(aValue, bValue, getKey) as never;
	}
	if (aValue !== bValue) {
		return { type: 'replace', value: b };
	}
	return [];
}

export type ArrayInner<T> = T extends Array<infer U> ? U : never;

export type ObjectChange<T> =
	| { type: 'object-set'; key: string; value: T[keyof T] }
	| { type: 'object-delete'; key: string }
	| {
			type: 'object-changes';
			key: string;
			changes: Change<T[keyof T]>[] | { type: 'replace'; value: T[keyof T] };
	  };

export function getObjectChanges<T extends object>(
	a: T,
	b: T,
	getKey: GetKeyFn
): ObjectChange<T>[] {
	const changes: ObjectChange<T>[] = [];

	const keys = new Set(Object.keys(a).concat(Object.keys(b)));

	for (const key of keys) {
		if (Object.hasOwn(a, key)) {
			const aValue = (a as never)[key] as T[keyof T];
			if (Object.hasOwn(b, key)) {
				const bValue = (b as never)[key] as T[keyof T];
				const keyChanges = getChanges<T[keyof T]>(aValue, bValue, getKey);
				if (Array.isArray(keyChanges)) {
					if (keyChanges.length) {
						changes.push({
							type: 'object-changes',
							key,
							changes: keyChanges
						});
					}
				} else {
					changes.push({ type: 'object-set', key, value: keyChanges.value });
				}
			} else {
				changes.push({ type: 'object-delete', key });
			}
		} else {
			const bValue = (b as never)[key];
			changes.push({ type: 'object-set', key, value: bValue });
		}
	}

	return changes;
}

export type ArrayChange<T> =
	| { type: 'array-insert'; index: number; item: T }
	| { type: 'array-delete'; index: number }
	| { type: 'array-move'; from: number; to: number }
	| { type: 'array-changes'; index: number; changes: Change<T>[] | { type: 'replace'; value: T } }
	| { type: 'array-replace'; index: number; value: T };

export function getArrayChanges<T>(arrayA: T[], arrayB: T[], getKey: GetKeyFn): ArrayChange<T>[] {
	const moves: ArrayChange<T>[] = [];
	const changes: ArrayChange<T>[] = [];

	const bKeys = arrayB.map(getKey);
	const aKeys = new Array(arrayA.length);
	const aKeyToIndex: { [key: string | number]: number } = {};
	for (let i = 0; i < arrayA.length; i++) {
		const value = arrayA[i];
		const key = getKey(value, i, arrayA);
		aKeys[i] = key;
		aKeyToIndex[key] = i;
	}

	const bKeySet = new Set(bKeys);
	for (let i = aKeys.length - 1; i >= 0; i--) {
		const currentKey = aKeys[i];

		if (!bKeySet.has(currentKey)) {
			moves.push({ type: 'array-delete', index: i });
			aKeys.splice(i, 1);
		}
	}

	for (let i = 0; i < bKeys.length; i++) {
		const desiredKey = bKeys[i];
		const currentKey = aKeys[i];

		if (currentKey === desiredKey) {
			const itemChanges = getChanges(arrayA[aKeyToIndex[desiredKey]], arrayB[i], getKey);
			if (Array.isArray(itemChanges)) {
				if (itemChanges.length) {
					changes.push({ type: 'array-changes', index: i, changes: itemChanges });
				}
			} else {
				changes.push({ type: 'array-replace', index: i, value: itemChanges.value });
			}
			continue;
		}
		const existingIndex = aKeys.indexOf(desiredKey, i + 1);

		if (existingIndex !== -1) {
			const itemChanges = getChanges(arrayA[aKeyToIndex[desiredKey]], arrayB[i], getKey);
			if (Array.isArray(itemChanges)) {
				if (itemChanges.length) {
					changes.push({ type: 'array-changes', index: i, changes: itemChanges });
				}
			} else {
				changes.push({ type: 'array-replace', index: i, value: itemChanges.value });
			}

			moves.push({ type: 'array-move', from: existingIndex, to: i });
			const [moved] = aKeys.splice(existingIndex, 1);
			aKeys.splice(i, 0, moved);
		} else {
			const newItem = arrayB[i];
			moves.push({ type: 'array-insert', index: i, item: newItem });
			aKeys.splice(i, 0, desiredKey);
		}
	}

	while (aKeys.length > bKeys.length) {
		moves.push({ type: 'array-delete', index: aKeys.length - 1 });
		aKeys.pop();
	}

	return moves.concat(changes);
}

export function applyChanges<T>(a: T, changes: Change<T>[]) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const aAny = a as any;
	for (const change of changes) {
		switch (change.type) {
			case 'array-insert':
				aAny.splice(change.index, 0, change.item);
				break;
			case 'array-delete':
				aAny.splice(change.index, 1);
				break;
			case 'array-move': {
				const [moved] = aAny.splice(change.from, 1);
				aAny.splice(change.to, 0, moved);
				break;
			}
			case 'array-replace': {
				aAny[change.index] = change.value;
				break;
			}
			case 'array-changes': {
				if (Array.isArray(change.changes)) {
					applyChanges(aAny[change.index], change.changes as never);
				} else {
					aAny[change.index] = change.changes.value;
				}
				break;
			}
			case 'object-set': {
				aAny[change.key] = change.value;
				break;
			}
			case 'object-delete': {
				delete aAny[change.key];
				break;
			}
			case 'object-changes': {
				if (Array.isArray(change.changes)) {
					applyChanges(aAny[change.key], change.changes as never);
				} else {
					aAny[change.key] = change.changes.value;
				}
				break;
			}
		}
	}
}

export function getAndApplyChanges<T>(a: T, b: T, getKey: GetKeyFn) {
	const changes = getChanges(a, b, getKey);
	if (Array.isArray(changes)) {
		if (changes.length) {
			return applyChanges(a, changes);
		}
	}
	return b;
}
