<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { Settings } from 'lucide-svelte';
	import Dumbbell from 'lucide-svelte/icons/dumbbell';
	import Repeat from 'lucide-svelte/icons/repeat';
	import Weight from 'lucide-svelte/icons/weight';
	import Menu from 'lucide-svelte/icons/menu';
	import { navigating, page } from '$app/state';
	import Logo from './Logo.svelte';
	import logoHorizontalWEBP from '$lib/assets/logo-horizontal.webp';

	let open = $state(false);
	function onGoto() {
		open = false;
	}
</script>

<div
	class="flex flex-shrink flex-row min-h-fit justify-between border-b border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-800"
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

				<a
					href={`${base}/workouts`}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id === '/(initted)/workouts'
					}}
					onclick={onGoto}
				>
					<Dumbbell /><span class="ms-4">{m.workouts_title()}</span>
				</a>

				<a
					href={`${base}/workout-templates`}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id === '/(initted)/workout-templates'
					}}
					onclick={onGoto}
				>
					<Repeat /><span class="ms-4">{m.workout_templates_title()}</span>
				</a>

				<a
					href={`${base}/weight-tracker`}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id?.startsWith('/(initted)/weight-tracker')
					}}
					onclick={onGoto}
				>
					<Weight /><span class="ms-4">{m.weight_tracker_title()}</span>
				</a>

				<a
					href={`${base}/settings/profile`}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id?.startsWith('/(initted)/settings')
					}}
					onclick={onGoto}
				>
					<Settings /><span class="ms-4">{m.settings_title()}</span>
				</a>
			</Dropdown>
		</div>
	</div>
</div>
