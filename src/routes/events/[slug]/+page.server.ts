import { readItems } from '@directus/sdk'

export async function load({ locals, params }) {
	const events = await locals.directus.request(
		readItems('events', { filter: { _and: [{ slug: { _eq: params.slug } }] } })
	)
	return {
		events: events[0]
	}
}
