<script lang="ts">
	let {
		scroll = 0,
		href = '/',
		footer
	}: { scroll?: number; href?: string; footer?: boolean } = $props()
</script>

{#if footer}
	<div class="logos">
		<a href="/"> <img class="logo" src="/ui/imago_logo.png" alt="" /> </a>
		<a href="/">
			<img class="logo" src="/ui/sdr_logo.png" alt="" />
		</a>
		<a href="/"> <img class="logo" src="/ui/ukri_logo.png" alt="" /> </a>
	</div>
{:else}
	<a {href} class="logos">
		{#if scroll > 256}
			<img class="icon" src="/favicon.png" alt="" />
		{:else}
			<img class="logo" src="/ui/imago_logo.png" alt="" />
		{/if}
	</a>
{/if}

<style>
	.icon {
		height: 2rem;
	}
	.logo {
		/* height: clamp(1rem, 0.75rem + 1.25vw, 1.75rem); */
		height: 3.5rem;
		object-fit: contain;
	}
	.logos {
		display: flex;
		gap: 0.75rem;
	}
</style>
