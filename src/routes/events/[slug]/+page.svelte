<script lang="ts">
	import EventsSection from '$lib/ui/sections/events_section.svelte'

	let { data } = $props()
</script>

<EventsSection event={data.events}></EventsSection>
