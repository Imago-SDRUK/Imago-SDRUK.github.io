import type { Post } from '$lib/types/index.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`$lib/content/jobs/${params.filename}.md`)

		return {
			content: post.default,
			meta: post.metadata as Post
		}
	} catch (err) {
		console.log(err)
		error(404, `Could not find ${params.filename}`)
	}
}
