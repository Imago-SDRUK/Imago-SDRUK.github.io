<script lang="ts">
	import type { Snippet } from 'svelte'
	import { fly } from 'svelte/transition'
	let { children }: { children?: Snippet } = $props()
</script>

<section in:fly={{ y: 40 }}>
	{@render children?.()}
</section>

<style>
	section {
		padding: 1rem 1rem 4rem 1rem;
		width: min(100lvw - 4rem, 1440px);
		margin-inline: auto;
	}
</style>
