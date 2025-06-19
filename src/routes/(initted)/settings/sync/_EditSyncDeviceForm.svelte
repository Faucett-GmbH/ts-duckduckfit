<script lang="ts" module>
	import { create, test, enforce, only, type SuiteResult } from 'vest';

	export type EditSyncDeviceFormProps = {
		name: string;
	};

	export type EditSyncDeviceForm = {
		name: string;
	};

	const createSuite = () =>
		create((data: Partial<EditSyncDeviceForm> = {}, fields: string[]) => {
			if (!fields.length) {
				return;
			}
			only(fields);

			test('name', m.errors_message_required(), () => {
				enforce(data.name).isNotBlank();
			});
		});
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import classNames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '$lib/components/InputResults.svelte';

	let { name = $bindable() }: EditSyncDeviceFormProps = $props();

	let suite = createSuite();
	let result = $state(suite.get());
	let cn = $derived(
		classNames(result, {
			untested: 'untested',
			tested: 'tested',
			invalid: 'invalid',
			valid: 'valid',
			warning: 'warning'
		})
	);

	const fields = new Set<string>();
	const validate = debounce(() => {
		return new Promise<SuiteResult<string, string>>((resolve) => {
			suite({ name }, Array.from(fields)).done((r) => {
				result = r;
				resolve(r);
			});
			fields.clear();
		});
	}, 300);
	export function validateAll() {
		fields.add('name');
		validate();
		return validate.flush();
	}
	function onChange(e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }) {
		fields.add(e.currentTarget.name);
		validate();
	}
</script>

<div class="mb-2">
	<label for="name">{m.sync_device_name_label()}</label>
	<input class="w-full {cn('name')}" name="name" type="text" bind:value={name} oninput={onChange} />
	<InputResults name="name" {result} />
</div>
