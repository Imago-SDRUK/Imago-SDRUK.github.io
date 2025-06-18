<script lang="ts">
	import { animate, scroll } from 'motion'
	import AboutSection from '$lib/ui/sections/about_section.svelte'
	import HeroSection from '$lib/ui/sections/hero_section.svelte'
	import Seo from '$lib/ui/utils/seo.svelte'
	import NewsletterFormSection from '$lib/ui/sections/newsletter_form_section.svelte'
	import StacksSection from '$lib/ui/sections/stacks_section.svelte'
	import { theme } from '$lib/ui/utils/theme.js'
	import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-svelte'
	import Button from '$lib/ui/buttons/button.svelte'
	import { window_width } from '$lib/stores/layout.svelte.js'
	import { goto } from '$app/navigation'
	let imago_text = `IMAGO seeks a complete disruption of the status quo, proposing an SDR UK Data Service that transforms the usability, utility, and usage of satellite imagery that, in turn, revolutionises our understanding and resolution of urgent challenges facing the UK— especially where environmental vulnerability, urban development and housing, and health and wellbeing are concerned.\n\n<br><br> IMAGO achieves its goal by meeting users where they are: translating complex imagery data into data products these stakeholders require through collaboration and co-production; delivering data via intuitive and user-friendly interfaces, as well as channels, formats, and approaches familiar to these communities; and expanding capacity and enthusiasm for using imagery-based data across a range of sectors, career stages, and disciplines.`
	let { data } = $props()
	const sections = ['section-1', 'section-2', 'section-3']

	$effect(() => {
		const wrapper = document.getElementById('stacks-wrapper')
		for (let index = 0; index < sections.length; index++) {
			const _section = document.getElementById(sections[index])
			if (_section) {
				const left_cols = _section.querySelectorAll('.left-col')
				const right_cols = _section.querySelectorAll('.right-col')
				left_cols.forEach((col) => {
					const el = col.querySelector('.stack-text')
					const limit = 1 / sections.length
					if (el) {
						const finish = (index + 1) * limit + (index * limit) / 2
						// (index + 1) * limit
						const animation = animate(
							el,
							{ opacity: [1, 0, 0] },
							{ times: [index * limit + (index * limit) / 2, finish < 1 ? finish : 1] }
						)
						if ($window_width < 768) {
							animation.cancel()
							return
						}
						scroll(animation, {
							target: wrapper ?? undefined,
							offset: [`start start`, `end ${1 - index * limit}`]
						})
					}
				})
				right_cols.forEach((_section) => {
					const card = _section.querySelector('.card')
					if (card && wrapper) {
						const animation = animate(card, { y: [20, -100] }, { ease: 'linear' })
						if ($window_width < 768) {
							animation.cancel()
							return
						}
						scroll(animation)
					}
				})
			}
		}
	})
	const beacons = [
		{ label: 'Prosperity', colour: theme.colours.tertiary },
		{ label: 'Wellbeing', colour: theme.colours.quarternary },
		{ label: 'Sustainability', colour: theme.colours.secondary }
	]
</script>

<Seo description={imago_text} image="https://imago.ac.uk/ui/imago_logo.png"></Seo>
<div class="page">
	<HeroSection></HeroSection>
	<AboutSection team_members={data.team_members}></AboutSection>
	<div id="stacks-wrapper">
		<StacksSection
			index={0}
			id="section-1"
			title="Imagery innovation"
			text="Everything around turning pixels into useful information our end-users can consume. This includes developing data partner relationships, methodological innovation and pipelines, and co-produced data products"
		>
			{#snippet buttons()}
				<div class="buttons">
					<Button
						alt
						onclick={() => {
							goto('/data')
						}}
						>{#snippet leftCol()}
							Data catalogue
						{/snippet}
						{#snippet rightCol()}
							<IconArrowRight></IconArrowRight>
						{/snippet}
					</Button>
				</div>
			{/snippet}
		</StacksSection>
		<StacksSection
			index={1}
			sticky_top="4rem"
			id="section-2"
			title="Data for All"
			text="Where we develop data-distribution channels that meet users where they are, adapting to their needs, skills, and background. Here we develop effective interfaces to our data, use modern technologies to organise them in user-friendly ways, and collaborate with the rest of the landscape (both within SDR UK and beyond) to avoid duplication and realise synergies."
		></StacksSection>
		<StacksSection
			index={2}
			sticky_top="8rem"
			id="section-3"
			title="Capability and Community"
			text="Which builds capacity to understand and work with imagery and nurtures a community of practice around imagery-based data and methods. This involves developing and offering training material, community events and thought leadership around the use of imagery in the social sciences, public health and policy making."
		>
			{#snippet buttons()}
				<div class="buttons">
					<Button
						alt
						onclick={() => {
							goto('/research')
						}}
						>{#snippet leftCol()}
							Research
						{/snippet}
						{#snippet rightCol()}
							<IconArrowRight></IconArrowRight>
						{/snippet}
					</Button>

					<Button
						alt
						onclick={() => {
							goto('/events')
						}}
						>{#snippet leftCol()}
							Events
						{/snippet}
						{#snippet rightCol()}
							<IconArrowRight></IconArrowRight>
						{/snippet}
					</Button>
				</div>
			{/snippet}
		</StacksSection>
	</div>
	<div class="beacons-section">
		<div class="cards">
			{#each beacons as beacon}
				<div class="card" style:--card-colour={beacon.colour}>
					<h2 class="card-text">
						{beacon.label}
					</h2>
					<div class="icon">
						<IconArrowUpRight></IconArrowUpRight>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<NewsletterFormSection></NewsletterFormSection>
</div>

<style>
	#stacks-wrapper {
		background: linear-gradient(var(--theme-colour-background), var(--theme-colour-tertiary));
	}
	.beacons-section {
		padding: 4rem 0;
		background: linear-gradient(var(--theme-colour-tertiary), var(--theme-colour-background));
	}
	.cards {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: min(100% - 4rem, 1400px);
		margin-inline: auto;
		padding: 2rem;
	}
	.card {
		/* height: 100%; */
		aspect-ratio: 1 / 1;
		background: color-mix(in oklab, var(--card-colour) 20%, transparent 80%);
		border: 1px solid var(--theme-colour-text);
		border-radius: 0.35rem;
		color: var(--theme-colour-text);
		padding: 1rem;
		font-family: var(--theme-font-title);
		font-weight: 700;
		font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		box-shadow: var(--glass);
		transition: all 0.3s ease-in-out;
	}
	.card:hover {
		background: color-mix(in oklab, var(--card-colour) 60%, transparent 40%);
	}
	.icon {
		display: flex;
		justify-content: flex-end;
	}
	.buttons {
		margin: 1rem 0;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	@media (min-width: 768px) {
		.beacons-section {
			min-height: 75lvh;
			padding: 0;
			/* margin-bottom: 16rem; */
		}
		.cards {
			flex-direction: row;
			overflow: scroll;
			scrollbar-width: none;
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);
		}
		.card-text {
			height: 100%;
			word-break: break-all;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
