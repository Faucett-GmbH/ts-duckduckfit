<script lang="ts" module>
	export type EnterWeightProps = {
		onAdd: (weight: UserWeightMeasurement) => void;
	};
</script>

<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import Modal from '../Modal.svelte';
	import { m } from '$lib/paraglide/messages';
	import WeightInput from '../inputs/WeightInput.svelte';
	import type { UserWeightMeasurement } from '$lib/state/user.svelte';

	let { onAdd }: EnterWeightProps = $props();

	let open = $state(false);

	let newWeight: UserWeightMeasurement = $state({
		weight: 0.0,
		measuredAt: new Date()
	});

	function onOpenModal(e: Event) {
		e.stopPropagation();
		open = true;
	}
	function onCloseModal() {
		open = false;
	}

	const onUpdateWeight = (newWeightKg: number) => {
		newWeight.weight = newWeightKg;
	};

	const addNewWeight = () => {
		newWeight.measuredAt = new Date();
		onAdd(newWeight);
		newWeight = {
			weight: 0.0,
			measuredAt: new Date()
		};
		open = false;
	};
</script>

<div class="">
	<button class="btn primary flex flex-row" onclick={onOpenModal}>
		<span><Plus /></span>
		<span> New Weight Measurement </span>
	</button>
</div>

<Modal bind:open onClose={onCloseModal}>
	{#snippet title()}
		<div class="text-center">
			<h5>
				<span>{m.components_weight_tracker_enter_weight_title()}</span>
			</h5>
		</div>
	{/snippet}
	<div class="flex flex-grow flex-col">
		<WeightInput value={newWeight.weight} onChange={onUpdateWeight} />

		<div class="mt-2 flex flex-row justify-end">
			<button class="btn success" onclick={addNewWeight}>
				{m.components_weight_tracker_enter_weight_add()}
			</button>
		</div>
	</div>
</Modal>
