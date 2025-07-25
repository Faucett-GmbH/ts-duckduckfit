<script lang="ts" module>
	export interface SyncProps {
		currentDeviceId: string;
		sync: AutomergeDocHandle<Sync>;
		currentUserDocument: CurrentUserDocument;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Plus from 'lucide-svelte/icons/plus';
	import { automergeDocHandleState } from '$lib/automergeState.svelte';
	import {
		addSyncDevice,
		removeSyncDevice,
		updateSyncDevice,
		type Sync,
		type SyncDevice
	} from '$lib/state/sync.svelte';
	import type { AutomergeDocHandle } from '$lib/repo';
	import AddSyncDevice from './_AddSyncDevice.svelte';
	import type { CurrentUserDocument } from '$lib/state/userDocument.svelte';
	import Trash from 'lucide-svelte/icons/trash';
	import RemoveSyncDevice from './_RemoveSyncDevice.svelte';
	import Pencil from 'lucide-svelte/icons/pencil';
	import EditSyncDevice from './_EditSyncDevice.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { currentDeviceId, sync, currentUserDocument }: SyncProps = $props();

	const syncState = automergeDocHandleState(sync);

	let addSyncDeviceComponent: AddSyncDevice;
	function onCloseAddDevice() {
		addSyncDeviceComponent.onDoNotAllow();
	}
	let addDeviceOpen = $state(false);
	function onOpenAddDevice() {
		addDeviceOpen = true;
	}
	function onAddDevice(newDeviceId: string, name: string) {
		addSyncDevice(syncState.docHandle, newDeviceId, name);
		addDeviceOpen = false;
	}

	let editDeviceOpen = $state(false);
	let deviceIdToEdit = $state<string>();
	let deviceToEdit = $state<SyncDevice>();
	function onOpenEditDevice(deviceId: string, device: SyncDevice) {
		deviceIdToEdit = deviceId;
		deviceToEdit = device;
		editDeviceOpen = true;
	}
	function onEditDevice(name: string) {
		if (!deviceIdToEdit) {
			return;
		}
		updateSyncDevice(syncState.docHandle, deviceIdToEdit, name);
		editDeviceOpen = false;
	}

	let removeDeviceOpen = $state(false);
	let deviceIdToRemove = $state<string>();
	let deviceToRemove = $state<SyncDevice>();
	function onOpenRemoveDevice(deviceId: string, device: SyncDevice) {
		deviceIdToRemove = deviceId;
		deviceToRemove = device;
		removeDeviceOpen = true;
	}
	function onRemoveDevice() {
		if (!deviceIdToRemove) {
			return;
		}
		removeSyncDevice(syncState.docHandle, deviceIdToRemove);
		removeDeviceOpen = false;
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
<table class="w-full table-auto">
	<thead>
		<tr class="border-b text-left">
			<th class="p-1">{m.sync_device_name_label()}</th>
			<th class="p-1">{m.sync_device_created_at_label()}</th>
			<th class="p-1"></th>
		</tr>
	</thead>
	<tbody>
		{#if syncState.doc?.devices}
			{#each Object.entries(syncState.doc.devices) as [deviceId, device] (deviceId)}
				<tr class="group">
					<td class="p-1">
						{device.name}
						{#if deviceId === currentDeviceId}
							({m.sync_this_device()})
						{/if}
					</td>
					<td class="p-1">{device.createdAt.toLocaleString()}</td>
					<td class="flex justify-end p-1">
						<button class="btn primary icon" onclick={() => onOpenEditDevice(deviceId, device)}>
							<Pencil />
						</button>
						{#if deviceId !== currentDeviceId}
							<button class="btn danger icon" onclick={() => onOpenRemoveDevice(deviceId, device)}>
								<Trash />
							</button>
						{/if}
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<Modal bind:open={addDeviceOpen} onClose={onCloseAddDevice}>
	{#snippet title()}
		<h1>{m.sync_add_device_title()}</h1>
	{/snippet}
	<AddSyncDevice
		bind:this={addSyncDeviceComponent}
		bind:open={addDeviceOpen}
		{currentUserDocument}
		{currentDeviceId}
		onAdd={onAddDevice}
	/>
</Modal>

<EditSyncDevice bind:open={editDeviceOpen} name={deviceToEdit?.name || ''} onEdit={onEditDevice} />
<RemoveSyncDevice
	bind:open={removeDeviceOpen}
	name={deviceToRemove?.name || ''}
	onRemove={onRemoveDevice}
/>
