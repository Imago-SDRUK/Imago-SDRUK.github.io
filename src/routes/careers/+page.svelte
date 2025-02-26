<script lang="ts">
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import CardJob from '$lib/ui/cards/card_job.svelte'
	import CardsSection from '$lib/ui/sections/cards_section.svelte'
	import { jstr } from '$lib/utils/data'

	let { data } = $props()
</script>

<CardsSection title="Careers">
	{#each data.jobs as job}
		<!-- <Anchor href="/careers/{job.slug}" label={job.title}></Anchor> -->

		<CardJob {job}></CardJob>
	{/each}
	<!-- <pre>{jstr(data)}</pre> -->
</CardsSection>
