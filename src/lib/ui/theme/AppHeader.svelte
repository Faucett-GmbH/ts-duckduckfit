<script lang="ts">
	import { resolve } from '$app/paths';
	import HeaderDropdownMenu from './HeaderDropdownMenu.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { navigating, page } from '$app/state';
	import Logo from '$lib/shared/components/Logo.svelte';
	import logoHorizontalWEBP from '$lib/assets/logo-horizontal.webp';
	import { settings_application_path } from '$lib/contexts/settings/routes';
	import * as NavigationMenu from '$lib/ui/shadcn/components/ui/navigation-menu';
	import { PanelLeft } from 'lucide-svelte';
	import Button from '../shadcn/components/ui/button/button.svelte';
	import { useSidebar } from '../shadcn/components/ui/sidebar';

	let open = $state(false);

	const sidebar = useSidebar();
</script>

<header class="sticky top-0 z-50 flex w-full items-center border-b bg-background">
	<NavigationMenu.Root class="w-full" viewport={true}>
		<NavigationMenu.List class="flex gap-4">
			<NavigationMenu.Item>
				<NavigationMenu.Link>
					<Button class="h-6 w-8 cursor-pointer" variant="ghost" onclick={() => sidebar.toggle()}>
						<PanelLeft />
					</Button>
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>

		<NavigationMenu.List>
			<NavigationMenu.Item class="flex gap-4">
				<NavigationMenu.Link>
					<HeaderDropdownMenu />
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</header>
