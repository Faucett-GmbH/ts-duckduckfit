import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { settings_application_path } from '$lib/contexts/settings/routes';

export const load: PageLoad = async (event) => {
	await event.parent();
	// return redirect(302, settings_application_path());
};
