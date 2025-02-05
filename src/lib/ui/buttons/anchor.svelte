<script lang="ts">
	import type { Snippet } from 'svelte'

	let { href, children, label }: { href: string; children?: Snippet; label: string } = $props()
</script>

<a {href}>
	{#if label}
		{label}
	{/if}
	{#if children}
		{@render children()}
	{/if}</a
>

<style>
	a {
		border: 1px solid var(--theme-colour-primary);
		background-color: var(--theme-colour-primary);
		padding: 0.25rem 0.5rem;
		border-radius: 0.35rem;
		display: flex;
		justify-content: center;
		gap: 0.25rem;
		transition: all 0.3s ease-in-out;
		font-family: var(--theme-font-accent);
		color: var(--theme-colour-text);
		font-weight: 600;
		font-size: clamp(0.75rem, 0.675rem + 0.375vw, 0.975rem);
	}
	a:hover {
		border: 1px solid var(--theme-colour-text);
		box-shadow: 0px 0px 10px #ffffff33;
		scale: 1.03;
	}
</style>
