<script lang="ts">
	import { base } from '$app/paths';
	import { findTranslation, unsafeId } from '$lib/util';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import type { PageProps } from './$types';
	import { m } from '$lib/paraglide/messages';
	import EditTrainingSessionComponent from '$lib/components/training_session/edit/EditTrainingSession.svelte';

	let { data }: PageProps = $props();

	let workoutTranslation = $derived(findTranslation(data.workout.translations));
	let backUrl = $derived(data.referrer || `${base}/workouts`);
</script>

<svelte:head>
	<title>{m.training_sessions_training_session_edit_title()}: {workoutTranslation.name}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-x-hidden overflow-y-auto">
	<div class="flex w-full flex-grow flex-col sm:container sm:mx-auto">
		<div class="mt-4 mb-16">
			<div class="flex flex-shrink flex-row">
				<a class="flex flex-shrink flex-row" href={backUrl}>
					<ChevronLeft />
					{m.workouts_back()}
				</a>
			</div>
			<div class="flex flex-grow flex-col">
				<div class="card flex flex-shrink flex-col">
					<EditTrainingSessionComponent
						trainingSessionId={data.workoutId}
						trainingSession={data.workout}
						bind:exerciseByGuid={data.exerciseByGuid}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
