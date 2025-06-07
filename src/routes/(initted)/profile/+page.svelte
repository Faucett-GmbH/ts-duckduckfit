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

	console.log(userState.doc);

	function onEditUserInfo({ birthdate, sex, height }: EditUserInfoForm) {
		userState.change((user) => {
			if (user.info.height !== height) {
				user.info.height = height;
			}
			if (user.info.birthdate?.getTime() !== birthdate?.getTime()) {
				user.info.birthdate = birthdate;
			}
			if (user.info.sex != sex) {
				user.info.sex = sex;
			}
			return user;
		});
	}
	function onEditUserPreferences({ measurementSystem }: EditUserPreferencesForm) {
		userState.change((user) => {
			if (user.measurementSystem !== measurementSystem) {
				user.measurementSystem = measurementSystem;
			}
			return user;
		});
	}
</script>

<svelte:head>
	<title>{m.profile_title()}</title>
</svelte:head>

<div class="flex flex-col flex-grow overflow-x-hidden overflow-y-auto">
	<div class="container mx-auto p-4">
		<div class="card flex flex-col">
			<div>
				<h1 class="m-0">{m.profile_title()}</h1>
				<hr class="mb-2" />
			</div>
			{#if userState.doc}
				<div class="flex flex-col mb-2">
					<!-- 
					<EditUserInfo info={userState.doc.info} onUpdate={onEditUserInfo} />
					-->
				</div>
				<div class="flex flex-col mb-2">
					<EditUserPreferences
						measurementSystem={userState.doc.measurementSystem}
						onUpdate={onEditUserPreferences}
					/>
				</div>
			{/if}
		</div>
		<div class="card flex flex-col">
			<Sync
				currentDeviceId={data.currentDeviceId}
				sync={data.sync}
				currentUserDocument={data.currentUserDocument}
			/>
		</div>
	</div>
</div>
