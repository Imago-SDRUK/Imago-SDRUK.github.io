export const GET = () => {
	return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 })
}
