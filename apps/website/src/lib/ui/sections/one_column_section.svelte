<script lang="ts">
	let { children } = $props()
</script>

<!--
@component
A one column structure to create sections

- Usage:
  ```svelte
<OneColumnSection>
  ... child elements
</OneColumnSection>
  ```
-->
<section class="section">
	{#if children}
		{@render children()}
	{/if}
</section>

<style>
	.section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
	}

	@media (min-width: 768px) {
		.section {
			display: grid;
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);
		}
	}
</style>
