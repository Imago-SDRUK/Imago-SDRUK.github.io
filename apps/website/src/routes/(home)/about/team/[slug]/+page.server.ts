import { readItems } from '@directus/sdk'

export async function load({ locals, params }) {
	const team_members = await locals.directus.request(
		readItems('team_members', { filter: { _and: [{ slug: { _eq: params.slug } }] } })
	)
	return {
		team_member: team_members[0]
	}
}
