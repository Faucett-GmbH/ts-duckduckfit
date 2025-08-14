<script lang="ts" module>
	export interface SetTemplateProps {
		exercises: Exercise[];
		value: SetTemplate;
	}
</script>

<script lang="ts">
	import type { SetType, SetTemplate, Exercise } from '../types';

	let { exercises, value = $bindable() }: SetTemplateProps = $props();

	function update<K extends keyof SetTemplate>(key: K, val: SetTemplate[K]) {
		console.log(key, val);
	}
</script>

<div data-component="SetTemplate">
	<div class="max-w-md space-y-2 rounded-lg border bg-white p-3 shadow-sm">
		<!-- Set Type -->
		<div>
			<label class="block text-sm font-medium">Set Type</label>
			<select
				class="mt-1 w-full rounded border-gray-300"
				value={value.setType}
				onchange={(e) => update('setType', (e.target as HTMLSelectElement).value as SetType)}
			>
				<option value="warm_up">Warm Up</option>
				<option value="working_set">Working Set</option>
			</select>
		</div>

		<!-- Exercise -->
		<div>
			<label class="block text-sm font-medium">Exercise</label>
			<select
				class="mt-1 w-full rounded border-gray-300"
				bind:value={value.exerciseGuid}
				onchange={(e) => update('exerciseGuid', (e.target as HTMLSelectElement).value)}
			>
				{#each exercises as ex}
					<option value={ex.guid}>{ex.name}</option>
				{/each}
			</select>
		</div>

		<!-- Target Reps -->
		<div>
			<label class="block text-sm font-medium">Target Reps</label>
			<input
				type="number"
				class="mt-1 w-full rounded border-gray-300"
				bind:value={value.targetReps}
				oninput={(e) => update('targetReps', +(e.target as HTMLInputElement).value)}
			/>
		</div>

		<!-- Target Weight -->
		<div>
			<label class="block text-sm font-medium">Target Weight</label>
			<input
				type="number"
				class="mt-1 w-full rounded border-gray-300"
				bind:value={value.targetWeight}
				oninput={(e) => update('targetWeight', +(e.target as HTMLInputElement).value)}
			/>
		</div>

		<!-- Target RPE -->
		<div>
			<label class="block text-sm font-medium">Target RPE</label>
			<input
				type="number"
				step="0.5"
				min="1"
				max="10"
				class="mt-1 w-full rounded border-gray-300"
				value={value.targetRPE}
				oninput={(e) => update('targetRPE', +(e.target as HTMLInputElement).value)}
			/>
		</div>

		<!-- Notes -->
		<div>
			<label class="block text-sm font-medium">Notes</label>
			<textarea
				class="mt-1 w-full rounded border-gray-300"
				rows={2}
				bind:value={value.notes}
				oninput={(e) => update('notes', (e.target as HTMLTextAreaElement).value)}
			></textarea>
		</div>
	</div>
</div>
