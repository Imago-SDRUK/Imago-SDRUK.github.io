<script lang="ts">
	import HeroSection from '$lib/ui/sections/hero_section.svelte'
	import Seo from '$lib/ui/utils/seo.svelte'
	import NewsletterFormSection from '$lib/ui/sections/newsletter_form_section.svelte'
	import PageSections from '$lib/ui/sections/page_sections.svelte'
	let imago_text = `IMAGO seeks a complete disruption of the status quo, proposing an SDR UK Data Service that transforms the usability, utility, and usage of satellite imagery that, in turn, revolutionises our understanding and resolution of urgent challenges facing the UK— especially where environmental vulnerability, urban development and housing, and health and wellbeing are concerned.\n\n<br><br> IMAGO achieves its goal by meeting users where they are: translating complex imagery data into data products these stakeholders require through collaboration and co-production; delivering data via intuitive and user-friendly interfaces, as well as channels, formats, and approaches familiar to these communities; and expanding capacity and enthusiasm for using imagery-based data across a range of sectors, career stages, and disciplines.`
	let { data } = $props()
</script>

<Seo description={imago_text} image="https://imago.ac.uk/ui/imago_logo.png"></Seo>
<div class="page">
	<HeroSection></HeroSection>
	{#each data.page as page}
		<div class="page-sections">
			<PageSections sections={page.sections}></PageSections>
		</div>
	{/each}
	<!-- <AboutSection team_members={data.team_members}></AboutSection> -->

	<NewsletterFormSection></NewsletterFormSection>
</div>

<style>
	.page-sections {
		background: linear-gradient(
			var(--theme-colour-background),
			var(--theme-colour-tertiary),
			var(--theme-colour-background)
		);
	}
</style>
