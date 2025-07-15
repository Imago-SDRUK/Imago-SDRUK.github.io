<script lang="ts">
	import Title from '$lib/ui/blog/title.svelte'
	import AboutSection from '$lib/ui/sections/about_section.svelte'
	import MulticolumnsSection from '$lib/ui/sections/multicolumns_section.svelte'
	const services = [
		{
			image: `/static/network/logos/financial.png`,
			url: 'https://smartdatafoundry.com/solutions/financial-data-service'
		},
		{ image: `/static/network/logos/geographic.png`, url: 'https://geods.ac.uk/' },
		{ image: `/static/network/logos/hasp.png`, url: 'https://hasp.ac.uk/' },
		// { image: `/network/logos/imago.png`, url: '' },
		{
			image: `/static/network/logos/smart_data.png`,
			url: 'https://www.sdruk.ukri.org/data/smart-data-donation-service/'
		},
		{
			image: `/static/network/logos/smart_energy.png`,
			url: 'https://es.catapult.org.uk/project/smart-energy-data-service-sense/'
		}
	]
	let { data } = $props()
</script>

<AboutSection team_members={data.team_members}></AboutSection>
<MulticolumnsSection columns={3} gap="2rem"
	>{#snippet title()}
		<Title size="large" title="Our network"></Title>
	{/snippet}
	{#each services as service}
		<a class="network-partner" href={service.url}>
			<img src={service.image} alt="" />
		</a>
	{/each}
</MulticolumnsSection>

<style>
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
</style>
