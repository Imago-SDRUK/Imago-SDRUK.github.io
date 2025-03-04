// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Collections } from '$lib/types/directus'
import type { DirectusClient, RestClient, StaticTokenClient } from '@directus/sdk'

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			directus: DirectusClient<Collections> &
				StaticTokenClient<Collections> &
				RestClient<Collections>
			// session: {}
			// startTimer: number
			//    bot: boolean
		}
		interface Error {
			id: string
			message: string
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
