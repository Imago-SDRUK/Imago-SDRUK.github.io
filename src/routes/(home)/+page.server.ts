import { handleDirectusError } from '$lib/utils/directus.js'
import { EMAIL_REGEX } from '$lib/utils/regex.js'
import { createItem, readItems } from '@directus/sdk'
import { fail } from '@sveltejs/kit'

// export const prerender = true

export const load = async ({ locals }) => {
	return {
		team_members: await locals.directus
			.request(readItems('team_members'))
			.catch(handleDirectusError),
		careers: await locals.directus.request(readItems('careers')).catch(handleDirectusError),
		events: await locals.directus.request(readItems('events')).catch(handleDirectusError)
	}
}

export const actions = {
	newsletter: async ({ locals, request }) => {
		const form = await request.formData()
		const name = form.get('name')
		const email = form.get('email')
		if (!email) return fail(400, { message: `You need to provide an email.` })
		if (EMAIL_REGEX.test(String(email)) === false)
			return fail(400, { message: `You need to provide a valid email.` })
		const formatted_name = name?.toString().split(' ')
		await locals.directus
			.request(
				createItem('contacts', {
					email: String(email),
					first_name: Array.isArray(formatted_name) ? formatted_name[0] : formatted_name,
					last_name: Array.isArray(formatted_name) ? formatted_name[1] : null
				})
			)
			.catch(handleDirectusError)
		return {
			message: `You've been added to the Newsletter!`
		}
	}
}
