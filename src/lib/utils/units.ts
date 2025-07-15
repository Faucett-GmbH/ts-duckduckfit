export type FeetInches = {
	feet: number;
	inches: number;
};

export function cmToFeetInches(cm: number): FeetInches {
	const totalInches = cm / 2.54;
	return {
		feet: Math.floor(totalInches / 12),
		inches: Math.round(totalInches % 12)
	};
}

export function feetInchesToCm(feetInches: FeetInches): number {
	return Math.round((feetInches.feet * 12 + feetInches.inches) * 2.54);
}

export function kgToLbs(kg: number): number {
	return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbsToKg(lbs: number): number {
	return Math.round((lbs / 2.20462) * 10) / 10;
}

export function cmToInches(cm: number): number {
	return Math.round((cm / 2.54) * 10) / 10;
}

export function inchesToCm(inches: number): number {
	return Math.round(inches * 2.54 * 10) / 10;
}

export function kmToMiles(km: number): number {
	return Math.round(km * 0.621371 * 100) / 100;
}

export function milesToKm(miles: number): number {
	return Math.round((miles / 0.621371) * 100) / 100;
}
