<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export type UserWeightFormProps = {
		weightInKg?: number;
		onSubmit(data: UserWeightFormValid): Promise<void> | void;
	};

	export type UserWeightFormForm = {
		weightInKg: number | null;
	};

	export type UserWeightFormValid = {
		weightInKg: number;
	};

	const createSuite = () =>
		create((data: Partial<UserWeightFormForm> = {}, fields: string[]) => {
			only(fields);

			test('weightInKg', m.errors_message_required(), () => {
				enforce(data.weightInKg).isNotBlank();
			});
		});
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import classNames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import InputResults from '$lib/components/InputResults.svelte';
	import MeasurementInput, { type Units } from '$lib/components/inputs/MeasurementInput.svelte';
	import { handleError } from '$lib/error';

	let { weightInKg = 0, onSubmit }: UserWeightFormProps = $props();

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
		suite({ weightInKg }, Array.from(fields)).done((r) => {
			result = r;
		});
		fields.clear();
	}, 300);
	export function validateAll() {
		fields.add('weightInKg');
		validate();
		validate.flush();
	}
	function onMeasurementChange(
		_metricValue: number,
		_metricUnits: Units<'metric', any>,
		name?: string
	) {
		if (!name) {
			return;
		}
		fields.add(name);
		validate();
	}

	async function onInternalSubmit(e: SubmitEvent) {
		e.preventDefault();
		try {
			loading = true;
			validateAll();
			if (result.isValid()) {
				await onSubmit({ weightInKg });
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

<form class="flex flex-row" onsubmit={onInternalSubmit}>
	<div class="flex flex-grow flex-col">
		<label for="weightInKg">{m.user_weights_weight_label()}</label>
		<MeasurementInput
			class={cn('weightInKg')}
			name="weightInKg"
			bind:metricValue={weightInKg}
			metricUnits="kg"
			oninput={onMeasurementChange}
		/>
		<InputResults name="weightInKg" {result} />
	</div>
	<div class="ms-2 flex flex-shrink flex-col justify-end">
		<button type="submit" class="btn primary flex flex-shrink" {disabled}>
			{#if loading}
				<div class="mr-2 flex flex-row justify-center">
					<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
				</div>
			{/if}
			{m.user_weights_weight_save()}
		</button>
	</div>
</form>
