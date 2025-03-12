<script lang="ts">
	import type { TeamMember } from '$lib/types/directus'
	import { Picture } from '@arturoguzman/art-ui'
	import Title from '../blog/title.svelte'
	import Subtitle from '../text/subtitle.svelte'
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right'
	import { ROLES } from '$lib/globals/data'
	let { team_member }: { team_member: TeamMember } = $props()
</script>

<a class="team-member-card" href="/about/team/{team_member.slug}">
	<div class="card-image-container">
		<div class="card-image">
			<Picture image={team_member.picture}></Picture>
		</div>
	</div>
	<div class="card-title">
		<div class="title">
			<Title size="small" title="{team_member.first_name} {team_member.last_name}"></Title>
			<ArrowRight></ArrowRight>
		</div>
		<Subtitle size="micro" subtitle={ROLES[team_member.role]}></Subtitle>
	</div>
</a>

<style>
	.team-member-card {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid var(--theme-colour-text);
	}
	.title {
		color: var(--theme-colour-text);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.card-title {
		padding: 0.5rem 1rem;
	}
	.card-image-container {
		height: 100%;
		overflow: hidden;
	}
	.card-image {
		width: 100%;
		object-fit: cover;
	}
</style>
