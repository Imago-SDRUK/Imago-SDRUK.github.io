<script lang="ts">
	import type { PagesSection } from '$lib/types/directus'
	import Title from '../blog/title.svelte'
	import PageBlock from '../cards/page_block.svelte'
	import Subtitle from '../text/subtitle.svelte'
	import BannerSection from './banner_section.svelte'
	import CardsSection from './cards_section.svelte'
	import MulticolumnsSection from './multicolumns_section.svelte'
	import StacksSection from './stacks_section.svelte'

	let { sections }: { sections: PagesSection[] | null } = $props()
</script>

{#each sections ?? [] as { sections_id }, section_index}
	{@const section = sections_id}
	{#if section && typeof section !== 'string'}
		{#if section.design === 'columns'}
			<MulticolumnsSection columns={section.columns ?? 0}>
				{#snippet title()}
					{#if section.title}
						<Title size="huge" title={section.title}></Title>
					{/if}
					{#if section.subtitle}
						<Subtitle size="small" subtitle={section.subtitle}></Subtitle>
					{/if}
				{/snippet}
				{#if section.columns === 2}
					<div class="left-col">
						{#each section.left_column ?? [] as { blocks_id }}
							<PageBlock {blocks_id}></PageBlock>
						{/each}
					</div>
					<div class="right-col">
						{#each section.right_column ?? [] as { blocks_id }}
							<PageBlock {blocks_id}></PageBlock>
						{/each}
					</div>
				{:else}
					{#each section.content ?? [] as { blocks_id }}
						<PageBlock {blocks_id}></PageBlock>
					{/each}
				{/if}
			</MulticolumnsSection>
		{/if}
		{#if section.design === 'stacks'}
			<StacksSection {section} index={section_index} id="stack-{section_index}"></StacksSection>
		{/if}
		{#if section.design === 'cards'}
			<CardsSection>
				{#each section.content ?? [] as { blocks_id }}
					<PageBlock {blocks_id}></PageBlock>
				{/each}
			</CardsSection>
			<div class="section beacons-section"></div>
		{/if}
		{#if section.design === 'banner'}
			<BannerSection>
				{#each section.content ?? [] as { blocks_id }}
					<PageBlock {blocks_id}></PageBlock>
				{/each}
			</BannerSection>
		{/if}
	{/if}
{/each}
