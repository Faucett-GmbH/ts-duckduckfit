import type { WorkoutTemplateParams } from "$lib/components/workout/edit/EditWorkoutTemplate.svelte";
import type { Locale } from "$lib/paraglide/runtime";
import { createDocument, deleteDocument, findDocument, getRepo, type AutomergeDocumentId } from "$lib/repo";
import type { DocHandle } from "@automerge/automerge-repo";
import { userDocument } from "./userDocument.svelte";
import { applyChanges, type GetKeyFn } from "$lib/diff";
import { getId } from "$lib/util";
import { language } from "./language.svelte";
import type { Exercise } from "./exerciseTypes";

export type SetGroupType = "straight" | "superset" | "circuit";
export type SetType = "warmup" | "working" | "backoff";

export interface SetTemplate {
  exerciseGuid: AutomergeDocumentId<Exercise>;
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
  setGroupType: SetGroupType;
  setTemplates: SetTemplate[];
}

export interface WorkoutTemplateTranslation {
  name: string;
  locale: Locale;
  description: string | null;
}


export interface WorkoutTemplate {
  translations: WorkoutTemplateTranslation[];
  setGroupTemplates: SetGroupTemplate[];
  updatedAt: Date;
  createdAt: Date;
}

export interface WorkoutTemplates {
  version: number;
  workoutTemplatesById: Record<AutomergeDocumentId<WorkoutTemplate>, boolean>;
}

export const workoutTemplatesMigrations = {
  1: () => (workoutTemplates: WorkoutTemplates) => {
    workoutTemplates.version = 1;
    workoutTemplates.workoutTemplatesById = {};
  }
};

export async function getWorkoutTemplates(offset: number, limit: number): Promise<[key: AutomergeDocumentId<WorkoutTemplate>, value: WorkoutTemplate][]> {
  const workoutTemplates = (await userDocument.current!.workoutTemplates()).doc()!;
  const startOffset = offset * limit;
  const endOffset = startOffset + limit - 1;
  const workoutTemplateIds = Object.keys(workoutTemplates.workoutTemplatesById).slice(startOffset, endOffset) as AutomergeDocumentId<WorkoutTemplate>[];
  const repo = getRepo();
  return await Promise.all(workoutTemplateIds.map(async id => [id, (await findDocument(id, repo)).doc()!]));
}

export async function getWorkoutTemplateById(workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>): Promise<WorkoutTemplate | null> {
  const workoutTemplateDocHandle = await findDocument(workoutTemplateId);
  if (!workoutTemplateDocHandle) {
    return null;
  }
  return workoutTemplateDocHandle.doc() || null;
}

export async function deleteWorkoutTemplate(workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>) {
  const workoutTemplates = await userDocument.current!.workoutTemplates();
  workoutTemplates.change((wts) => {
    delete wts.workoutTemplatesById[workoutTemplateId];
  });
  deleteDocument(workoutTemplateId);
}

export async function upsertWorkoutTemplate(workoutTemplateParams: WorkoutTemplateParams, workoutTemplateId?: AutomergeDocumentId<WorkoutTemplate>) {
  const workoutTemplates = await userDocument.current!.workoutTemplates();
  let workoutTemplateDocument: DocHandle<WorkoutTemplate>;
  if (!workoutTemplateId) {
    workoutTemplateDocument = createDocument<WorkoutTemplate>({
      ...workoutTemplateParams,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    workoutTemplateId = workoutTemplateDocument.documentId as AutomergeDocumentId<WorkoutTemplate>;
    const documentId = workoutTemplateId;
    workoutTemplates.change((wts) => {
      wts.workoutTemplatesById[documentId] = true;
    });
  } else {
    workoutTemplateDocument = await findDocument(workoutTemplateId);
    workoutTemplateDocument.change(wt => {
      if (applyChanges(wt, workoutTemplateParams, getId as GetKeyFn)) {
        wt.updatedAt = new Date();
      }
    });
  }
}

export function findTranslation(workoutTemplate: WorkoutTemplate) {
  const locale = language.locale;
  let translation: WorkoutTemplateTranslation | undefined;
  for (const t of workoutTemplate.translations) {
    if (t.locale === locale) {
      translation = t;
      break;
    }
    if (t.locale === 'en' && !translation) {
      translation = t;
    }
  }
  return translation!;
}