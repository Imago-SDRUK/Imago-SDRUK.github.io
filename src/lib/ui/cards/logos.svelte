<script lang="ts">
	let { scroll = 0 }: { scroll: number } = $props()
</script>

<a href="/" class="logos">
	{#if scroll > 256}
		<img src="/favicon.png" alt="" />
	{:else}
		<img src="/ui/imago_logo.png" alt="" />
		<img src="/ui/ukri_logo.png" alt="" />
	{/if}
</a>

<style>
	img {
		height: clamp(1rem, 0.75rem + 1.25vw, 1.75rem);
	}
	.logos {
		display: flex;
		gap: 0.75rem;
	}
</style>
