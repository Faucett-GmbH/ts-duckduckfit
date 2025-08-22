import { resolve } from '$app/paths';
import icon256x256 from '$lib/assets/icon256x256.png';
import { json } from '@sveltejs/kit';

export const prerender = true;

export async function GET() {
	return json({
		name: 'DuckDuckFit',
		short_name: 'DuckDuckFit',
		description: 'DuckDuckFit: The Fitness App',
		version: '1.0',
		manifest_version: 3,
		icons: [
			{
				src: icon256x256,
				sizes: '256x256',
				type: 'image/png'
			}
		],
		id: `${resolve('/')}?source=pwa`,
		start_url: `${resolve('/')}?source=pwa`,
		scope: resolve('/'),
		display: 'standalone',
		background_color: 'white',
		theme_color: 'white'
	});
}
