import type { DocHandleChangePayload } from "@automerge/automerge-repo/slim";
import type { AutomergeDocHandle } from "$lib/repo";
import { v7 } from "uuid";
import { getDeviceId } from "./fingerprintjs.svelte";
import { webRTCClientAdapter } from "$lib/sync";
import { debounce } from "@aicacia/debounce";

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
          name: navigator.userAgent,
          createdAt: new Date()
        };
      }
    }
  }
};

export async function initSync(docHandle: AutomergeDocHandle<Sync>) {
  const deviceId = await getDeviceId();

  const onChange = debounce((event: DocHandleChangePayload<Sync>) => {
    if (event.doc.room && event.doc.password) {
      webRTCClientAdapter.init(deviceId, event.doc.room, event.doc.password);
    }
    const deviceIds = Object.keys(event.doc.devices);
    if (deviceIds.length > 0) {
      webRTCClientAdapter.setDeviceIds(deviceIds);
    }
  }, 0);

  docHandle.on("change", onChange);

  const sync = await docHandle.doc();
  let room = sync?.room || '';
  let password = sync?.password || '';

  if (!room || !password) {
    room = v7();
    password = v7();
    docHandle.change((doc) => {
      doc.room = room;
      doc.password = password;
      return doc;
    });
    await docHandle.whenReady();
  } else if (sync) {
    webRTCClientAdapter.init(deviceId, sync.room, sync.password);
    webRTCClientAdapter.setDeviceIds(Object.keys(sync.devices));
  }
}

export async function addSyncDevice(docHandle: AutomergeDocHandle<Sync>, deviceId: string, name: string) {
  docHandle.change((doc) => {
    doc.devices[deviceId] = {
      name,
      createdAt: new Date()
    };
    return doc;
  });
  webRTCClientAdapter.addDeviceId(deviceId);
}

export async function updateSyncDevice(docHandle: AutomergeDocHandle<Sync>, deviceId: string, name: string) {
  docHandle.change((doc) => {
    doc.devices[deviceId].name = name;
    return doc;
  });
}

export function removeSyncDevice(docHandle: AutomergeDocHandle<Sync>, deviceId: string) {
  webRTCClientAdapter.removeDeviceId(deviceId);
  docHandle.change((doc) => {
    delete doc.devices[deviceId];
    return doc;
  });
}
