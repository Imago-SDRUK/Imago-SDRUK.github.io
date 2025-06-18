import { env } from '$env/dynamic/private'
import { directusSDKWithToken, handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'
// export const prerender = true
// export const entries = async () => {
// 	const events = await directusSDKWithToken(env.BACKEND_TOKEN)
// 		.request(readItems('events'))
// 		.catch(handleDirectusError)
// 	return events
// 		.filter((event) => event.slug !== null)
// 		.map((event) => ({ slug: String(event.slug) }))
// }

export async function load({ locals, params }) {
	const events = await locals.directus.request(
		readItems('events', { filter: { _and: [{ slug: { _eq: params.slug } }] } })
	)
	return {
		events: events[0]
	}
}
