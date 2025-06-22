<script lang="ts" module>
	export interface MeasurementProps<S extends MeasurementSystem, T extends MeasurementType> {
		metricValue?: number;
		type?: T;
		metricUnits?: Units<'metric', T>;
	}
</script>

<script lang="ts" generics="S extends MeasurementSystem, T extends MeasurementType">
	import { getMeasurementSystem, getNumbers } from '$lib/state/settings.svelte';
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
		type = 'mass' as T,
		metricUnits = (getMeasurementSystem() === 'imperial'
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
			getMeasurementSystem() === 'metric'
				? metricToReadable(metricValue, type, metricUnits)
				: toImperial(metricValue, type, metricUnits, true);
		value = getNumbers().format(v, initialFractionDigits);
		units = u as Units<S, T>;
	});
</script>

{value}{units}
