<script lang="ts">
	import * as DropdownMenu from '$lib/ui/shadcn/components/ui/dropdown-menu';
	import { Menu } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	import { settings_application_path } from '$lib/contexts/settings/routes';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Menu class="cursor-pointer" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Label>My Account</DropdownMenu.Label>
			<DropdownMenu.Separator />

			<DropdownMenu.Item onclick={() => goto(settings_application_path())}>
				{m.settings_title()}
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
