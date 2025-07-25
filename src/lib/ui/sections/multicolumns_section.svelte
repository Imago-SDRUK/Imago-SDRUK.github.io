<script lang="ts">
	import type { Snippet } from 'svelte'
	import BaseSection from './base_section.svelte'
	let {
		columns = 1,
		gap = '1rem',
		title,
		children
	}: {
		columns?: number
		gap?: string
		title?: Snippet
		children?: Snippet
		reverse?: boolean
	} = $props()
</script>

<BaseSection>
	<div class="section">
		{#if title}
			<div class="section-title">
				{@render title()}
			</div>
		{/if}
		{#if children}
			<div class="section-content" style:--columns={columns} style:--gap={gap}>
				{@render children()}
			</div>
		{/if}
	</div>
</BaseSection>

<style>
	.section {
		width: min(100% - 4rem, 1280px);
		margin-inline: auto;
		display: grid;
		gap: clamp(1rem, 0.667rem + 1.667vw, 2rem);
	}
	.section-content {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, min-content) minmax(0, 1fr);
		gap: var(--gap);
	}
	@media (min-width: 1024px) {
		.section-content {
			grid-template-rows: initial;
			grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
		}
	}
</style>
