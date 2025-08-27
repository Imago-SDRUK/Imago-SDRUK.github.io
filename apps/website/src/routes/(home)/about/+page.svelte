<script lang="ts">
	import Title from '$lib/ui/blog/title.svelte'
	import CardTeam from '$lib/ui/cards/card_team.svelte'
	import MulticolumnsSection from '$lib/ui/sections/multicolumns_section.svelte'
	import PageSections from '$lib/ui/sections/page_sections.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
	const services = [
		{
			image: `/static/network/logos/financial.png`,
			url: 'https://smartdatafoundry.com/solutions/financial-data-service'
		},
		{ image: `/static/network/logos/geographic.png`, url: 'https://geods.ac.uk/' },
		{ image: `/static/network/logos/hasp.png`, url: 'https://hasp.ac.uk/' },
		{
			image: `/static/network/logos/smart_data.png`,
			url: 'https://www.sdruk.ukri.org/data/smart-data-donation-service/'
		},
		{
			image: `/static/network/logos/smart_energy.png`,
			url: 'https://es.catapult.org.uk/project/smart-energy-data-service-sense/'
		},
		{ image: `/static/network/logos/imago.png`, url: '/about' }
	]
	let { data } = $props()
</script>

{#each data.page as page}
	<PageSections sections={page.sections}></PageSections>
{/each}
<MulticolumnsSection columns={4}>
	{#snippet title()}
		<Title size="large" title="Meet the team"></Title>
	{/snippet}
	{#each data.team_members as team_member}
		<CardTeam {team_member}></CardTeam>
	{/each}
</MulticolumnsSection>
<MulticolumnsSection columns={3} gap="2rem">
	{#snippet title()}
		<Title size="large" title="Our network"></Title>
		<Paragraph
			text="Imago Data Service for Imagery is part of Smart Data Research UK, the UK’s national programme for smart data research. We are one of six data services in the SDR UK family."
		></Paragraph>
	{/snippet}
	{#each services as service}
		<a class="network-partner" href={service.url}>
			<img src={service.image} alt="" />
		</a>
	{/each}
</MulticolumnsSection>

<style>
	.team-cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin: 3rem 0;
		gap: 1rem;
	}
	.network-partner {
		width: 100%;
		aspect-ratio: 2 / 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.network-partner img {
		height: 50%;
		object-fit: contain;
		transition: all 0.3s ease-in-out;
	}
	.network-partner img:hover {
		filter: drop-shadow(
			2px 2px 20px color-mix(in oklab, white 35%, var(--theme-colour-background) 65%)
		);
	}
	@media (min-width: 768px) {
		.text-container {
			width: min(100% - 2rem, 500px);
		}
		.team-cards {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
