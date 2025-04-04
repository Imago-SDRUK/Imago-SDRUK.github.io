// import { env } from '$env/dynamic/private'
import type { Article, Collections } from '$lib/types/directus'
import { rest, staticToken, type FetchInterface, createDirectus } from '@directus/sdk'
import { jstr } from './data'
import { error } from '@sveltejs/kit'
import { BACKEND_TOKEN, BACKEND_URL } from '$env/static/private'

export type DirectusError = {
	errors: [
		{
			message: string
			extensions: Record<string, string>
		}
	]
	response: {
		status: number
		statusText: string
		headers: Headers
		body: ReadableStream
		bodyUsed: boolean
		ok: boolean
		redirected: boolean
		type: string
		url: string
	}
}

export const directusSDK = (fetch?: FetchInterface) => {
	return createDirectus<Collections>(BACKEND_URL, fetch ? { globals: { fetch: fetch } } : {})
		.with(rest())
		.with(staticToken(BACKEND_TOKEN))
}

export const directusSDKWithToken = (token: string, fetch?: FetchInterface) => {
	return createDirectus<Collections>(BACKEND_URL, fetch ? { globals: { fetch: fetch } } : {})
		.with(rest())
		.with(staticToken(token))
}

export const handleDirectusError = (err: DirectusError) => {
	console.log(jstr(err))
	return error(err.response.status, { message: err.errors[0].message, id: err.response.url })
}

export const getArticleContent = (article: Article): string => {
	if (article.description) return article.description
	const content = article.sections
		?.map(({ article_sections_id }) =>
			article_sections_id && typeof article_sections_id !== 'string'
				? article_sections_id
				: undefined
		)
		.filter((section) => section !== undefined)
		.map(({ content }) => (content !== null ? content : undefined))
		.filter((content) => content !== undefined)
		.flatMap((content) =>
			content.map(({ content }) => content).filter((content) => content !== null)
		)
		.join(`\n`)
	if (content) return content
	return ''
}
