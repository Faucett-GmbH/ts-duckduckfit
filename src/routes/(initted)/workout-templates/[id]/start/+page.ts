import { getWorkoutTemplateById } from '$lib/state/workoutTemplates.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	await event.parent();
	const workoutTemplateId = Number.parseInt(event.params.id);
	const workout = await workoutTemplateApi.activeWorkoutForId(workoutTemplateId);
	return {
		workout,
		workoutTemplate: await getWorkoutTemplateById(workoutTemplateId)
	};
};
