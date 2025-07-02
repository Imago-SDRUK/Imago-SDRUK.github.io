<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'

	let {
		anchor = false,
		href,
		download,
		leftCol,
		rightCol,
		onclick,
		active,
		alt
	}: {
		anchor?: boolean
		href?: string
		download?: string
		leftCol?: Snippet
		rightCol?: Snippet
		onclick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
		active?: boolean
		alt?: boolean
	} = $props()
</script>

{#if anchor}
	<a class:active {onclick} class:alt {href} {download}>
		{@render leftCol?.()}
		{@render rightCol?.()}
	</a>
{/if}
{#if anchor === false}
	<button class:active {onclick} class:alt>
		{@render leftCol?.()}
		{@render rightCol?.()}
	</button>
{/if}

<style>
	a,
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
		gap: 1rem;
	}
	a,
	button:hover {
		border: 1px solid var(--theme-colour-text);
		box-shadow: 0px 0px 10px
			color-mix(in oklab, var(--theme-colour-text) 20%, var(--theme-colour-background) 80%);
		background-color: color-mix(
			in oklab,
			var(--theme-colour-primary) 90%,
			var(--theme-colour-background) 10%
		);
	}
	a.active,
	button.active {
		outline: 3px solid var(--theme-colour-highlight);
		outline-offset: 2px;
	}
	.alt {
		background-color: transparent;
		border: 1px solid var(--theme-colour-highlight);
		color: var(--theme-colour-highlight);
	}

	.alt:hover {
		background-color: color-mix(
			in oklab,
			var(--theme-colour-highlight) 10%,
			var(--theme-colour-background) 90%
		);
	}
</style>
