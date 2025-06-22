<script lang="ts" module>
	import { type Sex } from '$lib/state/user.svelte';
	import { create, test, enforce, omitWhen } from 'vest';

	export type EditUserInfoProps = {
		username: string | null;
		fullName: string | null;
		bio: string | null;
		birthdate: Date | null;
		sex: Sex;
		height: number | null;
		measurementSystem: MeasurementSystemType;
		onUpdate(updates: EditUserInfoForm): void;
	};

	export type EditUserInfoForm = {
		username: string | null;
		fullName: string | null;
		bio: string | null;
		birthdate: Date | null;
		sex: Sex;
		height: number | null;
	};

	const createSuite = () =>
		create((data: Partial<EditUserInfoForm> = {}, fields: string[]) => {
			const usernameRegex = /^[a-z0-9_\.]+$/;

			if (!fields.length) {
				return;
			}

			omitWhen(!data.username, () => {
				test('username', m.errors_message_required(), () => {
					enforce(data.username).isNotBlank();
				});

				test('username', m.errors_message_must_be_so_long({ value: 3 }), () => {
					enforce(data.username).longerThanOrEquals(3);
				});

				test('username', m.errors_message_username(), () => {
					enforce(data.username).matches(usernameRegex);
				});
			});

			omitWhen(!data.fullName, () => {
				test('fullName', m.errors_message_required(), () => {
					enforce(data.fullName).isNotBlank();
				});
			});

			omitWhen(!data.bio, () => {
				test('bio', m.errors_message_required(), () => {
					enforce(data.bio).isNotBlank();
				});
			});

			omitWhen(!data.sex, () => {
				test('sex', m.errors_message_required(), () => {
					enforce(data.sex).isNotBlank();
					enforce(data.sex).inside(['male', 'female']);
				});
			});

			omitWhen(!data.birthdate, () => {
				test('birthdate', m.errors_message_required(), () => {
					enforce(data.birthdate).isNotBlank();
				});
			});

			omitWhen(!data.height, () => {
				test('height', m.errors_message_required(), () => {
					enforce(data.height).isNotBlank();
					enforce(data.height).greaterThan(0.0);
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
	import HeightInput from '$lib/components/inputs/HeightInput.svelte';
	import type { MeasurementSystemType } from '$lib/state/setttings.svelte';

	let {
		fullName,
		bio,
		username,
		birthdate,
		sex,
		height,
		measurementSystem,
		onUpdate
	}: EditUserInfoProps = $props();

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

	let birthdateString = $state(birthdate?.toISOString().substring(0, 10));
	$effect(() => {
		birthdateString = birthdate?.toISOString().substring(0, 10) || birthdateString;
	});

	const fields = new Set<string>();

	const validate = debounce(
		() =>
			new Promise<boolean>((resolve) => {
				suite({ fullName, bio, username, birthdate, sex, height }, Array.from(fields)).done((r) => {
					result = r;
					resolve(r.isValid());
				});
				fields.clear();
			}),
		300
	);

	export function validateAll() {
		fields.add('fullName');
		fields.add('bio');
		fields.add('username');
		fields.add('birthdate');
		fields.add('sex');
		fields.add('height');
		validate();
		return validate.flush();
	}

	const onFieldChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	> = (e) => {
		fields.add(e.currentTarget.name);
		validate();
	};

	const onBirthdateChange: ChangeEventHandler<HTMLInputElement> = () => {
		birthdate = new Date(birthdateString || '');
		fields.add('birthdate');
		validate();
	};

	function onChangeHeight(metricHeightValue: number) {
		height = metricHeightValue;
		fields.add('height');
		validate();
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			if (await validateAll()) {
				onUpdate({ fullName, bio, username, birthdate, sex, height });
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
	<!-- username -->
	<div class="flex flex-col flex-grow mb-2">
		<label for="username">{m.user_info_username_label()}</label>
		<input
			class="w-full {cn('username')}"
			type="text"
			name="username"
			placeholder={m.user_info_username_placeholder()}
			bind:value={username}
			oninput={onFieldChange}
		/>
		<InputResults name="username" {result} />
	</div>

	<!-- fullName -->
	<div class="flex flex-col flex-grow mb-2">
		<label for="fullName">{m.user_info_full_name_label()}</label>
		<input
			class="w-full {cn('fullName')}"
			type="text"
			name="fullName"
			placeholder={m.user_info_full_name_placeholder()}
			bind:value={fullName}
			oninput={onFieldChange}
		/>
		<InputResults name="fullName" {result} />
	</div>

	<!-- BIO -->
	<div class="flex flex-col flex-grow mb-2">
		<label for="bio">{m.user_info_bio_label()}</label>
		<textarea
			class="w-full {cn('bio')}"
			name="bio"
			placeholder={m.user_info_bio_placeholder()}
			bind:value={bio}
			oninput={onFieldChange}
		></textarea>
		<InputResults name="bio" {result} />
	</div>

	<!-- Sex -->
	<div class="mb-2">
		<label for="sex">{m.user_info_sex_label()}</label>
		<select class="w-full {cn('sex')}" name="sex" bind:value={sex} oninput={onFieldChange}>
			<option value="male">{m.user_info_sex_select_option_male()}</option>
			<option value="female">{m.user_info_sex_select_option_female()}</option>
		</select>
		<InputResults name="sex" {result} />
	</div>

	<!-- Birthdate -->
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

	<!-- height -->
	<div class="flex flex-col flex-grow mb-2">
		<label for="height">{m.user_info_height_label()}</label>

		<HeightInput value={height} system={measurementSystem} onChange={onChangeHeight} />
		<InputResults name="height" {result} />
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
