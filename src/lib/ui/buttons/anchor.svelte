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
	{/if}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		width="24"
		height="24"
		stroke-width="2"
	>
		<path d="M17 7l-10 10"></path>
		<path d="M8 7l9 0l0 9"></path>
	</svg>
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
	}
	a:hover {
		border: 1px solid var(--theme-colour-text);
		color: var(--theme-colour-text);
		box-shadow: 0px 0px 10px #ffffff33;
		scale: 1.01;
	}
</style>
