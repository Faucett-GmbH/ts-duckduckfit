<script lang="ts">
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import type { PageProps } from '../$types';
	import EditUserInfo, { type EditUserInfoForm } from './_EditUserInfo.svelte';

	let { data }: PageProps = $props();

	const userState = automergeDocHandleState(data.user);

	function onEditUserInfo({ fullName }: EditUserInfoForm) {
		userState.change((user) => {
			if (user.info.fullName !== fullName) {
				user.info.fullName = fullName;
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
		<EditUserInfo onUpdate={onEditUserInfo} fullName={userState.doc.info.fullName} />
	{/if}
</div>
