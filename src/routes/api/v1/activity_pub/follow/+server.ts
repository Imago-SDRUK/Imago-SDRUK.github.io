import type { MastodonFollowRequest } from '$lib/types/mastodon.js'
import { createHeaders, getIncomingActorInformation } from '$lib/utils/mastodon'
import { jstr } from '@arturoguzman/art-ui'
import { error, json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { createItem } from '@directus/sdk'
import { handleDirectusError } from '$lib/utils/directus.js'
import slugify from '@sindresorhus/slugify'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export async function POST({ locals, request }) {
	//NOTE: make this internal only
	const data = (await request.json()) as MastodonFollowRequest
	const actor = await getIncomingActorInformation(data.actor, fetch)
	await locals.directus
		.request(
			createItem('mastodon_followers', {
				id: slugify(actor.id),
				actor_id: actor.id,
				actor: actor,
				following: false,
				public_key: actor.publicKey.publicKeyPem
			})
		)
		.catch(handleDirectusError)
	const payload = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${endpoint}/@${user}#accepts/follows/${new URL(actor.url).hostname}@${actor.name}`,
		type: 'Accept',
		actor: `${endpoint}/@${user}`,
		object: data
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
