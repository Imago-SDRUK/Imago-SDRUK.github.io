import { FEEDS } from '$lib/globals/data'

export function match(param: string) {
	return FEEDS.includes(param)
}
