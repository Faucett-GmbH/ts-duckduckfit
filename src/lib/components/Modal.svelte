<script lang="ts" module>
	export interface ModalProps {
		small?: boolean;
		open?: boolean;
		backdrop?: boolean;
		backgroundClose?: boolean;
		onClose?(): void;
		title?: Snippet;
		children: Snippet;
	}
</script>

<script lang="ts">
	import { portal } from 'svelte-portal';
	import X from 'lucide-svelte/icons/x';
	import { fade, fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		small = false,
		open = $bindable(false),
		backdrop = true,
		backgroundClose = backdrop,
		onClose = () => undefined,
		title,
		children
	}: ModalProps = $props();

	function close() {
		open = false;
		onClose();
	}

	let container = $state<HTMLElement | undefined>();
	function onClickOutside(e: Event) {
		if (!backgroundClose) {
			return;
		}
		if (container?.contains(e.target as Node)) {
			e.stopPropagation();
			return;
		}
		if (open) {
			open = false;
			onClose();
		}
	}
</script>

<div use:portal class="relative" role="dialog" aria-modal="true">
	{#if open}
		<div
			class="fixed inset-0 bg-black bg-opacity-25"
			class:hidden={backdrop ? !open : true}
			transition:fade={{ duration: 150 }}
		></div>
	{/if}
	{#if open}
		<div
			class="fixed inset-0 overflow-y-auto z-10"
			onpointerdown={onClickOutside}
			transition:fly={{ duration: 150, y: 300 }}
		>
			<div class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
				<div
					class="relative w-full rounded-lg bg-white shadow-lg sm:my-8 sm:max-w-lg dark:bg-gray-800"
					class:m-auto={small}
					bind:this={container}
				>
					<div class="flex flex-shrink flex-row items-start justify-between px-4 pt-4">
						<div class="flex flex-grow flex-col">
							{#if title}
								{@render title()}
							{/if}
						</div>
						<button class="btn danger icon" onclick={close}>
							<X />
						</button>
					</div>
					<div class="relative flex-grow flex-col px-4 pb-4 pt-0">
						{@render children()}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
