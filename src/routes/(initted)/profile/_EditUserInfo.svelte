<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type EditUserInfoProps = {
		info: UserInformation | null;
		onUpdate(updates: EditUserInfoForm): void;
	};

	export type EditUserInfoForm = {
		birthdate: Date | null;
		sex: 'male' | 'female' | null;
		height: number | null;
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
			omitWhen(!data.height, () => {
				test('height', m.errors_message_required(), () => {
					enforce(data.height).isNotBlank();
				});
			});
			omitWhen(!data.sex, () => {
				test('sex', m.errors_message_required(), () => {
					enforce(data.sex).isNotBlank();
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
	import type { UserInformation } from '$lib/state/user.svelte';

	let { info, onUpdate }: EditUserInfoProps = $props();

	let birthdateString = $state(info?.birthdate?.toISOString().substring(0, 10));
	let heightValue = $state(info?.height || 0);
	let sex = $state(info?.sex || 'male');
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
		birthdateString = info?.birthdate?.toISOString().substring(0, 10) || birthdateString;
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
		fields.add('height');
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
			bind:metricValue={heightValue}
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
