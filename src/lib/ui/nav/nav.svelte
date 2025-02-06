<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte'
	import { page } from '$app/state'
</script>

<nav>
	{#if page.url.pathname !== '/'}
		<a class="button-link" href="/">
			<IconArrowLeft size={32} stroke-width={2}></IconArrowLeft>
		</a>
	{/if}
</nav>

<style>
	nav {
		/* background-color: var(--theme-colour-background); */
		color: var(--theme-colour-highlight);
		width: 100%;
		height: 4rem;
		position: sticky;
		top: 0;
		left: 0;
		padding: 1rem;
		display: grid;
		grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
	}
	.button-link {
		transition: all 0.3s ease-in-out;
	}
	.button-link:target {
		background-color: red;
	}
</style>
