import type { Job } from '$lib/types'

export async function getJobs() {
	const jobs: Job[] = []
	const paths = import.meta.glob('/src/lib/content/jobs/*.md', { eager: true })
	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Job, 'slug'>
			const job = { ...metadata, slug } satisfies Job
			jobs.push(job)
		}
	}
	return jobs
}
