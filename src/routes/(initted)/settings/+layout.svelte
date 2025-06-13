<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { m } from '$lib/paraglide/messages';

	let { children }: Props = $props();
</script>

<div class="mx-auto container">
	<div class="flex">
		<div class="col-2 px-2">
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
			</ul>
		</div>
		<div class="col-10 px-2">
			{@render children()}
		</div>
	</div>
</div>
