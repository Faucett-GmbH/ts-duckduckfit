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
		deleteWorkoutTemplate,
		getWorkoutTemplates,
		type WorkoutTemplate
	} from '$lib/state/workoutTemplates.svelte';
	import WorkoutTemplateComponent from '$lib/components/workout/WorkoutTemplate.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';

	let offset = $state(0);
	let limit = $state(10);
	let workoutTemplates = $state<
		[key: AutomergeDocumentId<WorkoutTemplate>, value: WorkoutTemplate][]
	>([]);

	$effect(() => {
		getWorkoutTemplates(offset, limit).then((newWorkoutTemplates) => {
			workoutTemplates.push(...newWorkoutTemplates);
		});
	});

	function createOnDelete(
		workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>,
		workoutTemplate: WorkoutTemplate
	) {
		return async () => {
			const index = workoutTemplates.findIndex(([id]) => id === workoutTemplateId);
			if (index !== -1) {
				workoutTemplates.splice(index, 1);
			}
		};
	}
</script>

<svelte:head>
	<title>{m.workout_templates_title()}</title>
</svelte:head>

<div class="flex flex-col flex-grow overflow-x-hidden overflow-y-auto">
	<div class="container mx-auto p-4">
		<div class="card flex flex-col">
			<div class="flex flex-row justify-between">
				<h3 class="m-0">{m.workout_templates_title()}</h3>
				<div class="flex justify-center items-center">
					<a class="btn success icon sm" href={`${base}/workout-templates/add`}>
						<Plus />
					</a>
				</div>
			</div>
			<div class="flex flex-col">
				{#each workoutTemplates as [workoutTemplateId, workoutTemplate] (workoutTemplateId)}
					<div class="mb-4 flex flex-grow flex-col">
						<div class="card flex flex-shrink flex-col">
							<WorkoutTemplateComponent
								{workoutTemplateId}
								{workoutTemplate}
								onDelete={createOnDelete(workoutTemplateId, workoutTemplate)}
							/>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
