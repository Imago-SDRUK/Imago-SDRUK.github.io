import { getTimeFilter, handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'

export async function load({ locals, url }) {
	const articles = await locals.directus
		.request(
			readItems('articles', {
				filter: {
					_and: [
						{
							status: {
								_eq: 'published'
							}
						}
					]
				},
				deep: {
					sections: {
						_filter: {
							article_sections_id: {
								status: {
									_eq: 'published'
								}
							}
						}
					}
				},
				fields: ['*', { sections: [{ article_sections_id: ['*', { content: ['*'] }] }] }]
			})
		)
		.catch(handleDirectusError)
	return {
		articles
	}
}
