import { env } from '$env/dynamic/private'
import { directusSDKWithToken, handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'

export const entries = async () => {
	const events = await directusSDKWithToken(env.BACKEND_TOKEN)
		.request(readItems('careers'))
		.catch(handleDirectusError)
	return events
		.filter((event) => event.slug !== null)
		.map((event) => ({ slug: String(event.slug) }))
}

export async function load({ locals, params }) {
	const jobs = await locals.directus.request(
		readItems('careers', { filter: { _and: [{ slug: { _eq: params.slug } }] } })
	)
	return {
		jobs: jobs[0]
	}
}
