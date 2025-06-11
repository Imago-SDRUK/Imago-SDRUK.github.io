import type { TeamMember } from '$lib/types/directus'

export const ROLES: Record<TeamMember['role'], string> = {
	rse: 'Research Software Engineer',
	researcher: 'Researcher',
	postdoc: 'Postdoctoral Research Associate',
	administrator: 'Administrator',
	co_director: 'Co-Director',
	data_service_manager: 'Data Service Manager',
	outreach_officer: 'Outreach and Public Engagement Officer'
}

export const INSTITUTIONS: Record<
	'newcastle_university' | 'university_of_liverpool' | 'harvard_university',
	string
> = {
	newcastle_university: 'Newcastle University',
	university_of_liverpool: 'University of Liverpool',
	harvard_university: 'Harvard University'
}

export const SOCIAL_MEDIA: string[] = ['mastodon', 'linkedin', 'twitter', 'instagram']

// NOTE: switch this when there's an active runtime for the website
// export const FEEDS = ['rss', 'feed', 'atom', 'rss.xml']
export const FEEDS = ['rss']
