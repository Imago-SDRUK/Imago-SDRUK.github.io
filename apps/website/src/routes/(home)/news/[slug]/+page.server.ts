import { handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'
import type { PageServerLoadEvent } from './$types.js'
export const load = async ({ locals, params }: PageServerLoadEvent) => {
	const article = await locals.directus
		.request(
			readItems('articles', {
				filter: {
					_and: [
						{
							slug: {
								_eq: params.slug
							},
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
				fields: [
					'*',
					{ sections: [{ article_sections_id: ['*', { content: ['*'] }] }] },
					{ user_created: ['first_name', 'last_name'] }
				]
			})
		)
		.catch(handleDirectusError)
	return {
		article
	}
}
