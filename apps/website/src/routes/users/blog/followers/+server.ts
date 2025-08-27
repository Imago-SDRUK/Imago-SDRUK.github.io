import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { readItems } from '@directus/sdk'
import { handleDirectusError } from '$lib/utils/directus.js'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export const GET = async ({ locals }) => {
	const followers = await locals.directus
		.request(readItems('mastodon_followers'))
		.then((followers) => followers.map(({ actor_id }) => actor_id))
		.catch(handleDirectusError)
	const count = followers.length
	const data = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${endpoint}/users/${user}/followers`,
		type: 'OrderedCollection',
		totalItems: count,
		first: `${endpoint}/users/${user}/followers?page=1`,
		orderedItems: followers.filter((actor) => actor !== null)
	}
	return json(data, { headers: { 'Content-Type': 'application/activity+json' } })
}
