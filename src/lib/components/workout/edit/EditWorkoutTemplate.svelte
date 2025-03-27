<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export type WorkoutTemplateProps = {
		workoutTemplate?: WorkoutTemplateParams;
	};

	export type WorkoutTemplateParams = {
		id?: number;
		description?: string;
		name: string;
		setGroupTemplates: Array<SetGroupTemplateParams>;
	};

	const createSuite = () =>
		create(
			(data: Partial<WorkoutTemplateParams> = {}, fields: Set<keyof WorkoutTemplateParams>) => {
				if (!fields.size) {
					return;
				}
				only(Array.from(fields));

				test('name', m.errors_message_required(), () => {
					enforce(data.name).isNotBlank();
				});
				test('setGroupTemplates', m.errors_message_required(), () => {
					enforce(data.setGroupTemplates?.length).greaterThan(0);
				});
			}
		);
</script>

<script lang="ts">
	import classnames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import { handleError } from '$lib/error';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import InputResults from '$lib/components/InputResults.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import EditSetGroupTemplate, { type SetGroupTemplateParams } from './EditSetGroupTemplate.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { unsafeId } from '$lib/util';
	import Sortable from '$lib/components/Sortable.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		workoutTemplate = {
			name: '',
			setGroupTemplates: []
		}
	}: WorkoutTemplateProps = $props();
	let setGroupTemplatesValid: Array<boolean | undefined> = [];

	let valid: boolean | undefined = $state();
	let suite = $state(createSuite());
	let result = $state(suite.get());
	let loading = $state(false);
	let disabled = $derived(loading || !result.isValid());
	let cn = $derived(
		classnames(result, {
			untested: 'untested',
			tested: 'tested',
			invalid: 'invalid',
			valid: 'valid',
			warning: 'warning'
		})
	);

	const fields = new Set<keyof WorkoutTemplateParams>();
	const validate = debounce(() => {
		suite(workoutTemplate, fields).done((r) => {
			result = r;
			const newValid = result.isValid() && isSetGroupTemplatesValid();
			if (valid !== newValid) {
				valid = newValid;
			}
		});
		fields.clear();
	}, 300);
	function validateAll() {
		for (const field of Object.keys(workoutTemplate)) {
			fields.add(field as keyof WorkoutTemplateParams);
		}
		validate();
		validate.flush();
	}
	function onChange(
		e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
	) {
		const field = e.currentTarget.name as keyof WorkoutTemplateParams;
		workoutTemplate = { ...workoutTemplate, [field]: e.currentTarget.value };
		fields.add(field);
		validate();
	}
	function createOnSetGroupTemplateChange(index: number) {
		return (params: SetGroupTemplateParams) => {
			const setGroupTemplates = workoutTemplate.setGroupTemplates.slice();
			setGroupTemplates[index] = params;
			workoutTemplate = {
				...workoutTemplate,
				setGroupTemplates
			};
		};
	}
	function createOnSetGroupTemplateDelete(index: number) {
		return (_params: SetGroupTemplateParams) => {
			const setGroupTemplates = workoutTemplate.setGroupTemplates.slice();
			setGroupTemplates.splice(index, 1);
			workoutTemplate = {
				...workoutTemplate,
				setGroupTemplates
			};
		};
	}
	function createOnSetGroupTemplateValid(index: number) {
		return (setGroupTemplateValid: boolean) => {
			const newSetGroupTemplatesValid = setGroupTemplatesValid.slice(
				0,
				workoutTemplate.setGroupTemplates.length
			);
			newSetGroupTemplatesValid[index] = setGroupTemplateValid;
			setGroupTemplatesValid = newSetGroupTemplatesValid;
			const newValid = result.isValid() && isSetGroupTemplatesValid();
			if (valid !== newValid) {
				valid = newValid;
			}
		};
	}

	async function onSubmit() {
		try {
			loading = true;
			validateAll();
			if (valid) {
				if (workoutTemplate.id) {
				} else {
				}
				await invalidateAll();
				await goto(`${base}/workout-templates`);
			}
		} catch (error) {
			await handleError(error);
		} finally {
			loading = false;
		}
	}
	function isSetGroupTemplatesValid() {
		return setGroupTemplatesValid.every((valid) => valid === true);
	}

	function onAddSetGroup(e: Event) {
		e.stopPropagation();
		workoutTemplate = {
			...workoutTemplate,
			setGroupTemplates: [
				...workoutTemplate.setGroupTemplates,
				{
					localId: unsafeId(),
					setGroupType: 'straight',
					setTemplates: []
				}
			]
		};
		fields.add('setGroupTemplates');
		validate();
	}

	function onMoveSetGroups(fromIndex: number, toIndex: number) {
		const setGroupTemplate = workoutTemplate.setGroupTemplates[fromIndex];
		const newSetGroupTemplates = workoutTemplate.setGroupTemplates.slice();
		newSetGroupTemplates.splice(fromIndex, 1);
		newSetGroupTemplates.splice(toIndex, 0, setGroupTemplate);
		workoutTemplate = { ...workoutTemplate, setGroupTemplates: newSetGroupTemplates };
	}

	onMount(async () => {
		if (workoutTemplate.id) {
			validateAll();
		}
	});
</script>

<div class="mb-2">
	<label for="name">{m.workouts_name_label()}</label>
	<input
		class="w-full {cn('name')}"
		type="text"
		name="name"
		placeholder={m.workouts_name_placeholder()}
		value={workoutTemplate.name}
		oninput={onChange}
	/>
	<InputResults name="name" {result} />
</div>
<div class="mb-2">
	<label for="description">{m.workouts_description_label()}</label>
	<textarea
		class="w-full {cn('description')}"
		name="description"
		placeholder={m.workouts_description_placeholder()}
		value={workoutTemplate.description || ''}
		oninput={onChange}
	></textarea>
	<InputResults name="description" {result} />
</div>
<div role="list">
	<Sortable
		id={`set-group-templates-${workoutTemplate.id}`}
		items={workoutTemplate.setGroupTemplates}
		onMove={onMoveSetGroups}
	>
		{#snippet child({ item, index, ...props })}
			<EditSetGroupTemplate
				setGroupTemplate={item}
				{index}
				{...props}
				oninput={createOnSetGroupTemplateChange(index)}
				ondelete={createOnSetGroupTemplateDelete(index)}
				onvalid={createOnSetGroupTemplateValid(index)}
			/>
		{/snippet}
	</Sortable>
</div>
<div class="flex flex-row items-center justify-center">
	<InputResults name="setGroupTemplates" {result} />
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
		{#if workoutTemplate.id}{m.workouts_edit_submit()}{:else}{m.workouts_new_submit()}{/if}
	</button>
</div>
