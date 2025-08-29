<script lang="ts">
	import type { TeamMember } from '$lib/types/directus'
	import CardTeam from '../cards/card_team.svelte'

	let { team_members }: { team_members: TeamMember[] } = $props()
</script>

<div class="team-cards">
	{#each team_members as team_member}
		<CardTeam {team_member}></CardTeam>
	{/each}
</div>

<style>
	.team-cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin: 3rem 0;
		gap: 1rem;
	}
	@media (min-width: 768px) {
		.team-cards {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
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
