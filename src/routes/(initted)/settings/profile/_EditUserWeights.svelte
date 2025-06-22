<script lang="ts" module>
	export type TimeFrame = '1d' | '1w' | '1m' | '1y';

	export type EditUserWeightsProps = {
		timeFrame?: TimeFrame;
		heightInCm: number | null;
		weights: UserWeightMeasurement[];
		onAdd(weightInKg: number): void;
		onEdit(index: number, weightInKg: number): void;
		onDelete(index: number): void;
	};
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Plus from 'lucide-svelte/icons/plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import type { UserWeightMeasurement } from '$lib/state/user.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Measurement from '$lib/components/inputs/Measurement.svelte';
	import UserWeightForm, { type UserWeightFormValid } from './_UserWeightForm.svelte';
	import { getNumbers } from '$lib/state/settings.svelte';

	let {
		timeFrame = '1d',
		heightInCm,
		weights = [],
		onAdd,
		onEdit,
		onDelete
	}: EditUserWeightsProps = $props();

	function createOnChangeTimeFrame(tf: TimeFrame) {
		return () => (timeFrame = tf);
	}
	let weight = $derived(weights[weights.length - 1]);
	let todaysWeight = $derived(
		weight?.measuredAt.toISOString().substring(0, 10) === new Date().toISOString().substring(0, 10)
			? weight
			: null
	);
	let bmi = $derived(weight && heightInCm ? weight.weight / (heightInCm / 100) ** 2 : null);
	let weightsByTime = $derived.by(() => {
		let lookBackDate: Date;
		switch (timeFrame) {
			case '1d':
				lookBackDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
				break;
			case '1w':
				lookBackDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
				break;
			case '1m':
				lookBackDate = new Date(Date.now() - 30.4375 * 24 * 60 * 60 * 1000);
				break;
			case '1y':
				lookBackDate = new Date(Date.now() - 365.25 * 24 * 60 * 60 * 1000);
				break;
		}
		const newWeights: UserWeightMeasurement[] = [];
		for (let i = weights.length - 1; i >= 0; i--) {
			const weight = weights[i];
			if (weight.measuredAt > lookBackDate) {
				newWeights.push(weight);
			}
		}
		return newWeights;
	});

	let editWeightOpen = $state(false);
	let editWeight = $state<UserWeightMeasurement>();
	let editWeightIndex = $state(-1);
	let addWeightOpen = $state(false);
	function onAddEditWeight() {
		if (todaysWeight) {
			editWeightOpen = true;
			editWeight = todaysWeight;
			editWeightIndex = weights.length - 1;
		} else {
			addWeightOpen = true;
		}
	}

	function onEditWeight({ weightInKg }: UserWeightFormValid) {
		onEdit(editWeightIndex, weightInKg);
		editWeightOpen = false;
		editWeight = undefined;
		editWeightIndex = -1;
	}
	function onAddWeight({ weightInKg }: UserWeightFormValid) {
		onAdd(weightInKg);
		addWeightOpen = false;
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row justify-between">
		<h3 class="m-0">{m.user_weights_title()}</h3>
		<div class="flex justify-center items-center">
			<button class="btn success icon sm" onclick={onAddEditWeight}
				>{#if todaysWeight}<Pencil />{:else}<Plus />{/if}</button
			>
		</div>
	</div>
	<div class="flex flex-row">
		<button
			class="btn sm flex-grow"
			class:primary={timeFrame === '1d'}
			onclick={createOnChangeTimeFrame('1d')}>{m.user_weights_1_day()}</button
		>
		<button
			class="btn sm flex-grow"
			class:primary={timeFrame === '1w'}
			onclick={createOnChangeTimeFrame('1w')}>{m.user_weights_1_week()}</button
		>
		<button
			class="btn sm flex-grow"
			class:primary={timeFrame === '1m'}
			onclick={createOnChangeTimeFrame('1m')}>{m.user_weights_1_month()}</button
		>
		<button
			class="btn sm flex-grow"
			class:primary={timeFrame === '1y'}
			onclick={createOnChangeTimeFrame('1y')}>{m.user_weights_1_year()}</button
		>
	</div>
	<div class="flex flex-col flex-grow">
		{#if timeFrame === '1d'}
			<div class="flex flex-col flex-grow justify-center items-center">
				{#if weight}
					<p class="m-0 p-2"><Measurement metricValue={weight.weight} metricUnits="kg" /></p>
				{:else}
					<p class="m-0 p-2">{m.user_weights_no_weight()}</p>
				{/if}
			</div>
		{:else}
			<div class="flex flex-col flex-grow justify-center items-center">
				<div class="flex flex-col flex-grow">
					{#if weightsByTime.length}
						{#each weightsByTime as weight (weight.measuredAt)}
							<p class="m-0 p-0">
								<span>{weight.measuredAt.toLocaleDateString()}</span>
								<span class="ms-2"
									><Measurement metricValue={weight.weight} metricUnits="kg" /></span
								>
							</p>
						{/each}
					{:else}
						<p class="m-0 p-2">{m.user_weights_no_weight()}</p>
					{/if}
				</div>
			</div>
		{/if}
	</div>
	<hr />
	<div class="flex flex-col flex-grow">
		{#if weight}
			<p class="m-0">
				{m.user_weights_weight_label()}:
				<Measurement metricValue={weight.weight} metricUnits="kg" />
			</p>
		{/if}
		{#if bmi}
			<p class="m-0">
				{m.user_weights_bmi_label()}:
				{getNumbers().format(bmi, 1)}
			</p>
		{/if}
	</div>
	{#if weight && bmi}
		<hr />
	{/if}
</div>

<Modal bind:open={editWeightOpen}>
	{#snippet title()}
		<h1>{m.user_weights_edit_weight_title()}</h1>
	{/snippet}
	{#if editWeight}
		<UserWeightForm weightInKg={editWeight.weight} onSubmit={onEditWeight} />
	{/if}
</Modal>

<Modal bind:open={addWeightOpen}>
	{#snippet title()}
		<h1>{m.user_weights_weigh_in_title()}</h1>
	{/snippet}
	<UserWeightForm weightInKg={todaysWeight?.weight || 0} onSubmit={onAddWeight} />
</Modal>
