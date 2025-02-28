<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte'
	import { page } from '$app/state'
	import Logos from '../cards/logos.svelte'
	import NavButton from '../buttons/nav_button.svelte'
	let scroll = $state(0)
	const routes: { label: string; href: string }[] = [
		{
			label: 'Careers',
			href: '/careers'
		},
		{ label: 'Events', href: '/events' }
	]
</script>

<svelte:window bind:scrollY={scroll} />
<nav class:compact-nav={scroll > 256}>
	<div class="left-col">
		{#if page.url.pathname !== '/'}
			<button
				class="button-link"
				onclick={() => {
					history.back()
				}}
			>
				<IconArrowLeft size={32} stroke-width={2}></IconArrowLeft>
			</button>
			<!-- <a class="button-link" href="/"> -->
			<!-- 	<IconArrowLeft size={32} stroke-width={2}></IconArrowLeft> -->
			<!-- </a> -->
		{/if}
		<Logos></Logos>
	</div>

	<!-- <div class="centre-col"></div> -->
	<div class="right-col">
		{#each routes as { href, label }}
			<NavButton {href} {label}></NavButton>
		{/each}
	</div>
</nav>

<style>
	nav {
		/* background-color: var(--theme-colour-background); */
		color: var(--theme-colour-highlight);
		border: 1px solid transparent;
		border-radius: 999px;
		width: 100%;
		height: 4rem;
		position: sticky;
		top: 0rem;
		left: 0rem;
		padding: 1rem;
		display: grid;
		margin-inline: auto;
		grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
		transition: all 0.3s ease-in-out;
		/* background-color: var(--theme-colour-background); */
		z-index: 99;
	}
	.compact-nav {
		top: 1rem;
		background-color: var(--theme-colour-background);
		width: min(100% - 2rem, 600px);
		margin-inline: auto;
		border: 1px solid var(--theme-colour-highlight);
	}
	.button-link {
		transition: all 0.3s ease-in-out;
	}
	.button-link:target {
		background-color: red;
	}
	.left-col {
		display: flex;
		gap: 2rem;
	}
	.right-col {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		align-items: center;
	}
</style>
