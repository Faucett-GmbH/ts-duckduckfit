<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	type SignInForm = {
		username: string;
		usernameConfirm: string;
	};

	const createSuite = () =>
		create((data: Partial<SignInForm> = {}, fields: string[]) => {
			if (!fields.length) {
				return;
			}
			only(fields);

			test('username', m.errors_message_required(), () => {
				enforce(data.username).isNotBlank();
			});
			test('usernameConfirm', m.errors_message_required(), () => {
				enforce(data.usernameConfirm).isNotBlank();
			});
			test('usernameConfirm', m.errors_message_mismatch(), () => {
				enforce(data.usernameConfirm).equals(data.username);
			});
		});
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import classNames from 'vest/classnames';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '$lib/components/InputResults.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { signUp } from '$lib/state/userDocument.svelte';
	import { handleError } from '$lib/error';

	let username = $state('');
	let usernameConfirm = $state('');
	let suite = createSuite();
	let result = $state(suite.get());
	let loading = $state(false);
	let disabled = $derived(loading);
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
		suite({ username, usernameConfirm }, Array.from(fields)).done((r) => {
			result = r;
		});
		fields.clear();
	}, 300);
	function validateAll() {
		fields.add('username');
		fields.add('usernameConfirm');
		validate();
		validate.flush();
	}
	function onChange(e: Event & { currentTarget: HTMLInputElement | HTMLSelectElement }) {
		fields.add(e.currentTarget.name);
		validate();
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			username = username.trim();
			usernameConfirm = usernameConfirm.trim();
			validateAll();
			if (result.isValid()) {
				await signUp(username);
				await goto(`${base}/`);
			}
		} catch (error) {
			handleError(error);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{m.auth_sign_up()}</title>
</svelte:head>

<div class="flex flex-grow flex-col justify-end p-4 sm:justify-start">
	<div class="card mx-auto my-10 flex w-full flex-shrink flex-col sm:w-72">
		<h1>{m.auth_sign_up()}</h1>
		<p>
			<span>{m.auth_already_have_an_account()}</span>
			<a href={`${base}/signin`} class="text-blue-500 underline">{m.auth_sign_in()}</a>
		</p>
		<form onsubmit={onSubmit}>
			<div class="mb-2">
				<label for="username">{m.auth_username_label()}</label>
				<input
					class="w-full {cn('username')}"
					type="text"
					name="username"
					autocomplete="username"
					placeholder={m.auth_username_placeholder()}
					bind:value={username}
					oninput={onChange}
				/>
				<InputResults name="username" {result} />
			</div>
			<div class="mb-2">
				<label for="usernameConfirm">{m.auth_username_confirm_label()}</label>
				<input
					class="w-full {cn('usernameConfirm')}"
					type="text"
					name="usernameConfirm"
					placeholder={m.auth_username_confirm_placeholder()}
					bind:value={usernameConfirm}
					oninput={onChange}
				/>
				<InputResults name="usernameConfirm" {result} />
			</div>
			<div class="flex flex-row justify-end">
				<button type="submit" class="btn primary flex flex-shrink" {disabled}>
					{#if loading}<div class="mr-2 flex flex-row justify-center">
							<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
						</div>{/if}
					{m.auth_sign_up()}
				</button>
			</div>
		</form>
	</div>
</div>
