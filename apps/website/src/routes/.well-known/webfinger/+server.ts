import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export const GET = async () => {
	const value = {
		subject: `acct:blog@imago.artgp.xyz`,
		aliases: [`${endpoint}/@blog`],
		links: [
			{
				rel: 'self',
				type: 'application/activity+json',
				href: `${endpoint}/@blog`
			},
			{
				rel: 'http://webfinger.net/rel/profile-page',
				type: 'text/html',
				href: `${endpoint}/@blog`
			}
		]
	}
	return json(value)
}
