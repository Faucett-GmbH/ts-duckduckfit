<svelte:options immutable />

<script lang="ts">
	import Trash from 'lucide-svelte/icons/trash';
	import { Pencil } from 'lucide-svelte';
	import SetTypeComponent from './SetType.svelte';
	import AttemptedSetAmounts from './AttemptedSetAmounts.svelte';
	import { m } from '$lib/paraglide/messages';
	import { language } from '$lib/state/language';
	import { base } from '$app/paths';
	import Modal from '../Modal.svelte';
	import { handleError } from '$lib/error';
	import { getRealSetPosition } from './util';

	export let workout: Workout;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
	export let editReferrer: string | undefined = undefined;

	let deleteOpen = false;
	function onOpenDelete() {
		deleteOpen = true;
	}

	async function onDeleteInternal() {
		try {
			await workoutApi.deleteWorkout(workout.id);
			deleteOpen = false;
		} catch (error) {
			await handleError(error);
		}
	}
</script>

<div class="flex flex-row items-center justify-between">
	<div class="flex flex-row flex-wrap items-end">
		<h3 class="m-0 me-2">{workout.name}</h3>
		<p class="m-0">{workout.startedAt.toLocaleString()}</p>
	</div>
	<div class="flex flex-row">
		<button class="btn danger icon me-2" on:click={onOpenDelete}><Trash /></button>
		<a
			class="btn primary icon"
			href={`${base}/${$locale}/workouts/${workout.id}/edit${editReferrer ? `?referrer=${encodeURIComponent(editReferrer)}` : ''}`}
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
						<div
							class="flex flex-col bg-black p-1"
							class:bg-opacity-0={index % 2 === 0}
							class:bg-opacity-5={index % 2 === 1}
						>
							<div class="flex flex-row justify-between">
								<div class="me-2 flex flex-shrink flex-row">
									<div class="me-2 flex flex-col justify-center">
										<SetTypeComponent setType={set.setType} {position} />
									</div>
									<div
										class="me-2 h-8 min-h-8 w-8 min-w-8 rounded-full bg-gray-600 max-sm:hidden"
									></div>
									<p class="mb-0 ms-2">{set.exercise.translation.name}</p>
								</div>
								<div class="flex flex-shrink flex-row">
									<div class="flex flex-shrink flex-col justify-center">
										<AttemptedSetAmounts execution={set.exercise.execution} {set} {unitSystem} />
									</div>
									<div class="ms-2 flex flex-shrink flex-col justify-center">
										<div
											class="badge icon m-w-6 m-h-6 font-h h-6 w-6 leading-4"
											class:light={!set.status}
											class:success={set.status === SetStatusType.SuccessSetStatusType}
											class:danger={set.status === SetStatusType.FailedSetStatusType}
											title={set.status === SetStatusType.SuccessSetStatusType
												? m.workouts.set.successTitle()
												: set.status === SetStatusType.FailedSetStatusType
													? m.workouts.set.failedTitle()
													: ''}
										>
											{#if set.status === SetStatusType.SuccessSetStatusType}
												{m.workouts.set.successLetter()}
											{:else if set.status === SetStatusType.FailedSetStatusType}
												{m.workouts.set.failedLetter()}
											{/if}
										</div>
									</div>
								</div>
							</div>
							{#if set.notes}
								<p class="m-0 ps-10">{set.notes}</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<Modal bind:open={deleteOpen}>
	<h5 slot="title">{m.workouts.delete.title(workout.name)}</h5>
	<p>{m.workouts.delete.body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" on:click={onDeleteInternal}>
			{m.workouts.delete.submit()}
		</button>
	</div>
</Modal>
