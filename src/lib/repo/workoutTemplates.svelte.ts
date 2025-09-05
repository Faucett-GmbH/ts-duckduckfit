import type { Locale } from '$lib/paraglide/runtime';
import {
	createDocument,
	deleteDocument,
	findDocument,
	getRepo,
	type AutomergeDocumentId,
	type AutomergeDocHandle
} from '$lib/repo';
import { updateDifferences } from '$lib/shared/util/diff';
import { userDocument } from './userDocument.svelte';

export type SetGroupType = 'straight' | 'superset' | 'circuit';
export type SetType = 'warmup' | 'working_set';

export interface SetTemplate {
	id: string;
	exerciseGuid: string;
	setType: SetType;
	asManyRoundsAsPossible: boolean | null;
	distanceInMeters: number | null;
	percentOfOneRepMax: number | null;
	rateOfPerceivedExertion: number | null;
	repRangeLow: number | null;
	repRangeHigh: number | null;
	repsForTimeInSeconds: number | null;
	repsInReserve: number | null;
	restAfterInSeconds: number | null;
	reps: number | null;
	timeInSeconds: number | null;
	weightInKilograms: number | null;
}

export interface SetGroupTemplate {
	id: string;
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

export const workoutTemplatesConfig = {
	migrations: {
		1: () => (workoutTemplates: WorkoutTemplates) => {
			workoutTemplates.workoutTemplatesById = {};
		}
	}
};

export async function getWorkoutTemplates(
	offset: number,
	limit: number
): Promise<[key: AutomergeDocumentId<WorkoutTemplate>, value: WorkoutTemplate][]> {
	const workoutTemplates = (await userDocument.workoutTemplates()).doc();
	const startOffset = offset * limit;
	const endOffset = startOffset + limit - 1;
	const workoutTemplateIds = Object.keys(workoutTemplates.workoutTemplatesById).slice(
		startOffset,
		endOffset
	) as AutomergeDocumentId<WorkoutTemplate>[];
	const repo = getRepo();
	return await Promise.all(
		workoutTemplateIds.map(async (id) => [id, (await findDocument(id, repo)).doc()])
	);
}

export async function getWorkoutTemplateById(
	workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>
): Promise<WorkoutTemplate | null> {
	const repo = getRepo();
	const workoutTemplateDocHandle = await findDocument(workoutTemplateId, repo);
	if (!workoutTemplateDocHandle) {
		return null;
	}
	return workoutTemplateDocHandle.doc();
}

export async function deleteWorkoutTemplate(
	workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>
) {
	const repo = getRepo();
	const workoutTemplates = await userDocument.workoutTemplates();
	workoutTemplates.change((wts) => {
		delete wts.workoutTemplatesById[workoutTemplateId];
	});
	deleteDocument(workoutTemplateId, repo);
}

export async function upsertWorkoutTemplate(
	workoutTemplateUpdates: WorkoutTemplate,
	workoutTemplateId?: AutomergeDocumentId<WorkoutTemplate>
) {
	const repo = getRepo();
	const workoutTemplates = await userDocument.workoutTemplates();
	let workoutTemplateDocument: AutomergeDocHandle<WorkoutTemplate>;
	if (!workoutTemplateId) {
		workoutTemplateDocument = createDocument<WorkoutTemplate>(workoutTemplateUpdates, repo);
		workoutTemplateId = workoutTemplateDocument.documentId as AutomergeDocumentId<WorkoutTemplate>;
		const documentId = workoutTemplateId;
		workoutTemplates.change((wts) => {
			wts.workoutTemplatesById[documentId] = true;
		});
	} else {
		workoutTemplateDocument = await findDocument(workoutTemplateId, repo);
		workoutTemplateDocument.change((workoutTemplate) => {
			let updated = false;
			if (
				updateDifferences(
					workoutTemplate,
					workoutTemplateUpdates,
					(value) => value.id ?? value.locale
				)
			) {
				updated = true;
			}
			if (updated) {
				// eslint-disable-next-line svelte/prefer-svelte-reactivity
				workoutTemplate.updatedAt = new Date();
			}
		});
	}
	return workoutTemplateId;
}
