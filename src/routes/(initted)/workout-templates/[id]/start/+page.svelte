<svelte:options immutable />

<script lang="ts" module>
	function getFirstIncompleteSet(workout: Workout) {
		for (let setGroupIndex = 0; setGroupIndex < workout.setGroups.length; setGroupIndex++) {
			const setGroup = workout.setGroups[setGroupIndex];
			for (let setIndex = 0; setIndex < setGroup.sets.length; setIndex++) {
				const set = setGroup.sets[setIndex];
				if (!set.status) {
					return [setGroupIndex, setGroup, setIndex, set] as const;
				}
			}
		}
		let setGroup = workout.setGroups[0];
		let set = setGroup.sets[0];
		return [0, setGroup, 0, set] as const;
	}
</script>

<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';
	import { base } from '$app/paths';
	import { locale } from '$lib/stores/language';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import type { PageData } from './$types';
	import WorkoutTemplate from '$lib/components/workout/WorkoutTemplate.svelte';
	import { goto } from '$app/navigation';
	import { handleError } from '$lib/errors';
	import Spinner from '$lib/components/Spinner.svelte';
	import { workoutApi } from '$lib/openapi';
	import type { Workout } from '$lib/openapi/duckduckfit';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	async function onDelete() {
		await goto(`${base}/${$locale}/workout-templates`);
	}

	let firstSet = $derived(data.workoutTemplate.setGroupTemplates[0]?.setTemplates[0]);

	let beginning = $state(false);
	async function onBegin() {
		try {
			beginning = true;
			const workout = await workoutApi.createWorkout({
				workoutTemplateId: data.workoutTemplate.id,
				name: data.workoutTemplate.translation.name,
				setGroups: data.workoutTemplate.setGroupTemplates.map((sgt) => ({
					setGroupTemplateId: sgt.id,
					setGroupType: sgt.setGroupType,
					sets: sgt.setTemplates.map((st) => ({
						...st,
						setTemplateId: st.id,
						exerciseId: st.exerciseId,
						setType: st.setType,
						attemptedDistanceInMeters: st.distanceInMeters,
						attemptedRateOfPerceivedExertion: st.rateOfPerceivedExertion,
						attemptedReps: st.reps || st.repRangeLow || st.repRangeHigh,
						attemptedRepsInReserve: st.repsInReserve,
						attemptedTimeInSeconds: st.timeInSeconds,
						attemptedWeightInKilograms: st.weightInKilograms
					}))
				}))
			});
			await goto(`${base}/${$locale}/workouts/${workout.id}/workout`);
		} catch (error) {
			await handleError(error);
		} finally {
			beginning = false;
		}
	}
</script>

<svelte:head>
	<title>{$LL.workouts.start.title()}: {data.workoutTemplate.translation.name}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
	<div class="flex w-full flex-grow flex-col sm:container sm:mx-auto">
		<div class="mb-16 mt-4">
			<div class="flex flex-shrink flex-row">
				<a class="flex flex-shrink flex-row" href={`${base}/${$locale}/workout-templates`}>
					<ChevronLeft />
					{$LL.workouts.back()}
				</a>
			</div>
			<div class="flex flex-grow flex-col">
				<div class="card flex flex-shrink flex-col">
					<WorkoutTemplate
						workoutTemplate={data.workoutTemplate}
						editReferrer={`${base}/${$locale}/workout-templates/${data.workoutTemplate.id}/start`}
						unitSystem={data.user.unitSystem}
						{onDelete}
					/>
					<div class="mt-2 flex flex-row justify-center">
						{#if data.workout}
							{@const duration = data.workout.durationInSeconds || 0}
							{@const [setGroupIndex, setGroup, setIndex, set] = getFirstIncompleteSet(
								data.workout
							)}
							<a
								class="btn primary flex flex-row justify-center max-sm:w-full"
								href={`${base}/${$locale}/workouts/${data.workout.id}/workout?d=${duration}&sg=${setGroupIndex}&s=${setIndex}`}
							>
								{$LL.workouts.workout.continue()}
								{#if set}
									<div class="badge dark ms-2">
										{set.exercise.translation.name}
									</div>
								{/if}
								<ChevronRight />
							</a>
						{:else}
							<button
								class="btn primary flex flex-row justify-center max-sm:w-full"
								onclick={onBegin}
								disabled={beginning}
							>
								{#if beginning}<div class="mr-2 flex flex-row justify-center">
										<div class="inline-block h-6 w-6"><Spinner /></div>
									</div>{/if}
								{$LL.workouts.workout.begin()}
								{#if firstSet}
									<div class="badge dark ms-2">
										{firstSet.exercise.translation.name}
									</div>
								{/if}
								<ChevronRight />
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
