<script lang="ts">
	import EventsSection from '$lib/ui/sections/events_section.svelte'
	import Seo from '$lib/ui/utils/seo.svelte'
	let { data } = $props()
</script>

<Seo
	title={data.events.title}
	description={String(data.events.content)}
	image={`https://imago.ac.uk/ui/imago_logo.png`}
></Seo>

<EventsSection event={data.events}></EventsSection>
