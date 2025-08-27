import { handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, params }) {
	const jobs = await locals.directus
		.request(
			readItems('careers', {
				filter: {
					_and: [
						{ slug: { _eq: params.slug } },
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
		.catch(handleDirectusError)
	if (jobs.length === 0) {
		redirect(307, '/')
	}
	return {
		jobs: jobs[0]
	}
}
