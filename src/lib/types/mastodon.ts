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

export type MastodonRequestMetadata = {
	'@context': string
	id: string
	actor: string
}

export type MastodonFollowRequest = MastodonRequestMetadata & {
	type: 'Follow'
	object: string
}

export type MastodonUnfollowRequest = MastodonRequestMetadata & {
	type: 'Undo'
	object: {
		id: string
		type: 'Follow'
		actor: string
		object: string
	}
}

export type MastodonReplyRequest = MastodonRequestMetadata & {
	type: 'Create'
	published: string
	to: string[]
	cc: string[]
	object: MastodonItem
	signature: {
		type: string
		creator: string
		created: string
		signatureValue: string
	}
}

export type MastodonRequest =
	| MastodonFollowRequest
	| MastodonUnfollowRequest
	| MastodonReplyRequest
	| MastodonItem

export type MastodonAcceptFollowRequest = {
	'@context': string
	id: string
	type: string
	actor: string
	object: MastodonFollowRequest
}

export type MastodonPayload = {
	'@context': string
	id: string
	partOf?: string | null
	type?: string | null
	actor?: string | null
	object?: MastodonRequest
	items?: string[]
}

export type MastodonItem = {
	'@context': (string | Record<PropertyKey, string>)[]
	id: string
	type: string
	summary: string | null
	inReplyTo: string | null
	published: string
	url: string
	attributedTo: string
	to: string[]
	cc: string[]
	sensitive: boolean
	atomUri: string
	inReplyToAtomUri: string | null
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

export type MastodonBroadcastNote = {
	'@context': 'https://www.w3.org/ns/activitystreams'
	id: string
	type: 'Create'
	actor: string
	published: string
	to: string[]
	cc: string[]
	object: MastodonItem
	signature?: {
		type: string
		creator: string
		created: string
		signatureValue: string
	}
}
