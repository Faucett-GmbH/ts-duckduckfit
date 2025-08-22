import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv, type UserConfig } from 'vite';
import vitePluginWasm from 'vite-plugin-wasm';
import { networkInterfaces } from 'node:os';
import { readFileSync } from 'node:fs';

export default defineConfig(async ({ mode }) => {
	const isProd = mode === 'production' || !process.env.TAURI_ENV_DEBUG;

	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const packageJSON = JSON.parse(readFileSync(`${__dirname}/package.json`).toString('utf8'));

	const host = await getInternalIpV4();

	const define = {
		__VERSION__: JSON.stringify(packageJSON.version)
	};

	const config: UserConfig = {
		define,
		envPrefix: ['VITE_', 'TAURI_'],
		server: {
			host: '0.0.0.0',
			port: 5173,
			strictPort: true,
			hmr: host
				? {
						protocol: 'ws',
						host,
						port: 5183
					}
				: undefined,
			watch: {
				ignored: ['**/src-tauri/**']
			}
		},
		plugins: [
			vitePluginWasm(),
			tailwindcss(),
			sveltekit(),
			devtoolsJson(),
			paraglideVitePlugin({
				project: './project.inlang',
				outdir: './src/lib/paraglide',
				strategy: ['localStorage', 'preferredLanguage', 'baseLocale']
			})
		],
		build: {
			target:
				!process.env.TAURI_ENV_PLATFORM || process.env.TAURI_ENV_PLATFORM === 'windows'
					? 'chrome105'
					: 'safari13',
			minify: isProd ? 'esbuild' : false,
			sourcemap: !isProd
		},
		resolve: process.env.VITEST
			? {
					conditions: ['browser']
				}
			: undefined,
		test: {
			expect: { requireAssertions: true },
			projects: [
				{
					extends: './vite.config.ts',
					test: {
						name: 'server',
						environment: 'node',
						include: ['src/**/*.{test,spec}.{js,ts}'],
						exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
					}
				}
			]
		}
	};

	return config;
});

function getInternalIpV4() {
	if (process.env.TAURI_DEV_HOST) {
		return process.env.TAURI_DEV_HOST;
	}
	const nets = networkInterfaces();
	for (const networks of Object.values(nets)) {
		if (networks) {
			for (const net of networks) {
				const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
				if (net.family === familyV4Value && !net.internal) {
					return net.address;
				}
			}
		}
	}
	return '0.0.0.0';
}
