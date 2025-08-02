import { browser } from '$app/environment';
import type { PeerCandidatePayload, PeerDisconnectedPayload } from '@automerge/automerge-repo';
import { WebRTCClientAdapter } from './WebRTCClientAdapter';
import { userDocument } from '$lib/state/userDocument.svelte';
import { createNotification } from '$lib/state/notifications.svelte';
import { m } from '$lib/paraglide/messages';
import { lazy } from '$lib/lazy';
import { getDeviceId } from '$lib/state/fingerprintjs.svelte';

export const getWebRTCClientAdapter = lazy(() => new WebRTCClientAdapter());

if (browser) {
	getWebRTCClientAdapter()
		.on('peer-candidate', async (payload: PeerCandidatePayload) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const deviceId = (payload as any).deviceId as string;
			if (deviceId === 'self' || deviceId === (await getDeviceId())) {
				return;
			}
			const sync = await userDocument.current?.sync();
			if (sync) {
				const doc = await sync.doc();
				const device = doc.devices[deviceId];
				if (device) {
					createNotification(m.sync_device_connected({ name: device.name }), 'info');
				}
			}
		})
		.on('peer-disconnected', async (payload: PeerDisconnectedPayload) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const deviceId = (payload as any).deviceId as string;
			if (deviceId === 'self' || deviceId === (await getDeviceId())) {
				return;
			}
			const sync = await userDocument.current?.sync();
			if (sync) {
				const doc = await sync.doc();
				const device = doc.devices[deviceId];
				if (device) {
					createNotification(m.sync_device_disconnected({ name: device.name }), 'info');
				}
			}
		});
}
