<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export interface EditTrainingSessionProps {
		trainingSessionId: AutomergeDocumentId<TrainingSession>;
		trainingSession: TrainingSession;
		exerciseByGuid: { [exerciseGuid: string]: Exercise };
	}

	const createSuite = () =>
		create((data: Partial<TrainingSession> = {}, fields: Set<keyof TrainingSession>) => {
			if (!fields.size) {
				return;
			}
			only(Array.from(fields));

			test('setSeries', m.errors_message_required(), () => {
				enforce(data.setSeries?.length).greaterThan(0);
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
	import {
		upsertTrainingSession,
		type LoggedSetSeries,
		type TrainingSession
	} from '$lib/state/trainingSessions.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import type { EventHandler } from 'svelte/elements';
	import EditSetSeriesComponent from './EditSetSeries.svelte';
	import LoggedSetSeriesComponent from '../LoggedSetSeries.svelte';

	let {
		trainingSession = $bindable(),
		trainingSessionId,
		exerciseByGuid = $bindable()
	}: EditTrainingSessionProps = $props();
	let setSeriesValid: Array<boolean | undefined> = [];

	let valid: boolean | undefined = undefined;

	const fields = new Set<keyof TrainingSession>();
	const validate = debounce(
		() =>
			new Promise((resolve) => {
				suite(trainingSession, fields).done((r) => {
					result = r;
					const newValid = result.isValid() && isSetSeriesValid();
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
		for (const field of Object.keys(trainingSession)) {
			fields.add(field as keyof TrainingSession);
		}
		validate();
		return validate.flush();
	}
	function onChange(
		e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
	) {
		const field = e.currentTarget.name as keyof TrainingSession;
		trainingSession = { ...trainingSession, [field]: e.currentTarget.value };
		fields.add(field);
		validate();
	}
	function createOnSetSeriesChange(index: number) {
		return (loggedSetSeries: LoggedSetSeries) => {
			const setSeries = trainingSession.setSeries.slice();
			setSeries[index] = loggedSetSeries;
			trainingSession = {
				...trainingSession,
				setSeries
			};
		};
	}
	function createOnSetSeriesDelete(index: number) {
		return (_loggedSetSeries: LoggedSetSeries) => {
			const setSeries = trainingSession.setSeries.slice();
			setSeries.splice(index, 1);
			trainingSession = {
				...trainingSession,
				setSeries
			};
		};
	}
	function createOnSetSeriesValid(index: number) {
		return (setGroupValid: boolean) => {
			const newSetSeriesValid = setSeriesValid.slice(0, trainingSession.setSeries.length);
			newSetSeriesValid[index] = setGroupValid;
			setSeriesValid = newSetSeriesValid;
			const newValid = result.isValid() && isSetSeriesValid();
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
				await upsertTrainingSession(trainingSession, trainingSessionId);
				await invalidateAll();
				await goto(`${base}/training-sessions`);
			}
		} catch (error) {
			await handleError(error);
		} finally {
			loading = false;
		}
	}
	function isSetSeriesValid() {
		return setSeriesValid.every((valid) => valid === true);
	}

	const onAddSetSeries: EventHandler = (e) => {
		e.stopPropagation();
		trainingSession = {
			...trainingSession,
			setSeries: [
				...trainingSession.setSeries,
				{
					id: unsafeId(),
					setSeriesType: 'standard',
					sets: []
				}
			]
		};
		fields.add('setSeries');
		validate();
	};

	function onMoveSetSeries(fromIndex: number, toIndex: number) {
		const setSeries = trainingSession.setSeries[fromIndex];
		const newSetSeries = trainingSession.setSeries.slice();
		newSetSeries.splice(fromIndex, 1);
		newSetSeries.splice(toIndex, 0, setSeries);
		trainingSession = { ...trainingSession, setSeries: newSetSeries };
	}

	onMount(async () => {
		if (trainingSessionId) {
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
	<label for="title">{m.training_sessions_title_label()}</label>
	<input
		class="w-full {cn('title')}"
		type="text"
		name="title"
		placeholder={m.training_sessions_title_placeholder()}
		value={trainingSession.translations[0].title}
		oninput={onChange}
	/>
	<InputResults name="title" {result} />
</div>
<div role="list">
	<Sortable
		id={`set-series-${trainingSessionId}`}
		items={trainingSession.setSeries}
		getKey={getId}
		onMove={onMoveSetSeries}
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
			<EditSetSeriesComponent
				setSeries={item}
				bind:exerciseByGuid
				{index}
				{isDragging}
				{isDraggingOver}
				{onDragStart}
				{onDragEnd}
				{onDragLeave}
				{onDragOver}
				oninput={createOnSetSeriesChange(index)}
				ondelete={createOnSetSeriesDelete(index)}
				onvalid={createOnSetSeriesValid(index)}
			/>
		{/snippet}
	</Sortable>
</div>
<div class="flex flex-row items-center justify-center">
	<InputResults name="setGroups" {result} />
</div>
<div class="flex flex-row justify-between">
	<button class="btn success flex flex-row" onclick={onAddSetSeries}>
		<Plus />
		{m.training_sessions_set_series_add()}
	</button>
	<button class="btn primary flex flex-shrink" {disabled} onclick={onSubmit}>
		{#if loading}<div class="mr-2 flex flex-row justify-center">
				<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
			</div>{/if}
		{#if trainingSessionId}{m.training_sessions_edit_submit()}{:else}{m.training_sessions_new_submit()}{/if}
	</button>
</div>
