// import { env } from '$env/dynamic/private'
import { BACKEND_TOKEN } from '$env/static/private'
import { directusSDKWithToken, handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'
export const prerender = true
export const entries = async () => {
	const entries = await directusSDKWithToken(BACKEND_TOKEN)
		.request(readItems('team_members'))
		.catch(handleDirectusError)
	return entries
		.filter((event) => event.slug !== null)
		.map((event) => ({ slug: String(event.slug) }))
}

export async function load({ locals, params }) {
	const team_members = await locals.directus.request(
		readItems('team_members', { filter: { _and: [{ slug: { _eq: params.slug } }] } })
	)
	return {
		team_member: team_members[0]
	}
}
