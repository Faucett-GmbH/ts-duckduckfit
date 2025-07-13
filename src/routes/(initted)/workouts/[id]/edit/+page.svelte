<script lang="ts">
	import { base } from '$app/paths';
	import { findTranslation, unsafeId } from '$lib/util';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import type { PageProps } from './$types';
	import { m } from '$lib/paraglide/messages';
	import EditWorkout from '$lib/components/workout/edit/EditWorkout.svelte';

	let { data }: PageProps = $props();

	let workoutTranslation = $derived(findTranslation(data.workout.translations));
	let backUrl = $derived(data.referrer || `${base}/workouts`);
</script>

<svelte:head>
	<title>{m.workouts_workout_edit_title()}: {workoutTranslation.name}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
	<div class="flex w-full flex-grow flex-col sm:container sm:mx-auto">
		<div class="mb-16 mt-4">
			<div class="flex flex-shrink flex-row">
				<a class="flex flex-shrink flex-row" href={backUrl}>
					<ChevronLeft />
					{m.workouts_back()}
				</a>
			</div>
			<div class="flex flex-grow flex-col">
				<div class="card flex flex-shrink flex-col">
					<EditWorkout
						workoutId={data.workoutId}
						workout={data.workout}
						bind:exerciseByGuid={data.exerciseByGuid}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
