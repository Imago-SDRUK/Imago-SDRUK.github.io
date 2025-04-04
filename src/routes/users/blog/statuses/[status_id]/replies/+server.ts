import { env } from '$env/dynamic/private'
import { handleDirectusError } from '$lib/utils/directus.js'
import { readItem } from '@directus/sdk'
import { json } from '@sveltejs/kit'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export const GET = async ({ params, locals }) => {
	const article = await locals.directus
		.request(readItem('articles', params.status_id, { filter: { status: { _eq: 'published' } } }))
		.catch(handleDirectusError)
	const replies = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${endpoint}/users/${user}/statuses/${params.status_id}/replies?page=true`,
		partOf: `${endpoint}/users/${user}/statuses/${params.status_id}/replies`,
		type: 'CollectionPage',
		items: article.mastodon_replies
			?.filter((reply) => reply !== null)
			.map((reply) => reply.reply_url)
	}
	return json(replies, { headers: { 'Content-Type': 'application/activity+json' } })
}
