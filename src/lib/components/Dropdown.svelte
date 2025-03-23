<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DropdownProps {
		name?: string;
		className?: string;
		anchorPosition?: Position;
		position?: Position;
		open?: boolean;
		closeOnClickOutside?: boolean;
		button: Snippet<[]>;
		children: Snippet<[]>;
	}
</script>

<script lang="ts">
	import Popup, { type Position } from './Popup.svelte';

	let {
		name = '',
		className = '',
		anchorPosition,
		position,
		open = $bindable(false),
		closeOnClickOutside = true,
		button,
		children
	}: DropdownProps = $props();

	function toggle(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		open = !open;
	}

	let anchor = $state<HTMLDivElement>();
</script>

<div class="static flex min-w-fit flex-col {className}" bind:this={anchor}>
	<div
		aria-label={name}
		class="flex min-w-fit flex-grow items-center justify-center"
		onpointerdown={toggle}
	>
		{@render button()}
	</div>
	<Popup {anchor} {anchorPosition} {position} {closeOnClickOutside} {children} bind:open />
</div>
