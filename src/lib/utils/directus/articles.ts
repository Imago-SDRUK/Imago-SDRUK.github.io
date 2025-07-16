import type { Article, ArticleSection } from '$lib/types/directus'

export const getArticleDescription = (article: Article): string => {
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

export const getArticleSections = (article: Article) => {
	const content = article.sections
		?.map(({ article_sections_id }) =>
			article_sections_id && typeof article_sections_id !== 'string'
				? article_sections_id
				: undefined
		)
		.filter((section) => section !== undefined)
		.map(({ content, title, subtitle }) =>
			content !== null ? { content, title, subtitle } : undefined
		)
		.filter((content) => content !== undefined)

	if (content) return content
	return ''
}

// export const getSectionContents = (article: ArticleSection) => {
// 	const content = article.content
// 		?.map(({}) =>
// 			article_sections_id && typeof article_sections_id !== 'string'
// 				? article_sections_id
// 				: undefined
// 		)
// 		.filter((section) => section !== undefined)
// 		.map(({ content, title, subtitle }) =>
// 			content !== null ? { content, title, subtitle } : undefined
// 		)
// 		.filter((content) => content !== undefined)
//
// 	if (content) return content
// 	return ''
// }
//
