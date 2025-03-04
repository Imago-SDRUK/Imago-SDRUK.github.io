import type { Job } from '$lib/types/index.js'
import { handleDirectusError } from '$lib/utils/directus.js'
import { EMAIL_REGEX } from '$lib/utils/regex.js'
import { createItem } from '@directus/sdk'
import { fail } from '@sveltejs/kit'

// export const prerender = true

export const load = async ({ fetch }) => {
	// const response = await fetch('/api/v1/jobs')
	// const jobs: Job[] = await response.json()
	// return {
	// 	jobs
	// }
}

// export const actions = {
// 	newsletter: async ({ locals, request }) => {
// 		const form = await request.formData()
// 		const email = form.get('email')
// 		if (!email) return fail(400, { message: `You need to provide an email.` })
// 		if (EMAIL_REGEX.test(String(email)) === false)
// 			return fail(400, { message: `You need to provide a valid email.` })
// 		// await locals.directus
// 		// 	.request(createItem('contacts', { email: String(email) }))
// 		// 	.catch(handleDirectusError)
// 		return {
// 			message: `You've been added to the Newsletter!`
// 		}
// 	}
// }
