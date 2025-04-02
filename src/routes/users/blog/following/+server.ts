import { env } from '$env/dynamic/private'
import { json } from '@sveltejs/kit'
import { DateTime } from 'luxon'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export const GET = async () => {
	const data = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${endpoint}/users/${user}/following`,
		type: 'OrderedCollection',
		totalItems: 0,
		first: `${endpoint}/users/${user}/following?page=1`
	}

	return json(data, { headers: { 'Content-Type': 'application/activity+json' } })
}
