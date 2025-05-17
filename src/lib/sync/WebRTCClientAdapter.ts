import { NetworkAdapter, type Message, type PeerId, type PeerMetadata } from "@automerge/automerge-repo/slim";
import type { KeepAliveWebSocket } from "@aicacia/keepalivewebsocket";
import EventEmitter from "eventemitter3";
import { createWebSocket, type P2pMessage } from "./websocket";
import { Peer, type SignalMessage } from "@aicacia/peer";
import { decode, encode, toArrayBuffer } from "./util";

export type ArriveSyncMessage = Omit<Message, "targetId"> & {
  type: "arrive";
  peerMetadata: PeerMetadata;
}

export type WelcomeSyncMessage = Message & {
  type: "welcome";
  peerMetadata: PeerMetadata;
}

export type SyncMessage = ArriveSyncMessage | WelcomeSyncMessage | Message;

export type RoomSignalMessage = {
  type: "signal";
  payload: SignalMessage;
};

export type RoomPeerMessage = {
  type: "peer";
};

export type RoomMessage = RoomSignalMessage | RoomPeerMessage;

interface WebRTCClientAdapterInternalEvents {
  init(): void;
}

export class WebRTCClientAdapter extends NetworkAdapter {
  #ready = false;
  #emitter = new EventEmitter<WebRTCClientAdapterInternalEvents>();

  #websocket?: KeepAliveWebSocket;
  #remotePeers: Map<string, Peer> = new Map();
  #remotePeerIds: Map<string, string> = new Map();

  #deviceIds = new Set<string>();
  #newDeviceIds = new Set<string>();
  #room?: string;
  #password?: string;
  #deviceId?: string;

  init(deviceId: string, room: string, password: string) {
    this.#deviceId = deviceId;
    this.#room = room;
    this.#password = password;
    this.#emitter.emit("init");
  }

  async setDeviceIds(deviceIds: string[]) {
    const newDeviceIds = new Set<string>();
    for (const deviceId of deviceIds) {
      if (this.#deviceId === deviceId) {
        continue;
      }
      if (!this.#deviceIds.has(deviceId)) {
        this.#newDeviceIds.add(deviceId);
      }
      newDeviceIds.add(deviceId);
    }
    this.#deviceIds = newDeviceIds;
    await this.#join();
  }
  async addDeviceId(deviceId: string) {
    if (this.#deviceId === deviceId) {
      return;
    }
    this.#deviceIds.add(deviceId);
    this.#newDeviceIds.add(deviceId);
    await this.#join();
  }

  connect(peerId: PeerId, peerMetadata?: PeerMetadata) {
    this.peerId = peerId;
    this.peerMetadata = peerMetadata;
    this.#join()
      .catch(error => {
        console.error(`failed to join`, error);
      });
  }

  async #join() {
    const newDeviceIds = [...this.#newDeviceIds.values()];
    this.#newDeviceIds.clear();
    await Promise.all(newDeviceIds.map(deviceId => this.#createPeer(deviceId)));
  }

  disconnect() {
    this.#websocket?.close();
    this.#websocket = undefined;
    for (const peer of this.#remotePeers.values()) {
      peer.close();
    }
    this.#remotePeers.clear();
    this.#remotePeerIds.clear();
    this.emit("close");
  }

  send(message: Message) {
    Promise.all(
      [...this.#deviceIds.values()]
        .map(async deviceId => {
          try {
            const peer = this.#remotePeers.get(deviceId);
            if (peer) {
              const messageWithSender: Message = {
                ...message,
                senderId: this.peerId!,
              };
              peer.send(toArrayBuffer(encode(messageWithSender)));
            }
          } catch (error) {
            console.error(`send error ${deviceId}`, error);
          }
        })
    );
  }

  receive(fromDeviceId: string, messageBytes: Uint8Array) {
    if (messageBytes.byteLength === 0) {
      throw new Error("received a zero-length message")
    }
    const syncMessage: SyncMessage = decode(messageBytes);
    switch (syncMessage.type) {
      case "arrive": {
        const message = syncMessage as ArriveSyncMessage;
        const peer = this.#remotePeers.get(fromDeviceId);
        if (peer) {
          peer.send(toArrayBuffer(encode({
            type: "welcome",
            senderId: this.peerId!,
            targetId: message.senderId,
            peerMetadata: this.peerMetadata!,
          })));
        }
        this.#remotePeerIds.set(fromDeviceId, message.senderId);
        if (!this.#ready) {
          this.#ready = true;
          this.emit("ready", { network: this });
        }
        this.emit("peer-candidate", {
          peerId: message.senderId,
          peerMetadata: message.peerMetadata,
        });
        break;
      }
      case "welcome": {
        const message = syncMessage as WelcomeSyncMessage;
        this.#remotePeerIds.set(fromDeviceId, message.senderId);
        if (!this.#ready) {
          this.#ready = true;
          this.emit("ready", { network: this });
        }
        this.emit("peer-candidate", {
          peerId: message.senderId,
          peerMetadata: message.peerMetadata,
        });
        break;
      }
      default: {
        this.emit("message", syncMessage as Message);
        break;
      }
    }
  }

  async #createPeer(deviceId: string) {
    this.#remotePeers.get(deviceId)?.close();

    const peer = new Peer({ id: deviceId });
    this.#remotePeers.set(deviceId, peer);

    peer.on("signal", async (payload) => {
      const websocket = await this.#getWebSocket();
      const message: RoomSignalMessage = {
        type: "signal",
        payload
      };
      websocket.send(JSON.stringify(message));
    });
    peer.on("data", (data) => {
      this.receive(peer.getId(), new Uint8Array(data as ArrayBufferLike));
    });
    peer.on("close", () => {
      const peerId = this.#remotePeerIds.get(deviceId) as PeerId;
      if (peerId) {
        this.emit("peer-disconnected", { peerId });
      }
      this.#remotePeers.delete(deviceId);
      this.#remotePeerIds.delete(deviceId);
    });
    const websocket = await this.#getWebSocket();
    websocket.send(JSON.stringify({
      type: "peer"
    }));

    return peer;
  }

  async #waitForRoom() {
    if (this.#room && this.#password && this.#deviceId) {
      return;
    }
    return new Promise<void>((resolve) =>
      this.#emitter.once("init", resolve)
    );
  }

  async #getWebSocket() {
    await this.#waitForRoom();

    if (!this.#websocket) {
      this.#websocket = createWebSocket(this.#room!, this.#password!, this.#deviceId!);
      this.#websocket.on("message", async (data) => {
        const p2pMessage = JSON.parse(data as string) as P2pMessage;
        const fromDeviceId = p2pMessage.from;
        if (!this.#deviceIds.has(fromDeviceId)) {
          return;
        }
        switch (p2pMessage.type) {
          case "message": {
            const p2pPayload = p2pMessage.payload as RoomMessage;
            switch (p2pPayload.type) {
              case "signal": {
                const peer = this.#remotePeers.get(fromDeviceId);
                if (peer) {
                  peer.signal(p2pPayload.payload as SignalMessage);
                }
                break;
              }
              case "peer": {
                let peer = this.#remotePeers.get(fromDeviceId);
                if (peer) {
                  if (!peer.isInitiator()) {
                    await peer.init();
                    peer.once("connect", () => {
                      peer!.send(toArrayBuffer(encode({
                        type: "arrive",
                        senderId: this.peerId!,
                        peerId: this.peerId!,
                        peerMetadata: this.peerMetadata!,
                      })));
                    });
                  }
                } else {
                  peer = await this.#createPeer(fromDeviceId);
                }
                await peer.ready();
                break;
              }
            }
          }
        }
      });
    }
    return this.#websocket;
  }
}