import { browser } from "$app/environment";
import { localStorageState } from "$lib/localStorageState.svelte";
import { m } from "$lib/paraglide/messages";
import { createNotification } from "./notifications.svelte";
import { ZipReader, BlobReader, TextWriter } from "@zip.js/zip.js";
import { getUserDocument, userDocument } from "./userDocument.svelte";
import { createDocument, deleteDocument, findDocument, getRepo, type AutomergeDocHandle, type AutomergeDocumentId } from "$lib/repo";
import type { Exercise, ExerciseTranslation } from "./exerciseTypes";
import { applyChanges, type GetKeyFn } from "$lib/diff";
import { getLocalId } from "$lib/util";
import { fuzzyEquals } from '@aicacia/string-fuzzy_equals'
import { language } from "./language.svelte";

const RELEASES = "https://api.github.com/repos/Faucett-GmbH/exdb_data/releases";
const CORS_URL = "https://corsproxy.io/?url=";

interface LastExerciseRelease {
  updatedAt: Date;
  publishedAt: Date;
}

const lastExerciseRelease = localStorageState<LastExerciseRelease | null>('last-exercise-release', null);

export interface Exercises {
  version: number;
  exercisesByGuid: Record<string, AutomergeDocumentId<Exercise>>;
}

export const exercisesMigrations = {
  1: () => (exercises: Exercises) => {
    exercises.version = 1;
    exercises.exercisesByGuid = {};
  }
};

export async function getExercises(offset: number, limit: number, search?: string): Promise<[key: AutomergeDocumentId<Exercise>, value: Exercise][]> {
  const exercises = (await userDocument.current!.exercises()).doc()!;
  const startOffset = offset * limit;
  const endOffset = startOffset + limit - 1;
  const repo = getRepo();
  let exerciseGuids = Object.values(exercises.exercisesByGuid) as AutomergeDocumentId<Exercise>[];
  if (!search) {
    exerciseGuids = exerciseGuids.slice(startOffset, endOffset);
  }
  let exercisesAndIds = await Promise.all(exerciseGuids.map(async id =>
    [id, (await findDocument(id, repo)).doc()!] as [id: AutomergeDocumentId<Exercise>, exercise: Exercise]
  ));
  if (search) {
    exercisesAndIds = exercisesAndIds
      .filter(([_id, exercise]) =>
        exercise.translations.some(t => fuzzyEquals(search, t.name))
      )
      .slice(startOffset, endOffset);
  }
  return exercisesAndIds;
}

export async function getExerciseById(exerciseGuid: AutomergeDocumentId<Exercise>): Promise<Exercise | null> {
  const exerciseDocHandle = await findDocument(exerciseGuid);
  if (!exerciseDocHandle) {
    return null;
  }
  return exerciseDocHandle.doc() || null;
}

export async function deleteExercise(exerciseGuid: AutomergeDocumentId<Exercise>) {
  const exercises = await userDocument.current!.exercises();
  exercises.change((wts) => {
    delete wts.exercisesByGuid[exerciseGuid];
  });
  deleteDocument(exerciseGuid);
}

export async function upsertExercise(exercise: Exercise, exerciseGuid?: AutomergeDocumentId<Exercise>) {
  const exercises = await userDocument.current!.exercises();
  let exerciseDocument: AutomergeDocHandle<Exercise>;
  if (!exerciseGuid) {
    exerciseDocument = createDocument<Exercise>(exercise);
    exerciseGuid = exerciseDocument.documentId as AutomergeDocumentId<Exercise>;
    const documentId = exerciseGuid;
    exercises.change((wts) => {
      wts.exercisesByGuid[exercise.guid] = documentId;
    });
  } else {
    exerciseDocument = await findDocument(exerciseGuid);
    exerciseDocument.change(wt => {
      applyChanges(wt, exercise, getLocalId as GetKeyFn);
    });
  }
}

export function findTranslation(exercise: Exercise) {
  const locale = language.locale;
  let translation: ExerciseTranslation | undefined;
  for (const t of exercise.translations) {
    translation = t;
    if (t.locale === locale) {
      break;
    }
  }
  return translation;
}

if (browser) {
  if (lastExerciseRelease.value === null || lastExerciseRelease.value.updatedAt.valueOf() < Date.now() - 24 * 60 * 60 * 1000) {
    fetch(CORS_URL + encodeURIComponent(RELEASES))
      .then(async res => {
        if (!res.ok) {
          throw res;
        }
        const lastUpdatedAt = lastExerciseRelease.value?.updatedAt ?? new Date(0);
        const releases = await res.json();
        let latestRelease;
        for (const release of releases) {
          if (release.draft) {
            continue;
          }
          const publishedAt = new Date(release.published_at);
          if (publishedAt < lastUpdatedAt) {
            continue;
          }
          latestRelease = release;
        }
        if (latestRelease) {
          const zipAsset = latestRelease.assets.find((asset: { name: string; }) => asset.name === "exported-files.zip");
          const res = await fetch(CORS_URL + encodeURIComponent(zipAsset.browser_download_url));
          if (!res.ok) {
            throw res;
          }
          const reader = new ZipReader(new BlobReader(await res.blob()));
          const entries = await reader.getEntries();
          const exercisesJsonEntry = entries.find(entry => entry.filename === "exercises.json");
          if (!exercisesJsonEntry?.getData) {
            throw new Error(`Failed to update exercises`);
          }
          const exercisesJSON = JSON.parse(await exercisesJsonEntry.getData(new TextWriter("utf-8")));
          const exercises = await (await (await getUserDocument()).exercises()).doc();
          await Promise.all(exercisesJSON.map((exerciseJSON: Exercise) => upsertExercise(exerciseJSON, exercises.exercisesByGuid[exerciseJSON.guid])));
          lastExerciseRelease.value = {
            updatedAt: new Date(),
            publishedAt: new Date(latestRelease.published_at),
          };
        }
      })
      .catch(error => {
        console.error(error);
        createNotification(m.errors_message_failed_to_update_exercises());
      });
  }
}