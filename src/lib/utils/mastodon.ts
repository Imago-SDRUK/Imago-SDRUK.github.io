import { env } from '$env/dynamic/private'
import type { MastodonFollowRequest, MastodonPublicKeyResponse } from '$lib/types/mastodon'
import { error } from '@sveltejs/kit'
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
): Promise<{ data: MastodonFollowRequest; valid: boolean }> => {
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
