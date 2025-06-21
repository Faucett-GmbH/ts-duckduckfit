<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { m } from '$lib/paraglide/messages';

	let { children } = $props();
</script>

<div class="mx-auto container">
	<div class="grid grid-cols-12 gap-4">
		<div class="col-span-2">
			<ul class="list-none">
				<li>
					<a
						href={`${base}/settings/profile`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/20': page.route.id === '/(initted)/settings/profile'
						}}
					>
						<span class="ms-4">{m.profile_title()}</span>
					</a>
				</li>
				<li>
					<a
						href={`${base}/settings/application`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/20': page.route.id === '/(initted)/settings/application'
						}}
					>
						<span class="ms-4">{m.application_settings_title()}</span>
					</a>
				</li>
				<li>
					<a
						href={`${base}/settings/sync`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/20': page.route.id === '/(initted)/settings/sync'
						}}
					>
						<span class="ms-4">{m.sync_title()}</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="col-span-10 my-4 mb-8">
			{@render children()}
		</div>
	</div>
</div>
