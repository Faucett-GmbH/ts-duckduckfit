<script lang="ts" module>
	export interface AddSyncDeviceProps {
		open?: boolean;
		currentUserDocument: CurrentUserDocument;
		currentDeviceId: string;
		onAdd(newDeviceId: string, name: string): void;
	}

	export type AddSyncMessageAllowed = {
		type: 'allowed';
	};
	export type AddSyncMessageNotAllowed = {
		type: 'not-allowed';
	};
	export type AddSyncMessageAdded = {
		type: 'added';
		payload: {
			userDocumentId: AutomergeDocumentId<UserDocument>;
			room: string;
			password: string;
			deviceId: string;
			name: string;
		};
	};
	export type AddSyncMessage =
		| AddSyncMessageAllowed
		| AddSyncMessageNotAllowed
		| AddSyncMessageAdded;
</script>

<script lang="ts">
	import EditSyncDeviceForm from './_EditSyncDeviceForm.svelte';
	import QrCode from '$lib/components/QRCode.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import type { CurrentUserDocument, UserDocument } from '$lib/state/userDocument.svelte';
	import { v7 } from 'uuid';
	import type { KeepAliveWebSocket } from '@aicacia/keepalivewebsocket';
	import { m } from '$lib/paraglide/messages';
	import type { AutomergeDocumentId } from '$lib/repo';
	import { createWebSocket, type P2pMessage } from '$lib/sync/websocket';
	import { Copy } from 'lucide-svelte';
	import { copyToClipboard } from '$lib/util';
	import { createNotification } from '$lib/state/notifications.svelte';
	import type { SyncMessage, SyncMessageDevice } from '../../../sync/+page.svelte';
	import { getDeviceName } from '$lib/state/fingerprintjs.svelte';
	import { syncRoomPassword } from '$lib/state/sync.svelte';

	let {
		open = $bindable(),
		currentUserDocument,
		currentDeviceId,
		onAdd
	}: AddSyncDeviceProps = $props();

	let room = v7();
	let roomPassword = v7();
	let newDevice = $state<SyncMessageDevice['payload']>();
	let url = $state('');

	export function onDoNotAllow() {
		if (websocket) {
			websocket.send(
				JSON.stringify({
					type: 'not-allowed'
				} as AddSyncMessageNotAllowed)
			);
		}
		open = false;
	}

	function onAllow() {
		if (websocket) {
			websocket.send(
				JSON.stringify({
					type: 'allowed'
				} as AddSyncMessageAllowed)
			);
		}
	}

	async function onCopyUrl() {
		if (!url) {
			return;
		}
		await copyToClipboard(url);
		createNotification(m.copied_to_clipboard(), 'success');
	}

	let websocket = $state<KeepAliveWebSocket>();
	$effect(() => {
		url = currentUserDocument.syncUrl(room, roomPassword);
	});

	$effect(() => {
		const ws = (websocket = createWebSocket(room, roomPassword));
		ws.on('message', async (data) => {
			const wsMessage = JSON.parse(data as string) as P2pMessage;
			switch (wsMessage.type) {
				case 'message': {
					const message = wsMessage.payload as SyncMessage;
					switch (message.type) {
						case 'device': {
							newDevice = message.payload;
							break;
						}
						case 'created': {
							if (newDevice) {
								const syncHandle = await currentUserDocument.sync();
								const sync = syncHandle.doc();
								if (sync) {
									onAdd(newDevice.deviceId, newDevice.name);
									ws.send(
										JSON.stringify({
											type: 'added',
											payload: {
												userDocumentId: currentUserDocument.userDocumentId(),
												room: syncRoomPassword.room,
												password: syncRoomPassword.password,
												deviceId: currentDeviceId,
												name: getDeviceName(navigator.userAgent)
											}
										} as AddSyncMessageAdded)
									);
								}
							}
							break;
						}
					}
					break;
				}
			}
		});

		return () => {
			ws.close();
			if (websocket) {
				websocket = undefined;
			}
		};
	});

	let editSyncDeviceForm = $state<EditSyncDeviceForm>();
	async function onSubmitNewDevice(e: SubmitEvent) {
		e.preventDefault();
		if (!editSyncDeviceForm) {
			return;
		}
		const result = await editSyncDeviceForm.validateAll();
		if (!result?.isValid()) {
			return;
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	{#if newDevice}
		<form class="flex w-full grow flex-col" onsubmit={onSubmitNewDevice}>
			<p>{m.sync_add_device({ name: newDevice.name })}</p>
			<EditSyncDeviceForm bind:this={editSyncDeviceForm} bind:name={newDevice.name} />
			<div class="flex flex-row justify-end">
				<button class="btn danger" onclick={onDoNotAllow}>
					{m.sync_do_not_allow()}
				</button>
				<button class="btn success" onclick={onAllow}>
					{m.sync_allow()}
				</button>
			</div>
		</form>
	{:else if url}
		<QrCode text={url} size={384} />
		<div class="mt-2 flex w-full flex-grow flex-row">
			<input class="flex flex-grow" type="text" readonly value={url} />
			<button class="btn icon primary" onclick={onCopyUrl}>
				<Copy />
			</button>
		</div>
	{:else}
		<div class="mr-2 flex flex-row justify-center">
			<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
		</div>
	{/if}
</div>
