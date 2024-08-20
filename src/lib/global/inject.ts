import { getContext, setContext } from "svelte"

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type, @typescript-eslint/no-wrapper-object-types
interface ContextKey<_> extends Symbol {}

/**
 * Lightweight type safe Context API wrapper for dependency injection.
 *
 * @param setup Store constructor.
 *
 * @returns Provider and injector
 */
export const createInjectable = <Store>(setup: () => Store) => {
	const key = Symbol() as ContextKey<Store>

	const provide = () => setContext(key, setup())
	const inject = () => getContext<Store>(key)

	return [provide, inject] as const
}
