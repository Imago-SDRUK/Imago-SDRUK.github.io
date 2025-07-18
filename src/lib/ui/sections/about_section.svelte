<script lang="ts">
	import type { TeamMember } from '$lib/types/directus'
	import { NAV_HEIGHT } from '$lib/globals/style'
	import Title from '$lib/ui/blog/title.svelte'
	import BaseSection from '$lib/ui/sections/base_section.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
	import Subtitle from '$lib/ui/text/subtitle.svelte'
	import CardTeam from '../cards/card_team.svelte'
	import LottiePlayer from '../players/lottie_player.svelte'
	let imago_text = `IMAGO seeks a complete disruption of the status quo, proposing an SDR UK Data Service that transforms the usability, utility, and usage of satellite imagery that, in turn, revolutionises our understanding and resolution of urgent challenges facing the UK— especially where environmental vulnerability, urban development and housing, and health and wellbeing are concerned.\n\n<br><br> IMAGO achieves its goal by meeting users where they are: translating complex imagery data into data products these stakeholders require through collaboration and co-production; delivering data via intuitive and user-friendly interfaces, as well as channels, formats, and approaches familiar to these communities; and expanding capacity and enthusiasm for using imagery-based data across a range of sectors, career stages, and disciplines.`
	let { team_members }: { team_members: TeamMember[] } = $props()
</script>

<BaseSection>
	<div class="about-container" id="uk-lottie" style:--nav-height={NAV_HEIGHT}>
		<div class="left-col">
			<div class="text-container">
				<div class="about-title">
					<Title size="huge" title="Imago"></Title>
					<Subtitle
						size="small"
						subtitle="unlocks the potential of satellite imagery to provide a much richer understanding of urgent challenges facing the UK."
					></Subtitle>
				</div>
				<Paragraph text={imago_text}></Paragraph>
			</div>
			<div class="team-cards">
				{#each team_members as team_member}
					<CardTeam {team_member}></CardTeam>
				{/each}
			</div>
		</div>
		<div class="right-col">
			<div class="player-container">
				<LottiePlayer src="/static/lottie/uk.json"></LottiePlayer>
			</div>
		</div>
	</div>
</BaseSection>

<style>
	.team-cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin: 3rem 0;
		gap: 1rem;
	}
	.about-container {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(50vw, 1fr);
		grid-template-rows: minmax(0, min-content) minmax(0, 1fr);
		min-height: calc(100lvh - var(--nav-height));
	}
	.left-col {
		grid-row: 2 / 3;
		grid-column: 1 / 3;
	}
	.right-col {
		grid-row: 1 / 2;
		grid-column: 1 / 3;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 100%;
	}
	.player-container {
		max-height: 100lvh;
	}
	.player {
		max-height: 100lvh;
	}
	.text-container {
		display: grid;
		gap: 2rem;
		margin-inline: auto;
	}

	@media (min-width: 768px) {
		.text-container {
			width: min(100% - 2rem, 500px);
		}
		.team-cards {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.about-container {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);
		}
		.left-col {
			grid-column: initial;
			grid-row: 1/2;
		}
		.right-col {
			grid-column: initial;
			grid-row: 1/2;
		}
		.svg {
			position: sticky;
			top: 1rem;
			left: 0;
			height: 80lvh;
		}
	}
</style>
