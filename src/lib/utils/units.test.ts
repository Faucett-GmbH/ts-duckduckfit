import { describe, it, expect } from 'vitest';
import { cmToFeetInches, feetInchesToCm } from './units';


// note: b/c we do not use rationals (and also rn we do not care)
// cm => ft.in and ft.in => cm are not inverses of one another.
// i.e. switching back and forth will mess up your data and you will need to correct it.
describe('cm to ft.in <=> ft.in to cm', () => {

  it('convert centimeters to feet and inches', () => {
    let tests = [
      { 'cm': 9, 'r': { 'ft': 0, 'in': 4 } },
      { 'cm': 55, 'r': { 'ft': 1, 'in': 10 } },
      { 'cm': 187, 'r': { 'ft': 6, 'in': 2 } },
    ]
    for (var i = 0; i < tests.length; i++) {
      let test = tests[i];
      let result = cmToFeetInches(test.cm)
      expect(result.feet).toEqual(test.r.ft);
      expect(result.inches).toEqual(test.r.in);
    }
  });

  it('convert feet and inches to', () => {
    let tests = [
      { 't': { 'feet': 0, 'inches': 4 }, 'r': { 'cm': 10 } },
      { 't': { 'feet': 1, 'inches': 10 }, 'r': { 'cm': 56 } },
      { 't': { 'feet': 6, 'inches': 2 }, 'r': { 'cm': 188 } },
    ]
    for (var i = 0; i < tests.length; i++) {
      let test = tests[i];
      let result = feetInchesToCm(test.t)
      expect(result).toEqual(test.r.cm);
    }
  });
});
