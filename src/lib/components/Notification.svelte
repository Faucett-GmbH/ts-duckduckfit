<script lang="ts" module>
	interface NotificationProps {
		notification: Notification;
	}
</script>

<script lang="ts">
	import { removeNotification, type Notification } from '$lib/state/notifications.svelte';
	import CircleX from 'lucide-svelte/icons/circle-x';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import Info from 'lucide-svelte/icons/info';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let { notification }: NotificationProps = $props();

	function onDelete() {
		removeNotification(notification.id);
	}
</script>

<button
	class="m-1 flex flex-grow cursor-pointer flex-row items-center px-3 py-2 shadow"
	class:bg-green-600={notification.type === 'success'}
	class:bg-red-600={notification.type === 'error'}
	class:bg-blue-600={notification.type === 'info'}
	class:bg-yellow-600={notification.type === 'warning'}
	onclick={onDelete}
>
	<div class="mr-2 h-6 w-6 text-white">
		{#if notification.type === 'error'}
			<CircleX />
		{:else if notification.type === 'success'}
			<CircleCheck />
		{:else if notification.type === 'info'}
			<Info />
		{:else if notification.type === 'warning'}
			<TriangleAlert />
		{/if}
	</div>
	<div class="flex-grow text-left text-white">{notification.message}</div>
</button>
