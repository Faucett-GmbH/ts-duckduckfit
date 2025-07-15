import type { Locale } from '$lib/paraglide/runtime';
import {
	createDocument,
	deleteDocument,
	findDocument,
	getRepo,
	type AutomergeDocumentId
} from '$lib/repo';
import type { DocHandle } from '@automerge/automerge-repo';
import { userDocument } from './userDocument.svelte';
import type { SetGroupTemplate, SetTemplate, WorkoutTemplate } from './workoutTemplates.svelte';
import { getAndApplyChanges } from '$lib/diff';

export type SetStatusType = 'success' | 'failed';

export interface AttemptedSet extends SetTemplate {
	attemptedDistanceInMeters: number | null;
	attemptedRateOfPerceivedExertion: number | null;
	attemptedReps: number | null;
	attemptedRepsInReserve: number | null;
	attemptedTimeInSeconds: number | null;
	attemptedWeightInKilograms: number | null;
	durationInSeconds: number | null;
	status: SetStatusType | null;
	notes: WorkoutNote[];
	startedAt: Date | null;
	completedAt: Date | null;
}

export interface AttemptedSetGroup extends Omit<SetGroupTemplate, 'setTemplates'> {
	sets: AttemptedSet[];
}

export interface WorkoutTranslation {
	name: string;
	locale: Locale;
	description: string | null;
}

export interface WorkoutNote {
	locale: Locale;
	note: string;
}

export interface Workout {
	workoutTemplateId: AutomergeDocumentId<WorkoutTemplate> | null;
	translations: WorkoutTranslation[];
	notes: WorkoutNote[];
	setGroups: AttemptedSetGroup[];
	durationInSeconds: number | null;
	startedAt: Date;
	completedAt: Date | null;
	updatedAt: Date;
	createdAt: Date;
}

export interface Workouts {
	version: number;
	workoutsById: Record<AutomergeDocumentId<Workout>, boolean>;
	workoutsByWorkoutTemplateId: Record<
		AutomergeDocumentId<WorkoutTemplate>,
		AutomergeDocumentId<Workout>
	>;
}

export const workoutsConfig = {
	migrations: {
		1: () => (workouts: Workouts) => {
			workouts.workoutsById = {};
			workouts.workoutsByWorkoutTemplateId = {};
		}
	}
};

export async function getWorkouts(
	offset: number,
	limit: number
): Promise<[key: AutomergeDocumentId<Workout>, value: Workout][]> {
	const workouts = (await userDocument.current!.workouts()).doc();
	const startOffset = offset * limit;
	const endOffset = startOffset + limit - 1;
	const workoutIds = Object.keys(workouts.workoutsById).slice(
		startOffset,
		endOffset
	) as AutomergeDocumentId<Workout>[];
	const repo = getRepo();
	return await Promise.all(
		workoutIds.map(async (id) => [id, (await findDocument(id, repo)).doc()])
	);
}

export async function getWorkoutById(
	workoutId: AutomergeDocumentId<Workout>
): Promise<Workout | null> {
	const workoutDocHandle = await findDocument(workoutId);
	if (!workoutDocHandle) {
		return null;
	}
	return workoutDocHandle.doc() || null;
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
	let workoutDocument: DocHandle<Workout>;
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
