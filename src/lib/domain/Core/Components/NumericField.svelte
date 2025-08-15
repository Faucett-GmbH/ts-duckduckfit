<script lang="ts" module>
	export interface NumericFieldProps {
		id?: string;
		value: number | null;
		min?: number | undefined;
		max?: number | undefined;
		step?: number; // default increment
		precision?: number; // number of decimal places to display
		pageStep?: number | undefined; // PageUp/PageDown increment (defaults to 10*step)
		placeholder?: string | undefined;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;

		describedBy?: string;
		invalid?: boolean;

		inputClass?: string | undefined;

		// -------- callbacks --------
		onInput?: (v: number | null) => void;
		onChange?: (v: number | null) => void;
		onCommit?: (v: number | null) => void;
		onInvalid?: (msg: string) => void;
	}
</script>

<script lang="ts">
	let {
		id,
		value = $bindable<number | null>(null),
		min,
		max,
		step,
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		onInvalid = (msg: string) => {}
	}: NumericFieldProps = $props();

	let text = $state(valueToText(value));
	let inputEl: HTMLInputElement | null = null;

	// --- helpers ---
	function toNumber(s: string): number | null {
		if (!s || s.trim() === '') return null;
		const n = Number(s.replace(',', '.').trim());
		return Number.isFinite(n) ? n : null;
	}
	function valueToText(v: number | null) {
		return v == null || !Number.isFinite(v) ? '' : String(v);
	}
	function clamp(n: number) {
		if (min != null && n < min) n = min;
		if (max != null && n > max) n = max;
		return n;
	}
	function snap(n: number) {
		if (step == null || !(step > 0)) return n;
		const origin = min ?? 0;
		const k = Math.round((n - origin) / step);
		return origin + k * step;
	}
	function sanitize(n: number) {
		return clamp(snap(n));
	}

	function commit() {
		const parsed = toNumber(text);
		if (parsed === null) {
			// empty/invalid: // revert to previous
			text = valueToText(value);
			value = null;
			onInvalid('invalid value');
			return;
		}
		const fixed = sanitize(parsed);
		value = fixed;
		text = valueToText(fixed);
	}

	function nudge(delta: number) {
		if (disabled || readonly) return;
		const cur = toNumber(text) ?? value ?? 0;
		const next = sanitize(cur + (step ?? 1) * delta);
		value = next;
		text = valueToText(next);
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled || readonly) {
			return;
		}
		switch (e.key) {
			case 'ArrowUp':
				e.preventDefault();
				nudge(+1);
				break;
			case 'ArrowDown':
				e.preventDefault();
				nudge(-1);
				break;
			case 'Enter':
				e.preventDefault();
				commit();
				break;
			case 'Escape':
				e.preventDefault();
				text = valueToText(value);
				break;
		}
	}
</script>

<div data-component="NumericField">
	<input
		bind:this={inputEl}
		class="w-full min-w-[6rem] rounded border px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
		type="text"
		inputmode="decimal"
		{placeholder}
		{disabled}
		{readonly}
		aria-required={required}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={toNumber(text) ?? undefined}
		value={text}
		oninput={(e) => {
			text = (e.target as HTMLInputElement).value;
		}}
		onblur={commit}
		onkeydown={onKeydown}
	/>
</div>
