<script lang="ts">
	import Sync from './_Sync.svelte';

	let { data } = $props();
</script>

<div class="card flex flex-col">
	<Sync
		currentDeviceId={data.currentDeviceId}
		sync={data.sync}
		currentUserDocument={data.currentUserDocument}
	/>
</div>
