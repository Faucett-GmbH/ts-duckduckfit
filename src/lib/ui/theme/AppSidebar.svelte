<script lang="ts">
	import { settings_application_path } from '$lib/contexts/settings/routes';
	import { m } from '$lib/paraglide/messages';
	import * as Sidebar from '$lib/ui/shadcn/components/ui/sidebar';
	import { Settings } from 'lucide-svelte';
	import Logo from '$lib/shared/components/Logo.svelte';
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header>
		<a href="/">
			<div class="flex flex-row">
				<span class="mr-4 h-6">
					<Logo />
				</span>

				<span class="">DuckDuckFit</span>
			</div>
		</a>
	</Sidebar.Header>
	<Sidebar.Separator />
	<Sidebar.Content>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href={settings_application_path()} {...props}>
							<Settings />
							<span>{m.settings_title()}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.Separator />

			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href={settings_application_path()} {...props}>
							<Settings />
							<span>Training Sessions</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>
