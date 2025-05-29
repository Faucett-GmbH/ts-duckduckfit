import { describe, it, expect } from 'vitest';
import { applyDiff, diff, type Path } from './diff';

function getKey(value: unknown, _index: number, _path: Path) {
  return (value as { id: number }).id;
}

interface TestDiffObject {
  a: number;
  b?: number;
  c?: number;
  array: Array<{ id: number }>;
}


describe('diff', () => {
  it('should get deep differences between two objects', () => {
    const aObject: TestDiffObject = { a: 1, b: 2, array: [{ id: 1 }] };
    const bObject: TestDiffObject = { a: 1, c: 3, array: [{ id: 2 }, { id: 1 }] };
    const differences = diff(aObject, bObject, getKey);
    applyDiff(aObject, differences);
    expect(aObject).toEqual(bObject);
  });
});
