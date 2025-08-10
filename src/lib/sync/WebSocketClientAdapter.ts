import { cbor } from '@automerge/automerge-repo/slim';
import {
	WebSocketClientAdapter as AutomergeWebSocketClientAdapter,
	type FromClientMessage,
	type FromServerMessage
} from '@automerge/automerge-repo-network-websocket';

export class WebSocketClientAdapter extends AutomergeWebSocketClientAdapter {
	send(message: FromClientMessage) {
		console.log('send', message);
		return super.send(message);
	}
	receiveMessage(messageBytes: Uint8Array) {
		const message: FromServerMessage = cbor.decode(new Uint8Array(messageBytes));
		console.log('receiveMessage', message);
		return super.receiveMessage(messageBytes);
	}
}
