<script lang="ts">
	let { label, href }: { label: string; href: string } = $props()
</script>

<a {href}>{label}</a>

<style>
	a {
		font-family: var(--theme-font-accent);
		color: var(--theme-colour-accent);
	}
	a:hover {
		text-decoration: underline;
	}
</style>
