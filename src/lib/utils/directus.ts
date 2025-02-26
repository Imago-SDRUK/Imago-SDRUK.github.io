import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private'
import type { Collections } from '$lib/types/directus'
import { rest, staticToken, type FetchInterface, createDirectus } from '@directus/sdk'

export const directusSDK = (fetch?: FetchInterface) => {
	return createDirectus<Collections>(DIRECTUS_URL, fetch ? { globals: { fetch: fetch } } : {})
		.with(rest())
		.with(staticToken(DIRECTUS_TOKEN))
}

export const directusSDKWithToken = (token: string, fetch?: FetchInterface) => {
	return createDirectus<Collections>(DIRECTUS_URL, fetch ? { globals: { fetch: fetch } } : {})
		.with(rest())
		.with(staticToken(token))
}
