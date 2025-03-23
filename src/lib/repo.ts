
import wasmUrl from "@automerge/automerge/automerge.wasm?url";
import { next as Automerge } from "@automerge/automerge/slim";
import { Repo } from "@automerge/automerge-repo/slim";
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import { lazy } from './util';

export const initAutomerge = lazy(async () =>
  await Automerge.initializeWasm(wasmUrl)
);

export const getRepo = lazy(() => {
  return new Repo({
    network: [new BrowserWebSocketClientAdapter('wss://sync.automerge.org')],
    storage: new IndexedDBStorageAdapter()
  });
});
