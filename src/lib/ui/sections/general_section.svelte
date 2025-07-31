<script lang="ts">
	import type { Section } from '$lib/types/directus'
	import Content from '../blog/content.svelte'
	import Title from '../blog/title.svelte'
	import PageBlock from '../cards/page_block.svelte'
	import Subtitle from '../text/subtitle.svelte'
	import BaseSection from './base_section.svelte'

	let { section }: { section: Section } = $props()

	function getBasis(num?: number) {
		if (num === 1) return '100%'
		if (num === 2) return '45%'
		return
	}
</script>

<BaseSection>
	<div class="general-section">
		<div class="header">
			{#if section.title}
				<Title size="large" title={section.title}></Title>
			{/if}
			{#if section.subtitle}
				<Subtitle size="small" subtitle={section.subtitle}></Subtitle>
			{/if}
			{#if section.description}
				<Content>{@html section.description}</Content>
			{/if}
		</div>
		<div class="blocks">
			{#each section.content ?? [] as { blocks_id }}
				<div class="block-wrapper" style:--basis={getBasis(section.content?.length)}>
					<PageBlock {blocks_id}></PageBlock>
				</div>
			{/each}
		</div>
	</div>
</BaseSection>
<div></div>

<style>
	.general-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		gap: 2rem;
	}
	.blocks {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.block-wrapper {
		flex-basis: var(--basis, 45%);
		justify-content: space-evenly;
		container-type: inline-size;
	}
	@media (min-width: 768px) {
		.block-wrapper {
			flex-basis: var(--basis, 30%);
		}
	}
	@media (min-width: 1280px) {
		.block-wrapper {
			flex-basis: var(--basis, 24%);
		}
	}
</style>
