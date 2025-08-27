import type { MastodonReplyRequest } from '$lib/types/mastodon.js'
import { createHeaders, getIncomingActorInformation } from '$lib/utils/mastodon'
import { jstr } from '@arturoguzman/art-ui'
import { error, json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { createItem } from '@directus/sdk'
import { directusSDKWithToken, handleDirectusError } from '$lib/utils/directus.js'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export async function POST({ request }) {
	//NOTE: make this internal only
	const data = (await request.json()) as MastodonReplyRequest
	const actor = await getIncomingActorInformation(data.actor, fetch)
	const directus = directusSDKWithToken(env.BACKEND_TOKEN, fetch)
	const reply = await directus
		.request(
			createItem('mastodon_replies', {
				actor_id: actor.id,
				reply_url: data.object.id,
				post_url: data.object.inReplyTo,
				article: data.object.inReplyTo?.split('/')[-1]
			})
		)
		.catch(handleDirectusError)
	const payload = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${reply.post_url}?page=true`,
		partOf: reply.post_url,
		type: 'CollectionPage',
		items: [reply.reply_url as string]
	}
	const headers = createHeaders({ payload, endpoint, user })
	await fetch(actor.inbox, {
		method: 'POST',
		headers,
		body: JSON.stringify(payload)
	}).catch((err) => {
		console.log(jstr(err))
		error(400, { message: `There has been an error posting this request`, id: '' })
	})
	return json({ message: 'ok' })
}
