import { assetEndpoint } from '@arturoguzman/art-ui'
import { env } from '$env/dynamic/private'

export const GET = async ({ fetch, url, params }) => {
	return assetEndpoint(
		params.id,
		`${env.BACKEND_URL}/assets`,
		fetch,
		encodeURI(url.searchParams.toString()),
		env.BACKEND_TOKEN
	)
}
