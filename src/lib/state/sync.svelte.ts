import type { DocHandleChangePayload } from '@automerge/automerge-repo/slim';
import type { AutomergeDocHandle } from '$lib/repo';
import { v7 } from 'uuid';
import { getDeviceId, getDeviceName } from './fingerprintjs.svelte';
import { getWebRTCClientAdapter } from '$lib/sync';
import { debounce } from '@aicacia/debounce';

export interface SyncDevice {
	name: string;
	createdAt: Date;
}

export interface Sync {
	version: number;
	room: string;
	password: string;
	devices: { [deviceId: string]: SyncDevice };
}

export const syncConfig = {
	migrations: {
		1: async () => {
			const deviceId = await getDeviceId();

			return (sync: Sync) => {
				sync.devices = {};
				sync.devices[deviceId] = {
					name: getDeviceName(navigator.userAgent),
					// eslint-disable-next-line svelte/prefer-svelte-reactivity
					createdAt: new Date()
				};
			};
		}
	}
};

export async function initSync(docHandle: AutomergeDocHandle<Sync>) {
	const deviceId = await getDeviceId();

	async function initWebRTCClientAdapter(sync: Sync) {
		await getWebRTCClientAdapter().init(deviceId, sync.room, sync.password, Object.keys(sync.devices));
	}
	const onChange = debounce((event: DocHandleChangePayload<Sync>) => {
		if (event.doc.room && event.doc.password) {
			initWebRTCClientAdapter(event.doc);
		}
	}, 0);

	docHandle.on('change', onChange);

	const sync = await docHandle.doc();

	if (!sync?.room || !sync?.password) {
		docHandle.change((doc) => {
			doc.room = v7();
			doc.password = v7();
			return doc;
		});
	} else if (sync) {
		await initWebRTCClientAdapter(sync);
	}
	await docHandle.whenReady();
}

export async function addSyncDevice(
	docHandle: AutomergeDocHandle<Sync>,
	deviceId: string,
	name: string
) {
	docHandle.change((doc) => {
		doc.devices[deviceId] = {
			name,
			// eslint-disable-next-line svelte/prefer-svelte-reactivity
			createdAt: new Date()
		};
		return doc;
	});
	getWebRTCClientAdapter().addDeviceId(deviceId);
}

export async function updateSyncDevice(
	docHandle: AutomergeDocHandle<Sync>,
	deviceId: string,
	name: string
) {
	docHandle.change((doc) => {
		doc.devices[deviceId].name = name;
		return doc;
	});
}

export function removeSyncDevice(docHandle: AutomergeDocHandle<Sync>, deviceId: string) {
	getWebRTCClientAdapter().removeDeviceId(deviceId);
	docHandle.change((doc) => {
		delete doc.devices[deviceId];
		return doc;
	});
}
