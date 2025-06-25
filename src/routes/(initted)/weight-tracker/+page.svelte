<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import EnterWeight from '$lib/components/weight_tracker/EnterWeight.svelte';
	import ListWeightMeasurements from '$lib/components/weight_tracker/ListWeightMeasurements.svelte';
	import type { UserWeightMeasurement } from '$lib/state/user.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);
	const settingsState = automergeDocHandleState(data.settings);

	function onAddUserWeightMeasurement(uwm: UserWeightMeasurement) {
		userState.change((user) => {
			user.bodyWeightMeasurements.push(uwm);
			return user;
		});
	}
	function onEditUserWeightMeasurement(index: number, uwm: UserWeightMeasurement) {
		userState.change((user) => {
			user.bodyWeightMeasurements[index] = uwm;
			return user;
		});
	}
	function onDeleteUserWeightMeasurement(index: number) {
		userState.change((user) => {
			user.bodyWeightMeasurements.splice(index, 1);
			return user;
		});
	}
</script>

<div class="container mx-auto">
	<div class="card flex flex-col">
		<EnterWeight onAdd={onAddUserWeightMeasurement} />
		<ListWeightMeasurements
			userWeightMeasurements={userState.doc.bodyWeightMeasurements}
			onEdit={onEditUserWeightMeasurement}
			onDelete={onDeleteUserWeightMeasurement}
		/>
	</div>
</div>
