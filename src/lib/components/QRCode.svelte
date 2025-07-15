<script lang="ts" module>
	export interface QRCodeProps {
		text: string;
		size?: number;
	}
</script>

<script lang="ts">
	import { toCanvas } from 'qrcode';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let { text, size = 256 }: QRCodeProps = $props();

	let canvas = $state<HTMLCanvasElement>();
	let loading = $state(false);

	$effect(() => {
		loading = true;
		toCanvas(canvas, text, { width: size }).finally(() => {
			loading = false;
		});
	});
</script>

<div class="flex h-full w-full flex-grow flex-row justify-center" hidden={!loading}>
	<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
</div>
<canvas
	title={text}
	class="h-full w-full"
	class:hidden={loading}
	bind:this={canvas}
	width={size}
	height={size}
	style="width:{size}px;height:{size}px;"
></canvas>
