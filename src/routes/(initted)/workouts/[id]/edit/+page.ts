import { getWorkoutById, type Workout } from '$lib/state/workouts.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { AutomergeDocumentId } from '$lib/repo';
import type { Exercise } from '$lib/state/exerciseTypes';
import { getExerciseByGuid } from '$lib/state/exercises.svelte';

export const prerender = false;

export const load: PageLoad = async (event) => {
	await event.parent();
	const workoutId = event.params.id as unknown as AutomergeDocumentId<Workout>;
	const workout = await getWorkoutById(workoutId);
	if (!workout) {
		error(404);
	}
	const exerciseGuids = new Set<AutomergeDocumentId<Exercise>>();
	for (const sgt of workout.setGroups) {
		for (const st of sgt.sets) {
			exerciseGuids.add(st.exerciseGuid);
		}
	}
	const exerciseByGuid = (await Promise.all([...exerciseGuids].map(getExerciseByGuid))).reduce((exercises, exercise) => {
		if (exercise) {
			exercises[exercise.guid] = exercise;
		}
		return exercises;
	}, {} as { [id: string]: Exercise });
	return {
		referrer: event.url.searchParams.get('referrer'),
		exerciseByGuid,
		workoutId,
		workout
	};
};
