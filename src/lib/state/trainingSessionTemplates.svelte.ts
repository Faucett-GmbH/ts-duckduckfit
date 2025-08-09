import type { Locale } from '$lib/paraglide/runtime';
import {
	createDocument,
	deleteDocument,
	findDocument,
	getRepo,
	type AutomergeDocumentId,
	type AutomergeDocHandle
} from '$lib/repo';
import { userDocument } from './userDocument.svelte';
import { getAndApplyChanges } from '$lib/diff';

export type SetSeriesType = 'standard' | 'superset' | 'circuit';
export type SetType = 'warmup' | 'working_set';
export type RPERange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface NoteTranslation {
	locale: Locale
	value: string | null
}

export interface SetTemplate {
	id: string;
	exerciseGuid: string;
	position: number
	setType: SetType;

	targetReps: number | null;
	targetWeight: number | null;
	targetRPE: RPERange | null;

	trainingNote: NoteTranslation[] | null;
}

export interface SetSeriesTemplate {
	id: string;
	setSeriesType: SetSeriesType;
	setTemplates: SetTemplate[];
}

export interface TrainingSessionTemplateTranslation {
	locale: Locale;
	title: string;
	description: string | null;
}

export interface TrainingSessionTemplate {
	id: string;
	translations: TrainingSessionTemplateTranslation[];
	setSeriesTemplates: SetSeriesTemplate[];
	updatedAt: Date;
	createdAt: Date;
}

export interface TrainingSessionTemplates {
	version: number;
	trainingSessionTemplatesById: Record<AutomergeDocumentId<TrainingSessionTemplate>, boolean>;
}

export const trainingSessionTemplatesConfig = {
	migrations: {
		1: () => (trainingTemplates: TrainingSessionTemplates) => {
			trainingTemplates.trainingSessionTemplatesById = {};
		}
	}
};

export async function getTrainingSessionTemplates(
	offset: number,
	limit: number
): Promise<[key: AutomergeDocumentId<TrainingSessionTemplate>, value: TrainingSessionTemplate][]> {
	const t = (await userDocument.current!.trainingSessionTemplates()).doc();
	const startOffset = offset * limit;
	const endOffset = startOffset + limit - 1;
	const tsTemplateIds = Object.keys(t.trainingSessionTemplatesById).slice(
		startOffset,
		endOffset
	) as AutomergeDocumentId<TrainingSessionTemplate>[];
	const repo = getRepo();
	return await Promise.all(
		tsTemplateIds.map(async (id) => [id, (await findDocument(id, repo)).doc()])
	);
}

export async function getTrainingSessionTemplateById(
	templateId: AutomergeDocumentId<TrainingSessionTemplate>
): Promise<TrainingSessionTemplate | null> {
	const trainingSessionTemplateDocHandle = await findDocument(templateId);
	if (!trainingSessionTemplateDocHandle) {
		return null;
	}
	return trainingSessionTemplateDocHandle.doc() || null;
}

export async function deleteTrainingSessionTemplate(
	templateId: AutomergeDocumentId<TrainingSessionTemplate>
) {
	const trainingSessionTemplates = await userDocument.current!.trainingSessionTemplates();
	trainingSessionTemplates.change((tst) => {
		delete tst.trainingSessionTemplatesById[templateId];
	});
	deleteDocument(templateId);
}

export async function upsertTrainingSessionTemplate(
	trainingSessionTemplateUpdates: TrainingSessionTemplate,
	trainingSessionTemplateId?: AutomergeDocumentId<TrainingSessionTemplate>
) {
	const trainingSessionTemplates = await userDocument.current!.trainingSessionTemplates();
	let trainingSessionTemplateDocument: AutomergeDocHandle<TrainingSessionTemplate>;
	if (!trainingSessionTemplateId) {
		trainingSessionTemplateDocument = createDocument<TrainingSessionTemplate>(trainingSessionTemplateUpdates);
		trainingSessionTemplateId = trainingSessionTemplateDocument.documentId as AutomergeDocumentId<TrainingSessionTemplate>;
		const documentId = trainingSessionTemplateId;
		trainingSessionTemplates.change((tst) => {
			tst.trainingSessionTemplatesById[documentId] = true;
		});
	} else {
		trainingSessionTemplateDocument = await findDocument(trainingSessionTemplateId);
		trainingSessionTemplateDocument.change((trainingSessionTemplate) => {
			let updated = false;
			if (
				getAndApplyChanges(
					trainingSessionTemplate,
					trainingSessionTemplateUpdates,
					(value) => value.id ?? value.locale
				)
			) {
				updated = true;
			}
			if (updated) {
				// eslint-disable-next-line svelte/prefer-svelte-reactivity
				trainingSessionTemplate.updatedAt = new Date();
			}
		});
	}
	return trainingSessionTemplateId;
}
