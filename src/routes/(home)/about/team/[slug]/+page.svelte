<script lang="ts">
	import { INSTITUTIONS, ROLES, SOCIAL_MEDIA } from '$lib/globals/data.js'
	import { NAV_HEIGHT } from '$lib/globals/style'
	import SvelteSeo from 'svelte-seo'
	import Content from '$lib/ui/blog/content.svelte'
	import Title from '$lib/ui/blog/title.svelte'
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import IconButton from '$lib/ui/buttons/icon_button.svelte'
	import BaseSection from '$lib/ui/sections/base_section.svelte'
	import Subtitle from '$lib/ui/text/subtitle.svelte'
	import { Picture } from '@arturoguzman/art-ui'
	import {
		IconBrandInstagram,
		IconBrandLinkedin,
		IconBrandMastodon,
		IconBrandTwitter
	} from '@tabler/icons-svelte'
	import { page } from '$app/state'
	let { data } = $props()
</script>

<SvelteSeo
	title={`Imago - SDR | ${data.team_member.first_name} ${data.team_member.last_name}`}
	description="Imago SDR"
	canonical={`${page.url.protocol}//${page.url.host}`}
	keywords="Imago SDR"
	openGraph={{
		title: `Imago - SDR | ${data.team_member.first_name} ${data.team_member.last_name}`,
		description: String(data.team_member.content),
		image: `${page.url.protocol}//${page.url.host}/assets/${data.team_member.picture}`,
		url: page.url.toString(),
		type: 'website',
		images: [
			{
				url: `${page.url.protocol}//${page.url.host}/assets/${data.team_member.picture}`,
				alt: 'Profile picture'
			}
		],
		site_name: `Imago - SDR | ${data.team_member.first_name} ${data.team_member.last_name}`
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@imago-sdr',
		title: `Imago - SDR | ${data.team_member.first_name} ${data.team_member.last_name}`,
		description: String(data.team_member.content),
		image: `${page.url.protocol}//${page.url.host}/assets/${data.team_member.picture}`
	}}
/>

<BaseSection>
	<div class="team-member-section" style:--nav-height={NAV_HEIGHT}>
		<div class="left-col">
			<div class="profile-picture">
				<Picture image={data.team_member.picture}></Picture>
			</div>
			<div class="profile-metadata">
				<Title size="large" title="{data.team_member.first_name} {data.team_member.last_name}"
				></Title>
				<div class="role">
					<Subtitle subtitle={ROLES[data.team_member.role]}></Subtitle>
					<Subtitle subtitle={INSTITUTIONS[data.team_member.institution]}></Subtitle>
				</div>
				<div class="social-media">
					{#each data.team_member.url.filter((url) => SOCIAL_MEDIA.includes(url.title)) as url}
						<IconButton
							onclick={() => {
								window.location = url.url
							}}
						>
							{#if url.title.toLowerCase().includes('linkedin')}
								<IconBrandLinkedin></IconBrandLinkedin>
							{/if}
							{#if url.title.toLowerCase().includes('mastodon')}
								<IconBrandMastodon></IconBrandMastodon>
							{/if}
							{#if url.title.toLowerCase().includes('twitter')}
								<IconBrandTwitter></IconBrandTwitter>
							{/if}
							{#if url.title.toLowerCase().includes('instagram')}
								<IconBrandInstagram></IconBrandInstagram>
							{/if}
						</IconButton>
					{/each}
				</div>
			</div>
		</div>
		<div class="right-col">
			<Content>
				{@html data.team_member.content}
			</Content>
			<div class="external-links">
				{#each data.team_member.url.filter((url) => !SOCIAL_MEDIA.includes(url.title)) as url}
					<Anchor label={url.title} href={url.url}></Anchor>
				{/each}
			</div>
		</div>
	</div>
</BaseSection>

<style>
	.team-member-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		color: var(--theme-colour-text);
		gap: 3rem;
	}

	.left-col {
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		gap: 2rem;
		padding: 0 1rem;
		border-bottom: 1px solid var(--theme-colour-text);
	}
	.profile-picture {
		height: 100%;
		object-fit: cover;
		border-radius: 1rem;
		overflow: hidden;
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
		margin-bottom: 2rem;
	}
	.external-links {
		display: grid;
		grid-template-columns: minmax(0, max-content);
	}
	@media (min-width: 1024px) {
		.team-member-section {
			grid-template-columns: minmax(0, 3fr) minmax(0, 5fr);
			height: calc(100lvh - var(--nav-height) - 5rem);
			margin-top: 1rem;
		}
		.left-col {
			padding: 0 2rem;
			border-bottom: initial;
			border-right: 1px solid var(--theme-colour-text);
		}
	}
	@media (min-width: 1440px) {
		.left-col {
			grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
		}
	}
</style>
