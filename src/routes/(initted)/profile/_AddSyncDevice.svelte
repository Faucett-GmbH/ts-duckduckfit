<script lang="ts" module>
	export interface AddSyncDeviceProps {
		currentUserDocument: CurrentUserDocument;
		deviceId: string;
		onAdd(newDeviceId: string, userAgent: string): void;
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
			userAgent: string;
		};
	};
	export type AddSyncMessage =
		| AddSyncMessageAllowed
		| AddSyncMessageNotAllowed
		| AddSyncMessageAdded;
</script>

<script lang="ts">
	import QrCode from '$lib/components/QRCode.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import type { CurrentUserDocument, UserDocument } from '$lib/state/userDocument.svelte';
	import { v7 } from 'uuid';
	import type { KeepAliveWebSocket } from '@aicacia/keepalivewebsocket';
	import { m } from '$lib/paraglide/messages';
	import type { SyncMessage, SyncMessageDevice } from '../../sync/+page.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';
	import { createWebSocket, type P2pMessage } from '$lib/sync/websocket';

	let { currentUserDocument, deviceId, onAdd }: AddSyncDeviceProps = $props();

	let room = v7();
	let roomPassword = v7();
	let newDevice = $state<SyncMessageDevice['payload']>();
	let url = $state('');

	function onDoNotAllow() {
		if (websocket) {
			websocket.send(
				JSON.stringify({
					type: 'not-allowed'
				} as AddSyncMessageNotAllowed)
			);
		}
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
									onAdd(newDevice.deviceId, newDevice.userAgent);
									ws.send(
										JSON.stringify({
											type: 'added',
											payload: {
												userDocumentId: currentUserDocument.userDocumentId(),
												room: sync.room,
												password: sync.password,
												deviceId: deviceId,
												userAgent: navigator.userAgent
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
</script>

<div class="flex flex-col justify-center items-center">
	{#if newDevice}
		<div>
			<p>{m.sync_add_device({ name: newDevice.userAgent })}</p>
		</div>
		<div class="flex flex-row justify-end">
			<button class="btn danger" onclick={onDoNotAllow}>
				{m.sync_do_not_allow()}
			</button>
			<button class="btn success" onclick={onAllow}>
				{m.sync_allow()}
			</button>
		</div>
	{:else if url}
		<QrCode text={url} size={512} />
	{:else}
		<div class="mr-2 flex flex-row justify-center">
			<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
		</div>
	{/if}
</div>
