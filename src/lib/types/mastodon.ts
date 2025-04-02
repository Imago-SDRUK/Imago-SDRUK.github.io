export type MastodonActor = {
	'@context': string
	id: string
	type: string
	following: string
	followers: string
	inbox: string
	outbox: string
	preferredUsername: string
	name: string
	summary: string
	url: string
	manuallyApprovesFollowers: boolean
	discoverable: boolean
	memorial: boolean
	icon: {
		type: string
		mediaType: string
		url: string
	}
	image: {
		type: string
		mediaType: string
		url: string
	}
	published: string
	devices?: string
	publicKey: {
		'@context': string
		'@type': string
		id: string
		owner: string
		publicKeyPem: string
	}
	tag: []
	attachment: []
	endpoints: { sharedInbox: string }
}

export type MastodonFollowRequest = {
	'@context': string
	id: string
	type: 'Follow'
	actor: string
	object: string
}

export type MastodonItem = {
	'@context': (string | Record<PropertyKey, string>)[]
	id: string
	type: string
	summary?: null
	inReplyTo?: null
	published: string
	url: string
	attributedTo: string
	to: string[]
	cc: string[]
	sensitive: boolean
	atomUri: string
	inReplyToAtomUri?: null
	conversation: string
	content: string
	contentMap: Record<PropertyKey, string>
	attachment: string[]
	tag: string[]
	replies: {
		id: string
		type: string
		first: {
			type: string
			next: string
			partOf: string
			items: unknown[]
		}
	}
	likes: {
		id: string
		type: string
		totalItems: number
	}
	shares: {
		id: string
		type: string
		totalItems: number
	}
}

export type MastodonAcceptRequest = {
	'@context': string
	id: string
	type: string
	actor: string
	object: MastodonFollowRequest
}

export type MastodonPublicKeyResponse = {
	'@context': (
		| string
		| {
				manuallyApprovesFollowers: string
				toot: string
				featured: { '@id': string; '@type': string }
				featuredTags: { '@id': string; '@type': string }
				alsoKnownAs: { '@id': string; '@type': string }
				movedTo: { '@id': string; '@type': string }
				schema: string
				PropertyValue: string
				value: string
				discoverable: string
				suspended: string
				memorial: string
				indexable: string
				attributionDomains: { '@id': string; '@type': string }
		  }
	)[]
	id: string
	type: string
	following: string
	followers: string
	inbox: string
	outbox: string
	featured: string
	featuredTags: string
	preferredUsername: string
	name: string
	summary: string
	url: string
	manuallyApprovesFollowers: boolean
	discoverable: boolean
	indexable: boolean
	published: string
	memorial: boolean
	publicKey: {
		id: string
		owner: string
		publicKeyPem: string
	}
	tag: []
	attachment: []
	endpoints: { sharedInbox: string }
}
