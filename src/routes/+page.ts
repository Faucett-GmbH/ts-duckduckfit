import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	await event.parent();
	return redirect(302, resolve('/settings/application'));
};
