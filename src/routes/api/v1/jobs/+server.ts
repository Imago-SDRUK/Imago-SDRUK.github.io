import { getJobs } from '$lib/utils/server'
import { readItems } from '@directus/sdk'
import { json } from '@sveltejs/kit'
export const prerender = true

export async function GET({ locals }) {
	const jobs = await locals.directus.request(readItems('careers'))
	return json(jobs)
	// const jobs = await getJobs()
	// return json(jobs)
}
