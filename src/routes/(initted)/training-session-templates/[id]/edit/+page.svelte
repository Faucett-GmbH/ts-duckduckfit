<script lang="ts" module>
	interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import EditTrainingSessionTemplateComponent from '$lib/components/training_session/edit/EditTrainingSessionTemplate.svelte';
	import { base } from '$app/paths';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import type { PageData } from './$types';
	import { getLocale } from '$lib/state/settings.svelte';
	import { m } from '$lib/paraglide/messages';
	import { findTranslation } from '$lib/util';

	let { data }: Props = $props();

	let translation = $derived(findTranslation(data.workoutTemplate.translations));
	let backUrl = $derived(data.referrer || `${base}/${getLocale()}/workout-templates`);
</script>

<svelte:head>
	<title>{translation?.title}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-x-hidden overflow-y-auto">
	<div class="flex w-full flex-grow flex-col sm:container sm:mx-auto">
		<div class="mt-4 mb-16">
			<div class="flex flex-shrink flex-row">
				<a class="flex flex-shrink flex-row" href={backUrl}>
					<ChevronLeft />
					{m.workouts_back()}
				</a>
			</div>
			<div class="flex flex-grow flex-col">
				<div class="card flex flex-shrink flex-col">
					<EditTrainingSessionTemplateComponent
						bind:exerciseByGuid={data.exerciseByGuid}
						trainingSessionTemplateId={data.workoutTemplateId}
						trainingSessionTemplate={data.workoutTemplate}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
