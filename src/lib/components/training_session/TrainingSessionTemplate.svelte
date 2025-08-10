<script lang="ts" module>
	export interface TrainingSessionTemplateProps {
		trainingSessionTemplateId: AutomergeDocumentId<TrainingSessionTemplate>;
		trainingSessionTemplate: TrainingSessionTemplate;
		exerciseByGuid: { [exerciseGuid: string]: Exercise };
		editReferrer?: string;
		onDelete?(): Promise<void>;
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import Trash from 'lucide-svelte/icons/trash';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Modal from '../Modal.svelte';
	import { handleError } from '$lib/error';
	import SetAmounts from './SetAmounts.svelte';
	import SetTypeComponent from './SetType.svelte';
	import { getRealSetPosition } from './util';
	import {
		deleteTrainingSessionTemplate,
		type TrainingSessionTemplate
	} from '$lib/state/trainingSessionTemplates.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { AutomergeDocumentId } from '$lib/repo';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { findTranslation } from '$lib/util';

	let {
		trainingSessionTemplateId,
		trainingSessionTemplate,
		exerciseByGuid = $bindable(),
		editReferrer,
		onDelete
	}: TrainingSessionTemplateProps = $props();

	async function onDeleteInternal() {
		try {
			await deleteTrainingSessionTemplate(trainingSessionTemplateId);
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
	<h3 class="m-0">{findTranslation(trainingSessionTemplate.translations)?.name}</h3>
	<div class="flex flex-row">
		<button class="btn danger icon me-2" onclick={onOpenDelete}><Trash /></button>
		<a
			class="btn primary icon"
			href={`${base}/training-session-templates/${trainingSessionTemplateId}/edit${editReferrer ? `?referrer=${encodeURIComponent(editReferrer)}` : ''}`}
			><Pencil /></a
		>
	</div>
</div>
<div class="flex flex-col">
	{#each trainingSessionTemplate.setSeriesTemplates as setSeriesTemplate}
		<div class="mb-4 flex flex-col">
			<div class="mb-2 flex flex-row">
				<div
					class="badge"
					class:primary={setSeriesTemplate.setSeriesType === 'standard'}
					class:swamp-green={setSeriesTemplate.setSeriesType === 'circuit'}
					class:winter-hazel={setSeriesTemplate.setSeriesType === 'superset'}
				>
					{setSeriesTemplate.setSeriesType}
				</div>
			</div>
			<div class="flex flex-row">
				<div
					class="me-2 flex w-2 flex-shrink flex-col rounded-lg border"
					class:bg-pear-300={setSeriesTemplate.setSeriesType === 'standard'}
					class:bg-swamp-green-300={setSeriesTemplate.setSeriesType === 'circuit'}
					class:bg-winter-hazel-300={setSeriesTemplate.setSeriesType === 'superset'}
					class:border-pear-500={setSeriesTemplate.setSeriesType === 'standard'}
					class:border-swamp-green-500={setSeriesTemplate.setSeriesType === 'circuit'}
					class:border-winter-hazel-500={setSeriesTemplate.setSeriesType === 'superset'}
				></div>
				<div class="flex flex-grow flex-col rounded-lg">
					{#each setSeriesTemplate.setTemplates as setTemplate, index}
						{@const position = getRealSetPosition(
							setSeriesTemplate.setTemplates,
							setTemplate,
							index
						)}
						{@const exercise = exerciseByGuid[setTemplate.exerciseGuid]}
						{@const exerciseTranslation = findTranslation(exercise?.translations ?? [])}
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
								<p class="ms-2 mb-0">
									{exerciseTranslation?.name ?? ''}
								</p>
							</div>
							<div class="flex flex-shrink flex-col justify-center">
								{#if exercise}<SetAmounts execution={exercise.execution} set={setTemplate} />{/if}
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
			{m.training_sessions_template_delete_title({
				title: findTranslation(trainingSessionTemplate.translations).title
			})}
		</h5>
	{/snippet}
	<p>{m.training_sessions_template_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.training_sessions_template_delete_submit()}
		</button>
	</div>
</Modal>
