<script lang="ts">
	import BaseSection from './base_section.svelte'
	import Title from '$lib/ui/blog/title.svelte'
	import type { Snippet } from 'svelte'
	let {
		title,
		children,
		sectionNav
	}: { title?: string; children?: Snippet; sectionNav?: Snippet } = $props()
</script>

<BaseSection>
	<div class="cards-section">
		{#if title}
			<Title size="large" {title}></Title>
		{/if}
		{@render sectionNav?.()}
		<div class="cards-content">
			{@render children?.()}
		</div>
	</div>
</BaseSection>

<style>
	.cards-section {
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		z-index: 1;
		position: relative;
	}
	.cards-content {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-rows: minmax(0, max-content);
		gap: 2rem;
		position: relative;
	}

	@media (min-width: 768px) {
		.cards-content {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			grid-auto-rows: minmax(0, max-content);
			gap: 2rem;
			position: relative;
		}
	}
	@media (min-width: 1024px) {
		.cards-content {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
			grid-auto-rows: minmax(0, max-content);
			gap: 2rem;
			position: relative;
		}
	}
	@media (min-width: 1440px) {
		.cards-content {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
			grid-auto-rows: minmax(0, max-content);
			gap: 2rem;
			position: relative;
		}
	}
</style>
