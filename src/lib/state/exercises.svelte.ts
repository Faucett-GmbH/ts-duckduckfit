import { findDocument, getRepo, type AutomergeDocumentId } from "$lib/repo";
import { userDocument } from "./userDocument.svelte";

export interface Exercise {
  id: AutomergeDocumentId<Exercise>;
}

export interface Exercises {
  version: number;
  exercisesById: { [id: string]: AutomergeDocumentId<Exercise> };
}

export const exercisesMigrations = {
  1: (exercises: Exercises) => {
    exercises.version = 1;
    exercises.exercisesById = {};
  }
};

export async function getExercises(offset: number, limit: number): Promise<Exercise[]> {
  const exercises = (await userDocument.current!.exercises()).docSync()!;
  const startOffset = offset * limit;
  const endOffset = startOffset + limit - 1;
  const exercisesById = Object.values(exercises.exercisesById).slice(startOffset, endOffset);
  const repo = getRepo();
  return await Promise.all(exercisesById.map(async id => (await findDocument(id, repo).doc())!));
}

export async function getExerciseById(exerciseId: AutomergeDocumentId<Exercise>): Promise<Exercise | null> {
  const exerciseDocHandle = findDocument(exerciseId);
  if (!exerciseDocHandle) {
    return null;
  }
  return await exerciseDocHandle.doc() || null;
}
