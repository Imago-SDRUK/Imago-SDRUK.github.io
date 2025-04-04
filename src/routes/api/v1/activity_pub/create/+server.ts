import type { MastodonFollowRequest, MastodonReplyRequest } from '$lib/types/mastodon.js'
import { createHeaders, getIncomingActorInformation } from '$lib/utils/mastodon'
import { jstr } from '@arturoguzman/art-ui'
import { error, json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { createItem } from '@directus/sdk'
import { handleDirectusError } from '$lib/utils/directus.js'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export async function POST({ locals, request }) {
	//NOTE: make this internal only
	const data = (await request.json()) as MastodonReplyRequest
	const actor = await getIncomingActorInformation(data.actor, fetch)
	const reply = await locals.directus
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

	const example = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: 'https://maho.dev/socialweb/replies/4f2756ff205d2e4b15e5c65c17f961e5?page=true',
		partOf: 'https://maho.dev/socialweb/replies/4f2756ff205d2e4b15e5c65c17f961e5',
		type: 'CollectionPage',
		items: ['https://dotnet.social/users/SmartmanApps/statuses/111910545030985527']
	}
	const headers = createHeaders({ payload, endpoint, user, hostname })
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
