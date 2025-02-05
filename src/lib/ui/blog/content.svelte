<script lang="ts">
	let { children } = $props()
</script>

<div class="content prose-sm">
	{@render children()}
</div>

<style>
	.content {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-paragraph);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-weight: 200;
		font-size: clamp(0.85rem, 0.8rem + 0.25vw, 1rem);
	}
</style>
