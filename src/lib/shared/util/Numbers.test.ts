import { describe, it, expect } from 'vitest';
import { Numbers } from './Numbers';

describe('Numbers', () => {
	it('should parse numbers for en-US', () => {
		const numberParser = new Numbers('en-US');
		expect(numberParser.parse('.0')).toEqual(0);
		expect(numberParser.parse('0.0')).toEqual(0);
		expect(numberParser.parse('0')).toEqual(0);
		expect(numberParser.parse('1')).toEqual(1);
		expect(numberParser.parse('1.0')).toEqual(1);
		expect(numberParser.parse('1.123')).toEqual(1.123);
		expect(numberParser.parse('123.123')).toEqual(123.123);
	});
	it('should parse numbers for de-DE', () => {
		const numberParser = new Numbers('de-DE');
		expect(numberParser.parse(',0')).toEqual(0);
		expect(numberParser.parse('0,0')).toEqual(0);
		expect(numberParser.parse('0')).toEqual(0);
		expect(numberParser.parse('1')).toEqual(1);
		expect(numberParser.parse('1,0')).toEqual(1);
		expect(numberParser.parse('1,123')).toEqual(1.123);
		expect(numberParser.parse('123,123')).toEqual(123.123);
	});
	it('should format numbers for en-US', () => {
		const numberParser = new Numbers('en-US');
		expect(numberParser.format(0)).toEqual('0');
		expect(numberParser.format(1)).toEqual('1');
		expect(numberParser.format(1.123)).toEqual('1.123');
		expect(numberParser.format(123.123)).toEqual('123.123');
	});
	it('should format numbers for de-DE', () => {
		const numberParser = new Numbers('de-DE');
		expect(numberParser.format(0)).toEqual('0');
		expect(numberParser.format(1)).toEqual('1');
		expect(numberParser.format(1.123)).toEqual('1,123');
		expect(numberParser.format(123.123)).toEqual('123,123');
	});
});
