<script lang="ts">
	import type { PointerEventHandler } from 'svelte/elements'

	let {
		label,
		href,
		onpointerenter,
		onpointerleave,
		onpointerdown
	}: {
		label: string
		href: string
		onpointerdown?: PointerEventHandler<HTMLAnchorElement>
		onpointerleave?: PointerEventHandler<HTMLAnchorElement>
		onpointerenter?: PointerEventHandler<HTMLAnchorElement>
	} = $props()
</script>

<a {onpointerenter} {onpointerleave} {onpointerdown} {href}>{label}</a>

<style>
	a {
		font-family: var(--theme-font-accent);
		color: var(--theme-colour-accent);
		text-shadow: 1px 1px 15px var(--theme-colour-background);
	}
	a:hover {
		text-decoration: underline;
	}
</style>
