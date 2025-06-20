<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type EditUserInfoProps = {
		birthdate: Date | null;
		heightInCm: number | null;
		onUpdate(updates: EditUserInfoForm): void;
	};

	export type EditUserInfoForm = {
		heightInCm: number | null;
		birthdate: Date | null;
	};

	const createSuite = () =>
		create((data: Partial<EditUserInfoForm> = {}, fields: string[]) => {
			only(fields);

			omitWhen(!data.birthdate, () => {
				test('birthdate', m.errors_message_required(), () => {
					enforce(data.birthdate).isNotBlank();
				});
			});
			omitWhen(!data.heightInCm, () => {
				test('heightInCm', m.errors_message_required(), () => {
					enforce(data.heightInCm).isNotBlank();
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
	import MeasurementInput, { type Units } from '$lib/components/inputs/MeasurementInput.svelte';

	let { birthdate, heightInCm, onUpdate }: EditUserInfoProps = $props();

	let birthdateString = $state(birthdate?.toISOString().substring(0, 10));
	let heightInCmValue = $state(heightInCm || 0);
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

	$effect(() => {
		heightInCmValue = heightInCm || heightInCmValue;
	});
	$effect(() => {
		birthdateString = birthdate?.toISOString().substring(0, 10) || birthdateString;
	});

	const fields = new Set<string>();
	const validate = debounce(() => {
		suite({ birthdate, heightInCm: heightInCmValue }, Array.from(fields)).done((r) => {
			result = r;
		});
		fields.clear();
	}, 300);
	export function validateAll() {
		fields.add('birthdate');
		fields.add('heightInCm');
		validate();
		validate.flush();
	}
	function onMeasurementChange(
		_metricValue: number,
		_metricUnits: Units<'METRIC', any>,
		name?: string
	) {
		if (!name) {
			return;
		}
		fields.add(name);
		validate();
	}
	function onBirthdateChange(e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }) {
		birthdate = new Date(birthdateString || '');
		fields.add('birthdate');
		validate();
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			validateAll();
			if (result.isValid()) {
				onUpdate({ birthdate, heightInCm: heightInCmValue });
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

<form class="flex flex-col" onsubmit={onSubmit}>
	<div class="flex flex-col flex-grow mb-2">
		<label for="heightInCm">{m.user_info_height_label()}</label>
		<MeasurementInput
			class={cn('heightInCm')}
			name="heightInCm"
			type="distance"
			metricUnits={'cm'}
			bind:metricValue={heightInCmValue}
			oninput={onMeasurementChange}
		/>
		<InputResults name="heightInCm" {result} />
	</div>
	<div class="flex flex-col flex-grow mb-2">
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
	<div class="flex flex-row flex-shrink justify-end">
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
