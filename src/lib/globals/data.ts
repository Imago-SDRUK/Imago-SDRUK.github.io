export const ROLES: Record<
	'rse' | 'researcher' | 'postdoc' | 'administrator' | 'co_director',
	string
> = {
	rse: 'Research Software Engineer',
	researcher: 'Researcher',
	postdoc: 'Postdoctoral Research Associate',
	administrator: 'Administrator',
	co_director: 'Co-Director'
}

export const INSTITUTIONS: Record<'newcastle_university' | 'u_of_liverpool', string> = {
	newcastle_university: 'Newcastle University',
	u_of_liverpool: 'University of Liverpool'
}

export const SOCIAL_MEDIA: string[] = ['mastodon', 'linkedin', 'twitter', 'instagram']
