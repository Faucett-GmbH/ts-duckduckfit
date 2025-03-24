<script lang="ts" module>
	export const fractionDigits = 4;
	export const initialFractionDigits = 2;

	export type UnitOption = {
		name: string;
		units: string;
		type: 'mass' | 'distance' | 'duration' | 'any';
	};

	export const IMPERIAL_MASS_OPTIONS: UnitOption[] = [
		{ name: 'pounds', units: 'lb', type: 'mass' }
	];
	export const MASS_OPTIONS: UnitOption[] = [{ name: 'kilograms', units: 'kg', type: 'mass' }];

	export const IMPERIAL_DISTANCE_OPTIONS: UnitOption[] = [
		{ name: 'miles', units: 'm', type: 'distance' },
		{ name: 'yards', units: 'yd', type: 'distance' },
		{ name: 'feet', units: 'ft', type: 'distance' }
	];
	export const DISTANCE_OPTIONS: UnitOption[] = [
		{ name: 'kilometers', units: 'km', type: 'distance' },
		{ name: 'meters', units: 'm', type: 'distance' }
	];

	export const DURATION_OPTIONS: UnitOption[] = [
		{ name: 'hours', units: 'hr', type: 'duration' },
		{ name: 'minutes', units: 'm', type: 'duration' },
		{ name: 'seconds', units: 's', type: 'duration' }
	];

	export const IMPERIAL_BOTH_OPTIONS = [
		...IMPERIAL_MASS_OPTIONS,
		...IMPERIAL_DISTANCE_OPTIONS,
		...DURATION_OPTIONS
	];
	export const BOTH_OPTIONS = [...MASS_OPTIONS, ...DISTANCE_OPTIONS, ...DURATION_OPTIONS];

	export type MeasurementSystem = 'METRIC' | 'IMPERIAL';

	export const MEASUREMENT_TYPES = ['mass', 'distance', 'duration', 'any'] as const;
	export type MeasurementType = (typeof MEASUREMENT_TYPES)[number];

	export const MASS_UNITS = ['kg'] as const;
	export type WeightUnit = (typeof MASS_UNITS)[number];

	export const IMPERIAL_MASS_UNITS = ['lb'] as const;
	export type ImperialWeightUnit = (typeof IMPERIAL_MASS_UNITS)[number];

	export const DISTANCE_UNITS = ['km', 'm'] as const;
	export type DistanceUnit = (typeof DISTANCE_UNITS)[number];

	export const IMPERIAL_DISTANCE_UNITS = ['m', 'yd', 'ft'] as const;
	export type ImperialDistanceUnit = (typeof IMPERIAL_DISTANCE_UNITS)[number];

	export const DURATION_UNITS = ['hr', 'm', 's'] as const;
	export type DurationUnit = (typeof DURATION_UNITS)[number];

	export type ImperialUnit = ImperialWeightUnit | ImperialDistanceUnit | DurationUnit;
	export type Unit = WeightUnit | DistanceUnit | DurationUnit;

	export type Units<S, T> = S extends 'METRIC'
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
	export function feetToMeters(feet: number) {
		return feet * 0.3048;
	}
	export function milesToFeet(miles: number) {
		return miles * 5280;
	}
	export function feetToMiles(feet: number) {
		return feet * 0.000189394;
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
		U extends Units<'METRIC', T>,
		R extends Units<'IMPERIAL', T>
	>(value: number, type: T, units: U, allowConvert = true): [value: number, units: R] {
		switch (type) {
			case 'mass':
				const massUnits = units as Units<'METRIC', 'mass'>;
				switch (massUnits) {
					case 'kg':
						return [kilogramsToPounds(value), 'lb' as R];
				}
				break;
			case 'distance':
				const distanceUnits = units as Units<'METRIC', 'distance'>;
				switch (distanceUnits) {
					case 'km':
						return [feetToMiles(metersToFeet(value / 1000)), 'm' as R];
					case 'm':
						if (allowConvert && value > 1000) {
							return [feetToMiles(metersToFeet(value)), 'm' as R];
						}
						return [metersToFeet(value), 'ft' as R];
				}
				break;
			case 'duration':
				const durationUnits = units as Units<'METRIC', 'duration'>;
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
		U extends Units<'IMPERIAL', T>,
		R extends Units<'METRIC', T>
	>(value: number, type: T, units: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				const massUnits = units as Units<'IMPERIAL', 'mass'>;
				switch (massUnits) {
					case 'lb':
						return [poundsToKilograms(value), 'kg' as R];
				}
				break;
			case 'distance':
				const distanceUnits = units as Units<'IMPERIAL', 'distance'>;
				switch (distanceUnits) {
					case 'm':
						return [feetToMeters(milesToFeet(value)) / 1000, 'km' as R];
					case 'yd':
						return [feetToMeters(yardsToFeet(value)), 'm' as R];
					case 'ft':
						return [feetToMeters(value), 'm' as R];
				}
				break;
		}
		return [value, units as never];
	}

	export function metricToReadable<
		T extends MeasurementType,
		U extends Units<'METRIC', T>,
		R extends Units<'METRIC', T>
	>(value: number, type: T, units: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				break;
			case 'distance':
				const distanceUnits = units as Units<'METRIC', 'distance'>;
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
				const durationUnits = units as Units<'METRIC', 'duration'>;
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
		U extends Units<'IMPERIAL', T>,
		R extends Units<'METRIC', T>
	>(value: number, type: T, previousUnits: U, nextUnits: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				break;
			case 'distance':
				const distancePreviousUnits = previousUnits as Units<'IMPERIAL', 'distance'>;
				const distanceNextUnits = nextUnits as Units<'IMPERIAL', 'distance'>;
				switch (distancePreviousUnits) {
					case 'm':
						switch (distanceNextUnits) {
							case 'yd':
								return [yardsInFeet(milesToFeet(value)), distanceNextUnits as R];
							case 'ft':
								return [milesToFeet(value), distanceNextUnits as R];
						}
					case 'yd': {
						switch (distanceNextUnits) {
							case 'm':
								return [feetToMiles(yardsToFeet(value)), distanceNextUnits as R];
							case 'ft':
								return [yardsToFeet(value), distanceNextUnits as R];
						}
					}
					case 'ft': {
						switch (distanceNextUnits) {
							case 'm':
								return [feetToMiles(value), distanceNextUnits as R];
							case 'yd':
								return [yardsInFeet(value), distanceNextUnits as R];
						}
					}
				}
				break;
			case 'duration':
				return convertDurationUnits(
					value,
					previousUnits as Units<'METRIC', 'duration'>,
					nextUnits as Units<'METRIC', 'duration'>
				) as [value: number, units: R];
		}
		return [value, nextUnits as never];
	}

	export function convertMetricUnits<
		T extends MeasurementType,
		U extends Units<'METRIC', T>,
		R extends Units<'METRIC', T>
	>(value: number, type: T, previousUnits: U, nextUnits: U): [value: number, units: R] {
		switch (type) {
			case 'mass':
				break;
			case 'distance':
				const distancePreviousUnits = previousUnits as Units<'METRIC', 'distance'>;
				const distanceNextUnits = nextUnits as Units<'METRIC', 'distance'>;
				switch (distancePreviousUnits) {
					case 'km':
						switch (distanceNextUnits) {
							case 'm':
								return [value * 1000, distanceNextUnits as R];
						}
					case 'm':
						switch (distanceNextUnits) {
							case 'km':
								return [value / 1000, distanceNextUnits as R];
						}
				}
				break;
			case 'duration':
				return convertDurationUnits(
					value,
					previousUnits as Units<'METRIC', 'duration'>,
					nextUnits as Units<'METRIC', 'duration'>
				) as [value: number, units: R];
		}
		return [value, nextUnits as never];
	}

	export function convertDurationUnits<
		U extends Units<'METRIC', 'duration'>,
		R extends Units<'METRIC', 'duration'>
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
		system?: S;
		type?: T;
		name?: string;
		disabled?: boolean;
		metricValue?: number;
		metricUnits?: Units<'METRIC', T>;
		metricUnitOptions?: UnitOption[];
		imperialUnitOptions?: UnitOption[];
		oninput?: EventHandler<Event, HTMLSpanElement>;
		onchange?: EventHandler<Event, HTMLSpanElement>;
	}
</script>

<script lang="ts" generics="S extends MeasurementSystem, T extends MeasurementType">
	import { language } from '$lib/states/language.svelte';
	import type { EventHandler } from 'svelte/elements';
	import TypedInput from './TypedInput.svelte';

	let {
		class: className = '',
		id,
		system = 'IMPERIAL' as S,
		type = 'mass' as T,
		name,
		disabled,
		metricValue = $bindable(0),
		metricUnits = $bindable(
			system === 'IMPERIAL'
				? type === 'mass'
					? 'lb'
					: type === 'distance'
						? 'km'
						: 'hr'
				: type === 'mass'
					? 'kg'
					: type === 'distance'
						? 'km'
						: 'hr'
		) as never,
		metricUnitOptions = BOTH_OPTIONS,
		imperialUnitOptions = IMPERIAL_BOTH_OPTIONS,
		oninput,
		onchange
	}: MeasurementInputProps<S, T> = $props();

	let unitOptions: UnitOption[] = $state([]);
	let valueNumber = $state(0);
	let valueString = $state('0');
	let units = $state<Units<S, T>>();
	let metricUnitsLast = $state(metricUnits);
	let typeLast = $state(type);
	let first = $state(true);

	function preventUpdate() {
		metricUnitsLast = metricUnits;
		typeLast = type;
		first = false;
	}

	$effect(() => {
		if (!first && metricUnitsLast === metricUnits && typeLast === type) {
			return;
		}
		if (system === 'METRIC') {
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
		} else {
			if (type === 'any') {
				unitOptions = IMPERIAL_BOTH_OPTIONS;
			} else if (type === 'mass') {
				unitOptions = IMPERIAL_MASS_OPTIONS;
			} else if (type === 'distance') {
				unitOptions = IMPERIAL_DISTANCE_OPTIONS;
			} else {
				unitOptions = DURATION_OPTIONS;
			}
			unitOptions = unitOptions.filter((unit) =>
				imperialUnitOptions.some((u) => unit.units === u.units)
			);
		}
		if (!units || !unitOptions.some((uo) => uo.units === units)) {
			units = unitOptions[0].units as never;
			first = true;
		}
	});

	$effect(() => {
		if (!first && metricUnitsLast === metricUnits && typeLast === type) {
			return;
		}
		const [v, u] =
			system === 'METRIC'
				? first
					? metricToReadable(metricValue, type, metricUnits)
					: [metricValue, metricUnits]
				: toImperial(metricValue, type, metricUnits, first);
		valueString = language.numbers.format(v, initialFractionDigits);
		units = u as Units<S, T>;
		preventUpdate();
	});

	$effect(() => {
		valueNumber = language.numbers.parse(valueString);
	});

	$effect(() => {
		const [v, u] =
			system === 'METRIC'
				? [valueNumber, units]
				: toMetric(valueNumber, type, units as Units<'IMPERIAL', T>);
		[metricValue, metricUnits] = convertMetricUnits(v, type, u as Units<'METRIC', T>, metricUnits);
	});

	const onUnitChange: EventHandler<Event, HTMLSelectElement> = (e) => {
		const previousUnits = units;
		const nextUnits = e.currentTarget.value;
		const [v, _u] =
			system === 'METRIC'
				? convertMetricUnits(
						valueNumber,
						type,
						previousUnits as Units<'METRIC', T>,
						nextUnits as Units<'METRIC', T>
					)
				: convertImperialUnits(
						valueNumber,
						type,
						previousUnits as Units<'IMPERIAL', T>,
						nextUnits as Units<'IMPERIAL', T>
					);
		valueString = language.numbers.format(v, fractionDigits);
		oninput?.call(window, e);
		onchange?.call(window, e);
	};
</script>

<div class="flex flex-row">
	<TypedInput
		class={className}
		{id}
		{name}
		{disabled}
		bind:value={valueString}
		{oninput}
		{onchange}
		unit={unitOptions.length === 1 ? unitOptions[0].units : undefined}
	/>
	{#if unitOptions.length > 1}<select
			class="ms-1 flex-shrink"
			aria-label="Units"
			{disabled}
			oninput={onUnitChange}
			bind:value={units}
		>
			{#each unitOptions as unitOption}
				<option value={unitOption.units} title={unitOption.name}>{unitOption.units}</option>
			{/each}
		</select>{/if}
</div>
