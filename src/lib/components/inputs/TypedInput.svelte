<script lang="ts" module>
	const NUMERIC_RE = /[^0-9,.]+/;

	export interface TypedInputProps {
		class?: string;
		id?: string;
		name?: string;
		unit?: string;
		tabindex?: number;
		disabled?: boolean;
		value?: string;
		oninput?: EventHandler<Event, HTMLSpanElement>;
		onchange?: EventHandler<Event, HTMLSpanElement>;
	}
</script>

<script lang="ts">
	import { language } from '$lib/states/language.svelte';
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
		value = $bindable(''),
		oninput,
		onchange
	}: TypedInputProps = $props();

	let inputElement = $state<HTMLElement>();
	const onFocus: EventHandler<Event, HTMLSpanElement> = (e) => {
		selectElementContents(inputElement!);
	};

	$effect(() => {
		value = value.replace(NUMERIC_RE, '');
		const newValueNumber = language.numbers.parse(value);
		if (isNaN(newValueNumber)) {
			value = '';
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
		{oninput}
		{onchange}
	/>{#if unit}<span class="badge dark ms-1 inline p-1">{unit}</span>{/if}</span
>
