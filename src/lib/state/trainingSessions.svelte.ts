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

export async function getWorkoutById(
	trainingSessionId: AutomergeDocumentId<TrainingSession>
): Promise<TrainingSession | null> {
	const trainingSessionDocHandle = await findDocument(trainingSessionId);
	if (!trainingSessionDocHandle) {
		return null;
	}
	return trainingSessionDocHandle.doc() || null;
}

export async function getActiveWorkoutByWorkoutTemplateId(
	workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>
): Promise<[key: AutomergeDocumentId<Workout>, value: Workout] | null> {
	const workouts = (await userDocument.current!.workouts()).doc();
	const workoutId = workouts.workoutsByWorkoutTemplateId[workoutTemplateId];
	if (workoutId) {
		const workout = await getWorkoutById(workoutId);
		if (workout && workout.completedAt == null) {
			return [workoutId, workout];
		}
	}
	return null;
}

export async function deleteWorkout(workoutId: AutomergeDocumentId<Workout>) {
	const workouts = await userDocument.current!.workouts();
	workouts.change((wts) => {
		delete wts.workoutsById[workoutId];
	});
	deleteDocument(workoutId);
}

export async function upsertWorkout(
	workoutUpdates: Workout,
	workoutId?: AutomergeDocumentId<Workout>
) {
	const workouts = await userDocument.current!.workouts();
	let workoutDocument: AutomergeDocHandle<Workout>;
	if (!workoutId) {
		workoutDocument = createDocument<Workout>(workoutUpdates);
		workoutId = workoutDocument.documentId as AutomergeDocumentId<Workout>;
		const documentId = workoutId;
		workouts.change((wts) => {
			wts.workoutsById[documentId] = true;
			if (workoutUpdates.workoutTemplateId) {
				wts.workoutsByWorkoutTemplateId[workoutUpdates.workoutTemplateId] = documentId;
			}
		});
	} else {
		workoutDocument = await findDocument(workoutId);
		const previousWorkoutTemplateId = workoutDocument.doc().workoutTemplateId;
		workoutDocument.change((workout) => {
			let updated = false;
			if (getAndApplyChanges(workout, workoutUpdates, (value) => value.id ?? value.locale)) {
				updated = true;
			}
			if (updated) {
				// eslint-disable-next-line svelte/prefer-svelte-reactivity
				workout.updatedAt = new Date();
			}
		});
		if (previousWorkoutTemplateId !== workoutUpdates.workoutTemplateId) {
			const workoutTemplateId = workoutUpdates.workoutTemplateId;
			const documentId = workoutId;
			workouts.change((wts) => {
				if (workoutTemplateId) {
					wts.workoutsByWorkoutTemplateId[workoutTemplateId] = documentId;
				}
				if (previousWorkoutTemplateId) {
					delete wts.workoutsByWorkoutTemplateId[previousWorkoutTemplateId];
				}
			});
		}
	}
	return workoutId;
}
