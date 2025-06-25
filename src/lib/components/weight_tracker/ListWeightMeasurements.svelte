<script lang="ts" module>
	import type { UserWeightMeasurement } from '$lib/state/user.svelte';

	export type ListWeightMeasurementsProps = {
		userWeightMeasurements: UserWeightMeasurement[];
		onDelete: (index: number) => void;
		onEdit: (index: number, uwm: UserWeightMeasurement) => void;
	};
</script>

<script lang="ts">
	import FormattedDate from '../inputs/FormattedDate.svelte';
	import WeightInput from '../inputs/WeightInput.svelte';
	import { m } from '$lib/paraglide/messages';
	import Modal from '../Modal.svelte';

	let { userWeightMeasurements, onDelete, onEdit } = $props();

	let open = $state(false);
	let activeUserWeightMeasurement: UserWeightMeasurement | null = $state(null);
	let activeUserWeightIndex: number = $state(0);

	const onDeleteMeasurement = (index: number) => {
		onDelete(index);
	};

	const onUpdateWeight = (newWeight: number) => {
		activeUserWeightMeasurement.weight = newWeight;
	};

	function onStartEdit(e: Event, index: number, uwm: UserWeightMeasurement) {
		e.stopPropagation();
		activeUserWeightIndex = index;
		activeUserWeightMeasurement = {
			weight: uwm.weight,
			measuredAt: uwm.measuredAt
		};
		open = true;
	}
	function onCloseModal() {
		open = false;
	}

	function saveEdit() {
		onEdit(activeUserWeightIndex, activeUserWeightMeasurement);
		open = false;
	}
</script>

<div class="table-auto">
	<table>
		<thead>
			<tr>
				<th>Weight</th>
				<th>Date</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each userWeightMeasurements as uwm, id}
				<tr>
					<td>
						<span>{uwm.weight}</span>
					</td>
					<td>
						<span><FormattedDate date={uwm.measuredAt} /></span>
					</td>
					<td>
						<button
							class="btn sm danger"
							onclick={(e: Event) => {
								e.preventDefault();
								onDeleteMeasurement(id);
							}}>Delete</button
						>
						<button class="btn sm" onclick={(e) => onStartEdit(e, id, uwm)}>Edit</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
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
		<WeightInput value={activeUserWeightMeasurement.weight} onChange={onUpdateWeight} />

		<div class="mt-2 flex flex-row justify-end">
			<button class="btn success" onclick={saveEdit}> Save Changes </button>
		</div>
	</div>
</Modal>
