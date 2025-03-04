<script lang="ts">
	let { routes = [], title }: { routes: { label: string; href: string }[]; title: string } =
		$props()
</script>

<div class="collection">
	<p>{title}</p>
	{#each routes as { href, label }}
		<a {href}>{label}</a>
	{/each}
</div>

<style>
	.collection {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
	}
</style>
