import {
	NetworkAdapter,
	type Message,
	type PeerId,
	type PeerMetadata
} from '@automerge/automerge-repo';
import type { KeepAliveWebSocket } from '@aicacia/keepalivewebsocket';
import EventEmitter from 'eventemitter3';
import type { P2pMessage } from './websocket';
import { Peer, type SignalMessage } from '@aicacia/peer';
import { decode, encode, toArrayBuffer } from './util';
import { getDeviceId } from '$lib/state/fingerprintjs.svelte';
import { sync } from '$lib/state/sync.svelte';

export type ArriveSyncMessage = Omit<Message, 'targetId'> & {
	type: 'arrive';
	peerMetadata: PeerMetadata;
};

export type WelcomeSyncMessage = Message & {
	type: 'welcome';
	peerMetadata: PeerMetadata;
};

export type SyncMessage = ArriveSyncMessage | WelcomeSyncMessage | Message;

export type RoomSignalMessage = {
	type: 'signal';
	payload: SignalMessage;
};

export type RoomPeerMessage = {
	type: 'peer';
};

export type RoomMessage = RoomSignalMessage | RoomPeerMessage;

interface WebRTCClientAdapterInternalEvents {
	ready(): void;
}

export class WebRTCClientAdapter extends NetworkAdapter {
	#ready = false;
	#emitter = new EventEmitter<WebRTCClientAdapterInternalEvents>();

	#remotePeers: Map<string, Peer> = new Map();
	#remotePeerIds: Map<string, string> = new Map();

	#deviceIds = new Set<string>();
	#newDeviceIds = new Set<string>();

	#websocket: KeepAliveWebSocket | undefined;

	isReady() {
		return this.#ready;
	}

	whenReady() {
		if (this.#ready) {
			return Promise.resolve();
		}
		return new Promise<void>((resolve) => this.#emitter.once('ready', resolve));
	}

	async setDeviceIds(deviceIdList: string[]) {
		const deviceIds = new Set<string>();
		for (const deviceId of deviceIdList) {
			if ((await getDeviceId()) === deviceId) {
				continue;
			}
			if (!this.#deviceIds.has(deviceId)) {
				this.#newDeviceIds.add(deviceId);
			}
			deviceIds.add(deviceId);
		}
		for (const deviceId of this.#deviceIds) {
			if (deviceIds.has(deviceId)) {
				continue;
			}
			const peer = this.#remotePeers.get(deviceId);
			if (peer) {
				peer.close();
				this.#remotePeers.delete(deviceId);
				this.#remotePeerIds.delete(deviceId);
			}
		}
		this.#deviceIds = deviceIds;
		await this.#join();
	}

	async addDeviceId(deviceId: string) {
		if (this.#deviceIds.has(deviceId) || this.#newDeviceIds.has(deviceId)) {
			return;
		}
		this.#deviceIds.add(deviceId);
		this.#newDeviceIds.add(deviceId);
		await this.#join();
	}

	removeDeviceId(deviceId: string) {
		this.#deviceIds.delete(deviceId);
		this.#newDeviceIds.delete(deviceId);
		const peer = this.#remotePeers.get(deviceId);
		if (peer) {
			peer.close();
			this.#remotePeers.delete(deviceId);
			this.#remotePeerIds.delete(deviceId);
		}
	}

	async connect(peerId: PeerId, peerMetadata?: PeerMetadata) {
		this.peerId = peerId;
		this.peerMetadata = peerMetadata;

		await this.#join().catch((error) => {
			console.error(`failed to join`, error);
		});

		this.emit('peer-candidate', {
			peerId: 'self',
			peerMetadata: peerMetadata,
			deviceId: await getDeviceId()
		} as never);

		this.#forceReady();
	}

	async #join() {
		if (!this.peerId) {
			return;
		}
		const newDeviceIds = [...this.#newDeviceIds.values()];
		this.#newDeviceIds.clear();
		await Promise.all(newDeviceIds.map(this.#createPeer));
	}

	disconnect() {
		this.#websocket?.close();
		this.#websocket = undefined;
		for (const peer of this.#remotePeers.values()) {
			peer.close();
		}
		this.#remotePeers.clear();
		this.#remotePeerIds.clear();
		this.#ready = false;
		this.emit('close');
	}

	async send(message: Message) {
		if (message.targetId === 'self') {
			this.receive(
				await getDeviceId(),
				new Uint8Array(
					toArrayBuffer(
						encode({
							...message,
							senderId: 'self',
							targetId: this.peerId!
						} as Message)
					)
				)
			);
			return;
		}
		await Promise.all(
			[...this.#deviceIds.values()].map(async (deviceId) => {
				try {
					const peer = this.#remotePeers.get(deviceId);
					if (peer) {
						peer.send(
							toArrayBuffer(
								encode({
									...message,
									senderId: this.peerId!
								} as Message)
							)
						);
					}
				} catch (error) {
					console.error(`send error ${deviceId}`, error);
				}
			})
		);
	}

	receive(fromDeviceId: string, messageBytes: Uint8Array) {
		if (messageBytes.byteLength === 0) {
			throw new Error('received a zero-length message');
		}
		const syncMessage: SyncMessage = decode(messageBytes);
		switch (syncMessage.type) {
			case 'arrive': {
				const message = syncMessage as ArriveSyncMessage;
				const peer = this.#remotePeers.get(fromDeviceId);
				if (peer) {
					peer.send(
						toArrayBuffer(
							encode({
								type: 'welcome',
								senderId: this.peerId!,
								targetId: message.senderId,
								peerMetadata: this.peerMetadata!
							} as WelcomeSyncMessage)
						)
					);
				}
				this.#remotePeerIds.set(fromDeviceId, message.senderId);
				this.emit('peer-candidate', {
					peerId: message.senderId,
					peerMetadata: message.peerMetadata,
					deviceId: fromDeviceId
				} as never);
				this.#forceReady();
				break;
			}
			case 'welcome': {
				const message = syncMessage as WelcomeSyncMessage;
				this.#remotePeerIds.set(fromDeviceId, message.senderId);
				this.emit('peer-candidate', {
					peerId: message.senderId,
					peerMetadata: message.peerMetadata,
					deviceId: fromDeviceId
				} as never);
				this.#forceReady();
				break;
			}
			default: {
				this.emit('message', syncMessage as Message);
				break;
			}
		}
	}

	#forceReady = () => {
		if (!this.#ready) {
			this.#ready = true;
			this.#emitter.emit('ready');
		}
	};

	#createPeer = async (deviceId: string) => {
		console.assert(this.peerId != null, 'peerId is not set');

		this.#remotePeers.get(deviceId)?.close();

		const peer = new Peer({ id: deviceId });
		this.#remotePeers.set(deviceId, peer);

		peer.on('signal', async (signalPayload) => {
			const websocket = await this.#getWebSocket();
			websocket.send(
				JSON.stringify({
					type: 'signal',
					payload: signalPayload
				} as RoomSignalMessage)
			);
		});
		peer.on('data', (data) => {
			this.receive(peer.getId(), new Uint8Array(data as ArrayBufferLike));
		});
		peer.on('close', () => {
			const peerId = this.#remotePeerIds.get(deviceId) as PeerId;
			if (peerId) {
				this.emit('peer-disconnected', { peerId, deviceId } as never);
			}
			this.#remotePeers.delete(deviceId);
			this.#remotePeerIds.delete(deviceId);
		});

		const websocket = await this.#getWebSocket();

		websocket.send(
			JSON.stringify({
				type: 'peer'
			} as RoomMessage)
		);

		return peer;
	};

	async #getWebSocket() {
		const websocket = await sync.getWebSocket();

		if (websocket !== this.#websocket) {
			if (this.#websocket) {
				this.#websocket.off('message', this.#onWebSocketMessage);
			}
			websocket.on('message', this.#onWebSocketMessage);
			this.#websocket = websocket;
		}
		return websocket;
	}

	#onWebSocketMessage = async (
		data: string | ArrayBufferLike | Blob | ArrayBufferView<ArrayBufferLike>
	) => {
		const p2pMessage = JSON.parse(data as string) as P2pMessage;
		const fromDeviceId = p2pMessage.from;
		switch (p2pMessage.type) {
			case 'message': {
				const p2pPayload = p2pMessage.payload as RoomMessage;
				switch (p2pPayload.type) {
					case 'signal': {
						const peer = this.#remotePeers.get(fromDeviceId);

						if (peer) {
							peer.signal(p2pPayload.payload as SignalMessage);
						}
						break;
					}
					case 'peer': {
						const peer =
							this.#remotePeers.get(fromDeviceId) ?? (await this.#createPeer(fromDeviceId));

						if (!peer.isInitiator()) {
							await peer.init();
							peer.once('connect', () => {
								console.assert(this.peerId != null, 'peerId is not set');
								peer.send(
									toArrayBuffer(
										encode({
											type: 'arrive',
											senderId: this.peerId!,
											peerId: this.peerId!,
											peerMetadata: this.peerMetadata!
										} as ArriveSyncMessage)
									)
								);
							});
						}
						await peer.ready();
						break;
					}
				}
			}
		}
	};
}
