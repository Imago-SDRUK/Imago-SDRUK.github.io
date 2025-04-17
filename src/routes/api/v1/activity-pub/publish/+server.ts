import type {
	MastodonBroadcastNote,
	MastodonReplyRequest,
	MastodonRequestMetadata
} from '$lib/types/mastodon.js'
import { createHeaders, generateNote, getIncomingActorInformation } from '$lib/utils/mastodon'
import { jstr } from '@arturoguzman/art-ui'
import { error, json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { createItem } from '@directus/sdk'
import { handleDirectusError } from '$lib/utils/directus.js'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

// {
//   "@context": "https://www.w3.org/ns/activitystreams",
//   "id": "https://hachyderm.io/users/mapache/statuses/111876223052500122/activity",
//   "type": "Create",
//   "actor": "https://hachyderm.io/users/mapache",
//   "published": "2024-02-05T01:14:48Z",
//   "to": [
//       "https://www.w3.org/ns/activitystreams#Public"
//   ],
//   "cc": [
//       "https://hachyderm.io/users/mapache/followers",
//       "https://maho.dev/@blog"
//   ],
//     "object": {
//        <original note>
//     },
//     "signature": {
//         "type": "RsaSignature2017",
//         "creator": "https://hachyderm.io/users/mapache#main-key",
//         "created": "2024-02-05T01:14:48Z",
//         "signatureValue": "dYIs1ZFExg5LeqHrZ5o905/fDv7WGyxC71kl1Jjlq9kqSDjMlhXP3/159fgwF+ouJRjBWEOIUUAwHhHFmbcuMbqFNxxPZ1nQ6A10HSL8osb4CycUsTOtu0XoOp2x5eufB8dgsVqb8LfCOlpGyuNLewbAheqUN3mjO+QyaKQJ0PTRqxKt5gUcAlpkGYTGLx8f+b9dIwHUM9F4VzueWJ7UiVqOMxS1Lb7mXn2qmEyj3hN81W5jttHyUmQ+qB5nNjKc/u8eOGcV+p5yy/auCSq4im2JsvmwK4fCpsfC2gqSl4gRknTng8T/DAoVUbW1bQC5YJg14uqeEKN5QGkqZxWikA=="
//     }
// }

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
	const payload: MastodonBroadcastNote = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${reply.post_url}?page=true`,
		type: 'Create',
		actor: `${endpoint}/users/${user}`,
		to: ['https://www.w3.org/ns/activitystreams#Public'],
		cc: [],
		object: generateNote()
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
