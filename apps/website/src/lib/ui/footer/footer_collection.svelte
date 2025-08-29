<script lang="ts">
	let { routes = [], title }: { routes?: { label: string; href: string }[]; title: string } =
		$props()
</script>

<div class="collection">
	<p class="title">{title}</p>
	<div class="routes">
		{#each routes as { href, label }}
			<a {href}>{label}</a>
		{/each}
	</div>
</div>

<style>
	.collection {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
	}

	.title {
		font-weight: 500;
	}
	.routes {
		margin-top: 0.45rem;
		gap: 0.25rem;
		display: flex;
		flex-direction: column;
		font-size: clamp(0.75rem, 0.675rem + 0.375vw, 0.975rem);
		font-weight: 100;
	}
</style>
