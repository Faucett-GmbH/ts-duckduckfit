import FingerprintJS, { type GetResult } from '@fingerprintjs/fingerprintjs';
import { browser } from "$app/environment";

let fingerprintjsStateResolve: (value: GetResult) => void;

const fingerprintjsState = $state<Promise<GetResult>>(new Promise<GetResult>((resolve) => {
  fingerprintjsStateResolve = resolve;
}));

export const fingerprintjs = {
  get value() {
    return fingerprintjsState;
  }
};

export async function getDeviceId() {
  return (await fingerprintjs.value).visitorId;
}

if (browser) {
  FingerprintJS.load()
    .then((fingerprintJS) => fingerprintJS.get())
    .then((result) => {
      fingerprintjsStateResolve(result);
    });
}