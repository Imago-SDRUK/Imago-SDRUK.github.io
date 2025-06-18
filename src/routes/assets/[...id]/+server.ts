import { assetEndpoint } from '@arturoguzman/art-ui'
import { directusSDKWithToken, handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'
import { env } from '$env/dynamic/private'
// export const prerender = true
// export const entries = async () => {
// 	const entries = await directusSDKWithToken(env.BACKEND_TOKEN)
// 		.request(readItems('team_members'))
// 		.catch(handleDirectusError)
// 	return entries
// 		.filter((event) => event.slug !== null)
// 		.map((event) => ({ id: String(event.picture) }))
// }

export const GET = async ({ fetch, params }) => {
	return assetEndpoint(params.id, `${env.BACKEND_URL}/assets`, fetch, undefined, env.BACKEND_TOKEN)
}
