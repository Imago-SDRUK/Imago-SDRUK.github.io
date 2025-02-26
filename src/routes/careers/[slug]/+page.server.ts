import { readItems } from '@directus/sdk'

export async function load({ locals, params }) {
	const jobs = await locals.directus.request(
		readItems('careers', { filter: { _and: [{ slug: { _eq: params.slug } }] } })
	)
	return {
		jobs: jobs[0]
	}
}
