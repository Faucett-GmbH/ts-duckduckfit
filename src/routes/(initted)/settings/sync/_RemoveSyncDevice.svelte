<script lang="ts" module>
	export interface RemoveSyncDeviceProps {
		name: string;
		onRemove(): Promise<void> | void;
	}
</script>

<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { m } from '$lib/paraglide/messages';

	let { name, onRemove }: RemoveSyncDeviceProps = $props();

	let loading = $state(false);
	let disabled = $derived(loading);

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		try {
			await onRemove();
		} finally {
			loading = false;
		}
	}
</script>

<form class="flex flex-col" onsubmit={onSubmit}>
	<div class="flex flex-col flex-grow mb-2">
		<p>{m.sync_remove_device_content({ name })}</p>
	</div>
	<div class="flex flex-row flex-shrink justify-end">
		<button type="submit" class="btn danger flex flex-shrink" {disabled}>
			{#if loading}
				<div class="mr-2 flex flex-row justify-center">
					<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
				</div>
			{/if}
			{m.sync_remove_device_confirm()}
		</button>
	</div>
</form>
