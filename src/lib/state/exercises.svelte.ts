import { browser } from '$app/environment';
import { localStorageState } from '$lib/localStorageState.svelte';
import { m } from '$lib/paraglide/messages';
import { createNotification } from './notifications.svelte';
import { ZipReader, BlobReader, TextWriter } from '@zip.js/zip.js';
import { getUserDocument, userDocument } from './userDocument.svelte';
import {
	createDocument,
	deleteDocument,
	findDocument,
	getRepo,
	type AutomergeDocHandle,
	type AutomergeDocumentId
} from '$lib/repo';
import type { Exercise } from './exerciseTypes';
import { getAndApplyChanges, type GetKeyFn } from '$lib/diff';
import { getId } from '$lib/util';
import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
import { isBefore, subDays } from 'date-fns';

const RELEASES = 'https://api.github.com/repos/Faucett-GmbH/exdb_data/releases';
const CORS_URL = 'https://corsproxy.io/?url=';

interface LastExerciseRelease {
	updatedAt: Date;
	publishedAt: Date;
}

const lastExerciseRelease = localStorageState<LastExerciseRelease | null>(
	'last-exercise-release',
	null
);

export interface Exercises {
	version: number;
	exerciseByGuid: Record<string, AutomergeDocumentId<Exercise>>;
}

export const exercisesConfig = {
	migrations: {
		1: () => (exercises: Exercises) => {
			exercises.version = 1;
			exercises.exerciseByGuid = {};
		}
	}
};

export async function getExercises(
	offset: number,
	limit: number,
	search?: string
): Promise<[key: AutomergeDocumentId<Exercise>, value: Exercise][]> {
	const exercises = (await userDocument.current!.exercises()).doc();
	const startOffset = offset * limit;
	const endOffset = startOffset + limit - 1;
	const repo = getRepo();
	let exerciseGuids = Object.values(exercises.exerciseByGuid) as AutomergeDocumentId<Exercise>[];
	if (!search) {
		exerciseGuids = exerciseGuids.slice(startOffset, endOffset);
	}
	let exercisesAndIds = await Promise.all(
		exerciseGuids.map(
			async (id) =>
				[id, (await findDocument(id, repo)).doc()] as [
					id: AutomergeDocumentId<Exercise>,
					exercise: Exercise
				]
		)
	);
	if (search) {
		exercisesAndIds = exercisesAndIds
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_id, exercise]) => exercise.translations.some((t) => fuzzyEquals(search, t.name)))
			.slice(startOffset, endOffset);
	}
	return exercisesAndIds;
}

export async function getExerciseByGuid(exerciseGuid: string): Promise<Exercise | null> {
	const exercises = (await userDocument.current!.exercises()).doc();
	const exerciseId = exercises.exerciseByGuid[exerciseGuid];
	if (!exerciseId) {
		return null;
	}
	const exerciseDocHandle = await findDocument(exerciseId, getRepo());
	if (!exerciseDocHandle) {
		return null;
	}
	return exerciseDocHandle.doc() || null;
}

export async function deleteExercise(exerciseGuid: AutomergeDocumentId<Exercise>) {
	const exercises = await userDocument.current!.exercises();
	exercises.change((wts) => {
		delete wts.exerciseByGuid[exerciseGuid];
	});
	await deleteDocument(exerciseGuid, getRepo());
}

export async function upsertExercise(
	exercise: Exercise,
	exerciseDocumentId?: AutomergeDocumentId<Exercise>
) {
	const exercises = await userDocument.current!.exercises();
	let exerciseDocument: AutomergeDocHandle<Exercise>;
	if (!exerciseDocumentId) {
		exerciseDocument = createDocument<Exercise>(exercise, getRepo());
		exerciseDocumentId = exerciseDocument.documentId as AutomergeDocumentId<Exercise>;
		const documentId = exerciseDocumentId;
		exercises.change((wts) => {
			wts.exerciseByGuid[exercise.guid] = documentId;
		});
	} else {
		exerciseDocument = await findDocument(exerciseDocumentId, getRepo());
		exerciseDocument.change((e) => {
			getAndApplyChanges(e, exercise, getId as GetKeyFn);
		});
	}
	return;
}

if (browser) {
	const checkForNewRelease =
		lastExerciseRelease.value === null ||
		isBefore(new Date(lastExerciseRelease.value.updatedAt), subDays(new Date(), 1));

	if (checkForNewRelease) {
		fetch(`${CORS_URL}${encodeURIComponent(`${RELEASES}?_=${Date.now}`)}`)
			.then(async (releaseResponse) => {
				if (!releaseResponse.ok) {
					throw releaseResponse;
				}
				const releases = await releaseResponse.json();
				let latestPublishedAt = lastExerciseRelease.value?.publishedAt ?? new Date(0);
				let latestRelease;
				for (const release of releases) {
					if (release.draft || !release.published_at) {
						continue;
					}
					const publishedAt = new Date(release.published_at);
					if (publishedAt < latestPublishedAt) {
						continue;
					}
					latestPublishedAt = publishedAt;
					latestRelease = release;
				}
				if (!latestRelease) {
					return;
				}
				const zipAsset = latestRelease.assets.find(
					(asset: { name: string }) => asset.name === 'exported-files.zip'
				);
				if (!zipAsset) {
					return;
				}
				const downloadResponse = await fetch(
					CORS_URL + encodeURIComponent(zipAsset.browser_download_url),
					{
						headers: {
							Accept: 'application/octet-stream'
						}
					}
				);
				if (!downloadResponse.ok) {
					throw downloadResponse;
				}
				const reader = new ZipReader(new BlobReader(await downloadResponse.blob()));
				const entries = await reader.getEntries();
				const exercisesJsonEntry = entries.find((entry) => entry.filename === 'exercises.json');
				if (!exercisesJsonEntry?.getData) {
					throw new Error(`Failed to update exercises`);
				}
				const exercisesJSON = JSON.parse(await exercisesJsonEntry.getData(new TextWriter('utf-8')));
				const exercises = await (await (await getUserDocument()).exercises()).doc();
				await Promise.all(
					exercisesJSON.map((exerciseJSON: Exercise) =>
						upsertExercise(exerciseJSON, exercises.exerciseByGuid[exerciseJSON.guid])
					)
				);
				lastExerciseRelease.value = {
					updatedAt: new Date(),
					publishedAt: latestPublishedAt
				};
			})
			.catch((error) => {
				console.error(error);
				createNotification(m.errors_message_failed_to_update_exercises());
			});
	}
}
