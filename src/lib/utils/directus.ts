// import { env } from '$env/dynamic/private'
import type { Article, Collections } from '$lib/types/directus'
import { rest, staticToken, type FetchInterface, createDirectus } from '@directus/sdk'
import { jstr } from './data'
import { error } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

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
	return createDirectus<Collections>(env.BACKEND_URL, fetch ? { globals: { fetch: fetch } } : {})
		.with(rest())
		.with(staticToken(env.BACKEND_TOKEN))
}

export const directusSDKWithToken = (token: string, fetch?: FetchInterface) => {
	return createDirectus<Collections>(env.BACKEND_URL, fetch ? { globals: { fetch: fetch } } : {})
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

export const getTimeFilter = (url: URL): { _lte: string } | { _gte: string } | undefined => {
	const time_param = url.searchParams.get('time')
	if (!time_param) {
		return
	}
	if (time_param === 'all') {
		return
	}
	if (time_param === 'past') {
		return { _lte: '$NOW' }
	}
	if (time_param === 'current') {
		return { _gte: '$NOW(+2 weeks)' }
	}
	if (time_param === 'future') {
		return { _gte: '$NOW' }
	}
	return
}
