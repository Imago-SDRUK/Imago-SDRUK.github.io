import { FEEDS } from '$lib/globals/data.js'
import { readItems } from '@directus/sdk'
import { Feed } from 'feed'
import { DateTime } from 'luxon'
const title = 'Imago - Smart Data Research UK'
const url = 'https://imago.ac.uk/'
export const prerender = true
export const entries = async () => {
	return FEEDS.map((entry) => ({ feeds: entry }))
}
export const GET = async ({ locals }) => {
	const feed = new Feed({
		title: title,
		description:
			'Imago unlocks the potential of satellite imagery to provide a much richer understanding of urgent challenges facing the UK.',
		id: url,
		link: url,
		language: 'en',
		favicon: `${url}favicon.png`,
		copyright: `Copyright ${new Date().getFullYear().toString()}, ${title}`,
		generator: '',
		feedLinks: {
			rss: `${url}rss.xml`
		},
		author: {
			name: 'Imago team',
			email: '',
			link: url
		},
		ttl: 60
	})
	const careers = await locals.directus.request(
		readItems('careers', { fields: ['slug', 'title', 'content', 'date_created', 'date_updated'] })
	)
	const events = await locals.directus.request(
		readItems('events', { fields: ['slug', 'title', 'content', 'date_created', 'date_updated'] })
	)
	careers.forEach((post) => {
		feed.addItem({
			title: post.title,
			description: String(post.content),
			content: String(post.content),
			link: `${url}careers/${post.slug}`,
			author: [
				{
					name: 'Imago team',
					email: '',
					link: url
				}
			],
			date: DateTime.fromISO(String(post.date_created)).toJSDate()
		})
	})
	events.forEach((post) => {
		feed.addItem({
			title: post.title,
			description: String(post.content),
			content: String(post.content),
			link: `${url}events/${post.slug}`,
			author: [
				{
					name: 'Imago team',
					email: '',
					link: url
				}
			],
			date: DateTime.fromISO(String(post.date_created)).toJSDate()
		})
	})
	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	})
}
