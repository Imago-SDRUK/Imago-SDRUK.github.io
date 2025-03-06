<script lang="ts">
	import CardJob from '$lib/ui/cards/card_job.svelte'
	import CardsSection from '$lib/ui/sections/cards_section.svelte'

	let { data } = $props()
</script>

<CardsSection title="Careers">
	{#each data.careers as career}
		<CardJob {career}></CardJob>
	{/each}
</CardsSection>
