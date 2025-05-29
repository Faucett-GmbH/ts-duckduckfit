export type Path = Array<string | number>;

export type Difference =
  | {
    type: "delete";
    path: Path;
  }
  | {
    type: "set";
    path: Path;
    value: unknown;
  }
  | {
    type: "diff";
    path: Path;
    differences: Difference[];
  }
  | {
    type: "move";
    path: Path;
    from: number;
    to: number;
  };

export type GetKeyFn = (
  value: unknown,
  index: number,
  path: Path,
) => string | number;

export function applyDiff<T>(obj: T, differences: Difference[]) {
  for (const difference of differences) {
    switch (difference.type) {
      case "set": {
        setValueAtPath(obj, difference.path, difference.value);
        break;
      }
      case "delete": {
        deleteAtPath(obj, difference.path);
        break;
      }
      case "move": {
        const array = ensurePath(obj, difference.path) as unknown as unknown[];
        const value = array[difference.from];
        array[difference.from] = null;
        array[difference.to] = value;
        break;
      }
      case "diff": {
        const object = ensurePath(obj, difference.path) as Record<
          string,
          unknown
        >;
        const value = object[difference.path[difference.path.length - 1]];
        applyDiff(value, difference.differences);
        break;
      }
    }
  }
}

function ensurePath(obj: unknown, path: Path) {
  let current = obj as Record<string | number, unknown>;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key]) {
      if (typeof key === "number") {
        current[key] = [];
      } else {
        current[key] = {};
      }
    }
    current = current[key] as Record<string | number, unknown>;
  }
  return current;
}

function setValueAtPath(obj: unknown, path: Path, value: unknown) {
  ensurePath(obj, path)[path[path.length - 1]] = value;
}

function deleteAtPath(obj: unknown, path: Path) {
  const current = ensurePath(obj, path);
  const key = path[path.length - 1];
  if (Array.isArray(current)) {
    current.splice(key as number, 1);
  } else {
    delete current[key];
  }
}

export function diff<A, B>(a: A, b: B, getKey: GetKeyFn) {
  return differencesInternal(a, b, [], getKey);
}

export function applyChanges<A, B>(a: A, b: B, getKey: GetKeyFn) {
  applyDiff(a, diff(a, b, getKey));
}

function differencesInternal(
  a: unknown,
  b: unknown,
  path: Path,
  getKey: GetKeyFn,
) {
  const aType = typeof a;
  const bType = typeof b;
  if (aType !== bType) {
    throw new Error("Type mismatch");
  }
  if (Array.isArray(a) && b !== null) {
    return arrayDifferences(a as [], b as [], path, getKey);
  }
  if (aType === "object" && a !== null && b !== null) {
    return objectDifferences(
      a as object,
      b as object,
      path,
      getKey,
    ) as Difference[];
  }
  if (a !== b) {
    return [{ type: "set", path, value: b } as Difference];
  }
  return [];
}

function objectDifferences(a: object, b: object, path: Path, getKey: GetKeyFn) {
  const objectDifferences: Difference[] = [];
  const keys = new Set(Object.keys(a).concat(Object.keys(b)));

  for (const key of keys) {
    if (Object.hasOwn(a, key)) {
      const aValue = (a as never)[key];
      if (Object.hasOwn(b, key)) {
        const bValue = (b as never)[key];
        const keyDifferences = differencesInternal(
          aValue,
          bValue,
          [],
          getKey,
        ) as Difference[];
        if (keyDifferences.length) {
          objectDifferences.push({
            type: "diff",
            path: [...path, key],
            differences: keyDifferences,
          });
        }
      } else {
        objectDifferences.push({ type: "delete", path: [...path, key] });
      }
    } else {
      const bValue = (b as never)[key];
      objectDifferences.push({
        type: "set",
        path: [...path, key],
        value: bValue,
      });
    }
  }

  return objectDifferences;
}

function arrayDifferences<T>(a: [], b: [], path: Path, getKey: GetKeyFn) {
  const arrayDifferences: Difference[] = [];
  const aObject: Record<string, [index: number, value: T]> = {};
  const bObject: Record<string, [index: number, value: T]> = {};
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) {
    if (i < a.length) {
      const aValue = a[i];
      const aKey = getKey(aValue, i, path);
      aObject[aKey] = [i, aValue];
    }
    if (i < b.length) {
      const bValue = b[i];
      const bKey = getKey(bValue, i, path);
      bObject[bKey] = [i, bValue];
    }
  }
  const keys = new Set(Object.keys(aObject).concat(Object.keys(bObject)));
  for (const key of keys) {
    if (Object.hasOwn(aObject, key)) {
      const [aIndex, aValue] = aObject[key];
      if (Object.hasOwn(bObject, key)) {
        const [bIndex, bValue] = bObject[key];
        if (aIndex !== bIndex) {
          arrayDifferences.push({
            type: "move",
            path,
            from: aIndex,
            to: bIndex,
          });
        }
        const keyDifferences = differencesInternal(
          aValue,
          bValue,
          [],
          getKey,
        ) as Difference[];
        if (keyDifferences.length) {
          arrayDifferences.push({
            type: "diff",
            path: [bIndex],
            differences: keyDifferences,
          });
        }
      } else {
        const keyPath = [...path, aIndex];
        arrayDifferences.push({ type: "set", path: keyPath, value: aValue });
      }
    } else {
      const [bIndex, bValue] = bObject[key];
      const keyPath = [...path, bIndex];
      arrayDifferences.push({ type: "set", path: keyPath, value: bValue });
    }
  }

  return arrayDifferences;
}
