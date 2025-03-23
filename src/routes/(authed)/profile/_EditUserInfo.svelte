<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type EditUserInfoProps = {
		birthdate: Date | null;
		onUpdate(updates: EditUserInfoForm): void;
	};

	export type EditUserInfoForm = {
		birthdate: Date | null;
	};

	const createSuite = () =>
		create((data: Partial<EditUserInfoForm> = {}, fields: string[]) => {
			if (!fields.length) {
				return;
			}
			only(fields);

			omitWhen(!data.birthdate, () => {
				test('birthdate', m.errors_message_required(), () => {
					enforce(data.birthdate).isNotBlank();
				});
			});
		});
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import classNames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '$lib/components/InputResults.svelte';
	import { handleError } from '$lib/error';

	let { birthdate, onUpdate }: EditUserInfoProps = $props();

	let birthdateString = $state(birthdate?.toISOString().substring(0, 10));
	let suite = createSuite();
	let result = $state(suite.get());
	let loading = $state(false);
	let disabled = $derived(loading || !result.isValid());
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
		suite({ birthdate }, Array.from(fields)).done((r) => {
			result = r;
		});
		fields.clear();
	}, 300);
	export function validateAll() {
		fields.add('birthdate');
		validate();
		validate.flush();
	}
	function onChange(e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }) {
		fields.add(e.currentTarget.name);
		validate();
	}
	function onBirthdateChange(e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }) {
		birthdate = new Date(birthdateString || '');
		onChange(e);
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			validateAll();
			if (result.isValid()) {
				onUpdate({ birthdate } as never);
				suite.reset();
				result = suite.get();
			}
		} catch (error) {
			handleError(error);
		} finally {
			loading = false;
		}
	}
</script>

<form class="flex flex-row" onsubmit={onSubmit}>
	<div class="flex flex-col flex-grow">
		<label for="birthdate">{m.user_info_birthdate_label()}</label>
		<input
			class="w-full {cn('birthdate')}"
			type="date"
			name="birthdate"
			autocomplete="bday"
			bind:value={birthdateString}
			oninput={onBirthdateChange}
		/>
		<InputResults name="birthdate" {result} />
	</div>
	<div class="flex flex-col flex-shrink ms-2 justify-end">
		<button type="submit" class="btn primary flex flex-shrink" {disabled}>
			{#if loading}
				<div class="mr-2 flex flex-row justify-center">
					<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
				</div>
			{/if}
			{m.user_info_update()}
		</button>
	</div>
</form>
