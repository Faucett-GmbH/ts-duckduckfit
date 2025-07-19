<script lang="ts" module>
	export interface RemoveSyncDeviceProps {
		open?: boolean;
		name: string;
		onRemove(): Promise<void> | void;
	}
</script>

<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { m } from '$lib/paraglide/messages';
	import Modal from '$lib/components/Modal.svelte';

	let { open = $bindable(false), name, onRemove }: RemoveSyncDeviceProps = $props();

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

<Modal bind:open>
	{#snippet title()}
		<h1>{m.sync_remove_device_title()}</h1>
	{/snippet}
	<form class="flex flex-col" onsubmit={onSubmit}>
		<div class="mb-2 flex flex-grow flex-col">
			<p>{m.sync_remove_device_content({ name })}</p>
		</div>
		<div class="flex flex-shrink flex-row justify-end">
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
</Modal>
