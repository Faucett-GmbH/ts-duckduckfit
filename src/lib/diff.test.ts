import { describe, it } from 'vitest';
import { applyDiff, diff, type Path } from './diff';

function getKey(value: unknown, index: number, path: Path) {
  return (value as any).id;
}

describe('diff', () => {
  it('should get deep differences between two objects', () => {
    const aObject = { a: 1, b: 2, array: [{ id: 1 }] };
    const bObject = { a: 1, c: 3, array: [{ id: 2 }, { id: 1 }] };
    const differences = diff(aObject, bObject, getKey);
    console.log(JSON.stringify(differences, null, 2));
    applyDiff(aObject, differences);
    console.log(JSON.stringify(aObject, null, 2));
  });
});
