<script lang="ts">
	import { FOOTER_HEIGHT, NAV_HEIGHT } from '$lib/globals/style'
	import type { Snippet } from 'svelte'
	import { fly } from 'svelte/transition'
	let { children }: { children?: Snippet } = $props()
</script>

<section in:fly={{ y: 40 }} style:--nav-height={NAV_HEIGHT} style:--footer-height={FOOTER_HEIGHT}>
	{@render children?.()}
</section>

<style>
	section {
		padding: 1rem 1rem 4rem 1rem;
		width: min(100lvw - 4rem, 1440px);
		margin-inline: auto;
		min-height: calc(100lvh - var(--nav-height) - var(--footer-height));
	}
</style>
