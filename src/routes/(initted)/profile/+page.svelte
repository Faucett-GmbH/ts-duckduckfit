<script lang="ts" module>
	export interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageData } from './$types';
	import EditUserInfo, { type EditUserInfoForm } from './_EditUserInfo.svelte';
	import EditUserPreferences, { type EditUserPreferencesForm } from './_EditUserPreferences.svelte';
	import EditUserWeights from './_EditUserWeights.svelte';
	import Sync from './_Sync.svelte';

	let { data }: Props = $props();

	const userState = automergeDocHandleState(data.user);

	function onEditUserInfo({ birthdate, heightInCm }: EditUserInfoForm) {
		userState.change((user) => {
			if (user.heightInCm !== heightInCm) {
				user.heightInCm = heightInCm;
			}
			if (user.birthdate?.getTime() !== birthdate?.getTime()) {
				user.birthdate = birthdate;
			}
			return user;
		});
	}
	function onEditUserPreferences({
		weightUnit,
		distanceUnits,
		bodyMeasurementUnit
	}: EditUserPreferencesForm) {
		userState.change((user) => {
			if (user.weightUnit !== weightUnit) {
				user.weightUnit = weightUnit;
			}
			if (user.distanceUnits !== distanceUnits) {
				user.distanceUnits = distanceUnits;
			}
			if (user.bodyMeasurementUnit !== bodyMeasurementUnit) {
				user.bodyMeasurementUnit = bodyMeasurementUnit;
			}
			return user;
		});
	}
	function onEditUserWeight(index: number, weightInKg: number) {
		userState.change((user) => {
			user.weights[index].weightInKg = weightInKg;
			return user;
		});
	}
	function onAddUserWeight(weightInKg: number) {
		userState.change((user) => {
			user.weights.push({ weightInKg, createdAt: new Date() });
			return user;
		});
	}
	function onDeleteUserWeight(index: number) {
		userState.change((user) => {
			user.weights.splice(index, 1);
			return user;
		});
	}
</script>

<svelte:head>
	<title>{m.profile_title()}</title>
</svelte:head>

<div class="container mx-auto p-4">
	<div class="card flex flex-col">
		<div>
			<h1 class="m-0">{m.profile_title()}</h1>
			<hr class="mb-2" />
		</div>
		{#if userState.doc}
			<div class="flex flex-col mb-2">
				<EditUserWeights
					heightInCm={userState.doc.heightInCm}
					weights={userState.doc.weights}
					onAdd={onAddUserWeight}
					onEdit={onEditUserWeight}
					onDelete={onDeleteUserWeight}
				/>
			</div>
			<div class="flex flex-col mb-2">
				<EditUserInfo
					birthdate={userState.doc.birthdate}
					heightInCm={userState.doc.heightInCm}
					onUpdate={onEditUserInfo}
				/>
			</div>
			<div class="flex flex-col mb-2">
				<EditUserPreferences
					weightUnit={userState.doc.weightUnit}
					distanceUnits={userState.doc.distanceUnits}
					bodyMeasurementUnit={userState.doc.bodyMeasurementUnit}
					onUpdate={onEditUserPreferences}
				/>
			</div>
		{/if}
	</div>
	<div class="card flex flex-col">
		<Sync
			deviceId={data.deviceId}
			sync={data.sync}
			currentUserDocument={data.currentUserDocument}
		/>
	</div>
</div>
