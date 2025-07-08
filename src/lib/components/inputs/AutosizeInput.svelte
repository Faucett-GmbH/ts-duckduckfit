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
	let lastValue = value;
	$effect(() => {
		if (lastValue !== value) {
			innerText = (value ?? '') + '';
			lastValue = value;
		}
	});

	$effect(() => {
		value = innerText;
	});

	const onFocus: EventHandler<FocusEvent, HTMLSpanElement> = async (e) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		await waitMS(0);
		if (inputElement) {
			scrollIntoViewIfNeed(inputElement);
		}
	};
	const onInput: EventHandler<KeyboardEvent, HTMLSpanElement> = (e) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		oninput?.(e);
	};
	const onBlur: EventHandler<FocusEvent, HTMLSpanElement> = (e) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		onchange?.(e);
	};
</script>

<span
	class={[
		'inline-block border-none p-0 m-0 text-nowrap bg-transparent outline-none focus:outline-none',
		className,
		disabled && 'pointer-events-none select-none opacity-50'
	]}
	{id}
	{name}
	{tabindex}
	role="textbox"
	aria-disabled={disabled}
	contenteditable="true"
	bind:this={inputElement}
	bind:innerText
	onfocuscapture={onFocus}
	onkeydown={onInput}
	onblurcapture={onBlur}
></span>
