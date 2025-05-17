<script lang="ts" module>
	export interface SyncProps {
		deviceId: string;
		sync: AutomergeDocHandle<Sync>;
		currentUserDocument: CurrentUserDocument;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Plus from 'lucide-svelte/icons/plus';
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import { addSyncDevice, type Sync } from '$lib/state/sync.svelte';
	import type { AutomergeDocHandle } from '$lib/repo';
	import Modal from '$lib/components/Modal.svelte';
	import AddSyncDevice from './_AddSyncDevice.svelte';
	import type { CurrentUserDocument } from '$lib/state/userDocument.svelte';

	let { deviceId, sync, currentUserDocument }: SyncProps = $props();

	const syncState = automergeDocHandleState(sync);

	let addDeviceOpen = $state(false);
	function onOpenAddDevice() {
		addDeviceOpen = true;
	}
	function onAddDevice(newDeviceId: string, userAgent: string) {
		addSyncDevice(syncState.docHandle, newDeviceId, userAgent);
		addDeviceOpen = false;
	}
</script>

<div class="flex flex-row justify-between">
	<div>
		<h1 class="m-0">{m.sync_title()}</h1>
	</div>
	<div class="flex flex-col justify-end">
		<button class="btn success icon" onclick={onOpenAddDevice}><Plus /></button>
	</div>
</div>
<hr class="mt-1 mb-2" />
<table class="table-auto w-full">
	<thead>
		<tr class="text-left border-b">
			<th class="p-1">{m.sync_device_user_agent_label()}</th>
			<th class="p-1">{m.sync_device_created_at()}</th>
			<th class="p-1"></th>
		</tr>
	</thead>
	<tbody>
		{#if syncState.doc?.devices}
			{#each Object.entries(syncState.doc.devices) as [id, device] (id)}
				<tr class="group">
					<td class="p-1">
						{device.userAgent}
						{#if id === deviceId}
							({m.sync_this_device()})
						{/if}
					</td>
					<td class="p-1">{device.createdAt.toLocaleString()}</td>
					<td class="p-1 flex justify-end"></td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<Modal bind:open={addDeviceOpen}>
	{#snippet title()}
		<h1>{m.sync_add_device_title()}</h1>
	{/snippet}
	<AddSyncDevice {currentUserDocument} {deviceId} onAdd={onAddDevice} />
</Modal>
