import type { Job } from '$lib/types/index.js'

export const prerender = true

export const load = async ({ fetch }) => {
	const response = await fetch('/api/v1/jobs')
	const jobs: Job[] = await response.json()
	return {
		jobs
	}
}
