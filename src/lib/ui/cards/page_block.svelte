<script lang="ts" generics="T extends Block">
	import type { Block } from '$lib/types/directus'
	import { jstr, Picture } from '@arturoguzman/art-ui'
	import Paragraph from '../text/paragraph.svelte'
	import LottiePlayer from '../players/lottie_player.svelte'
	import Button from '../buttons/button.svelte'
	import Title from '../blog/title.svelte'
	import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-svelte'
	import Content from '../blog/content.svelte'
	type Action = {
		label: string
		href?: string
		alternative?: boolean
	}
	let {
		blocks_id
	}: {
		blocks_id: Block | string | null | T
	} = $props()
</script>

{#if blocks_id && typeof blocks_id !== 'string'}
	{@const block = blocks_id}
	{#if block.style === 'general'}
		<div class="block">
			{#if block.title}
				<Title title={block.title}></Title>
			{/if}
			{#if block.content}
				<Content>
					{@html block.content}
				</Content>
			{/if}
			{#if block.media}
				{#each block.media as { directus_files_id }}
					{@const media = directus_files_id}
					{#if media && typeof media !== 'string'}
						{#if media.type?.startsWith('image/')}
							<Picture image={media}></Picture>
						{/if}
						{#if media.type === 'application/json'}
							<LottiePlayer src="/assets/{media.id}"></LottiePlayer>
						{/if}
					{/if}
				{/each}
			{/if}
			{#if block.actions}
				{@const actions = block.actions as Action[]}
				{#each actions as { alternative, href, label }}
					<div class="actions">
						<Button alt={alternative} {href} anchor>
							{#snippet leftCol()}
								{label}
							{/snippet}
							{#snippet rightCol()}
								{#if href?.startsWith('/')}
									<IconArrowRight></IconArrowRight>
								{:else}
									<IconArrowUpRight></IconArrowUpRight>
								{/if}
							{/snippet}
						</Button>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
	{#if block.style === 'title_and_image'}
		<div class="card">
			<div class="card-title">
				{#if block.title}
					<Title size="large" title={block.title}></Title>
				{/if}
			</div>
			<div class="card-content">
				<div class="card-image"></div>
			</div>
		</div>
	{/if}
	{#if block.style === 'title_only'}
		<div class="cta-card" style:--card-colour={block.background_colour}>
			<h2 class="cta-text">
				{block.title}
			</h2>
			{#if block.actions}
				<div class="icon">
					<a href={block.actions[0].href}>
						<IconArrowRight size={48}></IconArrowRight>
					</a>
				</div>
			{/if}
		</div>
	{/if}
{/if}

<style>
	.block {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}
	.card {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		border: 1px solid var(--theme-colour-highlight);
		background-color: var(--theme-colour-background);
		border-radius: 0.35rem;
	}
	.card-title {
		border-bottom: 1px solid var(--theme-colour-highlight);
		padding: 1rem;
	}
	.card-image {
		width: 100%;
		aspect-ratio: 1 / 1;
		background-color: var(--theme-colour-primary);
	}
	.cta-card {
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
	.cta-card:hover {
		background: color-mix(in oklab, var(--card-colour) 40%, transparent 60%);
	}
	.icon {
		display: flex;
		justify-content: flex-end;
	}
	@media (min-width: 768px) {
		.cta-text {
			height: 100%;
			word-break: break-all;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
