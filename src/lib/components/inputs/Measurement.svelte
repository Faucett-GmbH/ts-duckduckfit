<script lang="ts" module>
	export interface MeasurementProps<S extends MeasurementSystem, T extends MeasurementType> {
		metricValue?: number;
		system?: S;
		type?: T;
		metricUnits?: Units<'METRIC', T>;
	}
</script>

<script lang="ts" generics="S extends MeasurementSystem, T extends MeasurementType">
	import { language } from '$lib/state/language.svelte';
	import {
		initialFractionDigits,
		metricToReadable,
		toImperial,
		type MeasurementSystem,
		type MeasurementType,
		type Units
	} from './MeasurementInput.svelte';

	let {
		metricValue = $bindable(0),
		system = 'IMPERIAL' as S,
		type = 'mass' as T,
		metricUnits = (system === 'IMPERIAL'
			? type === 'mass'
				? 'oz'
				: 'fl.oz'
			: type === 'mass'
				? 'g'
				: 'mL') as never
	}: MeasurementProps<S, T> = $props();

	let value = $state() as string;
	let units = $state() as Units<S, T>;
	$effect(() => {
		const [v, u] =
			system === 'METRIC'
				? metricToReadable(metricValue, type, metricUnits)
				: toImperial(metricValue, type, metricUnits, true);
		value = language.numbers.format(v, initialFractionDigits);
		units = u as Units<S, T>;
	});
</script>

{value}{units}
