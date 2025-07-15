import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const prerender = true;
export const ssr = false;

export const load: PageLoad = async (event) => {
	await event.parent();
	return redirect(302, `${base}/workouts`);
};
