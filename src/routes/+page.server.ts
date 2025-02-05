import type { Post } from '$lib/types/index.js'

export const prerender = true

export const load = async ({ fetch }) => {
	const response = await fetch('/api/v1/posts')
	const posts: Post[] = await response.json()
	return {
		posts
	}
}
