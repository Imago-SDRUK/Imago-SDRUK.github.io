<script lang="ts">
	import SvelteSeo from 'svelte-seo'
	import CareersSection from '$lib/ui/sections/careers_section.svelte'
	import { page } from '$app/state'
	let { data } = $props()
</script>

<SvelteSeo
	title={`Imago - SDR | ${data.jobs.title}`}
	description="Imago SDR"
	canonical={`${page.url.protocol}//${page.url.host}`}
	keywords="Imago SDR"
	openGraph={{
		title: `Imago - SDR | ${data.jobs.title}`,
		description: String(data.jobs.content),
		image: `${page.url.protocol}//${page.url.host}/ui/imago_logo.png`,
		url: page.url.toString(),
		type: 'website',
		images: [
			{
				url: `${page.url.protocol}//${page.url.host}/ui/imago_logo.png`,
				alt: 'Imago picture'
			}
		],
		site_name: `Imago - SDR | ${data.jobs.title}`
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@imago-sdr',
		title: `Imago - SDR | ${data.jobs.title}`,
		description: String(data.jobs.content),
		image: `${page.url.protocol}//${page.url.host}/ui/imago_logo.png`
	}}
/>
<CareersSection career={data.jobs}></CareersSection>
