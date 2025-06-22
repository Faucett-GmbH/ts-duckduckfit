<script lang="ts" module>
	export const fractionDigits = 4;
	export const initialFractionDigits = 2;

	export type UnitOption = {
		name: string;
		units: string;
		type: 'mass' | 'distance' | 'duration' | 'any';
	};

	export const imperial_MASS_OPTIONS: UnitOption[] = [
		{ name: 'pounds', units: 'lb', type: 'mass' }
	];
	export const MASS_OPTIONS: UnitOption[] = [{ name: 'kilograms', units: 'kg', type: 'mass' }];

	export const imperial_DISTANCE_OPTIONS: UnitOption[] = [
		{ name: 'miles', units: 'm', type: 'distance' },
		{ name: 'yards', units: 'yd', type: 'distance' },
		{ name: 'feet', units: 'ft', type: 'distance' },
		{ name: 'inches', units: 'in', type: 'distance' }
	];
	export const DISTANCE_OPTIONS: UnitOption[] = [
		{ name: 'kilometers', units: 'km', type: 'distance' },
		{ name: 'meters', units: 'm', type: 'distance' },
		{ name: 'centimeters', units: 'cm', type: 'distance' }
	];

	export const DURATION_OPTIONS: UnitOption[] = [
		{ name: 'hours', units: 'hr', type: 'duration' },
		{ name: 'minutes', units: 'm', type: 'duration' },
		{ name: 'seconds', units: 's', type: 'duration' }
	];

	export const imperial_BOTH_OPTIONS = [
		...imperial_MASS_OPTIONS,
		...imperial_DISTANCE_OPTIONS,
		...DURATION_OPTIONS
	];
	export const BOTH_OPTIONS = [...MASS_OPTIONS, ...DISTANCE_OPTIONS, ...DURATION_OPTIONS];

	export type MeasurementSystem = 'metric' | 'imperial';

	export const MEASUREMENT_TYPES = ['mass', 'distance', 'duration', 'any'] as const;
	export type MeasurementType = (typeof MEASUREMENT_TYPES)[number];

	export const MASS_UNITS = ['kg'] as const;
	export type WeightUnit = (typeof MASS_UNITS)[number];

	export const imperial_MASS_UNITS = ['lb'] as const;
	export type ImperialWeightUnit = (typeof imperial_MASS_UNITS)[number];

	export const DISTANCE_UNITS = ['km', 'm', 'cm'] as const;
	export type DistanceUnit = (typeof DISTANCE_UNITS)[number];

	export const imperial_DISTANCE_UNITS = ['m', 'yd', 'ft', 'in'] as const;
	export type ImperialDistanceUnit = (typeof imperial_DISTANCE_UNITS)[number];

	export const DURATION_UNITS = ['hr', 'm', 's'] as const;
	export type DurationUnit = (typeof DURATION_UNITS)[number];

	export type ImperialUnit = ImperialWeightUnit | ImperialDistanceUnit | DurationUnit;
	export type Unit = WeightUnit | DistanceUnit | DurationUnit;

	export type Units<S, T> = S extends 'metric'
		? T extends 'any'
			? Unit
			: T extends 'mass'
				? WeightUnit
				: T extends 'distance'
					? DistanceUnit
					: DurationUnit
		: T extends 'any'
			? ImperialUnit
			: T extends 'mass'
				? ImperialWeightUnit
				: T extends 'distance'
					? ImperialDistanceUnit
					: DurationUnit;

	export function metersToFeet(meters: number) {
		return meters * 3.28084;
	}
	export function centimetersToInches(centimeters: number) {
		return centimeters * 0.393701;
	}
	export function feetToMeters(feet: number) {
		return feet * 0.3048;
	}
	export function inchesToCentimeters(inches: number) {
		return inches * 2.54;
	}
	export function milesToFeet(miles: number) {
		return miles * 5280;
	}
	export function feetToMiles(feet: number) {
		return feet * 0.000189394;
	}
	export function feetToInches(feet: number) {
		return feet * 12;
	}
	export function inchesToFeet(inches: number) {
		return inches * 0.08333333333333333;
	}
	export function yardsInFeet(yards: number) {
		return yards * 0.333333;
	}
	export function yardsToFeet(yards: number) {
		return yards * 3;
	}
	export function poundsToKilograms(pounds: number) {
		return pounds * 0.453592;
	}
	export function kilogramsToPounds(kilograms: number) {
		return kilograms * 2.20462;
	}

	export function toImperial<
		T extends MeasurementType,
		U extends Units<'metric', T>,
		R extends Units<'imperial', T>
	>(value: number, type: T, units: U, allowConvert = true): [value: number, units: R] {
		switch (type) {
			case 'mass':
				const massUnits = units as Units<'metric', 'mass'>;
				switch (massUnits) {
					case 'kg':
						return [kilogramsToPounds(value), 'lb' as R];
				}
				break;
			case 'distance':
				const distanceUnits = units as Units<'metric', 'distance'>;
				switch (distanceUnits) {
					case 'km':
						return [feetToMiles(metersToFeet(value / 1000)), 'm' as R];
					case 'm':
						if (allowConvert && value > 1000) {
							return [feetToMiles(metersToFeet(value)), 'm' as R];
						}
						return [metersToFeet(value), 'ft' as R];
					case 'cm':
						return [centimetersToInches(value), 'in' as R];
				}
				break;
			case 'duration':
				const durationUnits = units as Units<'metric', 'duration'>;
				switch (durationUnits) {
					case 'hr':
						if (allowConvert && value < 1) {
							return [value * 60, 'm' as R];
						}
					case 'm':
						if (allowConvert && value > 60) {
							return [value / 60, 'hr' as R];
						}
					case 's':
						if (allowConvert && value > 60) {
							return [value / 60, 'm' as R];
						}
				}
				break;
		}
		return [value, units as never];
	}

	export function toMetric<
		T extends MeasurementType,
		U extends Units<'imperial', T>,
		R extends Units<'metric', T>
	>(value: number, type: T, units: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				const massUnits = units as Units<'imperial', 'mass'>;
				switch (massUnits) {
					case 'lb':
						return [poundsToKilograms(value), 'kg' as R];
				}
				break;
			case 'distance':
				const distanceUnits = units as Units<'imperial', 'distance'>;
				switch (distanceUnits) {
					case 'm':
						return [feetToMeters(milesToFeet(value)) / 1000, 'km' as R];
					case 'yd':
						return [feetToMeters(yardsToFeet(value)), 'm' as R];
					case 'ft':
						return [feetToMeters(value), 'm' as R];
					case 'in':
						return [inchesToCentimeters(value), 'cm' as R];
				}
				break;
		}
		return [value, units as never];
	}

	export function metricToReadable<
		T extends MeasurementType,
		U extends Units<'metric', T>,
		R extends Units<'metric', T>
	>(value: number, type: T, units: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				break;
			case 'distance':
				const distanceUnits = units as Units<'metric', 'distance'>;
				switch (distanceUnits) {
					case 'km':
						if (value < 1) {
							return [value * 1000, 'm' as R];
						}
						break;
					case 'm':
						if (value > 1000) {
							return [value / 1000, 'km' as R];
						}
						break;
				}
				break;
			case 'duration':
				const durationUnits = units as Units<'metric', 'duration'>;
				switch (durationUnits) {
					case 'hr':
						if (value < 0.1) {
							return [value * 60 * 60, 's' as R];
						} else if (value < 1) {
							return [value * 60, 'm' as R];
						}
						break;
					case 'm':
						if (value > 60) {
							return [value / 60, 'hr' as R];
						} else if (value < 1) {
							return [value * 60, 's' as R];
						}
						break;
					case 's':
						if (value > 3600) {
							return [value / (60 * 60), 'hr' as R];
						} else if (value > 60) {
							return [value / 60, 'm' as R];
						}
						break;
				}
				break;
		}
		return [value, units as never];
	}

	export function convertImperialUnits<
		T extends MeasurementType,
		U extends Units<'imperial', T>,
		R extends Units<'metric', T>
	>(value: number, type: T, previousUnits: U, nextUnits: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				break;
			case 'distance':
				const distancePreviousUnits = previousUnits as Units<'imperial', 'distance'>;
				const distanceNextUnits = nextUnits as Units<'imperial', 'distance'>;
				switch (distancePreviousUnits) {
					case 'm':
						switch (distanceNextUnits) {
							case 'yd':
								return [yardsInFeet(milesToFeet(value)), distanceNextUnits as R];
							case 'ft':
								return [milesToFeet(value), distanceNextUnits as R];
							case 'in':
								return [feetToInches(milesToFeet(value)), distanceNextUnits as R];
						}
					case 'yd': {
						switch (distanceNextUnits) {
							case 'm':
								return [feetToMiles(yardsToFeet(value)), distanceNextUnits as R];
							case 'ft':
								return [yardsToFeet(value), distanceNextUnits as R];
							case 'in':
								return [feetToInches(yardsToFeet(value)), distanceNextUnits as R];
						}
					}
					case 'ft': {
						switch (distanceNextUnits) {
							case 'm':
								return [feetToMiles(value), distanceNextUnits as R];
							case 'yd':
								return [yardsInFeet(value), distanceNextUnits as R];
							case 'in':
								return [feetToInches(value), distanceNextUnits as R];
						}
					}
					case 'in': {
						switch (distanceNextUnits) {
							case 'm':
								return [feetToMiles(inchesToFeet(value)), distanceNextUnits as R];
							case 'yd':
								return [yardsInFeet(inchesToFeet(value)), distanceNextUnits as R];
							case 'ft':
								return [inchesToFeet(value), distanceNextUnits as R];
						}
					}
				}
				break;
			case 'duration':
				return convertDurationUnits(
					value,
					previousUnits as Units<'metric', 'duration'>,
					nextUnits as Units<'metric', 'duration'>
				) as [value: number, units: R];
		}
		return [value, nextUnits as never];
	}

	export function convertMetricUnits<
		T extends MeasurementType,
		U extends Units<'metric', T>,
		R extends Units<'metric', T>
	>(value: number, type: T, previousUnits: U, nextUnits: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				break;
			case 'distance':
				const distancePreviousUnits = previousUnits as Units<'metric', 'distance'>;
				const distanceNextUnits = nextUnits as Units<'metric', 'distance'>;
				switch (distancePreviousUnits) {
					case 'km':
						switch (distanceNextUnits) {
							case 'm':
								return [value * 1000, distanceNextUnits as R];
							case 'cm':
								return [value * 100000, distanceNextUnits as R];
						}
					case 'm':
						switch (distanceNextUnits) {
							case 'km':
								return [value / 1000, distanceNextUnits as R];
							case 'cm':
								return [value * 100, distanceNextUnits as R];
						}
					case 'cm':
						switch (distanceNextUnits) {
							case 'km':
								return [value / 100000, distanceNextUnits as R];
							case 'm':
								return [value / 100, distanceNextUnits as R];
						}
				}
				break;
			case 'duration':
				return convertDurationUnits(
					value,
					previousUnits as Units<'metric', 'duration'>,
					nextUnits as Units<'metric', 'duration'>
				) as [value: number, units: R];
		}
		return [value, nextUnits as never];
	}

	export function convertDurationUnits<
		U extends Units<'metric', 'duration'>,
		R extends Units<'metric', 'duration'>
	>(value: number, previousUnits: U, nextUnits: R): [value: number, units: R] {
		switch (previousUnits) {
			case 'hr':
				switch (nextUnits) {
					case 'm':
						return [value * 60, nextUnits];
					case 's':
						return [value * 60 * 60, nextUnits];
				}
				break;
			case 'm':
				switch (nextUnits) {
					case 'hr':
						return [value / 60, nextUnits];
					case 's':
						return [value * 60, nextUnits];
				}
				break;
			case 's':
				switch (nextUnits) {
					case 'hr':
						return [value / (60 * 60), nextUnits];
					case 'm':
						return [value / 60, nextUnits];
				}
				break;
		}
		return [value, nextUnits as never];
	}

	export interface MeasurementInputProps<S extends MeasurementSystem, T extends MeasurementType> {
		class?: string;
		id?: string;
		type?: T;
		name?: string;
		disabled?: boolean;
		metricValue?: number;
		metricUnits?: Units<'metric', T>;
		metricUnitOptions?: UnitOption[];
		imperialUnitOptions?: UnitOption[];
		oninput?(metricValue: number, metricUnits: Units<'metric', T>, name?: string): void;
		onchange?(metricValue: number, metricUnits: Units<'metric', T>, name?: string): void;
	}
</script>

<script lang="ts" generics="S extends MeasurementSystem, T extends MeasurementType">
	import { getMeasurementSystem, getNumbers } from '$lib/state/settings.svelte';
	import type { EventHandler } from 'svelte/elements';
	import TypedInput from './TypedInput.svelte';

	let {
		class: className = '',
		id,
		type = 'mass' as T,
		name,
		disabled,
		metricValue = $bindable(0),
		metricUnits = $bindable(type === 'mass' ? 'kg' : type === 'distance' ? 'km' : 'hr') as never,
		metricUnitOptions = BOTH_OPTIONS,
		imperialUnitOptions = imperial_BOTH_OPTIONS,
		oninput,
		onchange
	}: MeasurementInputProps<S, T> = $props();

	let unitOptions: UnitOption[] = $state([]);
	let valueNumber = $state(0);
	let valueString = $state('0');
	let units = $state<Units<S, T>>();
	let valueNumberLast: typeof valueNumber;
	let unitsLast: typeof units;
	let metricValueLast: typeof metricValue;
	let metricUnitsLast: typeof metricUnits;
	let typeLast: typeof type;
	let systemLast: MeasurementSystem;
	let allowConvert = true;
	let first = true;

	$effect(() => {
		if (systemLast === getMeasurementSystem() && typeLast === type) {
			return;
		}
		systemLast = getMeasurementSystem();
		typeLast = type;
		allowConvert = true;
		first = true;

		if (getMeasurementSystem() === 'metric') {
			if (type === 'any') {
				unitOptions = BOTH_OPTIONS;
			} else if (type === 'mass') {
				unitOptions = MASS_OPTIONS;
			} else if (type === 'distance') {
				unitOptions = DISTANCE_OPTIONS;
			} else {
				unitOptions = DURATION_OPTIONS;
			}
			unitOptions = unitOptions.filter((unit) =>
				metricUnitOptions.some((u) => unit.units === u.units)
			);
			if (!units && unitOptions.some((u) => u.units === metricUnits)) {
				units = metricUnits as never;
			}
			valueNumber = metricValue;
			valueString = metricValue.toString();
		} else {
			if (type === 'any') {
				unitOptions = imperial_BOTH_OPTIONS;
			} else if (type === 'mass') {
				unitOptions = imperial_MASS_OPTIONS;
			} else if (type === 'distance') {
				unitOptions = imperial_DISTANCE_OPTIONS;
			} else {
				unitOptions = DURATION_OPTIONS;
			}
			unitOptions = unitOptions.filter((unit) =>
				imperialUnitOptions.some((u) => unit.units === u.units)
			);
			if (!units) {
				const [newValue, newUnits] = toImperial(metricValue, type, metricUnits);
				valueNumber = newValue;
				valueString = newValue.toString();
				units = newUnits as never;
			}
		}
		if (!units || !unitOptions.some((uo) => uo.units === units)) {
			units = unitOptions[0].units as never;
		}
	});

	$effect(() => {
		if (valueNumberLast === valueNumber && unitsLast === units && typeLast === type) {
			return;
		}
		valueNumberLast = valueNumber;
		unitsLast = units;
		typeLast = type;

		const [v, u] =
			getMeasurementSystem() === 'metric'
				? [valueNumber, units]
				: toMetric(valueNumber, type, units as Units<'imperial', T>);
		const [newMetricValue, newMetricUnits] = convertMetricUnits(
			v,
			type,
			u as Units<'metric', T>,
			metricUnits
		);
		metricValue = metricValueLast = newMetricValue;
		metricUnits = metricUnitsLast = newMetricUnits;
		oninput?.call(window, metricValue, metricUnits, name);
		onchange?.call(window, metricValue, metricUnits, name);
	});

	$effect(() => {
		if (
			!first &&
			metricValueLast === metricValue &&
			metricUnitsLast === metricUnits &&
			typeLast === type
		) {
			return;
		}
		metricValueLast = metricValue;
		metricUnitsLast = metricUnits;
		typeLast = type;
		first = false;

		const [v, u] =
			getMeasurementSystem() === 'metric'
				? allowConvert
					? metricToReadable(metricValue, type, metricUnits)
					: [metricValue, metricUnits]
				: toImperial(metricValue, type, metricUnits, allowConvert);
		if (allowConvert) {
			allowConvert = false;
			units = u as never;
		}
		valueNumber = valueNumberLast = v;
		valueString = getNumbers().format(v, initialFractionDigits);
	});

	function onValueNumberChange(value: number, _name?: string) {
		valueNumber = value;
		valueString = getNumbers().format(valueNumber, initialFractionDigits);
	}

	const onUnitChange: EventHandler<Event, HTMLSelectElement> = (e) => {
		const previousUnits = units;
		const nextUnits = e.currentTarget.value;
		const [v, u] =
			getMeasurementSystem() === 'metric'
				? convertMetricUnits(
						valueNumber,
						type,
						previousUnits as Units<'metric', T>,
						nextUnits as Units<'metric', T>
					)
				: convertImperialUnits(
						valueNumber,
						type,
						previousUnits as Units<'imperial', T>,
						nextUnits as Units<'imperial', T>
					);
		allowConvert = false;
		valueNumber = v;
		valueString = getNumbers().format(valueNumber, initialFractionDigits);
		units = u as never;
	};
</script>

<div class="flex flex-row">
	<TypedInput
		class={className}
		{id}
		{name}
		{disabled}
		value={valueString}
		oninput={onValueNumberChange}
		unit={unitOptions.length === 1 ? unitOptions[0].units : undefined}
	/>
	{#if unitOptions.length > 1}<select
			class="ms-1 flex-shrink"
			aria-label="Units"
			{disabled}
			oninput={onUnitChange}
			value={units}
		>
			{#each unitOptions as unitOption}
				<option value={unitOption.units} title={unitOption.name}>{unitOption.units}</option>
			{/each}
		</select>{/if}
</div>
