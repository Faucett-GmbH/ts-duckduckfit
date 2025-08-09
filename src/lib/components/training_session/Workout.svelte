<script lang="ts" module>
	export interface WorkoutProps {
		workoutId: AutomergeDocumentId<Workout>;
		workout: Workout;
		exerciseByGuid: { [exerciseGuid: string]: Exercise };
		editReferrer?: string | undefined;
	}
</script>

<script lang="ts">
	import Trash from 'lucide-svelte/icons/trash';
	import { Pencil } from 'lucide-svelte';
	import SetTypeComponent from './SetType.svelte';
	import AttemptedSetAmounts from './AttemptedSetAmounts.svelte';
	import { base } from '$app/paths';
	import Modal from '../Modal.svelte';
	import { handleError } from '$lib/error';
	import { invalidateAll } from '$app/navigation';
	import { getRealSetPosition } from './util';
	import { deleteWorkout, type Workout } from '$lib/state/workouts.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';
	import { findTranslation } from '$lib/util';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { m } from '$lib/paraglide/messages';

	let {
		workoutId,
		workout,
		exerciseByGuid = $bindable(),
		editReferrer = undefined
	}: WorkoutProps = $props();

	const translation = $derived(findTranslation(workout.translations));

	let deleteOpen = $state(false);
	function onOpenDelete() {
		deleteOpen = true;
	}

	async function onDeleteInternal() {
		try {
			await deleteWorkout(workoutId);
			deleteOpen = false;
			await invalidateAll();
		} catch (error) {
			await handleError(error);
		}
	}
</script>

<div class="flex flex-row items-center justify-between">
	<div class="flex flex-row flex-wrap items-end">
		<h3 class="m-0 me-2">{translation.name}</h3>
		<p class="m-0">{workout.startedAt.toLocaleString()}</p>
	</div>
	<div class="flex flex-row">
		<button class="btn danger icon me-2" onclick={onOpenDelete}><Trash /></button>
		<a
			class="btn primary icon"
			href={`${base}/workouts/${workoutId}/edit${editReferrer ? `?referrer=${encodeURIComponent(editReferrer)}` : ''}`}
			><Pencil /></a
		>
	</div>
</div>
<div class="flex flex-col">
	{#each workout.setGroups as setGroup (setGroup.id)}
		<div class="mb-4 flex flex-col">
			<div class="mb-2 flex flex-row">
				<div
					class="badge"
					class:primary={setGroup.setGroupType === 'straight'}
					class:swamp-green={setGroup.setGroupType === 'circuit'}
					class:winter-hazel={setGroup.setGroupType === 'superset'}
				>
					{setGroup.setGroupType}
				</div>
			</div>
			<div class="flex flex-row">
				<div
					class="me-2 flex w-2 flex-shrink flex-col rounded-lg border"
					class:bg-pear-300={setGroup.setGroupType === 'straight'}
					class:bg-swamp-green-300={setGroup.setGroupType === 'circuit'}
					class:bg-winter-hazel-300={setGroup.setGroupType === 'superset'}
					class:border-pear-500={setGroup.setGroupType === 'straight'}
					class:border-swamp-green-500={setGroup.setGroupType === 'circuit'}
					class:border-winter-hazel-500={setGroup.setGroupType === 'superset'}
				></div>
				<div class="flex flex-grow flex-col rounded-lg">
					{#each setGroup.sets as set, index (set.id)}
						{@const position = getRealSetPosition(setGroup.sets, set, index)}
						{@const exercise = exerciseByGuid[set.exerciseGuid]}
						{@const translation = findTranslation(exercise?.translations ?? [])}
						<div
							class={{
								'flex flex-row justify-between bg-black p-1': true,
								'bg-black/0': index % 2 === 0,
								'bg-black/5': index % 2 === 1
							}}
						>
							<div class="flex flex-grow flex-row justify-between">
								<div class="me-2 flex flex-shrink flex-row">
									<div class="me-2 flex flex-col justify-center">
										<SetTypeComponent setType={set.setType} {position} />
									</div>
									<div
										class="me-2 h-8 min-h-8 w-8 min-w-8 rounded-full bg-gray-600 max-sm:hidden"
									></div>
									<p class="ms-2 mb-0">{translation?.name || ''}</p>
								</div>
								<div class="flex flex-shrink flex-row">
									<div class="flex flex-shrink flex-col justify-center">
										{#if exercise}<AttemptedSetAmounts execution={exercise.execution} {set} />{/if}
									</div>
									<div class="ms-2 flex flex-shrink flex-col justify-center">
										<div
											class="badge icon m-w-6 m-h-6 font-h h-6 w-6 leading-4"
											class:light={!set.status}
											class:success={set.status === 'success'}
											class:danger={set.status === 'failed'}
											title={set.status === 'success'
												? m.workouts_set_success_title()
												: set.status === 'failed'
													? m.workouts_set_failed_title()
													: m.workouts_set_incomplete_title()}
										>
											{#if set.status === 'success'}
												{m.workouts_set_success_letter()}
											{:else if set.status === 'failed'}
												{m.workouts_set_failed_letter()}
											{:else}
												{m.workouts_set_incomplete_letter()}
											{/if}
										</div>
									</div>
								</div>
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
		<h5>{m.workouts_delete_title(translation)}</h5>
	{/snippet}
	<p>{m.workouts_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.workouts_delete_submit()}
		</button>
	</div>
</Modal>
