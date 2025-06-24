<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import EnterWeight from '$lib/components/weight_tracker/EnterWeight.svelte';
	import ListWeightMeasurements from '$lib/components/weight_tracker/ListWeightMeasurements.svelte';
	import type { UserWeightMeasurement } from '$lib/state/user.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);
	const settingsState = automergeDocHandleState(data.settings);

	function onAddNewWeight(weight: UserWeightMeasurement) {
		userState.change((user) => {
			user.bodyWeightMeasurements.push(weight);

			return user;
		});
	}
</script>

<div class="container mx-auto">
	<div class="card flex flex-col">
		<EnterWeight system={settingsState.doc.measurementSystem} onAdd={onAddNewWeight} />
		<ListWeightMeasurements userWeightMeasurements={userState.doc.bodyWeightMeasurements} />
	</div>
</div>
