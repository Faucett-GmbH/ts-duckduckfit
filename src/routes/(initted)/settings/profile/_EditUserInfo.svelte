<script lang="ts" module>
	import { create, test, enforce, only, omitWhen } from 'vest';

	export type EditUserInfoProps = {
		fullName: string | null;
		bio: string | null;
		onUpdate(updates: EditUserInfoForm): void;
	};

	export type EditUserInfoForm = {
		fullName: string | null;
		bio: string | null;
	};

	const createSuite = () =>
		create((data: Partial<EditUserInfoForm> = {}, fields: string[]) => {
			if (!fields.length) {
				return;
			}

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

	let { fullName, bio, onUpdate }: EditUserInfoProps = $props();

	let fullNameValue = $state(fullName || '');
	let bioValue = $state(bio || '');
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
		suite({ fullName, bio }, Array.from(fields)).done((r) => {
			console.log(r.isValid(), fullName, bio);
			result = r;
		});
		fields.clear();
	}, 300);

	export function validateAll() {
		fields.add('fullName');
		fields.add('bio');
		validate();
		validate.flush();
	}

	const onFullNameChange = async (
		e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }
	) => {
		fullName = fullNameValue;
		fields.add('fullName');
		validate();
	};

	const onBioChange = async (e: Event & { currentTarget: HTMLTextAreaElement }) => {
		bio = bioValue;
		fields.add('bio');
		validate();
	};

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			validateAll();
			if (result.isValid()) {
				onUpdate({ fullName, bio });
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
		<label for="fullName">{m.user_info_full_name_label()}</label>
		<input
			class="w-full {cn('fullName')}"
			type="text"
			name="fullName"
			placeholder={m.user_info_full_name_placeholder()}
			bind:value={fullNameValue}
			oninput={onFullNameChange}
		/>
		<InputResults name="fullName" {result} />
	</div>
	<div class="flex flex-col">
		<label for="bio">{m.user_info_bio_label()}</label>
		<textarea
			class="w-full {cn('bio')}"
			name="bio"
			placeholder={m.user_info_bio_placeholder()}
			bind:value={bioValue}
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
