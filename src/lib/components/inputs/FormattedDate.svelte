<script lang="ts" module>
	import { type Locale } from '$lib/paraglide/runtime';
	export interface FormattedDateProps {
		date: Date;
		locale: Locale;
	}
</script>

<script lang="ts">
	import { format } from 'date-fns';
	import { enUS, de, es } from 'date-fns/locale';
	let { date, locale }: FormattedDateProps = $props();

	let fmtLocale = enUS;

	if (locale == 'de') {
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
