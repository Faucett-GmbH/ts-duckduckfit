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
	import {
		getTrainingSessionTemplates,
		type TrainingSessionTemplate
	} from '$lib/state/trainingSessionTemplates.svelte';
	import TrainingSessionTemplateComponent from '$lib/components/training_session/TrainingSessionTemplate.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { getExerciseByGuid } from '$lib/state/exercises.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	let offset = $state(0);
	let limit = $state(10);
	let trainingSessionTemplates = $state<
		[key: AutomergeDocumentId<TrainingSessionTemplate>, value: TrainingSessionTemplate][]
	>([]);
	let exerciseByGuid = $state<{ [exerciseGuid: string]: Exercise }>({});

	$effect(() => {
		getTrainingSessionTemplates(offset, limit).then(async (newTrainingSessionTemplates) => {
			trainingSessionTemplates.push(...newTrainingSessionTemplates);
			const exercisGuids = newTrainingSessionTemplates.flatMap(([_, trainingSessionTemplate]) =>
				trainingSessionTemplate.setSeriesTemplates.flatMap((setSeriesTemplate) =>
					setSeriesTemplate.setTemplates.map((setTemplate) => setTemplate.exerciseGuid)
				)
			);
			const uniqueExercisGuids = [...new Set(exercisGuids)];
			for (const exercise of await Promise.all(uniqueExercisGuids.map(getExerciseByGuid))) {
				if (exercise) {
					exerciseByGuid[exercise.guid] = exercise;
				}
			}
		});
	});

	function createOnDelete(
		workoutTemplateId: AutomergeDocumentId<TrainingSessionTemplate>,
		workoutTemplate: TrainingSessionTemplate
	) {
		return async () => {
			const index = trainingSessionTemplates.findIndex(([id]) => id === workoutTemplateId);
			if (index !== -1) {
				trainingSessionTemplates.splice(index, 1);
			}
		};
	}
</script>

<svelte:head>
	<title>{m.training_session_templates_title()}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-x-hidden overflow-y-auto">
	<div class="container mx-auto p-4">
		<div class="card flex flex-col">
			<div class="flex flex-row justify-between">
				<h3 class="m-0">{m.training_session_templates_title()}</h3>
				<div class="flex items-center justify-center">
					<a class="btn success icon sm" href={`${base}/training-session-templates/add`}>
						<Plus />
					</a>
				</div>
			</div>
			<hr />
			<div class="flex flex-col">
				{#each trainingSessionTemplates as [trainingSessionTemplateId, trainingSessionTemplate] (trainingSessionTemplateId)}
					<div class="mb-4 flex flex-grow flex-col">
						<div class="flex flex-shrink flex-col">
							<TrainingSessionTemplateComponent
								{trainingSessionTemplateId}
								{trainingSessionTemplate}
								bind:exerciseByGuid
								onDelete={createOnDelete(trainingSessionTemplateId, trainingSessionTemplate)}
							/>
							<div class="mt-2 flex flex-row justify-center">
								<a
									class="btn primary flex flex-row justify-center max-sm:w-full"
									href={`${base}/training-session-templates/${trainingSessionTemplateId}/start`}
								>
									{m.training_sessions_start_title()}
									<ChevronRight />
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
