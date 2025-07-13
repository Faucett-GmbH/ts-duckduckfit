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
	import { getWorkouts, type Workout } from '$lib/state/workouts.svelte';
	import WorkoutComponent from '$lib/components/workout/Workout.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { getExerciseByGuid } from '$lib/state/exercises.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	let offset = $state(0);
	let limit = $state(10);
	let workouts = $state<[key: AutomergeDocumentId<Workout>, value: Workout][]>([]);
	let exerciseByGuid = $state<{ [exerciseGuid: string]: Exercise }>({});

	$effect(() => {
		getWorkouts(offset, limit).then(async (newWorkouts) => {
			workouts.push(...newWorkouts);
			const exercisGuids = newWorkouts.flatMap(([_, workout]) =>
				workout.setGroups.flatMap((setGroup) => setGroup.sets.map((set) => set.exerciseGuid))
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

	function createOnDelete(workoutId: AutomergeDocumentId<Workout>, workout: Workout) {
		return async () => {
			const index = workouts.findIndex(([id]) => id === workoutId);
			if (index !== -1) {
				workouts.splice(index, 1);
			}
		};
	}
</script>

<svelte:head>
	<title>{m.workouts_title()}</title>
</svelte:head>

<div class="flex flex-col flex-grow overflow-x-hidden overflow-y-auto">
	<div class="container mx-auto p-4">
		<div class="card flex flex-col">
			<div class="flex flex-row justify-between">
				<h3 class="m-0">{m.workouts_title()}</h3>
				<div class="flex justify-center items-center">
					<a class="btn success icon sm" href={`${base}/workouts/add`}>
						<Plus />
					</a>
				</div>
			</div>
			<hr />
			<div class="flex flex-col">
				{#each workouts as [workoutId, workout] (workoutId)}
					<div class="mb-4 flex flex-grow flex-col">
						<div class="flex flex-shrink flex-col">
							<WorkoutComponent {workoutId} {workout} bind:exerciseByGuid />
							{#if workout.completedAt === null}
								<div class="mt-2 flex flex-row justify-center">
									<a
										class="btn primary flex flex-row justify-center max-sm:w-full"
										href={`${base}/workouts/${workoutId}/workout`}
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
