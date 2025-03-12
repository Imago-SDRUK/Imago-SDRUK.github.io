<script lang="ts">
	import EventsSection from '$lib/ui/sections/events_section.svelte'
	import SvelteSeo from 'svelte-seo'
	import { page } from '$app/state'
	let { data } = $props()
</script>

<SvelteSeo
	title={`Imago - SDR | ${data.events.title}`}
	description="Imago SDR"
	canonical={`${page.url.protocol}//${page.url.host}`}
	keywords="Imago SDR"
	openGraph={{
		title: `Imago - SDR | ${data.events.title}`,
		description: String(data.events.content),
		image: `${page.url.protocol}//${page.url.host}/ui/imago_logo.png`,
		url: page.url.toString(),
		type: 'website',
		images: [
			{
				url: `${page.url.protocol}//${page.url.host}/ui/imago_logo.png`,
				alt: 'Imago picture'
			}
		],
		site_name: `Imago - SDR | ${data.events.title}`
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@imago-sdr',
		title: `Imago - SDR | ${data.events.title}`,
		description: String(data.events.content),
		image: `${page.url.protocol}//${page.url.host}/ui/imago_logo.png`
	}}
/>

<EventsSection event={data.events}></EventsSection>
