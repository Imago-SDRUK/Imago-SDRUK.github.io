<script lang="ts">
	import type { Snippet } from 'svelte'
	let { leftCol, rightCol }: { leftCol?: Snippet; rightCol?: Snippet } = $props()
</script>

<section class="form-section">
	<div class="left-col">
		{@render leftCol?.()}
	</div>
	<div class="right-col">
		{@render rightCol?.()}
	</div>
</section>

<style>
	.form-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
	}
	.left-col {
		border-right: 1px solid var(--theme-colour-tertiary);
	}
</style>
