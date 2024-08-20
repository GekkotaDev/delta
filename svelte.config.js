import { mdsvex, escapeSvelte } from "mdsvex"
import adapter from "@sveltejs/adapter-static"
import { sveltePreprocess as preprocess } from "svelte-preprocess"
import { createHighlighter } from "shiki"

const theme = "material-theme-palenight"
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ["javascript", "typescript"],
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
			highlight: {
				highlighter: async (code, lang = "text") => {
					const html = escapeSvelte(
						highlighter.codeToHtml(code, { lang, theme }),
					)
					return `{@html \`${html}\` }`
				},
			},
		}),
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: "404.html",
		}),
	},

	extensions: [".svelte", ".svx"],
}

export default config
