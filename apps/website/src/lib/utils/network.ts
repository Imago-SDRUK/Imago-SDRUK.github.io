import { createConnection } from 'node:net'

/**
 * Ping a given host and resolve with the response time in milliseconds,
 * or -1 if there was an error.
 */
export async function ping(hostname: string, timeout = 3000) {
	return new Promise((resolve) => {
		const start = performance.now()
		let [host, port] = hostname.replaceAll('https://', '').replaceAll('http://', '').split(':')
		if (port === undefined) port = `80`
		const socket = createConnection(Number(port), host)
		socket.setTimeout(timeout)
		socket.on('connect', () => {
			const end = performance.now()
			socket.end()
			resolve(end - start)
		})

		function handleError() {
			socket.destroy()
			resolve(-1)
		}

		socket.on('timeout', handleError)
		socket.on('error', handleError)
	})
}
