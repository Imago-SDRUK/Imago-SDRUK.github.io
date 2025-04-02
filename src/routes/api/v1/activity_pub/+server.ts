import type {
	MastodonAcceptRequest,
	MastodonActor,
	MastodonFollowRequest
} from '$lib/types/mastodon.js'
import type { RequestEvent } from './$types'
import { generateDigitalSignature, hashSHA256 } from '$lib/utils/mastodon'
import { DateTime } from 'luxon'
import { jstr } from '@arturoguzman/art-ui'
import { error, json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

const getIncomingActorInformation = async (url: string, fetch: RequestEvent['fetch']) => {
	const res_actor = await fetch(url, {
		headers: { Accept: 'application/activity+json' }
	}).catch((err) => {
		console.log(err)
		error(400, { message: `Coudln't get the actor information`, id: '' })
	})
	const actor = await res_actor.json()
	return actor as MastodonActor
}

const createHeaders = (payload: MastodonAcceptRequest) => {
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

export async function POST({ request }) {
	const data = (await request.json()) as MastodonFollowRequest
	const actor = await getIncomingActorInformation(data.actor, fetch)
	const payload = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${endpoint}/@${user}#accepts/follows/${new URL(actor.url).hostname}@${actor.name}`,
		type: 'Accept',
		actor: `${endpoint}/@${user}`,
		object: data
	}
	const headers = createHeaders(payload)
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
