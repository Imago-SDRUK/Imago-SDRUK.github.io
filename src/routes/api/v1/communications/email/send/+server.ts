import { env } from '$env/dynamic/private'
import { getId } from '@arturoguzman/art-ui'
import { EmailClient, type EmailMessage } from '@azure/communication-email'
import { error, json } from '@sveltejs/kit'

const client = new EmailClient(env.AZ_CONNECTION_STRING)
export const GET = async () => {
	console.log('this happened on get')
	return json({ message: 'it works' })
}

export const POST = async ({ request }) => {
	try {
		const body = await request.text()
		const email_data = parseEmail(body)
		const email_message = {
			senderAddress: email_data.from,
			content: {
				subject: email_data.subject,
				plainText: email_data.text,
				html: email_data.html
			},
			recipients: {
				to: [{ address: email_data.to }]
			}
		} satisfies EmailMessage

		await client.beginSend(email_message)
		return json({ message: 'Email sent via Azure ECS' })
	} catch (err) {
		console.error('Delivery error:', err)
		error(500, { message: 'Email delivery failed', id: getId() })
	}
}

function parseEmail(rawEmail: string) {
	const result = {
		from: extractHeader(rawEmail, 'From'),
		to: extractHeader(rawEmail, 'To'),
		subject: extractHeader(rawEmail, 'Subject'),
		text: extractBody(rawEmail, 'text/plain'),
		html: extractBody(rawEmail, 'text/html')
	}

	return result
}

function extractHeader(email: string, headerName: string) {
	const regex = new RegExp(`^${headerName}:\\s*(.+)$`, 'm')
	const match = email.match(regex)
	return match ? match[1].trim() : ''
}

function extractBody(email: string, contentType: string) {
	const boundary = email.match(/boundary="(.+?)"/)?.[1]
	if (!boundary) return ''

	const part_regex = new RegExp(`Content-Type: ${contentType}[\\s\\S]*?${boundary}`, 'm')

	const match = email.match(part_regex)
	return match ? match[0].replace(part_regex, '').trim() : ''
}
