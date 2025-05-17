import { getDeviceId } from '$lib/state/fingerprintjs.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const { currentUserDocument } = await event.parent();
  return {
    sync: await currentUserDocument.sync(),
    deviceId: await getDeviceId(),
  };
};
