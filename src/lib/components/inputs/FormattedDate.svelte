<script lang="ts" module>
	export interface FormattedDateProps {
		date: Date;
	}
</script>

<script lang="ts">
	import { format } from 'date-fns';
	import { getLocale } from '$lib/state/settings.svelte';
	import { enUS, de, es } from 'date-fns/locale';

	let { date }: FormattedDateProps = $props();

	let locale = $state(getLocale());
	let fmtLocale = enUS;

	if (locale == 'en') {
		fmtLocale = enUS;
	} else if (locale == 'de') {
		fmtLocale = de;
	} else if (locale == 'es') {
		fmtLocale = es;
	} else {
		console.warn(`unavailable locale: ${locale}`);
	}

	function formatDate(date: Date) {
		return format(date, 'P', { locale: fmtLocale });
	}
</script>

{formatDate(date)}
