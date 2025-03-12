import { readItems } from '@directus/sdk'

export async function load({ locals }) {
	const team_members = await locals.directus.request(readItems('team_members'))
	return {
		team_members
	}
}
