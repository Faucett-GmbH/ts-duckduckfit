export class Numbers {
	private language: string;
	private group: RegExp;
	private decimal: RegExp;
	private numeral: RegExp;
	private index: (key: string) => string;

	constructor(language?: string) {
		this.language = language ?? navigator.language;
		const format = new Intl.NumberFormat(this.language);
		const parts = format.formatToParts(12345.6);
		const numerals = Array.from({ length: 10 }).map((_, i) => format.format(i));
		const index = new Map(numerals.map((d, i) => [d, i.toString()]));
		this.group = new RegExp(`[${parts.find((d) => d.type === 'group')?.value}]`, 'g');
		this.decimal = new RegExp(`[${parts.find((d) => d.type === 'decimal')?.value}]`);
		this.numeral = new RegExp(`[${numerals.join('')}]`, 'g');
		this.index = (d) => index.get(d) as string;
	}
	parse(string: string) {
		const parsed = string
			.trim()
			.replace(this.group, '')
			.replace(this.decimal, '.')
			.replace(this.numeral, this.index);
		return parsed ? +parsed : NaN;
	}
	format(x: number, fractionDigits?: number) {
		if (fractionDigits !== undefined && fractionDigits < 1) {
			return Math.round(x).toString();
		}
		if (x % 1 === 0) {
			return x.toString();
		} else {
			return x.toLocaleString(this.language, {
				maximumFractionDigits: fractionDigits
			});
		}
	}
}
