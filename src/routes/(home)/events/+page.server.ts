import { readItems } from '@directus/sdk'

export async function load({ locals }) {
	const events = await locals.directus.request(readItems('events', { sort: '-date_end' }))
	return {
		events
	}
}
