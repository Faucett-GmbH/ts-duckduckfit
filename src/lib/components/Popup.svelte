<script lang="ts" module>
	export type Position =
		| 'top-left'
		| 'top-right'
		| 'bottom-right'
		| 'bottom-left'
		| 'top-center'
		| 'bottom-center';

	export interface PopupProps {
		anchor: Element;
		anchorPosition?: Position;
		position?: Position;
		open?: boolean;
		closeOnClickOutside?: boolean;
		children: Snippet<[]>;
	}
</script>

<script lang="ts">
	import { debounce } from '@aicacia/debounce';
	import { clickoutside } from '@svelte-put/clickoutside';
	import { tick, type Snippet } from 'svelte';
	import { portal } from 'svelte-portal';

	let {
		anchor,
		anchorPosition = 'bottom-right',
		position = 'top-right',
		open = $bindable(false),
		closeOnClickOutside = true,
		children
	}: PopupProps = $props();

	let child: HTMLElement;
	let offsetWidth: number = $state<number>(0);

	$effect(() => {
		if (anchor && child && open) {
			resize();
		}
	});

	async function resize() {
		if (!open) {
			return;
		}
		const anchorRect = anchor.getBoundingClientRect();
		child.style.top = child.style.left = child.style.bottom = child.style.right = '';
		await tick();
		switch (anchorPosition) {
			case 'top-left': {
				child.style.top = `${anchorRect.top}px`;
				child.style.left = `${anchorRect.left}px`;
				break;
			}
			case 'top-right': {
				child.style.top = `${anchorRect.top}px`;
				child.style.right = `${anchor.ownerDocument.body.offsetWidth - anchorRect.right}px`;
				break;
			}
			case 'top-center': {
				child.style.top = `${anchorRect.top}px`;
				child.style.left = `${anchorRect.left + anchorRect.width * 0.5 - offsetWidth * 0.5}px`;
				break;
			}
			case 'bottom-right': {
				child.style.top = `${anchorRect.bottom}px`;
				child.style.right = `${anchor.ownerDocument.body.offsetWidth - anchorRect.right}px`;
				break;
			}
			case 'bottom-left': {
				child.style.top = `${anchorRect.bottom}px`;
				child.style.left = `${anchorRect.left}px`;
				break;
			}
			case 'bottom-center': {
				child.style.top = `${anchorRect.bottom}px`;
				child.style.left = `${anchorRect.left + anchorRect.width * 0.5 - offsetWidth * 0.5}px`;
				break;
			}
		}
		await tick();
		const rect = child.getBoundingClientRect();
		if (rect.left < 0) {
			child.style.right = '';
			child.style.left = '0px';
		} else if (rect.right > anchor.ownerDocument.body.offsetWidth) {
			child.style.right = '0px';
			child.style.left = '';
		}
		if (rect.top < 0) {
			child.style.top = '0px';
		} else if (rect.top > anchor.ownerDocument.body.offsetHeight) {
			child.style.top = '';
			child.style.bottom = '0px';
		}
	}

	$effect(() => {
		const debouncedResize = debounce(resize, 0);
		window.addEventListener('resize', debouncedResize);
		document.addEventListener('scroll', debouncedResize, true);
		return () => {
			window.removeEventListener('resize', debouncedResize);
			document.removeEventListener('scroll', debouncedResize, true);
		};
	});

	function onClickOutside(e: Event) {
		e.stopPropagation();
		if (open) {
			open = false;
		}
	}
</script>

<div
	class="absolute z-20 flex max-h-full max-w-full flex-col border-gray-300 bg-gray-50 shadow-md transition-transform duration-75 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
	bind:this={child}
	bind:offsetWidth
	use:portal
	use:clickoutside={{ event: 'pointerdown', enabled: closeOnClickOutside }}
	onclickoutside={onClickOutside}
	role="menu"
	class:scale-0={!open}
	class:scale-100={open}
	class:origin-top-right={position === 'top-right'}
	class:origin-top-left={position === 'top-left'}
	class:origin-top={position === 'top-center'}
	class:origin-bottom-right={position === 'bottom-right'}
	class:origin-bottom-left={position === 'bottom-left'}
	class:origin-bottom={position === 'bottom-center'}
	tabindex="-1"
>
	{@render children()}
</div>
