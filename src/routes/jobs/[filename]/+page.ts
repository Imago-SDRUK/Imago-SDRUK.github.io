import type { Job } from '$lib/types/index.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const job = await import(`$lib/content/jobs/${params.filename}.md`)

		return {
			content: job.default,
			meta: job.metadata as Job
		}
	} catch (err) {
		console.log(err)
		error(404, `Could not find ${params.filename}`)
	}
}
