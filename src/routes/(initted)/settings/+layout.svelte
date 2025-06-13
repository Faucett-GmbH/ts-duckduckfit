<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { m } from '$lib/paraglide/messages';

	let { children } = $props();
</script>

<div class="mx-auto container">
	<div class="grid grid-cols-12 gap-2">
		<div class="col-span-2">
			<h2>
				<a
					href={`${base}/settings`}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id === '/(initted)/settings'
					}}
					class:active={page.route.id === '/(initted)/settings'}
					onclick={() => {}}
				>
					<span class="ms-4">{m.settings_title()}</span>
				</a>
			</h2>
			<ul>
				<!-- user profile settings -->
				<li>
					<a
						href={`${base}/settings/profile`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/10': page.route.id === '/(initted)/settings/profile'
						}}
						class:active={page.route.id === '/(initted)/settings/profile'}
						onclick={() => {}}
					>
						<span class="ms-4">{m.profile_title()}</span>
					</a>
				</li>

				<!-- application settings -->
				<li>
					<a
						href={`${base}/settings/application`}
						class={{
							'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
							'bg-black/10': page.route.id === '/(initted)/settings/application'
						}}
						class:active={page.route.id === '/(initted)/settings/application'}
						onclick={() => {}}
					>
						<span class="ms-4">{m.application_settings_title()}</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="col-span-10">
			{@render children()}
		</div>
	</div>
</div>
