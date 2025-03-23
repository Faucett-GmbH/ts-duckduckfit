<script lang="ts" module>
	interface InputResultsProps {
		result: SuiteResult<any, any>;
		name: string;
	}
</script>

<script lang="ts">
	import type { SuiteResult } from 'vest';

	let { result, name }: InputResultsProps = $props();
</script>

<ul class="list-none ps-0">
	{#each result.getErrors(name) as error}
		<li class="text-sm text-red-600">{error}</li>
	{/each}
	{#each result.getWarnings(name) as warning}
		<li class="text-sm text-orange-600">{warning}</li>
	{/each}
</ul>
