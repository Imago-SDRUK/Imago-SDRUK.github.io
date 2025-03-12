<script lang="ts">
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right'
	import ArrowUpRight from '@tabler/icons-svelte/icons/arrow-up-right'
	import type { Snippet } from 'svelte'
	let {
		href,
		children,
		label,
		character_limit = 60
	}: { href: string; children?: Snippet; label?: string; character_limit?: number } = $props()
</script>

<a {href}>
	{#if label}
		{String(label).length > character_limit
			? `${String(label).slice(0, character_limit)}...`
			: label}
	{/if}
	{#if children}
		{@render children()}
	{/if}

	{#if href.startsWith('http')}
		<ArrowUpRight></ArrowUpRight>
	{/if}
	{#if href.startsWith('/')}
		<ArrowRight></ArrowRight>
	{/if}
</a>

<style>
	a {
		border: 1px solid var(--theme-colour-highlight);
		/* background-color: var(--theme-colour-second); */
		padding: 0.25rem 1.25rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem;
		transition: all 0.3s ease-in-out;
		font-family: var(--theme-font-title);
		color: var(--theme-colour-highlight);
		text-shadow: 1px 1px color-mix(in oklab, var(--theme-colour-quarternary) 80%, transparent 20%);
		/* text-wrap: nowrap; */
		font-weight: 600;
		/* font-size: clamp(0.75rem, 0.675rem + 0.375vw, 0.975rem); */
		font-size: 0.975rem;
		text-transform: capitalize;
	}
	a:hover {
		border: 1px solid var(--theme-colour-text);
		color: var(--theme-colour-text);
		box-shadow: 0px 0px 10px #ffffff33;
		scale: 1.01;
	}
</style>
