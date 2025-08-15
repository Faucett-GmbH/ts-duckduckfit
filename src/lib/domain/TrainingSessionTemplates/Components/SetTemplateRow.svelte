<script lang="ts" module>
	export interface SetTemplateProps {
		exercises: Exercise[];
		value: SetTemplate;
		position: number;
	}
</script>

<script lang="ts">
	import NumericField from '$lib/domain/Core/Components/NumericField.svelte';
	import { NotebookPen } from 'lucide-svelte';

	import type { SetType, SetTemplate, Exercise } from '../types';

	let { exercises, value = $bindable(), position }: SetTemplateProps = $props();

	function onEditNotes() {}
</script>

<tr data-component="SetTemplateRow" class="bg-white">
	<!-- Set Position -->
	<td class="position px-2 py-1 text-sm">
		<span>{position}</span>
	</td>

	<!-- Set Type -->
	<td class="setType px-2 py-1">
		<select class="mt-1 w-full rounded border-gray-300" value={value.setType}>
			<option value="warm_up">Warm Up</option>
			<option value="working_set">Working Set</option>
		</select>
	</td>

	<!-- Target Weight -->
	<td class="targetWeight px-2 py-1">
		<NumericField bind:value={value.targetWeight} min={0} step={0.125} />
	</td>

	<!-- Target Reps -->
	<td class="targetReps px-2 py-1">
		<NumericField bind:value={value.targetReps} min={0} step={1} />
	</td>

	<!-- Target RPE -->
	<td class="targetRPE px-2 py-1">
		<NumericField bind:value={value.targetRPE} min={0} max={10} step={1} />
	</td>

	<!-- Notes: model input via icon click -->
	<td class="notes px-2 py-1">
		<button onclick={onEditNotes}>
			<span>
				<NotebookPen />
			</span>
		</button>
	</td>
</tr>
