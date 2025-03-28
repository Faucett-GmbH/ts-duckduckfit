import type { Locale } from "$lib/paraglide/runtime";
import { findDocument, getRepo, type AutomergeDocumentId } from "$lib/repo";
import { userDocument } from "./userDocument.svelte";

export type SetGroupType = "straight" | "superset" | "circuit";
export type SetType = "warmup" | "working" | "backoff";

export interface SetTemplate {
  id: string;
  exerciseId: number;
  setType: SetType;
  asManyRoundsAsPossible?: boolean;
  distanceInMeters?: number;
  percentOfOneRepMax?: number;
  rateOfPerceivedExertion?: number;
  repRangeLow?: number;
  repRangeHigh?: number;
  repsForTimeInSeconds?: number;
  repsInReserve?: number;
  restAfterInSeconds?: number;
  reps?: number;
  timeInSeconds?: number;
  weightInKilograms?: number;
}

export interface SetGroupTemplate {
  id: string;
  setGroupType: SetGroupType;
  setTemplates: SetTemplate[];
}

export interface WorkoutTemplateTranslation {
  name: string;
  description: string | null;
}


export interface WorkoutTemplate {
  id: AutomergeDocumentId<WorkoutTemplate>;
  translations: Record<Locale, WorkoutTemplateTranslation>;
  setGroupTemplates: SetGroupTemplate[];
  updatedAt: Date;
  createdAt: Date;
}

export interface WorkoutTemplates {
  version: number;
  workoutTemplatesById: { [id: string]: AutomergeDocumentId<WorkoutTemplate> };
}

export const workoutTemplatesMigrations = {
  1: (workoutTemplates: WorkoutTemplates) => {
    workoutTemplates.version = 1;
    workoutTemplates.workoutTemplatesById = {};
  }
};

export async function getWorkoutTemplates(offset: number, limit: number): Promise<WorkoutTemplate[]> {
  const workoutTemplates = (await userDocument.current!.workoutTemplates()).docSync()!;
  const startOffset = offset * limit;
  const endOffset = startOffset + limit - 1;
  const workoutTemplatesById = Object.values(workoutTemplates.workoutTemplatesById).slice(startOffset, endOffset);
  const repo = getRepo();
  return await Promise.all(workoutTemplatesById.map(async id => (await findDocument(id, repo).doc())!));
}

export async function getWorkoutTemplateById(workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>): Promise<WorkoutTemplate | null> {
  const workoutTemplateDocHandle = findDocument(workoutTemplateId);
  if (!workoutTemplateDocHandle) {
    return null;
  }
  return await workoutTemplateDocHandle.doc() || null;
}

export async function deleteWorkoutTemplate(workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>) {
  const workoutTemplates = await userDocument.current!.workoutTemplates();
  workoutTemplates.change((wt) => {
    delete wt.workoutTemplatesById[workoutTemplateId];
  });
}