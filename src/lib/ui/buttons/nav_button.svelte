<script lang="ts">
	let { label, href }: { label: string; href: string } = $props()
</script>

<a {href}>{label}</a>

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
