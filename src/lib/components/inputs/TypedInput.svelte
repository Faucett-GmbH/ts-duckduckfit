<script lang="ts" module>
	const NUMERIC_RE = /[^0-9,.]+/;

	export interface TypedInputProps {
		class?: string;
		id?: string;
		name?: string;
		unit?: string;
		tabindex?: number;
		disabled?: boolean;
		value?: number | string;
		oninput?: (value: number, name?: string) => void;
		onchange?: (value: number, name?: string) => void;
	}
</script>

<script lang="ts">
	import { getNumbers } from '$lib/state/settings.svelte';
	import { selectElementContents } from '$lib/util';
	import type { EventHandler } from 'svelte/elements';
	import AutosizeInput from './AutosizeInput.svelte';

	let {
		class: className = '',
		id,
		name,
		unit,
		tabindex,
		disabled,
		value = $bindable(),
		oninput,
		onchange
	}: TypedInputProps = $props();

	let inputElement = $state<HTMLElement>();
	const onFocus: EventHandler<Event, HTMLSpanElement> = (e) => {
		selectElementContents(inputElement!);
	};

	const onChange: EventHandler<Event, HTMLSpanElement> = (e) => {
		oninput?.(valueNumber, name);
	};

	const onInput: EventHandler<KeyboardEvent, HTMLSpanElement> = (e) => {
		onchange?.(valueNumber, name);
	};

	let valueNumber: number;
	$effect(() => {
		value = ((value ?? 0) + '').replace(NUMERIC_RE, '');
		const newValueNumber = getNumbers().parse(value);
		if (isNaN(newValueNumber)) {
			value = '0';
		} else {
			valueNumber = newValueNumber;
		}
	});
</script>

<span {tabindex} role="textbox" onfocuscapture={onFocus} class="cursor-text {className}"
	><AutosizeInput
		bind:inputElement
		{id}
		{name}
		{disabled}
		bind:value
		onchange={onChange}
		oninput={onInput}
	/>{#if unit}<span class="badge dark ms-1 inline p-1">{unit}</span>{/if}</span
>
