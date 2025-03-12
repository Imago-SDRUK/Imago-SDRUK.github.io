<script lang="ts">
	import CardJob from '$lib/ui/cards/card_job.svelte'
	import AboutSection from '$lib/ui/sections/about_section.svelte'
	import CardsSection from '$lib/ui/sections/cards_section.svelte'
	import CareersSection from '$lib/ui/sections/careers_section.svelte'
	import EventsListSection from '$lib/ui/sections/events_list_section.svelte'
	import EventsSection from '$lib/ui/sections/events_section.svelte'
	import HeroSection from '$lib/ui/sections/hero_section.svelte'
	import NewsletterFormSection from '$lib/ui/sections/newsletter_form_section.svelte'
	let { data } = $props()
</script>

<div class="page">
	<HeroSection></HeroSection>
	<AboutSection team_members={data.team_members}></AboutSection>
	<!-- <EventsListSection events={data.events}></EventsListSection> -->
	<!-- <CardsSection title="Careers"> -->
	<!-- 	{#each data.careers as career} -->
	<!-- 		<CardJob {career}></CardJob> -->
	<!-- 	{/each} -->
	<!-- </CardsSection> -->

	<!-- <NewsletterFormSection></NewsletterFormSection> -->
</div>

<style>
	/* .page { */
	/* 	padding: 1.25rem; */
	/* } */
	/* .page-grid { */
	/* 	display: grid; */
	/* 	gap: 1rem; */
	/* 	grid-template-columns: repeat(2, minmax(0, 1fr)); */
	/* 	z-index: 1; */
	/* } */
</style>
