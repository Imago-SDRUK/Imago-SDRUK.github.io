<script lang="ts">
	import { goto } from '$app/navigation'
	import { NAV_HEIGHT } from '$lib/globals/style'
	import Title from '$lib/ui/blog/title.svelte'
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import IconButton from '$lib/ui/buttons/icon_button.svelte'
	import BaseSection from '$lib/ui/sections/base_section.svelte'
	import Fact from '$lib/ui/text/fact.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
	import { jstr } from '@arturoguzman/art-ui'
	import {
		IconBrandLinkedin,
		IconBrandMastodon,
		IconBrandTwitter,
		IconLink
	} from '@tabler/icons-svelte'

	let { data } = $props()
</script>

<BaseSection>
	<div class="team-member-section" style:--nav-height={NAV_HEIGHT}>
		<div class="left-col">
			<img class="profile-picture" src="https://placehold.co/600x1200/FF8F42/FF8F42" alt="" />
			<div class="profile-metadata">
				<Title size="large" title="{data.team_member.first_name} {data.team_member.last_name}"
				></Title>
				<div class="social-media">
					<IconButton
						onclick={() => {
							goto('https://www.linkedin.com/company/sdr-imago')
						}}
					>
						<IconBrandLinkedin></IconBrandLinkedin>
					</IconButton>
					<IconButton>
						<IconBrandMastodon></IconBrandMastodon>
					</IconButton>
					<IconButton>
						<IconBrandTwitter></IconBrandTwitter>
					</IconButton>
					<IconButton>
						<IconLink></IconLink>
					</IconButton>
				</div>
			</div>
		</div>
		<div class="right-col">
			<Paragraph text={data.team_member.content}></Paragraph>
			{#each data.team_member.url as url}
				<Anchor label={url.title} href={url.url}></Anchor>
			{/each}
		</div>
	</div>
</BaseSection>

<style>
	.team-member-section {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 5fr);
		color: var(--theme-colour-text);
		gap: 3rem;
		/* min-height: calc(100lvh - var(--nav-height)); */
	}

	.left-col {
		width: 100%;
		padding: 0 4rem;
		overflow: hidden;
		border-right: 1px solid var(--theme-colour-text);
		display: grid;
		gap: 2rem;
	}
	.profile-picture {
		height: 100%;
		object-fit: cover;
		border-radius: 1rem;
	}
	.profile-metadata {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.right-col {
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: min(100%, 500px);
		overflow: hidden;
	}
	.social-media {
		color: white;
		display: flex;
		gap: 0.25rem;
	}
</style>
