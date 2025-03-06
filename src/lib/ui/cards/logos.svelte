<script lang="ts">
	let { scroll = 0 }: { scroll?: number } = $props()
</script>

<a href="/" class="logos">
	{#if scroll > 256}
		<img class="icon" src="/favicon.png" alt="" />
	{:else}
		<img class="logo" src="/ui/imago_logo.png" alt="" />
		<img class="logo" src="/ui/ukri_logo.png" alt="" />
	{/if}
</a>

<style>
	.icon {
		height: 2rem;
	}
	.logo {
		/* height: clamp(1rem, 0.75rem + 1.25vw, 1.75rem); */
		height: 1.75rem;
	}
	.logos {
		display: flex;
		gap: 0.75rem;
	}
</style>
