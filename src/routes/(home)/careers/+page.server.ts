import { readItems } from '@directus/sdk'

export async function load({ locals }) {
	const careers = await locals.directus.request(
		readItems('careers', {
			sort: '-closing_date',
			filter: {
				_and: [
					{
						status: {
							_eq: 'published'
						}
					},
					{ status: { _eq: 'published' } },
					{
						closing_date: {
							//@ts-expect-error this does exist - syntax "_gte": "$NOW(+3 days)"
							_gte: '$NOW'
						}
					}
				]
			}
		})
	)
	return {
		careers
	}
}
