import { load, type GetResult } from "@fingerprintjs/fingerprintjs";
import { browser } from "$app/environment";
import { UAParser } from "ua-parser-js";

let fingerprintjsStateResolve: (value: GetResult) => void;

const fingerprintjsState = $state<Promise<GetResult>>(
	new Promise<GetResult>((resolve) => {
		fingerprintjsStateResolve = resolve;
	}),
);

export const fingerprintjs = {
	get value() {
		return fingerprintjsState;
	},
	get deviceId() {
		return getDeviceId();
	},
};

export async function getDeviceId() {
	return (await fingerprintjsState).visitorId;
}

export function getDeviceName(userAgent: string) {
	const { browser, device, os } = UAParser(userAgent);
	return [os.toString(), browser.toString(), device.toString()]
		.filter((x) => x != null && x !== "undefined")
		.join(" ");
}

if (browser) {
	load()
		.then((fingerprintJS) => fingerprintJS.get())
		.then((result) => {
			fingerprintjsStateResolve(result);
		});
}
