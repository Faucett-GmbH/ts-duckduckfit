<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex grow flex-col items-center">
	<div class="container flex flex-col p-8">
		<div class="card flex flex-col">
			<h3>{page.status}</h3>
			{#if page.error?.message}
				<p>{page.error.message}</p>
			{/if}
		</div>
	</div>
</div>
