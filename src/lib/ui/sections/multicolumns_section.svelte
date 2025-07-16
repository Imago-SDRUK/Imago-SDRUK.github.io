<script lang="ts">
	import type { Snippet } from 'svelte'
	let {
		columns = 1,
		gap = '1rem',
		title,
		children
	}: { columns?: number; gap?: string; title?: Snippet; children?: Snippet } = $props()
</script>

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

<style>
	.section {
		width: min(100% - 4rem, 1280px);
		margin-inline: auto;
		display: grid;
		gap: clamp(1rem, 0.667rem + 1.667vw, 2rem);
	}
	.section-content {
		display: grid;
		grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
		gap: var(--gap);
	}
</style>
