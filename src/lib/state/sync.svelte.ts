import type { DocHandleChangePayload } from '@automerge/automerge-repo/slim';
import type { AutomergeDocHandle } from '$lib/repo';
import { v7 } from 'uuid';
import { getDeviceId, getDeviceName } from './fingerprintjs.svelte';
import { getWebRTCClientAdapter } from '$lib/sync';
import { debounce } from '@aicacia/debounce';
import { localStorageState } from '$lib/localStorageState.svelte';
import { createWebSocket } from '$lib/sync/websocket';
import { PUBLIC_URL } from '$env/static/public';

export interface SyncState {
	room: string;
	password: string;
}

const syncRoomPasswordState = localStorageState<SyncState>('user-sync', {
	room: v7(),
	password: v7()
});

const syncWebSocket = $derived.by(async () =>
	createWebSocket(
		syncRoomPasswordState.value.room,
		syncRoomPasswordState.value.password,
		await getDeviceId()
	)
);

export const sync = {
	get room() {
		return syncRoomPasswordState.value.room;
	},
	get password() {
		return syncRoomPasswordState.value.password;
	},
	setRoomPassword(room: string, password: string) {
		syncRoomPasswordState.value = {
			room,
			password
		};
	},
	syncUrl(room: string, password: string) {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const url = new URL(`${PUBLIC_URL}/sync`);
		url.searchParams.set('room', room);
		url.searchParams.set('password', password);
		return url.toString();
	},
	getWebSocket() {
		return syncWebSocket;
	}
};

export interface SyncDevice {
	name: string;
	createdAt: Date;
}

export interface Sync {
	version: number;
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
	async function initWebRTCClientAdapter(sync: Sync) {
		await getWebRTCClientAdapter().setDeviceIds(Object.keys(sync.devices));
	}
	const onChange = debounce((event: DocHandleChangePayload<Sync>) => {
		initWebRTCClientAdapter(event.doc);
	}, 0);

	docHandle.on('change', onChange);

	const sync = await docHandle.doc();

	await initWebRTCClientAdapter(sync);
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
	docHandle.change((doc) => {
		delete doc.devices[deviceId];
		return doc;
	});
}
