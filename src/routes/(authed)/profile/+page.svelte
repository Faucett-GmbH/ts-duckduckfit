<script lang="ts" module>
	export interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { automergeState } from '$lib/automergeState.svelte';
	import QRCode from '$lib/components/QRCode.svelte';
	import { m } from '$lib/paraglide/messages';
	import { userDocumentId } from '$lib/states/userDocumentIds.svelte';
	import { getOrigin } from '$lib/util';
	import type { PageData } from './$types';
	import EditUserInfo, { type EditUserInfoForm } from './_EditUserInfo.svelte';

	let { data }: Props = $props();

	const userState = automergeState(data.userDocumentId);

	let profileSyncHref = $derived(
		userDocumentId.username && userDocumentId.documentId
			? `${getOrigin()}${base}/sync?username=${encodeURIComponent(userDocumentId.username)}&userDocumentId=${encodeURIComponent(userDocumentId.documentId)}`
			: null
	);

	function onEditUserInfo({ birthdate }: EditUserInfoForm) {
		userState.change((user) => {
			user.birthdate = birthdate;
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
			<h1>{m.profile_title()}</h1>
		</div>
		{#if userState.doc}
			<div class="flex flex-col">
				<EditUserInfo birthdate={userState.doc.birthdate} onUpdate={onEditUserInfo} />
			</div>
		{/if}
		<div class="flex flex-col justify-center items-center">
			{#if profileSyncHref}
				<QRCode text={profileSyncHref} size={1024} />
			{/if}
		</div>
	</div>
</div>
