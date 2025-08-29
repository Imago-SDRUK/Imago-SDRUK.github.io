import { getTimeFilter, handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'

export async function load({ locals, url }) {
	const events = await locals.directus
		.request(
			readItems('events', {
				sort: '-date_end',
				filter: {
					_and: [
						{
							status: {
								_eq: 'published'
							}
						},
						{
							//@ts-expect-error ok ok ok
							date_end: getTimeFilter(url)
						}
					]
				}
			})
		)
		.catch(handleDirectusError)
	return {
		events
	}
}
