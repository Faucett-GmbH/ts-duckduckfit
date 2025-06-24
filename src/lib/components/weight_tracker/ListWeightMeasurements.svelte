<script lang="ts" module>
	import type { UserWeightMeasurement } from '$lib/state/user.svelte';

	export type ListWeightMeasurementsProps = {
		userWeightMeasurements: UserWeightMeasurement[];
	};
</script>

<script lang="ts">
	import FormattedDate from '../inputs/FormattedDate.svelte';

	let { userWeightMeasurements } = $props();

	const OnDeleteMeasurement = () => {
		console.log('delete');
	};

	const OnEditMeasurement = () => {
		console.log('edit');
	};
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
						<span><FormattedDate date={uwm.measuredAt} locale="en" /></span>
					</td>
					<td>
						<button class="btn sm danger" onclick={OnDeleteMeasurement}>Delete</button>
						<button class="btn sm" onclick={OnEditMeasurement}>Edit</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
