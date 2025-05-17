import { browser } from "$app/environment";
import { WebRTCClientAdapter } from "./WebRTCClientAdapter";

if (browser) {
  localStorage.debug = '*'
}

export const webRTCClientAdapter = new WebRTCClientAdapter();
