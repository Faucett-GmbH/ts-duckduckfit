import type { Exercise } from "$lib/state/exerciseTypes";
import type { SetType } from "$lib/state/workoutTemplates.svelte";

export function getRealSetPosition<S extends { setType: SetType }>(
	sets: S[],
	set: S,
	index: number = sets.length
) {
	if (set.setType !== "working") {
		return -1;
	}
	let realIndex = 0;
	for (let i = 0; i < index; i++) {
		const set = sets[i];
		if (set.setType === "working") {
			realIndex += 1;
		}
	}
	return realIndex;
}

export function createExercisesByGuid(exercises: Exercise[]) {
	return Object.values(exercises).reduce(
		(exercisesById, exercise) => {
			exercisesById[exercise.guid] = exercise;
			return exercisesById;
		},
		{} as { [guid: string]: Exercise }
	);
}

export function getUniqueExercises<T extends { exerciseGuid: string }>(values: T[], exerciseByGuid: { [guid: string]: Exercise }) {
	const exercises: { [guid: string]: Exercise } = {};
	for (const value of values) {
		const exerciseGuid = value.exerciseGuid;
		const exercise = exerciseByGuid[exerciseGuid];
		if (exercise) {
			exercises[exerciseGuid] = exercise;
		}
	}
	return Object.values(exercises);
}