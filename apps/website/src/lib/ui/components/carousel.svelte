<script lang="ts">
	import { getId, Picture } from '@arturoguzman/art-ui'
	import LottiePlayer from '../players/lottie_player.svelte'
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right'
	import ArrowLeft from '@tabler/icons-svelte/icons/arrow-left'
	let { block } = $props()
	const id = getId()
	let current = $state(0)
</script>

<div class="carousel" id="carousel-{id}">
	<div class="assets">
		{#if block.media}
			{#each block.media as { directus_files_id }, index}
				{@const media = directus_files_id}
				<div class="asset" id="carousel-{id}-{index}">
					{#if media && typeof media !== 'string'}
						{#if media.type?.startsWith('image/')}
							<Picture image={media}></Picture>
						{/if}
						{#if media.type === 'application/json'}
							<LottiePlayer src="/assets/{media.id}"></LottiePlayer>
						{/if}
					{/if}
				</div>
			{/each}
		{/if}
	</div>
	{#if block.media.length > 1}
		{#if current > 0}
			<button
				class="left-button"
				onclick={() => {
					current--
					document
						.getElementById(`carousel-${id}-${current}`)
						?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
				}}><ArrowLeft></ArrowLeft></button
			>
		{/if}
		{#if block.media.length - 1 > current}
			<button
				onclick={() => {
					current++
					document
						.getElementById(`carousel-${id}-${current}`)
						?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
				}}
				class="right-button"><ArrowRight></ArrowRight></button
			>
		{/if}
	{/if}
</div>

<style>
	.carousel {
		position: relative;
	}
	.assets {
		display: flex;
		overflow: scroll;
		scrollbar-width: none;
		scroll-snap-type: x mandatory;
		width: 100%;
	}
	button {
		height: 100%;
		color: var(--theme-colour-background);
	}
	.left-button {
		position: absolute;
		left: 0;
		top: 0;
	}
	.right-button {
		position: absolute;
		right: 0;
		top: 0;
	}
	.assets > * {
		scroll-snap-align: start;
		flex-grow: 0;
		flex-shrink: 0;
	}
	.asset {
		width: 100%;
	}
</style>
