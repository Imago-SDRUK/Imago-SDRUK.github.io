type Route = { label: string; href: string }

export const ROUTES: (Route & { subpaths: Route[] })[] = [
	{
		label: 'Data',
		href: '/data',
		subpaths: [
			{
				label: 'Data products',
				href: '/data/products'
			},
			{
				label: 'Data catalogue',
				href: '/data'
			}
		]
	},
	{
		label: 'News',
		href: '/news',
		subpaths: [
			{
				label: 'Careers',
				href: '/careers'
			},
			{ label: 'Events', href: '/events' }
		]
	},
	{
		label: 'Research',
		href: '/research',
		subpaths: [
			{
				label: 'Resources',
				href: '/research/resources'
			},
			{ label: 'Publications', href: '/research/publications' }
		]
	},
	{
		label: 'About',
		href: '/about',
		subpaths: [
			{ label: 'Partners', href: '/about/partners' }
			// { label: 'Team', href: '/about/team' }
		]
	}
]
