<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'

	let { children, onclick }: { children: Snippet; onclick?: MouseEventHandler<HTMLButtonElement> } =
		$props()
</script>

<button {onclick}>
	{@render children()}
</button>

<style>
	button {
		display: flex;
		justify-content: space-between;
		padding: 0.25rem 0.25rem;
		color: var(--theme-colour-text);
		font-family: var(--theme-font-accent);
		/* font-size: clamp(0.75rem, 0.675rem + 0.375vw, 0.975rem); */
		font-size: 0.975rem;
		transition: all 0.3s ease-in-out;
	}
	button:hover {
		color: var(--theme-colour-primary);
		/* background-color: color-mix( */
		/* 	in oklab, */
		/* 	var(--theme-colour-primary) 80%, */
		/* 	var(--theme-colour-text) 20% */
		/* ); */
	}
</style>
