export const obvrState: {
	observer?: IntersectionObserver
	intersecting: string[]
} = $state({ intersecting: [] })

export const observeRoot = (e: HTMLElement) => {
	obvrState.observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const found = obvrState.intersecting.find((id) => id === entry.target.id)
					if (!found) {
						obvrState.intersecting.push(entry.target.id)
					}
				} else {
					obvrState.intersecting = obvrState.intersecting.filter((id) => id !== entry.target.id)
				}
			})
		},
		{
			// root: e,
			rootMargin: '0px',
			threshold: 0.5
		}
	)
}
