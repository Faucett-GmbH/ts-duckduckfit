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
import type { SetSeriesTemplate, SetTemplate, TrainingSessionTemplate, RPERange, NoteTranslation } from './trainingSessionTemplates.svelte';
import { getAndApplyChanges } from '$lib/diff';

type SetResultType = "completed" | "failed" | "skipped";

export interface LoggedSet extends SetTemplate {
	actualReps: number | null;
	actualWeight: number | null;
	actualRPE: RPERange | null;
	setResultType: SetResultType | null;
	note: string | null;
}

export interface LoggedSetSeries extends Omit<SetSeriesTemplate, 'setTemplates'> {
	setSeriesTemplateId: AutomergeDocumentId<SetSeriesTemplate> | null;
	position: number;
	sets: LoggedSet[];
}

export interface TrainingSessionTranslation {
	locale: Locale;
	name: string;
	description: string | null;
}

export interface ActiveTrainingDuration {
	from: Date;
	to: Date | null;
}

export interface TrainingSession {
	trainingSessionTemplateId: AutomergeDocumentId<TrainingSessionTemplate> | null;
	translations: TrainingSessionTranslation[];
	notes: NoteTranslation[];
	setSeries: LoggedSetSeries[];
	activeTrainingDurations: ActiveTrainingDuration[];
	durationInSeconds: number | null;
	startedAt: Date;
	finishedAt: Date | null;

	updatedAt: Date;
	createdAt: Date;
}

export interface TrainingSessions {
	version: number;
	trainingSessionsById: Record<AutomergeDocumentId<TrainingSession>, boolean>;
	trainingSessionsByTrainingSessionTemplateId: Record<
		AutomergeDocumentId<TrainingSessionTemplate>,
		AutomergeDocumentId<TrainingSession>
	>;
}

export const trainingSessionsConfig = {
	migrations: {
		1: () => (trainingSessions: TrainingSessions) => {
			trainingSessions.trainingSessionsById = {};
			trainingSessions.trainingSessionsByTrainingSessionTemplateId = {};
		}
	}
};

export async function getTrainingSessions(
	offset: number,
	limit: number
): Promise<[key: AutomergeDocumentId<TrainingSession>, value: TrainingSession][]> {
	const trainingSessions = (await userDocument.current!.trainingSessions()).doc();
	const startOffset = offset * limit;
	const endOffset = startOffset + limit - 1;
	const trainingSessionIds = Object.keys(trainingSessions.trainingSessionsById).slice(
		startOffset,
		endOffset
	) as AutomergeDocumentId<TrainingSession>[];
	const repo = getRepo();
	return await Promise.all(
		trainingSessionIds.map(async (id) => [id, (await findDocument(id, repo)).doc()])
	);
}

export async function getTrainingSessionById(
	trainingSessionId: AutomergeDocumentId<TrainingSession>
): Promise<TrainingSession | null> {
	const trainingSessionDocHandle = await findDocument(trainingSessionId);
	if (!trainingSessionDocHandle) {
		return null;
	}
	return trainingSessionDocHandle.doc() || null;
}

export async function getActiveTrainingSessionByTrainingSessionTemplateId(
	trainingSessionTemplateId: AutomergeDocumentId<TrainingSessionTemplate>
): Promise<[key: AutomergeDocumentId<TrainingSession>, value: TrainingSession] | null> {
	const trainingSessions = (await userDocument.current!.trainingSessions()).doc();
	const trainingSessionId = trainingSessions.trainingSessionsByTrainingSessionTemplateId[trainingSessionTemplateId];
	if (trainingSessionId) {
		const trainingSession = await getTrainingSessionById(trainingSessionId);
		if (trainingSession && trainingSession.finishedAt == null) {
			return [trainingSessionId, trainingSession];
		}
	}
	return null;
}

export async function deleteTrainingSession(trainingSessionId: AutomergeDocumentId<TrainingSession>) {
	const trainingSessions = await userDocument.current!.trainingSessions();
	trainingSessions.change((ts) => {
		delete ts.trainingSessionsById[trainingSessionId];
	});
	deleteDocument(trainingSessionId);
}

export async function upsertTrainingSession(
	trainingSessionUpdates: TrainingSession,
	trainingSessionId?: AutomergeDocumentId<TrainingSession>
) {
	const trainingSessions = await userDocument.current!.trainingSessions();
	let trainingSessionDocument: AutomergeDocHandle<TrainingSession>;
	if (!trainingSessionId) {
		trainingSessionDocument = createDocument<TrainingSession>(trainingSessionUpdates);
		trainingSessionId = trainingSessionDocument.documentId as AutomergeDocumentId<TrainingSession>;
		const docId = trainingSessionId;
		trainingSessions.change((ts) => {
			ts.trainingSessionsById[docId] = true;
			if (trainingSessionUpdates.trainingSessionTemplateId) {
				ts.trainingSessionsByTrainingSessionTemplateId[trainingSessionUpdates.trainingSessionTemplateId] = docId;
			}
		});
	} else {
		trainingSessionDocument = await findDocument(trainingSessionId);
		const previousTrainingSessionTemplateId = trainingSessionDocument.doc().trainingSessionTemplateId;
		trainingSessionDocument.change((trainingSession) => {
			let updated = false;
			if (getAndApplyChanges(trainingSession, trainingSessionUpdates, (value) => value.id ?? value.locale)) {
				updated = true;
			}
			if (updated) {
				// eslint-disable-next-line svelte/prefer-svelte-reactivity
				trainingSession.updatedAt = new Date();
			}
		});
		if (previousTrainingSessionTemplateId !== trainingSessionUpdates.trainingSessionTemplateId) {
			const trainingSessionTemplateId = trainingSessionUpdates.trainingSessionTemplateId;
			const documentId = trainingSessionTemplateId;
			trainingSessions.change((ts) => {
				if (trainingSessionTemplateId) {
					ts.trainingSessionsByTrainingSessionTemplateId[trainingSessionTemplateId] = documentId;
				}
				if (previousTrainingSessionTemplateId) {
					delete ts.trainingSessionsByTrainingSessionTemplateId[previousTrainingSessionTemplateId];
				}
			});
		}
	}
	return trainingSessionId;
}
