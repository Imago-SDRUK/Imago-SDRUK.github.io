<script lang="ts">
	import type { Snippet } from 'svelte'
	let { leftCol, rightCol }: { leftCol?: Snippet; rightCol?: Snippet } = $props()
</script>

<!--
@component
A two column structure to create sections

- Usage:
  ```svelte
<TwoColumnsSection>
  {#snippet leftCol()}
  ... left column elements
  {/snippet}
  {#snippet rightCol()}
  ... right column elements
  {/snippet}
</TwoColumnsSection>
  ```
-->
<section class="section">
	{#if leftCol}
		<div class="left-col">
			{@render leftCol()}
		</div>
	{/if}
	{#if rightCol}
		<div class="right-col">
			{@render rightCol()}
		</div>
	{/if}
</section>

<style>
	.section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
	}
	.left-col {
		border-right: 1px solid var(--theme-colour-tertiary);
	}
	@media (min-width: 768px) {
		.section {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);
		}
		.left-col {
			border-right: 1px solid var(--theme-colour-tertiary);
		}
	}
</style>
