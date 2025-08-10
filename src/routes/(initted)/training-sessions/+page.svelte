<script lang="ts" module>
	export interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Plus from 'lucide-svelte/icons/plus';
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import { getTrainingSessions, type TrainingSession } from '$lib/state/trainingSessions.svelte';
	import TrainingSessionComponent from '$lib/components/training_session/TrainingSession.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { getExerciseByGuid } from '$lib/state/exercises.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	let offset = $state(0);
	let limit = $state(10);
	let trainingSessions = $state<
		[key: AutomergeDocumentId<TrainingSession>, value: TrainingSession][]
	>([]);
	let exerciseByGuid = $state<{ [exerciseGuid: string]: Exercise }>({});

	$effect(() => {
		getTrainingSessions(offset, limit).then(async (newTrainingSessions) => {
			trainingSessions.push(...newTrainingSessions);
			const exercisGuids = trainingSessions.flatMap(([_, trainingSession]) =>
				trainingSession.setSeries.flatMap((setSeries) =>
					setSeries.sets.map((set) => set.exerciseGuid)
				)
			);
			const uniqueExercisGuids = [...new Set(exercisGuids)];
			for (const exercise of await Promise.all(
				uniqueExercisGuids.map((exercisGuid) => getExerciseByGuid(exercisGuid))
			)) {
				if (exercise) {
					exerciseByGuid[exercise.guid] = exercise;
				}
			}
		});
	});

	function createOnDelete(
		trainingSessionId: AutomergeDocumentId<TrainingSession>,
		trainingSession: TrainingSession
	) {
		return async () => {
			const index = trainingSessions.findIndex(([id]) => id === trainingSessionId);
			if (index !== -1) {
				trainingSessions.splice(index, 1);
			}
		};
	}
</script>

<svelte:head>
	<title>{m.workouts_title()}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-x-hidden overflow-y-auto">
	<div class="container mx-auto p-4">
		<div class="card flex flex-col">
			<div class="flex flex-row justify-between">
				<h3 class="m-0">{m.workouts_title()}</h3>
				<div class="flex items-center justify-center">
					<a class="btn success icon sm" href={`${base}/workouts/add`}>
						<Plus />
					</a>
				</div>
			</div>
			<hr />
			<div class="flex flex-col">
				{#each trainingSessions as [trainingSessionId, trainingSession] (trainingSessionId)}
					<div class="mb-4 flex flex-grow flex-col">
						<div class="flex flex-shrink flex-col">
							<TrainingSessionComponent {trainingSessionId} {trainingSession} bind:exerciseByGuid />
							{#if trainingSession.finishedAt === null}
								<div class="mt-2 flex flex-row justify-center">
									<a
										class="btn primary flex flex-row justify-center max-sm:w-full"
										href={`${base}/training-sessions/${trainingSessionId}/training-session`}
									>
										{m.workouts_workout_continue()}
										<ChevronRight />
									</a>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
