<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="container mx-auto p-4">
	<div class="card flex flex-col">
		<h3>{page.status}</h3>
		{#if page.error?.message}
			<p>{page.error.message}</p>
		{/if}
	</div>
</div>
