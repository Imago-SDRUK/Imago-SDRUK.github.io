import { env } from '$env/dynamic/private'
import type {
	MastodonActor,
	MastodonItem,
	MastodonPayload,
	MastodonPublicKeyResponse,
	MastodonRequest
} from '$lib/types/mastodon'
import { error } from '@sveltejs/kit'
import { DateTime } from 'luxon'
import { createHash, createSign, createVerify, constants, verify } from 'node:crypto'

export const content_type_headers = `application/activity+json, application/activity+ld`

export const loadKey = (key: string) => Buffer.from(key, 'base64').toString()

export function hashSHA256(data: string) {
	return createHash('sha256').update(data).digest('base64')
}

export function generateDigitalSignature(data: string): string {
	const private_key = loadKey(env.RSA_PRIVATE_KEY)
	const sign = createSign('RSA-SHA256')
	sign.update(data)
	const result = sign.sign(
		{
			key: private_key,
			padding: constants.RSA_PKCS1_PADDING
		},
		'base64'
	)
	return result
}

export function validateDigitalSignature(
	data: string,
	receivedSignature: string,
	key = loadKey(env.RSA_PUBLIC_KEY)
): boolean {
	const verify = createVerify('RSA-SHA256')
	verify.update(data)
	return verify.verify(key, receivedSignature, 'base64')
}

export function validateMastodonSignature(
	signature_string: string,
	receivedSignature: string,
	key: string | undefined = env.RSA_PUBLIC_KEY
): boolean {
	console.log(`checking ${signature_string}`)
	console.log(`agains ${receivedSignature}`)
	const result = verify(
		'sha256',
		Buffer.from(signature_string),
		{
			key: key,
			padding: constants.RSA_PKCS1_PADDING
		},
		Buffer.from(receivedSignature, 'base64')
	)
	return result
}

function buildSignatureString(req: Request, headerList: string[]) {
	return headerList
		.map((header) => {
			if (header === '(request-target)') {
				return `${header}: ${req.method.toLowerCase()} ${new URL(req.url).pathname}`
			}
			const value = req.headers.get(header.toLowerCase())
			if (!value) throw new Error(`Missing header: ${header}`)
			return `${header}: ${value}`
		})
		.join('\n')
}

export const verifyMastodonRequest = async (
	request: Request,
	fetch: typeof globalThis.fetch
): Promise<{ data: MastodonRequest; valid: boolean }> => {
	const data = await request.json().catch((err) => {
		console.log(err)
		error(400, { message: `This is not a valid request`, id: '' })
	})
	const signature_header = request.headers.get('signature')
	if (!signature_header) error(401, { message: `You're not authorised to do this`, id: '' })
	const signature_params: { keyId: string; algorithm: string; headers: string; signature: string } =
		Object.fromEntries(
			signature_header.split(/,/g).map((p) => p.split(/="/, 2).map((s) => s.replace(/"/g, '')))
		)
	if (
		!signature_params.keyId ||
		!signature_params.algorithm ||
		!signature_params.headers ||
		!signature_params.signature
	) {
		error(401, { message: `You're not authorised to do this`, id: '' })
	}
	const res = await fetch(signature_params.keyId, {
		headers: { Accept: 'application/activity+json' }
	})
	const public_key_response = (await res.json()) as MastodonPublicKeyResponse
	const public_key = public_key_response.publicKey.publicKeyPem
	const built_signature_string = buildSignatureString(request, signature_params.headers.split(' '))
	const verified = validateDigitalSignature(
		built_signature_string,
		signature_params.signature,
		public_key
	)
	if (!verified) {
		error(401, { message: `You're not authorised to do this`, id: '' })
	}
	const digest_header = request.headers.get('digest')
	if (!digest_header) {
		error(401, { message: `You're not authorised to do this`, id: '' })
	}
	const digest = createHash('sha256').update(JSON.stringify(data)).digest('base64')

	if (digest_header !== `SHA-256=${digest}`) {
		error(401, { message: `You're not authorised to do this`, id: '' })
	}
	return {
		data,
		valid: true
	}
}

export const generateNote = ({
	id,
	content,
	endpoint,
	user,
	hostname
}: {
	id: string
	content: string
	user: string
	endpoint: string
	hostname: string
}): MastodonItem => ({
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
	id: `${endpoint}/users/${user}/statuses/${id}`,
	type: 'Note',
	summary: null,
	inReplyTo: null,
	published: '2025-03-31T14:44:05Z',
	url: `${endpoint}/@${user}/${id}`,
	attributedTo: `${endpoint}/users/${user}`,
	to: ['https://www.w3.org/ns/activitystreams#Public'],
	cc: [`${endpoint}/users/${user}/followers`],
	sensitive: false,
	atomUri: `${endpoint}/users/${user}/statuses/${id}`,
	inReplyToAtomUri: null,
	conversation: `tag:${hostname},2025-03-31:objectId=205339:objectType=Conversation`,
	content: content,
	contentMap: { en: content },
	attachment: [],
	tag: [],
	replies: {
		id: `${endpoint}/users/${user}/statuses/${id}/replies`,
		type: 'Collection',
		first: {
			type: 'CollectionPage',
			next: `${endpoint}/users/${user}/statuses/${id}/replies?only_other_accounts=true\u0026page=true`,
			partOf: `${endpoint}/users/${user}/statuses/${id}/replies`,
			items: []
		}
	},
	likes: {
		id: `${endpoint}/users/${user}/statuses/${id}/likes`,
		type: 'Collection',
		totalItems: 0
	},
	shares: {
		id: `${endpoint}/users/${user}/statuses/${id}/shares`,
		type: 'Collection',
		totalItems: 0
	}
})

export const generateStatus = ({
	id,
	content,
	endpoint,
	user,
	hostname
}: {
	id: string
	content: string
	user: string
	endpoint: string
	hostname: string
}): MastodonItem => ({
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
	id: `${endpoint}/users/${user}/statuses/${id}`,
	type: 'Note',
	summary: null,
	inReplyTo: null,
	published: '2025-03-31T14:44:05Z',
	url: `${endpoint}/@${user}/${id}`,
	attributedTo: `${endpoint}/users/${user}`,
	to: ['https://www.w3.org/ns/activitystreams#Public'],
	cc: [`${endpoint}/users/${user}/followers`],
	sensitive: false,
	atomUri: `${endpoint}/users/${user}/statuses/${id}`,
	inReplyToAtomUri: null,
	conversation: `tag:${hostname},2025-03-31:objectId=205339:objectType=Conversation`,
	content: content,
	contentMap: { en: content },
	attachment: [],
	tag: [],
	replies: {
		id: `${endpoint}/users/${user}/statuses/${id}/replies`,
		type: 'Collection',
		first: {
			type: 'CollectionPage',
			next: `${endpoint}/users/${user}/statuses/${id}/replies?only_other_accounts=true\u0026page=true`,
			partOf: `${endpoint}/users/${user}/statuses/${id}/replies`,
			items: []
		}
	},
	likes: {
		id: `${endpoint}/users/${user}/statuses/${id}/likes`,
		type: 'Collection',
		totalItems: 0
	},
	shares: {
		id: `${endpoint}/users/${user}/statuses/${id}/shares`,
		type: 'Collection',
		totalItems: 0
	}
})

export const generateReply = ({
	id,
	content,
	endpoint,
	user,
	hostname
}: {
	id: string
	content: string
	user: string
	endpoint: string
	hostname: string
}): MastodonItem => ({
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
	id: `${endpoint}/users/${user}/statuses/${id}`,
	type: 'Note',
	summary: null,
	inReplyTo: null,
	published: '2025-03-31T14:44:05Z',
	url: `${endpoint}/@${user}/${id}`,
	attributedTo: `${endpoint}/users/${user}`,
	to: ['https://www.w3.org/ns/activitystreams#Public'],
	cc: [`${endpoint}/users/${user}/followers`],
	sensitive: false,
	atomUri: `${endpoint}/users/${user}/statuses/${id}`,
	inReplyToAtomUri: null,
	conversation: `tag:${hostname},2025-03-31:objectId=205339:objectType=Conversation`,
	content: content,
	contentMap: { en: content },
	attachment: [],
	tag: [],
	replies: {
		id: `${endpoint}/users/${user}/statuses/${id}/replies`,
		type: 'Collection',
		first: {
			type: 'CollectionPage',
			next: `${endpoint}/users/${user}/statuses/${id}/replies?only_other_accounts=true\u0026page=true`,
			partOf: `${endpoint}/users/${user}/statuses/${id}/replies`,
			items: []
		}
	},
	likes: {
		id: `${endpoint}/users/${user}/statuses/${id}/likes`,
		type: 'Collection',
		totalItems: 0
	},
	shares: {
		id: `${endpoint}/users/${user}/statuses/${id}/shares`,
		type: 'Collection',
		totalItems: 0
	}
})

export const generateOutbox = ({
	endpoint,
	user,
	notes
}: {
	hostname: string
	endpoint: string
	user: string
	notes?: MastodonItem[]
}) => ({
	'@context': 'https://www.w3.org/ns/activitystreams',
	id: `${endpoint}/users/${user}/outbox`,
	type: 'OrderedCollection',
	totalItems: 2,
	first: `${endpoint}/users/${user}/outbox?page=true`,
	last: `${endpoint}/users/${user}/outbox?min_id=0\u0026page=true`,
	orderedItems: notes
})

export const getIncomingActorInformation = async (url: string, fetch: typeof globalThis.fetch) => {
	const res_actor = await fetch(url, {
		headers: { Accept: 'application/activity+json' }
	}).catch((err) => {
		console.log(err)
		error(400, { message: `Coudln't get the actor information`, id: '' })
	})
	const actor = await res_actor.json()
	return actor as MastodonActor
}

export const createHeaders = ({
	payload,
	endpoint,
	user
}: {
	hostname: string
	endpoint: string
	user: string
	payload: MastodonPayload
}) => {
	const payload_hash = hashSHA256(JSON.stringify(payload))
	const host_header = `toot.artgp.xyz`
	const date_header = DateTime.now().toHTTP()
	const digest_header = `SHA-256=${payload_hash}`
	const to_sign = [
		`(request-target): post ${new URL(payload.object.actor).pathname}/inbox`,
		`host: ${host_header}`,
		`date: ${date_header}`,
		`digest: ${digest_header}`,
		`Content-Type: application/activity+json`
	].join('\n')
	const signature_header = generateDigitalSignature(to_sign)
	const signatureParams = {
		keyId: `${endpoint}/@${user}#main-key`,
		algorithm: 'rsa-sha256',
		headers: '(request-target) host date digest content-type',
		signature: signature_header
	}
	const headers = {
		Host: host_header,
		Date: date_header,
		Digest: digest_header,
		Signature: [
			`keyId="${signatureParams.keyId}"`,
			`algorithm="${signatureParams.algorithm}"`,
			`headers="${signatureParams.headers}"`,
			`signature="${signature_header}"`
		].join(','),
		Algorithm: 'rsa-sha256',
		'Content-Type': 'application/activity+json'
	}
	return headers
}
