<script lang="ts">
	import AboutSection from '$lib/ui/sections/about_section.svelte'
	import HeroSection from '$lib/ui/sections/hero_section.svelte'
	import NewsletterFormSection from '$lib/ui/sections/newsletter_form_section.svelte'
	let { data } = $props()
</script>

<div class="page">
	<HeroSection></HeroSection>
	<AboutSection team_members={data.team_members}></AboutSection>
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
