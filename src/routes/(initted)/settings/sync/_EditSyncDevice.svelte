<script lang="ts" module>
	export interface EditSyncDeviceProps {
		open?: boolean;
		name: string;
		onEdit(name: string): Promise<void> | void;
	}
</script>

<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { m } from '$lib/paraglide/messages';
	import EditSyncDeviceForm from './_EditSyncDeviceForm.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { open = $bindable(false), name, onEdit }: EditSyncDeviceProps = $props();

	let loading = $state(false);
	let disabled = $derived(loading);

	let editSyncDeviceForm = $state<EditSyncDeviceForm>();
	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!editSyncDeviceForm) {
			return;
		}
		const result = await editSyncDeviceForm.validateAll();
		if (!result?.isValid()) {
			return;
		}
		onEdit(name);
	}
</script>

<Modal bind:open>
	{#snippet title()}
		<h1>{m.sync_edit_device_title()}</h1>
	{/snippet}
	<form class="flex flex-col" onsubmit={onSubmit}>
		<EditSyncDeviceForm bind:this={editSyncDeviceForm} bind:name />
		<div class="flex flex-row justify-end">
			<button type="submit" class="btn primary" {disabled}>
				{#if loading}
					<div class="mr-2 flex flex-row justify-center">
						<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
					</div>
				{/if}
				{m.sync_device_update()}
			</button>
		</div>
	</form>
</Modal>
