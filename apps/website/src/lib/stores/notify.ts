import { writable } from 'svelte/store'

export const status = writable('static')
export const message = writable('')
export const colour = writable('blue')
export const textColour = writable('black')

let timeoutTrack: number = 0
export const setNotification = (m: string, c?: string, tc?: string, t = 3000) => {
	if (Number(timeoutTrack) > 0) {
		clearTimeout(timeoutTrack)
	}
	status.set('enter')
	message.set(m)
	colour.set(c ?? '')
	textColour.set(tc ?? '')
	timeoutTrack = setTimeout(() => {
		status.set('leave')
		timeoutTrack = 0
	}, t)
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
// const labels = writable<{ status: string; value: string }[]>()
let storeTimeOut: number = 0
let notifications: { status: string; value: string }[] = []
function handleNotifications() {
	const { subscribe, set, update } = writable<string>('')

	function loadNotifications(src: { status: string; value: string }[] | null) {
		if (src) notifications = src
	}
	async function send({
		status,
		value,
		timeout = 3000
	}: {
		status?: string
		value?: string | null
		timeout?: number
	}) {
		if (Number(storeTimeOut) > 0) {
			clearTimeout(storeTimeOut)
			set('')
			await sleep(100)
		}
		if (status) {
			const notificationValue = notifications.find((notification) => notification.status === status)
			if (notificationValue) {
				let result = `${notificationValue.value}`
				if (value) {
					if (result.match(/\{\{VARIABLE\}\}/i)) {
						result = result.replaceAll('{{VARIABLE}}', value)
					}
				}
				set(result)
				storeTimeOut = setTimeout(() => {
					set('')
				}, timeout)
			}
		} else {
			if (value) {
				set(value)
				storeTimeOut = setTimeout(() => {
					set('')
				}, timeout)
			}
		}
	}
	return {
		loadNotifications,
		send,
		set,
		subscribe,
		update
	}
}

export const notify = handleNotifications()
