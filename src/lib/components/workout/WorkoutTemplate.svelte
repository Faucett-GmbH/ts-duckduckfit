<script lang="ts" module>
	export interface WorkoutTemplateProps {
		workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>;
		workoutTemplate: WorkoutTemplate;
		editReferrer?: string;
		onDelete?(): Promise<void>;
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { language } from '$lib/state/language.svelte';
	import Trash from 'lucide-svelte/icons/trash';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Modal from '../Modal.svelte';
	import { handleError } from '$lib/error';
	import SetAmounts from './SetAmounts.svelte';
	import SetTypeComponent from './SetType.svelte';
	import { getRealSetPosition } from './util';
	import { deleteWorkoutTemplate, type WorkoutTemplate } from '$lib/state/workoutTemplates.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { AutomergeDocumentId } from '$lib/repo';
	import { ExerciseExecutionEnum } from '$lib/state/exerciseTypes';

	let { workoutTemplateId, workoutTemplate, editReferrer, onDelete }: WorkoutTemplateProps =
		$props();

	async function onDeleteInternal() {
		try {
			await deleteWorkoutTemplate(workoutTemplateId);
			deleteOpen = false;
			if (onDelete) {
				await onDelete();
			}
		} catch (error) {
			await handleError(error);
		}
	}
	let deleteOpen = $state(false);
	function onOpenDelete() {
		deleteOpen = true;
	}
</script>

<div class="flex flex-row flex-wrap items-center justify-between">
	<h3 class="m-0">{workoutTemplate.translations[language.locale].name}</h3>
	<div class="flex flex-row">
		<button class="btn danger icon me-2" onclick={onOpenDelete}><Trash /></button>
		<a
			class="btn primary icon"
			href={`${base}/workout-templates/${workoutTemplateId}/edit${editReferrer ? `?referrer=${encodeURIComponent(editReferrer)}` : ''}`}
			><Pencil /></a
		>
	</div>
</div>
<div class="flex flex-col">
	{#each workoutTemplate.setGroupTemplates as setGroupTemplate}
		<div class="mb-4 flex flex-col">
			<div class="mb-2 flex flex-row">
				<div
					class="badge"
					class:primary={setGroupTemplate.setGroupType === 'straight'}
					class:swamp-green={setGroupTemplate.setGroupType === 'circuit'}
					class:winter-hazel={setGroupTemplate.setGroupType === 'superset'}
				>
					{setGroupTemplate.setGroupType}
				</div>
			</div>
			<div class="flex flex-row">
				<div
					class="me-2 flex w-2 flex-shrink flex-col rounded-lg border"
					class:bg-pear-300={setGroupTemplate.setGroupType === 'straight'}
					class:bg-swamp-green-300={setGroupTemplate.setGroupType === 'circuit'}
					class:bg-winter-hazel-300={setGroupTemplate.setGroupType === 'superset'}
					class:border-pear-500={setGroupTemplate.setGroupType === 'straight'}
					class:border-swamp-green-500={setGroupTemplate.setGroupType === 'circuit'}
					class:border-winter-hazel-500={setGroupTemplate.setGroupType === 'superset'}
				></div>
				<div class="flex flex-grow flex-col rounded-lg">
					{#each setGroupTemplate.setTemplates as setTemplate, index}
						{@const position = getRealSetPosition(
							setGroupTemplate.setTemplates,
							setTemplate,
							index
						)}
						<div
							class={{
								'flex flex-row justify-between bg-black p-1': true,
								'bg-black/0': index % 2 === 0,
								'bg-black/5': index % 2 === 1
							}}
						>
							<div class="me-2 flex flex-shrink flex-row">
								<div class="me-2 flex flex-col justify-center">
									<SetTypeComponent setType={setTemplate.setType} {position} />
								</div>
								<div class="h-8 min-h-8 w-8 min-w-8 rounded-full bg-gray-600 max-sm:hidden"></div>
								<p class="mb-0 ms-2">{setTemplate.exerciseGuid}</p>
							</div>
							<div class="flex flex-shrink flex-col justify-center">
								<SetAmounts execution={ExerciseExecutionEnum.RepsOnly} set={setTemplate} />
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<Modal bind:open={deleteOpen}>
	{#snippet title()}
		<h5>
			{m.workouts_template_delete_title({
				name: workoutTemplate.translations[language.locale].name
			})}
		</h5>
	{/snippet}
	<p>{m.workouts_template_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.workouts_template_delete_submit()}
		</button>
	</div>
</Modal>
