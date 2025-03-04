import { readItems } from '@directus/sdk'

export async function load({ locals }) {
	const jobs = await locals.directus.request(readItems('careers'))
	return {
		jobs
	}
}
