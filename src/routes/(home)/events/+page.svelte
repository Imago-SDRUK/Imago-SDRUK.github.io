<script lang="ts">
	import EventsListSection from '$lib/ui/sections/events_list_section.svelte'
	let { data } = $props()
</script>

<div class="page">
	<EventsListSection events={data.events}></EventsListSection>
</div>
