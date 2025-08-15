<script lang="ts">
	import NumericField from '$lib/domain/Core/Components/NumericField.svelte';
	import SetTemplateComponent from '$lib/domain/TrainingSessionTemplates/Components/SetTemplate.svelte';
	import type { SetTemplate, Exercise } from '$lib/domain/TrainingSessionTemplates/types';

	let exerciseGuids = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

	let exercises: Exercise[] = [
		{ guid: exerciseGuids[0], name: 'back squat' },
		{ guid: exerciseGuids[1], name: 'snatch' },
		{ guid: exerciseGuids[2], name: 'power clean' }
	];

	let st: SetTemplate = $state({
		id: crypto.randomUUID(),
		exerciseGuid: exerciseGuids[0],
		setType: 'warm_up',
		position: 1,
		targetReps: 0,
		targetRPE: 1,
		targetWeight: 0,
		notes: ''
	});

	$effect(() => {
		console.log(st);
	});

	let x = 100;
</script>

<NumericField bind:value={x} min={0} max={500} step={0.25} />
<SetTemplateComponent bind:value={st} {exercises} />
