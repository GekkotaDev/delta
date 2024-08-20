import { paraglide } from "@inlang/paraglide-sveltekit/vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { SvelteKitPWA } from "@vite-pwa/sveltekit"
import { FontaineTransform } from "fontaine"
import AutoImport from "unplugin-auto-import/vite"
import Icons from "unplugin-icons/vite"
import { purgePolyfills } from "unplugin-purge-polyfills"
import Components from "unplugin-svelte-components/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [
		AutoImport({
			eslintrc: {
				enabled: true,
			},

			imports: [
				{
					from: "@tanstack/svelte-query",
					imports: [
						"createQuery",
						"createQueries",
						"createInfiniteQuery",
						"createMutation",
						"useQueryClient",
						"useIsFetching",
						"uesIsMutating",
					],
				},
				{
					from: "neverthrow",
					imports: [
						"Result",
						"ResultAsync",
						"err",
						"errAsync",
						"ok",
						"okAsync",
						"safeTry",
					],
				},
				{
					from: "ts-patterns",
					imports: ["match", "P"],
				},
			],

			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.md$/, // .md
				/\.svelte$/, // .svelte
			],

			dirs: ["./src/lib/global", "./src/lib/types"],
		}),

		Components({
			dirs: [
				"./src/lib/components",
				"./src/lib/components/ui",
				"./src/lib/providers",
			],
		}),

		paraglide({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
		}),

		sveltekit(),

		SvelteKitPWA(),

		Icons({
			autoInstall: true,
			compiler: "svelte",
		}),

		FontaineTransform.vite({
			fallbacks: [
				/* Declare fallback fonts */
			],
		}),

		/*
      Automatically purge dependencies from he who shall not be named from your
      bundle and replace them with native equivalents.
     */
		purgePolyfills.vite({}),
	],

	test: {
		globals: true,
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
})
