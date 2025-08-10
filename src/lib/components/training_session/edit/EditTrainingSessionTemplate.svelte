<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export type TrainingSessionTemplateProps = {
		trainingSessionTemplateId?: AutomergeDocumentId<TrainingSessionTemplate>;
		trainingSessionTemplate?: TrainingSessionTemplate;
		exerciseByGuid?: { [guid: string]: Exercise };
	};

	const createSuite = () =>
		create((data: TrainingSessionTemplate, fields: string[]) => {
			only(fields);

			test('translations', m.errors_message_required(), () => {
				enforce(data.translations[0].title).isNotBlank();
			});
			test('setSeriesTemplates', m.errors_message_required(), () => {
				enforce(data.setSeriesTemplates?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import classnames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import { handleError } from '$lib/error';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import InputResults from '$lib/components/InputResults.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import EditSetSeriesTemplateComponent from './EditSetSeriesTemplate.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { getId, unsafeId } from '$lib/util';
	import Sortable from '$lib/components/Sortable.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { AutomergeDocumentId } from '$lib/repo';
	import {
		upsertTrainingSessionTemplate,
		type SetSeriesTemplate,
		type TrainingSessionTemplate,
		type TrainingSessionTemplateTranslation
	} from '$lib/state/trainingSessionTemplates.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { getLocale } from '$lib/state/settings.svelte';

	let {
		trainingSessionTemplateId,
		trainingSessionTemplate = $bindable({
			translations: [
				{
					locale: getLocale(),
					title: '',
					description: null
				}
			],
			setSeriesTemplates: [],
			updatedAt: new Date(),
			createdAt: new Date()
		}),
		exerciseByGuid = $bindable({})
	}: TrainingSessionTemplateProps = $props();
	let setSeriesTemplatesValid: Array<boolean | undefined> = [];

	let valid: boolean | undefined = $state();
	let suite = $state(createSuite());
	let result = $state(suite.get());
	let loading = $state(false);
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

	const fields = new Set<string>();
	const validate = debounce(
		() =>
			new Promise<boolean>((resolve) => {
				suite(trainingSessionTemplate, Array.from(fields)).done((r) => {
					result = r;
					const newValid = result.isValid() && isSetSeriesTemplatesValid();
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
		for (const field of Object.keys(trainingSessionTemplate)) {
			fields.add(field as keyof TrainingSessionTemplate);
		}
		validate();
		return validate.flush();
	}
	function onTranslationChange(
		e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
	) {
		const field = e.currentTarget.name as keyof TrainingSessionTemplateTranslation;
		trainingSessionTemplate.translations[0][field] = e.currentTarget.value as never;
		fields.add(field);
		validate();
	}
	function createOnSetSeriesTemplateChange(index: number) {
		return (params: SetSeriesTemplate) => {
			const setSeriesTemplates = trainingSessionTemplate.setSeriesTemplates.slice();
			setSeriesTemplates[index] = params;
			trainingSessionTemplate = {
				...trainingSessionTemplate,
				setSeriesTemplates
			};
			fields.add('setSeriesTemplates');
			validate();
		};
	}
	function createOnSetSeriesTemplateDelete(index: number) {
		return (_params: SetSeriesTemplate) => {
			const setSeriesTemplates = trainingSessionTemplate.setSeriesTemplates.slice();
			setSeriesTemplates.splice(index, 1);
			trainingSessionTemplate = {
				...trainingSessionTemplate,
				setSeriesTemplates
			};
			fields.add('setSeriesTemplates');
			validate();
		};
	}
	function createOnSetSeriesTemplateValid(index: number) {
		return (setSeriesTemplateValid: boolean) => {
			const newSetSeriesTemplatesValid = setSeriesTemplatesValid.slice(
				0,
				trainingSessionTemplate.setSeriesTemplates.length
			);
			newSetSeriesTemplatesValid[index] = setSeriesTemplateValid;
			setSeriesTemplatesValid = newSetSeriesTemplatesValid;
			const newValid = result.isValid() && isSetSeriesTemplatesValid();
			if (valid !== newValid) {
				valid = newValid;
			}
		};
	}

	async function onSubmit() {
		try {
			loading = true;
			if (await validateAll()) {
				await upsertTrainingSessionTemplate(
					{
						...trainingSessionTemplate,
						setSeriesTemplates: trainingSessionTemplate.setSeriesTemplates.map(
							(setSeriesTemplate) => ({
								...setSeriesTemplate,
								setTemplates: setSeriesTemplate.setTemplates.map((setTemplate) => {
									const newSetTemplate = { ...setTemplate };
									// @ts-expect-error
									delete newSetTemplate.exercise;
									return newSetTemplate;
								})
							})
						)
					},
					trainingSessionTemplateId
				);
				await goto(`${base}/training-session-templates`);
			}
		} catch (error) {
			await handleError(error);
		} finally {
			loading = false;
		}
	}
	function isSetSeriesTemplatesValid() {
		return setSeriesTemplatesValid.every((valid) => valid === true);
	}

	function onAddSetSeries(e: Event) {
		e.stopPropagation();
		trainingSessionTemplate = {
			...trainingSessionTemplate,
			setSeriesTemplates: [
				...trainingSessionTemplate.setSeriesTemplates,
				{
					id: unsafeId(),
					setSeriesType: 'standard',
					setTemplates: []
				}
			]
		};
		fields.add('setSeriesTemplates');
		validate();
	}

	function onMoveSetSeries(fromIndex: number, toIndex: number) {
		const setSeriesTemplate = trainingSessionTemplate.setSeriesTemplates[fromIndex];
		const newSetSeriesTemplates = trainingSessionTemplate.setSeriesTemplates.slice();
		newSetSeriesTemplates.splice(fromIndex, 1);
		newSetSeriesTemplates.splice(toIndex, 0, setSeriesTemplate);
		trainingSessionTemplate = {
			...trainingSessionTemplate,
			setSeriesTemplates: newSetSeriesTemplates
		};
	}

	onMount(() => {
		if (trainingSessionTemplateId) {
			validateAll();
		}
	});
</script>

<div class="mb-2">
	<label for="title">{m.training_sessions_title_label()}</label>
	<input
		class="w-full {cn('title')}"
		type="text"
		name="title"
		placeholder={m.training_sessions_title_placeholder()}
		value={trainingSessionTemplate.translations[0].title}
		oninput={onTranslationChange}
	/>
	<InputResults name="title" {result} />
</div>
<div class="mb-2">
	<label for="description">{m.training_sessions_description_label()}</label>
	<textarea
		class="w-full {cn('description')}"
		name="description"
		placeholder={m.training_sessions_description_placeholder()}
		value={trainingSessionTemplate.translations[0].description || ''}
		oninput={onTranslationChange}
	></textarea>
	<InputResults name="description" {result} />
</div>
<div role="list">
	<Sortable
		id={`set-series-templates`}
		items={trainingSessionTemplate.setSeriesTemplates}
		getKey={getId}
		onMove={onMoveSetSeries}
	>
		{#snippet children({ item, index, ...props })}
			<EditSetSeriesTemplateComponent
				bind:exerciseByGuid
				setSeriesTemplate={item}
				{index}
				{...props}
				oninput={createOnSetSeriesTemplateChange(index)}
				ondelete={createOnSetSeriesTemplateDelete(index)}
				onvalid={createOnSetSeriesTemplateValid(index)}
			/>
		{/snippet}
	</Sortable>
</div>
<div class="flex flex-row items-center justify-center">
	<InputResults name="setSeriesTemplates" {result} />
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
		{#if trainingSessionTemplateId}{m.training_sessions_edit_submit()}{:else}{m.training_sessions_new_submit()}{/if}
	</button>
</div>
