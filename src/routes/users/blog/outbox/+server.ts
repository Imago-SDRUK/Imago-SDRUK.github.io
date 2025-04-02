import { env } from '$env/dynamic/private'
import { json } from '@sveltejs/kit'
const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER
const status_id = env.MASTODON_STATUS_ID

export const GET = async () => {
	const data = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${endpoint}/users/${user}/outbox`,
		type: 'OrderedCollection',
		totalItems: 2,
		first: `${endpoint}/users/${user}/outbox?page=true`,
		last: `${endpoint}/users/${user}/outbox?min_id=0\u0026page=true`,
		orderedItems: [
			{
				'@context': [
					'https://www.w3.org/ns/activitystreams',
					{
						ostatus: 'http://ostatus.org#',
						atomUri: 'ostatus:atomUri',
						inReplyToAtomUri: 'ostatus:inReplyToAtomUri',
						conversation: 'ostatus:conversation',
						sensitive: 'as:sensitive',
						toot: 'http://joinmastodon.org/ns#',
						votersCount: 'toot:votersCount'
					}
				],
				id: `${endpoint}/users/${user}/statuses/${status_id}`,
				type: 'Note',
				summary: null,
				inReplyTo: null,
				published: '2025-03-31T14:44:05Z',
				url: `${endpoint}/@${user}/${status_id}`,
				attributedTo: `${endpoint}/users/${user}`,
				to: ['https://www.w3.org/ns/activitystreams#Public'],
				cc: [`${endpoint}/users/${user}/followers`],
				sensitive: false,
				atomUri: `${endpoint}/users/${user}/statuses/${status_id}`,
				inReplyToAtomUri: null,
				conversation: `tag:${hostname},2025-03-31:objectId=205339:objectType=Conversation`,
				content: '\u003cp\u003ehello test this!\u003c/p\u003e',
				contentMap: { en: '\u003cp\u003ehello test this!\u003c/p\u003e' },
				attachment: [],
				tag: [],
				replies: {
					id: `${endpoint}/users/${user}/statuses/114257575666845615/replies`,
					type: 'Collection',
					first: {
						type: 'CollectionPage',
						next: `${endpoint}/users/${user}/statuses/${status_id}/replies?only_other_accounts=true\u0026page=true`,
						partOf: `${endpoint}/users/${user}/statuses/${status_id}/replies`,
						items: []
					}
				},
				likes: {
					id: `${endpoint}/users/${user}/statuses/${status_id}/likes`,
					type: 'Collection',
					totalItems: 0
				},
				shares: {
					id: `${endpoint}/users/${user}/statuses/${status_id}/shares`,
					type: 'Collection',
					totalItems: 0
				}
			},
			{
				'@context': [
					'https://www.w3.org/ns/activitystreams',
					{
						ostatus: 'http://ostatus.org#',
						atomUri: 'ostatus:atomUri',
						inReplyToAtomUri: 'ostatus:inReplyToAtomUri',
						conversation: 'ostatus:conversation',
						sensitive: 'as:sensitive',
						toot: 'http://joinmastodon.org/ns#',
						votersCount: 'toot:votersCount'
					}
				],
				id: `${endpoint}/users/${user}/statuses/${status_id}`,
				type: 'Note',
				summary: null,
				inReplyTo: null,
				published: '2025-03-31T14:44:05Z',
				url: `${endpoint}/@${user}/${status_id}`,
				attributedTo: `${endpoint}/users/${user}`,
				to: ['https://www.w3.org/ns/activitystreams#Public'],
				cc: [`${endpoint}/users/${user}/followers`],
				sensitive: false,
				atomUri: `${endpoint}/users/${user}/statuses/${status_id}`,
				inReplyToAtomUri: null,
				conversation: `tag:${hostname},2025-03-31:objectId=205339:objectType=Conversation`,
				content: '\u003cp\u003ehello test this!\u003c/p\u003e',
				contentMap: { en: '\u003cp\u003ehello test this!\u003c/p\u003e' },
				attachment: [],
				tag: [],
				replies: {
					id: `${endpoint}/users/${user}/statuses/114257575666845615/replies`,
					type: 'Collection',
					first: {
						type: 'CollectionPage',
						next: `${endpoint}/users/${user}/statuses/${status_id}/replies?only_other_accounts=true\u0026page=true`,
						partOf: `${endpoint}/users/${user}/statuses/${status_id}/replies`,
						items: []
					}
				},
				likes: {
					id: `${endpoint}/users/${user}/statuses/${status_id}/likes`,
					type: 'Collection',
					totalItems: 0
				},
				shares: {
					id: `${endpoint}/users/${user}/statuses/${status_id}/shares`,
					type: 'Collection',
					totalItems: 0
				}
			}
		]
	}
	return json(data, { headers: { 'Content-Type': 'application/activity+json' } })
}
