// import { env } from '$env/dynamic/private'
import { BACKEND_TOKEN } from '$env/static/private'
import { directusSDKWithToken, handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'
export const prerender = true
export const entries = async () => {
	const entries = await directusSDKWithToken(BACKEND_TOKEN)
		.request(readItems('careers'))
		.catch(handleDirectusError)
	return entries
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
