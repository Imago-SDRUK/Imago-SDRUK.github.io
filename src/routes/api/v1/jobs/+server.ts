import { getJobs } from '$lib/utils/server'
import { json } from '@sveltejs/kit'
export const prerender = true

export async function GET() {
	const jobs = await getJobs()
	return json(jobs)
}
