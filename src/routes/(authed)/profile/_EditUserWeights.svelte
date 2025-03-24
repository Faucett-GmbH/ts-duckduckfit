<script lang="ts" module>
	export type TimeFrame = '1d' | '1w' | '1m' | '1y';

	export type EditUserWeightsProps = {
		timeFrame?: TimeFrame;
		weights: UserWeight[];
		onAdd(weightInKg: number): void;
		onEdit(index: number, weightInKg: number): void;
		onDelete(index: number): void;
	};
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Plus from 'lucide-svelte/icons/plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import type { UserWeight } from '$lib/states/user.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Measurement from '$lib/components/inputs/Measurement.svelte';
	import UserWeightForm, { type UserWeightFormValid } from './_UserWeightForm.svelte';

	let { timeFrame = '1d', weights = [], onAdd, onEdit, onDelete }: EditUserWeightsProps = $props();

	function createOnChangeTimeFrame(tf: TimeFrame) {
		return () => (timeFrame = tf);
	}
	let weight = $derived(weights[weights.length - 1]);
	let todaysWeight = $derived(
		weight?.createdAt.toISOString().substring(0, 10) === new Date().toISOString().substring(0, 10)
			? weight
			: null
	);

	let editWeightOpen = $state(false);
	let editWeight = $state<UserWeight>();
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
	<div class="flex flex-col flex-grow min-h-32">
		{#if timeFrame === '1d'}
			<div class="flex flex-col flex-grow justify-center items-center">
				{#if weight}
					<p><Measurement metricValue={weight.weightInKg} metricUnits="kg" /></p>
				{:else}
					<p>{m.user_weights_no_weight()}</p>
				{/if}
			</div>
		{:else}
			<div class="flex flex-col flex-grow justify-center items-center"></div>
		{/if}
	</div>
	<div class="flex flex-col flex-grow">
		{#if weight}
			<p><Measurement metricValue={weight.weightInKg} metricUnits="kg" /></p>
		{/if}
	</div>
</div>

<Modal bind:open={editWeightOpen}>
	{#snippet title()}
		<h1>{m.user_weights_edit_weight_title()}</h1>
	{/snippet}
	{#if editWeight}
		<UserWeightForm weightInKg={editWeight.weightInKg} onSubmit={onEditWeight} />
	{/if}
</Modal>

<Modal bind:open={addWeightOpen}>
	{#snippet title()}
		<h1>{m.user_weights_weigh_in_title()}</h1>
	{/snippet}
	<UserWeightForm weightInKg={todaysWeight?.weightInKg || 0} onSubmit={onAddWeight} />
</Modal>
