<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import LogIn from 'lucide-svelte/icons/log-in';
	import LogOut from 'lucide-svelte/icons/log-out';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import User from 'lucide-svelte/icons/user';
	import Dumbbell from 'lucide-svelte/icons/dumbbell';
	import Menu from 'lucide-svelte/icons/menu';
	import { navigating, page } from '$app/state';
	import { userDocumentId } from '$lib/states/userDocumentIds.svelte';
	import Logo from './Logo.svelte';
	import logoHorizontalWEBP from '$lib/assets/logo-horizontal.webp';
	import { goto } from '$app/navigation';

	let open = $state(false);
	function onGoto() {
		open = false;
	}

	function onSignOut() {
		userDocumentId.clear();
		goto(`${base}/signin`);
		onGoto();
	}
</script>

<div
	class="flex flex-shrink flex-row justify-between border-b border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-800"
>
	<div class="ms-2 flex flex-shrink flex-row items-center justify-center">
		<a class="flex flex-row items-center justify-center" href={`${base}/`}>
			<span class="inline-block h-8">
				<Logo />
			</span>
			<img
				class="my-1 ms-2 inline-block h-6 max-sm:hidden"
				src={logoHorizontalWEBP}
				alt="DuckDuckFit"
			/>
		</a>
		{#await navigating.complete}
			<div class="mr-2 flex flex-row justify-center">
				<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
			</div>
		{/await}
	</div>
	<div class="me-2 flex flex-shrink flex-row">
		<div class="flex flex-col content-center justify-center m-1">
			<Dropdown bind:open>
				{#snippet button()}
					<button class="btn primary icon flex">
						<Menu />
					</button>
				{/snippet}
				{#if userDocumentId.documentId}
					<a
						href={`${base}/profile`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/10': page.route.id === '/(authed)/profile'
						}}
						class:active={page.route.id === '/(authed)/profile'}
						onclick={onGoto}
					>
						<User /><span class="ms-4">{m.profile_title()}</span>
					</a>
					<a
						href={`${base}/routines`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/10': page.route.id === '/(authed)/routines'
						}}
						class:active={page.route.id === '/(authed)/routines'}
						onclick={onGoto}
					>
						<Dumbbell /><span class="ms-4">{m.routines_title()}</span>
					</a>
					<button
						class="flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
						onclick={onSignOut}
					>
						<LogOut /><span class="ms-4">{m.auth_sign_out()}</span>
					</button>
				{:else}
					<a
						href={`${base}/signin`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/10': page.route.id === '/(authed)/signin'
						}}
						class:active={page.route.id === '/(authed)/signin'}
						onclick={onGoto}
					>
						<LogIn /><span class="ms-4">{m.auth_sign_in()}</span>
					</a>
				{/if}
			</Dropdown>
		</div>
	</div>
</div>
