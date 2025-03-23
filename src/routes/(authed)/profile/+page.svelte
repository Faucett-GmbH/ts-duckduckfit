<script lang="ts" module>
	export interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { automergeState } from '$lib/automergeState.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageData } from './$types';
	import EditUserInfo, { type EditUserInfoForm } from './_EditUserInfo.svelte';
	import EditUserPreferences, { type EditUserPreferencesForm } from './_EditUserPreferences.svelte';

	let { data }: Props = $props();

	const userState = automergeState(data.userDocumentId);

	function onEditUserInfo({ birthdate }: EditUserInfoForm) {
		userState.change((user) => {
			user.birthdate = birthdate;
			return user;
		});
	}
	function onEditUserPreferences({
		weightUnit,
		distanceUnits,
		bodyMeasurementUnit
	}: EditUserPreferencesForm) {
		userState.change((user) => {
			user.weightUnit = weightUnit;
			user.distanceUnits = distanceUnits;
			user.bodyMeasurementUnit = bodyMeasurementUnit;
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
				<h3>{m.user_info_title()}</h3>
				<EditUserInfo birthdate={userState.doc.birthdate} onUpdate={onEditUserInfo} />
			</div>
			<div class="flex flex-col mb-2">
				<h3>{m.user_preferences_title()}</h3>
				<EditUserPreferences
					weightUnit={userState.doc.weightUnit}
					distanceUnits={userState.doc.distanceUnits}
					bodyMeasurementUnit={userState.doc.bodyMeasurementUnit}
					onUpdate={onEditUserPreferences}
				/>
			</div>
		{/if}
	</div>
</div>
