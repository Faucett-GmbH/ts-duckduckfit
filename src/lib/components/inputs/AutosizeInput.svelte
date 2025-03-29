<script lang="ts" module>
	export interface AutosizeInputProps {
		class?: string;
		id?: string;
		name?: string;
		tabindex?: number;
		disabled?: boolean;
		value?: string | number;
		inputElement?: HTMLSpanElement;
		oninput?: EventHandler<KeyboardEvent, HTMLSpanElement>;
		onchange?: EventHandler<Event, HTMLSpanElement>;
	}
</script>

<script lang="ts">
	import { scrollIntoViewIfNeed, waitMS } from '$lib/util';
	import type { EventHandler } from 'svelte/elements';

	let {
		class: className = '',
		id,
		name,
		tabindex,
		disabled,
		value = $bindable(),
		inputElement = $bindable(),
		oninput,
		onchange
	}: AutosizeInputProps = $props();

	let innerText = $state((value ?? '') + '');

	$effect(() => {
		value = innerText;
	});

	const onFocus: EventHandler<FocusEvent, HTMLSpanElement> = async (e) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		await waitMS(300);
		if (inputElement) {
			scrollIntoViewIfNeed(inputElement);
		}
	};
	const onInput: EventHandler<KeyboardEvent, HTMLSpanElement> = (e) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		oninput?.(e);
	};
	const onBlur: EventHandler<FocusEvent, HTMLSpanElement> = (e) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		onchange?.(e);
	};
</script>

<span
	class="inline-block border-none p-0 m-0 text-nowrap bg-transparent outline-none focus:outline-none {className}"
	class:pointer-events-none={disabled}
	{id}
	{name}
	{tabindex}
	role="textbox"
	aria-disabled={disabled}
	contenteditable="true"
	bind:this={inputElement}
	bind:innerText
	onfocuscapture={onFocus}
	onkeyup={onInput}
	onblurcapture={onBlur}
></span>

<style lang="postcss">
	@reference "tailwindcss";

	.disabled {
		pointer-events: none;
	}
</style>
