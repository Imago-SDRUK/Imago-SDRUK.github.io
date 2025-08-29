import { verifyMastodonRequest } from '$lib/utils/mastodon.js'
import { json } from '@sveltejs/kit'

export const GET = async ({ request, fetch }) => {
	const valid = await verifyMastodonRequest(request, fetch)
	return json(valid)
}

export const POST = async ({ request, fetch }) => {
	const { data, valid } = await verifyMastodonRequest(request, fetch)
	console.log(`Mastodon request is valid: ${valid}`)
	fetch(`/api/v1/activity-pub/${data.type.toLowerCase()}`, {
		method: 'POST',
		body: JSON.stringify(data)
	})
	return json(
		{ message: 'ok' },
		{
			headers: {
				'Content-Type': 'accept:application/activity+json'
			}
		}
	)
}
