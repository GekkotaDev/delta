import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import jsdoc from "eslint-plugin-jsdoc"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import ts from "typescript-eslint"

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	jsdoc.configs["flat/recommended-typescript"],
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		ignores: ["build/", ".svelte-kit/", "dist/"],
	},
	{
		plugins: {
			"simple-import-sort": simpleImportSort,
		},

		rules: {
			"simple-import-sort/imports": "warn",
			"simple-import-sort/exports": "warn",

			"jsdoc/tag-lines": 0,
		},
	},
]
