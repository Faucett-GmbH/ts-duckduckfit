<script lang="ts">
	import '../app.css';

	import AppSidebar from '$lib/ui/theme/AppSidebar.svelte';
	import * as Sidebar from '$lib/ui/shadcn/components/ui/sidebar';
	import SidebarInset from '$lib/ui/shadcn/components/ui/sidebar/sidebar-inset.svelte';
	import favicon from '$lib/assets/favicon.png';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';
	import { resolve } from '$app/paths';
	import { getTheme } from '$lib/repo/settings.svelte';
	import Notifications from '$lib/shared/components/Notifications.svelte';
	import AppHeader from '$lib/ui/theme/AppHeader.svelte';

	let { children }: LayoutProps = $props();

	$effect(() => {
		if (getTheme() === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	});

	onMount(() => {
		document.body.classList.add('hydrated');
	});
</script>

<svelte:head>
	<link rel="shortcut icon" href={favicon} />
	<link rel="manifest" crossorigin="use-credentials" href={resolve('/manifest.json')} />
</svelte:head>

<div class="[--header-height:calc(--spacing(14))]">
	<Sidebar.Provider class="flex flex-col">
		<div class="flex flex-1">
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<main>
					{@render children?.()}
				</main>
			</SidebarInset>
		</div>
	</Sidebar.Provider>
</div>
