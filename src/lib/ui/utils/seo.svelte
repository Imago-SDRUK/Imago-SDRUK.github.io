<script lang="ts">
	import { page } from '$app/state'

	import SvelteSeo from 'svelte-seo'
	let {
		title,
		description,
		image
	}: {
		title?: string
		description: string
		image: string
	} = $props()
</script>

<SvelteSeo
	title={`Imago - SDR${title ? ` | ${title}` : ''}`}
	description="Imago SDR"
	canonical={`https://imago.ac.uk`}
	keywords="Imago SDR"
	openGraph={{
		title: `Imago - SDR${title ? ` | ${title}` : ''}`,
		description: description,
		//@ts-expect-error ok ok ok
		image: image,
		url: page.url.toString(),
		type: 'website',
		images: [
			{
				url: image,
				alt: 'Profile picture'
			}
		],
		site_name: `Imago - SDR${title ? ` | ${title}` : ''}`
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@imago-sdr',
		title: `Imago - SDR${title ? ` | ${title}` : ''}`,
		description: description,
		image: image
	}}
/>
