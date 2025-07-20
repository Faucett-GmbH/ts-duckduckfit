<script lang="ts" module>
	export interface Props {
		data: PageData;
	}

	export type SyncMessageDevice = {
		type: 'device';
		payload: {
			deviceId: string;
			name: string;
		};
	};
	export type SyncMessageCreated = {
		type: 'created';
	};
	export type SyncMessage = SyncMessageDevice | SyncMessageCreated;
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { getDeviceId, getDeviceName } from '$lib/state/fingerprintjs.svelte';
	import type { AddSyncMessage } from '../(initted)/settings/sync/_AddSyncDevice.svelte';
	import { setUserDocumentId } from '$lib/state/userDocument.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { createWebSocket, type P2pMessage } from '$lib/sync/websocket';
	import { getWebRTCClientAdapter } from '$lib/sync';
	import { createNotification } from '$lib/state/notifications.svelte';
	import { waitMS } from '$lib/util';

	let room = $state('');
	let roomPassword = $state('');

	onMount(() => {
		room = page.url.searchParams.get('room') ?? '';
		roomPassword = page.url.searchParams.get('password') ?? '';

		const websocket = createWebSocket(room, roomPassword);

		getDeviceId().then((deviceId) => {
			websocket.on('message', async (data) => {
				const wsMessage = JSON.parse(data as string) as P2pMessage;
				switch (wsMessage.type) {
					case 'message': {
						const message = wsMessage.payload as AddSyncMessage;
						switch (message.type) {
							case 'allowed': {
								websocket.send(
									JSON.stringify({
										type: 'created'
									} as SyncMessageCreated)
								);
								break;
							}
							case 'not-allowed': {
								createNotification(m.sync_rejected_sync_request(), 'error');
								await waitMS(3000);
								window.close();
								break;
							}
							case 'added': {
								await getWebRTCClientAdapter().init(
									deviceId,
									message.payload.room,
									message.payload.password,
									[message.payload.deviceId]
								);

								await setUserDocumentId(message.payload.userDocumentId);
								await goto(`${base}/settings/profile`);
								break;
							}
						}
						break;
					}
				}
			});

			websocket.send(
				JSON.stringify({
					type: 'device',
					payload: {
						deviceId,
						name: getDeviceName(navigator.userAgent)
					}
				} as SyncMessageDevice)
			);
		});

		return () => {
			if (websocket) {
				websocket.close();
			}
		};
	});
</script>

<svelte:head>
	<title>{m.sync_title()}</title>
</svelte:head>

<div class="container mx-auto p-4">
	<div class="mx-auto flex max-w-fit flex-col">
		<h2>{m.sync_syncing_device()}</h2>
		<div class="mr-2 flex flex-row justify-center">
			<div class="inline-block h-24 w-24 animate-spin"><LoaderCircle size={96} /></div>
		</div>
	</div>
</div>
