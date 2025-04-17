import { env } from '$env/dynamic/private'
import { getArticleContent, handleDirectusError } from '$lib/utils/directus.js'
import { generateNote } from '$lib/utils/mastodon.js'
import { readItem } from '@directus/sdk'
import { json } from '@sveltejs/kit'

const hostname = env.MASTODON_HOSTNAME
const endpoint = `https://${hostname}`
const user = env.MASTODON_USER

export const GET = async ({ params, locals }) => {
	const article = await locals.directus
		.request(readItem('articles', params.status_id, { filter: { status: { _eq: 'published' } } }))
		.catch(handleDirectusError)
	const content = getArticleContent(article)
	const note = generateNote({
		id: article.id,
		published: String(article.date_created),
		// published: String(DateTime.fromISO(String(article.date_created)).toHTTP()),
		content,
		user: user,
		endpoint,
		hostname
	})
	return json(note, { headers: { 'Content-Type': 'application/activity+json' } })
}
