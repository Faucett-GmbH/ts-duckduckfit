<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import type { PageProps } from '../$types';
	import EditUserInfo, { type EditUserInfoForm } from './_EditUserInfo.svelte';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);

	function onEditUserInfo({ fullName, bio, username }: EditUserInfoForm) {
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
			return user;
		});
	}

	onMount(() => {
		console.log(userState.doc);
	});
</script>

<div class="form">
	{#if userState.doc}
		<h2>{m.profile_title()}</h2>
		<EditUserInfo
			fullName={userState.doc.info.fullName}
			bio={userState.doc.info.bio}
			username={userState.doc.username}
			onUpdate={onEditUserInfo}
		/>
	{/if}
</div>
