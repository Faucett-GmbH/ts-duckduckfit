<script lang="ts" module>
	interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import EditWorkoutTemplate, {
		type WorkoutTemplateParams
	} from '$lib/components/workout/edit/EditWorkoutTemplate.svelte';
	import { base } from '$app/paths';
	import { unsafeId } from '$lib/util';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import type { PageData } from './$types';
	import { language } from '$lib/state/language.svelte';
	import { findTranslation } from '$lib/state/workoutTemplates.svelte';
	import { m } from '$lib/paraglide/messages';

	let { data }: Props = $props();

	let translation = $derived(findTranslation(data.workoutTemplate));
	let backUrl = $derived(data.referrer || `${base}/${language.locale}/workout-templates`);
	let workoutTemplate = $derived<WorkoutTemplateParams>({
		translations: data.workoutTemplate.translations,
		setGroupTemplates:
			data.workoutTemplate.setGroupTemplates?.map((setGroupTemplate) => ({
				...setGroupTemplate,
				setTemplates:
					setGroupTemplate.setTemplates?.map((setTemplate) => ({
						...setTemplate,
						exerciseGuid: setTemplate.exerciseGuid,
						exercise: data.exerciseByGuid[setTemplate.exerciseGuid]!,
						id: unsafeId()
					})) || [],
				id: unsafeId()
			})) || []
	});
</script>

<svelte:head>
	<title>{translation.name}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
	<div class="flex w-full flex-grow flex-col sm:container sm:mx-auto">
		<div class="mb-16 mt-4">
			<div class="flex flex-shrink flex-row">
				<a class="flex flex-shrink flex-row" href={backUrl}>
					<ChevronLeft />
					{m.workouts_back()}
				</a>
			</div>
			<div class="flex flex-grow flex-col">
				<div class="card flex flex-shrink flex-col">
					<EditWorkoutTemplate {workoutTemplate} />
				</div>
			</div>
		</div>
	</div>
</div>
