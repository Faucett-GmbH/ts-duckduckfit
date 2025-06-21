<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';
	import EditUserInfo, { type EditUserInfoForm } from './_EditUserInfo.svelte';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);
	const settingsState = automergeDocHandleState(data.settings);

	function onEditUserInfo({ fullName, bio, username, sex, birthdate, height }: EditUserInfoForm) {
		userState.change((user) => {
			if (user.info.fullName !== fullName) {
				user.info.fullName = fullName;
			}
			if (user.info.bio !== bio) {
				user.info.bio = bio;
			}
			if (user.username !== username) {
				user.username = username;
			}
			if (user.info.sex !== sex) {
				user.info.sex = sex;
			}
			if (user.info.birthdate !== birthdate) {
				user.info.birthdate = birthdate;
			}

			if (user.anthropometry.height !== height) {
				user.anthropometry.height = height;
			}
			return user;
		});
	}
</script>

<div class="card flex flex-col">
	{#if userState.doc}
		<h2>{m.profile_title()}</h2>
		<EditUserInfo
			fullName={userState.doc.info.fullName}
			bio={userState.doc.info.bio}
			username={userState.doc.username}
			birthdate={userState.doc.info.birthdate}
			sex={userState.doc.info.sex}
			height={userState.doc.anthropometry.height}
			measurementSystem={settingsState.doc.measurementSystem}
			onUpdate={onEditUserInfo}
		/>
	{/if}
</div>
