// import { directus } from '$lib/directus'
// import { verifyCookie } from '$lib/utils/cookies'
import { jstr } from '$lib/utils/data'
import { directusSDK } from '$lib/utils/directus'
import { getId, log } from '@arturoguzman/art-ui'
import { type Handle } from '@sveltejs/kit'

// export const crawlers = [
// 	'Googlebot',
// 	'Googlebot-Image',
// 	'Googlebot-News',
// 	'Storebot-Google',
// 	'Google-InspectionTool',
// 	'GoogleOther'
// ]

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.directus = directusSDK(event.fetch)
	const response = await resolve(event)
	if (!event.url.pathname.includes('/assets')) {
		log({ response: response, event: event, status: response.status })
	}
	return response
}

export const handleError = async ({ event, status, message, error }) => {
	console.log(jstr(error))
	log({ status: status, event: event, content: message })
	return {
		id: getId(),
		message: status === 404 ? `This page does not exist!` : 'Whoops!'
		// errorId
	}
}
