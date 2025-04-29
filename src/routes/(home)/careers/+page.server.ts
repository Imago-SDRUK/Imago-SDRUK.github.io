import { readItems } from '@directus/sdk'

export async function load({ locals }) {
	const careers = await locals.directus.request(readItems('careers', { sort: '-closing_date' }))
	return {
		careers
	}
}
