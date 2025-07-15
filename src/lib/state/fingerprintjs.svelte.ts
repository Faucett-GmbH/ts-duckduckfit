import { load, type GetResult } from '@fingerprintjs/fingerprintjs';
import { browser } from "$app/environment";

let fingerprintjsStateResolve: (value: GetResult) => void;

const fingerprintjsState = $state<Promise<GetResult>>(new Promise<GetResult>((resolve) => {
  fingerprintjsStateResolve = resolve;
}));

export const fingerprintjs = {
  get value() {
    return fingerprintjsState;
  },
  get deviceId() {
    return getDeviceId();
  }
};

export async function getDeviceId() {
  return (await fingerprintjsState).visitorId;
}

if (browser) {
  load()
    .then((fingerprintJS) => fingerprintJS.get())
    .then((result) => {
      fingerprintjsStateResolve(result);
    });
}