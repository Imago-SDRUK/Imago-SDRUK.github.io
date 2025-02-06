import { getJobs } from '$lib/utils/server.js'

export const entries = async () => {
	const jobs = await getJobs()
	return jobs.map((job) => ({ filename: job.slug }))
}
