import { flushSync, mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import HeightInput, { type HumanLengthProps } from './HeightInput.svelte';

// TODO: add more robust component testing
// see: https://testing-library.com/docs/svelte-testing-library/example
test('HeightInput', () => {
	const onChangeHeight = (metricHeightValue: number) => {};
	var testProps: HumanLengthProps = {
		value: 187,
		system: 'metric',
		onChange: onChangeHeight
	};
	const heightInputComponent = mount(HeightInput, {
		target: document.body, // `document` exists because of jsdom
		props: testProps
	});

	expect(document.body.innerHTML).toContain('cm');

	unmount(heightInputComponent);
});
