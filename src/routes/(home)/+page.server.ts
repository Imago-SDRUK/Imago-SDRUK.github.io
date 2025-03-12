import { createItem, readItems } from '@directus/sdk'

export const prerender = true

export const load = async ({ locals }) => {
	return {
		team_members: await locals.directus.request(readItems('team_members')),
		careers: await locals.directus.request(readItems('careers')),
		events: await locals.directus.request(readItems('events'))
	}
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
