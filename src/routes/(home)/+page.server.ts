import { createItem, readItems } from '@directus/sdk'

export const prerender = true

export const load = async ({ locals }) => {
	const team_members = await locals.directus.request(readItems('team_members'))
	return {
		team_members
	}
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
