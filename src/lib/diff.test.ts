import { describe, it, expect } from 'vitest';
import { applyChanges, getChanges } from './diff';

interface TestDiffObject {
  a: number;
  b?: number;
  c?: number;
  array: Array<{ id: number; name?: string, children: { id: number; value: number }[] }>;
}

describe('diff', () => {
  it('should get deep differences between two objects', () => {
    const aObject: TestDiffObject = { a: 1, b: 2, array: [{ id: 1, name: 'old', children: [] }, { id: 3, children: [{ id: 1, value: 1 }] }] };
    const bObject: TestDiffObject = { a: 1, c: 3, array: [{ id: 2, children: [] }, { id: 3, children: [{ id: 1, value: 2 }] }, { id: 1, name: 'new', children: [] }] };
    const changes = getChanges(aObject, bObject, (value) => value.id);
    if (Array.isArray(changes)) {
      applyChanges(aObject, changes);
    }
    expect(aObject).toEqual(bObject);
  });
});
