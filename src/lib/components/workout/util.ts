import type { Exercise } from "$lib/state/exerciseTypes";
import type { SetType } from "$lib/state/workoutTemplates.svelte";

export function getUniqueExerciseMap<T extends { exercise: Exercise }>(items: T[]) {
	const exercises: { [id: string]: Exercise } = {};
	for (const item of items) {
		exercises[item.exercise.guid] = item.exercise;
	}
	return exercises;
}

export function getUniqueExercises<T extends { exercise: Exercise }>(items: T[]) {
	return Object.values(getUniqueExerciseMap(items));
}

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
