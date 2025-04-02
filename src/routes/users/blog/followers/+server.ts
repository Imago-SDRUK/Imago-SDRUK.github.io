import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { DateTime } from 'luxon'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER
const post_id = '1dff22b5faf3fbebc5aaf2bb5b5dbe2c'

const example = {
	'@context': 'https://www.w3.org/ns/activitystreams',
	id: `${endpoint}/users/${user}/followers`,
	type: 'OrderedCollection',
	totalItems: 0,
	first: `${endpoint}/users/${user}/followers?page=1`
}

export const GET = async () => {
	const data = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${endpoint}/users/${user}/followers`,
		type: 'OrderedCollection',
		totalItems: 0,
		first: `${endpoint}/users/${user}/followers?page=1`
	}

	return json(data, { headers: { 'Content-Type': 'application/activity+json' } })
}
