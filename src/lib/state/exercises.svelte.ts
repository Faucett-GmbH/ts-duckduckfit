import { browser } from "$app/environment";
import { localStorageState } from "$lib/localStorageState.svelte";
import { m } from "$lib/paraglide/messages";
import { createNotification } from "./notifications.svelte";
import { ZipReader, BlobReader, TextWriter } from "@zip.js/zip.js";
import { getUserDocument, userDocument } from "./userDocument.svelte";
import { createDocument, deleteDocument, findDocument, getRepo, type AutomergeDocHandle, type AutomergeDocumentId } from "$lib/repo";
import type { Exercise } from "./exerciseTypes";
import { applyChanges, type GetKeyFn } from "$lib/diff";
import { getLocalId } from "$lib/util";

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

export async function getExercises(offset: number, limit: number): Promise<[key: AutomergeDocumentId<Exercise>, value: Exercise][]> {
  const exercises = (await userDocument.current!.exercises()).doc()!;
  const startOffset = offset * limit;
  const endOffset = startOffset + limit - 1;
  const exerciseIds = Object.values(exercises.exercisesByGuid).slice(startOffset, endOffset) as AutomergeDocumentId<Exercise>[];
  const repo = getRepo();
  return await Promise.all(exerciseIds.map(async id => [id, (await findDocument(id, repo)).doc()!]));
}

export async function getExerciseById(exerciseId: AutomergeDocumentId<Exercise>): Promise<Exercise | null> {
  const exerciseDocHandle = await findDocument(exerciseId);
  if (!exerciseDocHandle) {
    return null;
  }
  return exerciseDocHandle.doc() || null;
}

export async function deleteExercise(exerciseId: AutomergeDocumentId<Exercise>) {
  const exercises = await userDocument.current!.exercises();
  exercises.change((wts) => {
    delete wts.exercisesByGuid[exerciseId];
  });
  deleteDocument(exerciseId);
}

export async function upsertExercise(exercise: Exercise, exerciseId?: AutomergeDocumentId<Exercise>) {
  const exercises = await userDocument.current!.exercises();
  let exerciseDocument: AutomergeDocHandle<Exercise>;
  if (!exerciseId) {
    exerciseDocument = createDocument<Exercise>(exercise);
    exerciseId = exerciseDocument.documentId as AutomergeDocumentId<Exercise>;
    const documentId = exerciseId;
    exercises.change((wts) => {
      wts.exercisesByGuid[exercise.guid] = documentId;
    });
  } else {
    exerciseDocument = await findDocument(exerciseId);
    exerciseDocument.change(wt => {
      applyChanges(wt, exercise, getLocalId as GetKeyFn);
    });
  }
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