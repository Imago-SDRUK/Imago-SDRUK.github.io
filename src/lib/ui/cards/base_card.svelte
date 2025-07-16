<script lang="ts">
	import type { Snippet } from 'svelte'
	import { fly } from 'svelte/transition'
	let { children, border }: { children: Snippet; border?: boolean } = $props()
</script>

<div class="card" class:border in:fly|global={{ y: 40 }}>
	{@render children()}
</div>

<style>
	.card {
		/* padding: 1rem; */
		/* color: var(--theme-colour-text); */
		/* aspect-ratio: 1 / 1; */
	}
	.border {
		border: 1px solid var(--theme-colour-text);
	}
</style>
