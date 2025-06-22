import { getWorkoutTemplateById, type WorkoutTemplate } from '$lib/state/workoutTemplates.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { AutomergeDocumentId } from '$lib/repo';
import type { Exercise } from '$lib/state/exerciseTypes';
import { getExerciseByGuid } from '$lib/state/exercises.svelte';

export const prerender = false;

export const load: PageLoad = async (event) => {
	await event.parent();
	const workoutTemplateId = event.params.id as unknown as AutomergeDocumentId<WorkoutTemplate>;
	const workoutTemplate = await getWorkoutTemplateById(workoutTemplateId);
	if (!workoutTemplate) {
		error(404);
	}
	const exerciseGuids = workoutTemplate.setGroupTemplates.flatMap(setGroupTemplate => setGroupTemplate.setTemplates.map(setTemplate => setTemplate.exerciseGuid));
	const uniqueExerciseGuids = [...new Set<AutomergeDocumentId<Exercise>>(exerciseGuids)];
	const exerciseByGuid = (await Promise.all(uniqueExerciseGuids.map(exerciseGuid => getExerciseByGuid(exerciseGuid)))).reduce((exercises, exercise) => {
		if (exercise) {
			exercises[exercise.guid] = exercise;
		}
		return exercises;
	}, {} as { [id: string]: Exercise });
	console.log(exerciseByGuid);
	return {
		referrer: event.url.searchParams.get('referrer'),
		exerciseByGuid,
		workoutTemplateId,
		workoutTemplate
	};
};
