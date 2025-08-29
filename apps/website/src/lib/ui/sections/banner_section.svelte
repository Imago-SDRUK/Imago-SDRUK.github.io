<script lang="ts">
	import type { Snippet } from 'svelte'
	let { children }: { children?: Snippet } = $props()
</script>

<div class="section">
	{@render children?.()}
</div>

<style>
	.section {
		display: flex;
		gap: 1rem;
		z-index: 1;
		padding: 4rem 0;
		background: linear-gradient(var(--theme-colour-q), var(--theme-colour-background));
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: min(100% - 4rem, 1400px);
		margin-inline: auto;
	}

	@media (min-width: 768px) {
		.section {
			padding: 2rem 0;
			flex-direction: row;
			overflow: scroll;
			scrollbar-width: none;
			display: flex;
			flex-direction: row;
		}
		:global(.section > *) {
			flex-grow: 1;
			flex-shrink: 0;
			justify-content: space-evenly;
		}
	}
</style>
