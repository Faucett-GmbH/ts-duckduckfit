<svelte:options immutable />

<script lang="ts" context="module">
	import { create, test, enforce, only } from 'vest';
	import { SetGroupType, UnitSystem } from '$lib/openapi/duckduckfit';

	export type WorkoutParams = {
		id: number;
		name: string;
		setGroups: Array<SetGroupParams>;
	};

	const createSuite = (LL: TranslationFunctions) =>
		create((data: Partial<WorkoutParams> = {}, fields: Set<keyof WorkoutParams>) => {
			if (!fields.size) {
				return;
			}
			only(Array.from(fields));

			test('name', m.errors_message_required(), () => {
				enforce(data.name).isNotBlank();
			});
			test('setGroups', m.errors_message_required(), () => {
				enforce(data.setGroups?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';
	import type { TranslationFunctions } from '$lib/i18n/i18n-types';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import classnames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import { handleError } from '$lib/errors';
	import { locale } from '$lib/stores/language';
	import InputResults from '$lib/components/InputResults.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import EditSetGroup, { type SetGroupParams } from './EditSetGroup.svelte';
	import { workoutApi } from '$lib/openapi';
	import { goto, invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { getLocalId, unsafeId } from '$lib/util';
	import Sortable from '$lib/components/Sortable.svelte';

	export let workout: WorkoutParams;
	export let unitSystem: UnitSystem = UnitSystem.MetricUnitSystem;
	let setGroupsValid: Array<boolean | undefined> = [];

	let valid: boolean | undefined = undefined;
	$: suite = createSuite($LL);
	$: result = suite.get();
	$: disabled = loading;
	$: cn = classnames(result, {
		untested: 'untested',
		tested: 'tested',
		invalid: 'invalid',
		valid: 'valid',
		warning: 'warning'
	});

	const fields = new Set<keyof WorkoutParams>();
	const validate = debounce(() => {
		suite(workout, fields).done((r) => {
			result = r;
			const newValid = result.isValid() && isSetGroupsValid();
			if (valid !== newValid) {
				valid = newValid;
			}
		});
		fields.clear();
	}, 300);
	function validateAll() {
		for (const field of Object.keys(workout)) {
			fields.add(field as keyof WorkoutParams);
		}
		validate();
		validate.flush();
	}
	function onChange(
		e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
	) {
		const field = e.currentTarget.name as keyof WorkoutParams;
		workout = { ...workout, [field]: e.currentTarget.value };
		fields.add(field);
		validate();
	}
	function createOnSetGroupChange(index: number) {
		return (event: CustomEvent<SetGroupParams>) => {
			const setGroups = workout.setGroups.slice();
			setGroups[index] = event.detail;
			workout = {
				...workout,
				setGroups
			};
		};
	}
	function createOnSetGroupDelete(index: number) {
		return (event: CustomEvent<SetGroupParams>) => {
			const setGroups = workout.setGroups.slice();
			setGroups.splice(index, 1);
			workout = {
				...workout,
				setGroups
			};
		};
	}
	function createOnSetGroupValid(index: number) {
		return (event: CustomEvent<boolean>) => {
			const newSetGroupsValid = setGroupsValid.slice(0, workout.setGroups.length);
			newSetGroupsValid[index] = event.detail;
			setGroupsValid = newSetGroupsValid;
			const newValid = result.isValid() && isSetGroupsValid();
			if (valid !== newValid) {
				valid = newValid;
			}
		};
	}

	let loading = false;
	async function onSubmit() {
		try {
			loading = true;
			validateAll();
			if (valid) {
				if (workout.id) {
					await workoutApi.updateWorkout(workout.id, workout);
				} else {
					await workoutApi.createWorkout(workout);
				}
				await invalidateAll();
				await goto(`${base}/${$locale}/workouts`);
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

	function onAddSetGroup() {
		workout = {
			...workout,
			setGroups: [
				...workout.setGroups,
				{
					localId: unsafeId(),
					setGroupType: 'straight',
					sets: []
				}
			]
		};
		fields.add('setGroups');
		validate();
	}

	function onMoveSetGroup(fromIndex: number, toIndex: number) {
		const setGroup = workout.setGroups[fromIndex];
		const newSetGroups = workout.setGroups.slice();
		newSetGroups.splice(fromIndex, 1);
		newSetGroups.splice(toIndex, 0, setGroup);
		workout = { ...workout, setGroups: newSetGroups };
	}

	onMount(async () => {
		if (workout.id) {
			validateAll();
		}
	});
</script>

<div class="mb-2">
	<label for="name">{$LL.workouts.nameLabel()}</label>
	<input
		class="w-full {cn('name')}"
		type="text"
		name="name"
		placeholder={$LL.workouts.namePlaceholder()}
		value={workout.name}
		on:input={onChange}
	/>
	<InputResults name="name" {result} />
</div>
<div role="list">
	<Sortable
		id={`set-groups-${workout.id}`}
		items={workout.setGroups}
		getKey={getLocalId}
		onMove={onMoveSetGroup}
		let:isDragging
		let:isDraggingOver
		let:index
		let:item
		let:onDragStart
		let:onDragEnd
		let:onDragLeave
		let:onDragOver
	>
		<EditSetGroup
			setGroup={item}
			{index}
			{isDragging}
			{isDraggingOver}
			{onDragStart}
			{onDragEnd}
			{onDragLeave}
			{onDragOver}
			{unitSystem}
			on:input={createOnSetGroupChange(index)}
			on:delete={createOnSetGroupDelete(index)}
			on:valid={createOnSetGroupValid(index)}
		/>
	</Sortable>
</div>
<div class="flex flex-row items-center justify-center">
	<InputResults name="setGroups" {result} />
</div>
<div class="flex flex-row justify-between">
	<button class="btn success flex flex-row" on:click|stopPropagation={onAddSetGroup}>
		<Plus />
		{$LL.workouts.setGroup.add()}
	</button>
	<button class="btn primary flex flex-shrink" {disabled} on:click={onSubmit}>
		{#if loading}<div class="mr-2 flex flex-row justify-center">
				<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
			</div>{/if}
		{#if workout.id}{$LL.workouts.edit.submit()}{:else}{$LL.workouts.new.submit()}{/if}
	</button>
</div>
