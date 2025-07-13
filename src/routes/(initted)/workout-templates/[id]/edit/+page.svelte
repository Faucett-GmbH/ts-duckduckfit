<script lang="ts" module>
	interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import EditWorkoutTemplate from '$lib/components/workout/edit/EditWorkoutTemplate.svelte';
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
					<EditWorkoutTemplate
						bind:exerciseByGuid={data.exerciseByGuid}
						workoutTemplateId={data.workoutTemplateId}
						workoutTemplate={data.workoutTemplate}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
