import { PUBLIC_P2P_API_URL, PUBLIC_P2P_WS_URL } from '$env/static/public';
import { KeepAliveWebSocket } from '@aicacia/keepalivewebsocket';

export type P2pMessage =
	| {
			type: 'self';
			from: string;
	  }
	| {
			type: 'join';
			from: string;
			payload: unknown;
	  }
	| {
			type: 'leave';
			from: string;
	  }
	| {
			type: 'message';
			from: string;
			payload: unknown;
	  };

export function createWebSocket(room: string, password: string, id?: string) {
	return new KeepAliveWebSocket({
		autoconnect: true,
		minTimeBetweenReconnectsMS: 1000,
		async url() {
			return `${PUBLIC_P2P_WS_URL}/websocket?token=${await getToken(room, password, id)}`;
		}
	});
}

export async function getToken(room: string, password: string, id?: string) {
	const res = await fetch(`${PUBLIC_P2P_API_URL}/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id, room, password })
	});
	if (!res.ok) {
		throw new Error(`${res.statusText}: ${await res.text()}`);
	}
	return res.text();
}
