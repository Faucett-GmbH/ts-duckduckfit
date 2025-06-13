<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type EditUserInfoProps = {
		username: string | null;
		fullName: string | null;
		bio: string | null;
		onUpdate(updates: EditUserInfoForm): void;
	};

	export type EditUserInfoForm = {
		username: string | null;
		fullName: string | null;
		bio: string | null;
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
		});
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import classNames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '$lib/components/InputResults.svelte';
	import { handleError } from '$lib/error';

	let { fullName, bio, username, onUpdate }: EditUserInfoProps = $props();

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
		suite({ fullName, bio, username }, Array.from(fields)).done((r) => {
			result = r;
		});
		fields.clear();
	}, 300);

	export function validateAll() {
		fields.add('fullName');
		fields.add('bio');
		fields.add('username');
		validate();
		validate.flush();
	}

	const onChangeUsername = async (
		e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }
	) => {
		fields.add('username');
		validate();
	};

	const onFullNameChange = async (
		e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }
	) => {
		fields.add('fullName');
		validate();
	};

	const onBioChange = async (e: Event & { currentTarget: HTMLTextAreaElement }) => {
		fields.add('bio');
		validate();
	};

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			validateAll();
			if (result.isValid()) {
				onUpdate({ fullName, bio, username });
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
			oninput={onChangeUsername}
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
			oninput={onFullNameChange}
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
			oninput={onBioChange}
		></textarea>
		<InputResults name="bio" {result} />
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
