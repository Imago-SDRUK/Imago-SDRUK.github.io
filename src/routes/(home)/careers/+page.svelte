<script lang="ts">
	import Title from '$lib/ui/blog/title.svelte'
	import CardJob from '$lib/ui/cards/card_job.svelte'
	import CardsSection from '$lib/ui/sections/cards_section.svelte'
	let { data } = $props()
</script>

<CardsSection title="Careers">
	{#snippet sectionNav()}
		{#if data.careers.length === 0}
			<Title
				title="There are no careers that match this search, please try another filter or click here to clear your search."
			></Title>
		{/if}
	{/snippet}
	{#each data.careers as career}
		<CardJob {career}></CardJob>
	{/each}
</CardsSection>

<style>
</style>
