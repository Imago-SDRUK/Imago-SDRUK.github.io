import { getXMLUrl } from '$lib/utils/seo.js'
import { readItems } from '@directus/sdk'

export const prerender = true
const url = 'https://imago.ac.uk/'
const rss_feeds = ['rss', 'rss/careers', 'rss/events']
export async function GET({ locals }) {
	const careers = await locals.directus.request(readItems('careers', { fields: ['slug'] }))
	const events = await locals.directus.request(readItems('events', { fields: ['slug'] }))
	const team_members = await locals.directus.request(
		readItems('team_members', { fields: ['slug'] })
	)
	const base_url = getXMLUrl(url)
	const rss_feeds_urls = rss_feeds.map((_url) => getXMLUrl(`${url}${_url}`))
	const carrers_urls = careers.map((post) => getXMLUrl(`${url}careers/${post.slug}`))
	const events_url = events.map((post) => getXMLUrl(`${url}careers/${post.slug}`))
	const team_members_url = team_members.map((post) => getXMLUrl(`${url}about/team/${post.slug}`))
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
      ${base_url}
      ${rss_feeds_urls.join('')}
      ${carrers_urls.join('')}
      ${events_url.join('')}
      ${team_members_url.join('')}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	)
}
