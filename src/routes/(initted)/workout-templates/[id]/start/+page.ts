import { getWorkoutTemplateById, type WorkoutTemplate } from '$lib/state/workoutTemplates.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { AutomergeDocumentId } from '$lib/repo';
import type { Exercise } from '$lib/state/exerciseTypes';
import { getExerciseByGuid } from '$lib/state/exercises.svelte';
import { getActiveWorkoutByWorkoutTemplateId, type Workout } from '$lib/state/workouts.svelte';

export const prerender = false;

export const load: PageLoad = async (event) => {
	await event.parent();
	const workoutTemplateId = event.params.id as unknown as AutomergeDocumentId<WorkoutTemplate>;
	const [workoutAndId, workoutTemplate] = await Promise.all([getActiveWorkoutByWorkoutTemplateId(workoutTemplateId), getWorkoutTemplateById(workoutTemplateId)]);
	if (!workoutTemplate) {
		error(404);
	}
	const exerciseGuids = new Set<AutomergeDocumentId<Exercise>>();
	let workout: Workout | null = null;
	let workoutId: AutomergeDocumentId<Workout> | null = null;
	if (workoutAndId) {
		[workoutId, workout] = workoutAndId;
		workout.setGroups.forEach(sg => {
			sg.sets.forEach(s => {
				exerciseGuids.add(s.exerciseGuid);
			})
		});
	}
	workoutTemplate.setGroupTemplates.forEach(sgt => {
		sgt.setTemplates.forEach(st => {
			exerciseGuids.add(st.exerciseGuid);
		})
	});
	const exerciseByGuid = (await Promise.all([...exerciseGuids].map(getExerciseByGuid))).reduce((exercises, exercise) => {
		if (exercise) {
			exercises[exercise.guid] = exercise;
		}
		return exercises;
	}, {} as { [id: string]: Exercise });
	return {
		referrer: event.url.searchParams.get('referrer'),
		exerciseByGuid,
		workoutTemplateId,
		workoutTemplate,
		workoutId,
		workout
	};
};
