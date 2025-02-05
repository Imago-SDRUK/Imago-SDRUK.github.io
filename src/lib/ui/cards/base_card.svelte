<script lang="ts">
	import { fly } from 'svelte/transition'
	let { children } = $props()
</script>

<div class="card" in:fly|global={{ y: 40 }}>
	{@render children()}
</div>

<style>
	.card {
		/* padding: 1rem; */
		border: 1px solid var(--theme-colour-text);
		/* color: var(--theme-colour-text); */
		/* aspect-ratio: 1 / 1; */
	}
</style>
