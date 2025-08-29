import { handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'

export async function load({ locals }) {
	const page = locals.directus.request(
		readItems('pages', {
			fields: [
				'title',
				'type',
				'slug',
				'status',
				{
					sections: [
						'*',
						{
							sections_id: [
								'title',
								'status',
								'subtitle',
								'description',
								'design',
								'columns',
								{ left_column: [{ blocks_id: ['*', { media: [{ directus_files_id: ['*'] }] }] }] },
								{ right_column: [{ blocks_id: ['*', { media: [{ directus_files_id: ['*'] }] }] }] },
								{ content: [{ blocks_id: ['*', { media: [{ directus_files_id: ['*'] }] }] }] }
							]
						}
					]
				}
			],
			filter: {
				_and: [
					{
						status: {
							_eq: 'published'
						}
					},
					{
						slug: {
							_eq: 'about'
						}
					}
				]
			}
		})
	)
	const team_members = locals.directus.request(readItems('team_members')).catch(handleDirectusError)
	return {
		page: (await page) as Page,
		team_members: await team_members
	}
}
