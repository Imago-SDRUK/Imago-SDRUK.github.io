<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'

	let {
		leftCol,
		rightCol,
		onclick
	}: { leftCol?: Snippet; rightCol?: Snippet; onclick?: MouseEventHandler<HTMLButtonElement> } =
		$props()
</script>

<button {onclick}>
	{@render leftCol?.()}
	{@render rightCol?.()}
</button>

<style>
	button {
		display: flex;
		justify-content: space-between;
		padding: 0.25rem 2rem;
		color: var(--theme-colour-text);
		font-weight: 300;
		background-color: var(--theme-colour-primary);
		border: 1px solid var(--theme-colour-primary);
		border-radius: 999px;
		font-family: var(--theme-font-accent);
		/* font-size: clamp(0.75rem, 0.675rem + 0.375vw, 0.975rem); */
		font-size: 0.975rem;
		transition: all 0.3s ease-in-out;
	}
	button:hover {
		border: 1px solid var(--theme-colour-text);
		box-shadow: 0px 0px 10px
			color-mix(in oklab, var(--theme-colour-text) 20%, var(--theme-colour-background) 80%);
		/* background-color: color-mix( */
		/* 	in oklab, */
		/* 	var(--theme-colour-primary) 80%, */
		/* 	var(--theme-colour-text) 20% */
		/* ); */
	}
</style>
