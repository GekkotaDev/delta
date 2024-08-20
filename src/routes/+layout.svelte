<script>
	import { ParaglideJS } from "@inlang/paraglide-sveltekit"
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query"
	import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools"
	import { browser } from "$app/environment"
	import { i18n } from "$lib/i18n"

	import "../app.css"

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	})
</script>

<QueryClientProvider client={queryClient}>
	<ParaglideJS {i18n}>
		<slot></slot>
	</ParaglideJS>

	{#if import.meta.env.DEV}
		<SvelteQueryDevtools />
	{/if}
</QueryClientProvider>

<style global>
	body {
		/* 
      Uncomment to make window transparent.
     */
		/* background-color: transparent; */
	}
</style>
