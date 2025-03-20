<script lang="ts">
	// import CardJob from '$lib/ui/cards/card_job.svelte'
	import AboutSection from '$lib/ui/sections/about_section.svelte'
	// import CardsSection from '$lib/ui/sections/cards_section.svelte'
	// import CareersSection from '$lib/ui/sections/careers_section.svelte'
	// import EventsListSection from '$lib/ui/sections/events_list_section.svelte'
	// import EventsSection from '$lib/ui/sections/events_section.svelte'
	import HeroSection from '$lib/ui/sections/hero_section.svelte'
	import Seo from '$lib/ui/utils/seo.svelte'
	// import NewsletterFormSection from '$lib/ui/sections/newsletter_form_section.svelte'
	let imago_text = `IMAGO seeks a complete disruption of the status quo, proposing an SDR UK Data Service that transforms the usability, utility, and usage of satellite imagery that, in turn, revolutionises our understanding and resolution of urgent challenges facing the UK— especially where environmental vulnerability, urban development and housing, and health and wellbeing are concerned.\n\n<br><br> IMAGO achieves its goal by meeting users where they are: translating complex imagery data into data products these stakeholders require through collaboration and co-production; delivering data via intuitive and user-friendly interfaces, as well as channels, formats, and approaches familiar to these communities; and expanding capacity and enthusiasm for using imagery-based data across a range of sectors, career stages, and disciplines.`
	let { data } = $props()
</script>

<Seo description={imago_text} image="https://imago.ac.uk/ui/imago_logo.png"></Seo>
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
