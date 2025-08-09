<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export interface EditWorkoutProps {
		workoutId: AutomergeDocumentId<Workout>;
		workout: Workout;
		exerciseByGuid: { [exerciseGuid: string]: Exercise };
	}

	const createSuite = () =>
		create((data: Partial<Workout> = {}, fields: Set<keyof Workout>) => {
			if (!fields.size) {
				return;
			}
			only(Array.from(fields));

			test('setGroups', m.errors_message_required(), () => {
				enforce(data.setGroups?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import classnames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import { handleError } from '$lib/error';
	import InputResults from '$lib/components/InputResults.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Plus from 'lucide-svelte/icons/plus';
	import { goto, invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { getId, unsafeId } from '$lib/util';
	import Sortable from '$lib/components/Sortable.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';
	import { upsertWorkout, type AttemptedSetGroup, type Workout } from '$lib/state/workouts.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import type { EventHandler } from 'svelte/elements';
	import EditSetGroup from './EditSetGroup.svelte';

	let {
		workout = $bindable(),
		workoutId,
		exerciseByGuid = $bindable()
	}: EditWorkoutProps = $props();
	let setGroupsValid: Array<boolean | undefined> = [];

	let valid: boolean | undefined = undefined;

	const fields = new Set<keyof Workout>();
	const validate = debounce(
		() =>
			new Promise((resolve) => {
				suite(workout, fields).done((r) => {
					result = r;
					const newValid = result.isValid() && isSetGroupsValid();
					if (valid !== newValid) {
						valid = newValid;
					}
					resolve(valid);
				});
				fields.clear();
			}),
		300
	);
	function validateAll() {
		for (const field of Object.keys(workout)) {
			fields.add(field as keyof Workout);
		}
		validate();
		return validate.flush();
	}
	function onChange(
		e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
	) {
		const field = e.currentTarget.name as keyof Workout;
		workout = { ...workout, [field]: e.currentTarget.value };
		fields.add(field);
		validate();
	}
	function createOnSetGroupChange(index: number) {
		return (attemptedSetGroup: AttemptedSetGroup) => {
			const setGroups = workout.setGroups.slice();
			setGroups[index] = attemptedSetGroup;
			workout = {
				...workout,
				setGroups
			};
		};
	}
	function createOnSetGroupDelete(index: number) {
		return (_attemptedSetGroup: AttemptedSetGroup) => {
			const setGroups = workout.setGroups.slice();
			setGroups.splice(index, 1);
			workout = {
				...workout,
				setGroups
			};
		};
	}
	function createOnSetGroupValid(index: number) {
		return (setGroupValid: boolean) => {
			const newSetGroupsValid = setGroupsValid.slice(0, workout.setGroups.length);
			newSetGroupsValid[index] = setGroupValid;
			setGroupsValid = newSetGroupsValid;
			const newValid = result.isValid() && isSetGroupsValid();
			if (valid !== newValid) {
				valid = newValid;
			}
		};
	}

	let loading = $state(false);
	async function onSubmit() {
		try {
			loading = true;
			if (await validateAll()) {
				await upsertWorkout(workout, workoutId);
				await invalidateAll();
				await goto(`${base}/workouts`);
			}
		} catch (error) {
			await handleError(error);
		} finally {
			loading = false;
		}
	}
	function isSetGroupsValid() {
		return setGroupsValid.every((valid) => valid === true);
	}

	const onAddSetGroup: EventHandler = (e) => {
		e.stopPropagation();
		workout = {
			...workout,
			setGroups: [
				...workout.setGroups,
				{
					id: unsafeId(),
					setGroupType: 'straight',
					sets: []
				}
			]
		};
		fields.add('setGroups');
		validate();
	};

	function onMoveSetGroup(fromIndex: number, toIndex: number) {
		const setGroup = workout.setGroups[fromIndex];
		const newSetGroups = workout.setGroups.slice();
		newSetGroups.splice(fromIndex, 1);
		newSetGroups.splice(toIndex, 0, setGroup);
		workout = { ...workout, setGroups: newSetGroups };
	}

	onMount(async () => {
		if (workoutId) {
			validateAll();
		}
	});
	let suite = $derived(createSuite());
	let result = $derived(suite.get());
	let disabled = $derived(loading);
	let cn = $derived(
		classnames(result, {
			untested: 'untested',
			tested: 'tested',
			invalid: 'invalid',
			valid: 'valid',
			warning: 'warning'
		})
	);
</script>

<div class="mb-2">
	<label for="name">{m.workouts_name_label()}</label>
	<input
		class="w-full {cn('name')}"
		type="text"
		name="name"
		placeholder={m.workouts_name_placeholder()}
		value={workout.translations[0].name}
		oninput={onChange}
	/>
	<InputResults name="name" {result} />
</div>
<div role="list">
	<Sortable
		id={`set-groups-${workoutId}`}
		items={workout.setGroups}
		getKey={getId}
		onMove={onMoveSetGroup}
	>
		{#snippet children({
			isDragging,
			isDraggingOver,
			index,
			item,
			onDragStart,
			onDragEnd,
			onDragLeave,
			onDragOver
		})}
			<EditSetGroup
				setGroup={item}
				bind:exerciseByGuid
				{index}
				{isDragging}
				{isDraggingOver}
				{onDragStart}
				{onDragEnd}
				{onDragLeave}
				{onDragOver}
				oninput={createOnSetGroupChange(index)}
				ondelete={createOnSetGroupDelete(index)}
				onvalid={createOnSetGroupValid(index)}
			/>
		{/snippet}
	</Sortable>
</div>
<div class="flex flex-row items-center justify-center">
	<InputResults name="setGroups" {result} />
</div>
<div class="flex flex-row justify-between">
	<button class="btn success flex flex-row" onclick={onAddSetGroup}>
		<Plus />
		{m.workouts_set_group_add()}
	</button>
	<button class="btn primary flex flex-shrink" {disabled} onclick={onSubmit}>
		{#if loading}<div class="mr-2 flex flex-row justify-center">
				<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
			</div>{/if}
		{#if workoutId}{m.workouts_edit_submit()}{:else}{m.workouts_new_submit()}{/if}
	</button>
</div>
