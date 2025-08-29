import { writeFileSync } from 'node:fs'
const ARGS = ['--token', '--from', '--to']
const sluggy = (str) =>
	String(str)
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')

const getArguments = (args) => {
	return process.argv.reduce(
		(acc, arg) => {
			if (acc.next) {
				acc.arguments[acc.next] = arg
				acc.next = null
				return acc
			}
			if (args.includes(arg)) {
				acc.next = arg.replaceAll('-', '')
				return acc
			}
			return acc
		},
		{ next: null, arguments: {} }
	).arguments
}

async function getSnapshot({ from, token }) {
	if (from && token) {
		console.log('Fetching snapshot...')
		const URL = `${from}/schema/snapshot?access_token=${token}`
		const { data } = await fetch(URL)
			.then((r) => r.json())
			.catch(handleError('getting snapshot'))
		return data
	}
	return
}

async function saveExisting({ to, token }) {
	if (to && token) {
		console.log('Creating backup snapshot...')
		const now = new Date()
		const date = now
			.toLocaleString('en-GB')
			.replaceAll('/', '_')
			.replaceAll(', ', '-')
			.replaceAll(':', '_')
		const URL = `${to}/schema/snapshot?access_token=${token}`
		const { data } = await fetch(URL)
			.then((r) => r.json())
			.catch(handleError('saving existing'))
		writeFileSync(`../backup-${sluggy(to)}-${date}.json`, JSON.stringify(data, null, 2))
		return data
	}
	return
}

async function getDiff({ to, token, snapshot }) {
	if (to && token && snapshot) {
		console.log('Calculating difference...')
		const URL = `${to}/schema/diff?access_token=${token}`
		const res = await fetch(URL, {
			method: 'POST',
			body: JSON.stringify(snapshot),
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch(handleError('get difference'))
		if (res.status === 200) {
			const { data } = res.json()
			return data
		}
		console.log(`There are no outstanding migrations to apply.`)
		process.exit(1)
	}
	return
}

async function applyDiff({ to, token, diff }) {
	console.log('Applying difference')
	const URL = `${to}/schema/apply?access_token=${token}`
	const res = await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(diff),
		headers: {
			'Content-Type': 'application/json'
		}
	}).catch(handleError('apply difference'))
	if (res.status === 204) {
		console.log('Difference applied!')
		return
	}
	const data = await res.json().catch(() => console.log('Error extracting the data difference'))
	if ('errors' in data) {
		console.log(`Migration didn't complete, please check these errors:`)
		data.errors.forEach((element) => {
			console.log('\x1b[31m%s\x1b[0m', element.message)
			console.log(JSON.stringify(element.extensions, null, 2))
		})
	}
	console.log('Difference applied!')
}

const handleError = (step) => (err) => {
	console.log(`There's been an error at step: ${step}`)
	console.log(err)
}

const validateArgs = (args) =>
	ARGS.filter((arg) => !Object.keys(args).includes(arg.replaceAll('-', ''))).map((arg) => {
		console.log(`${arg} is missing`)
		return arg
	}).length === 0
		? true
		: false

const main = async () => {
	const args = getArguments(ARGS)
	const valid = validateArgs(args)
	if (!valid) process.exit(1)
	await saveExisting(args)
	const snapshot = await getSnapshot(args)
	const diff = await getDiff({ ...args, snapshot })
	await applyDiff({ ...args, diff })
}

/**
 * How to use:
 *
 *  node index.js --token DIRECTUS_TOKEN --from URL_OF_YOUR_LOCAL_SCHEMA --to URL_OF_PROD_CMS
 *
 **/
main()
