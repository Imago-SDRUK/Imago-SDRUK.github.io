<script lang="ts">
	import Footer from '$lib/ui/footer/footer.svelte'
	import Nav from '$lib/ui/nav/nav.svelte'
	import { page } from '$app/state'
	import { NAV_HEIGHT } from '$lib/globals/style'
	import Title from '$lib/ui/blog/title.svelte'
	import Button from '$lib/ui/buttons/button.svelte'
	import { goto } from '$app/navigation'
	import Home from '@tabler/icons-svelte/icons/home'
</script>

<Nav></Nav>
<div class="error-section" style:--nav-height={NAV_HEIGHT}>
	<div class="error-message">
		<Title title={`${page.status} ${page.error?.message}`}></Title>
		<div class="button-container">
			<Button
				onclick={() => {
					goto('/')
				}}
			>
				{#snippet leftCol()}
					<p>Head home?</p>
				{/snippet}
				{#snippet rightCol()}
					<Home></Home>
				{/snippet}
			</Button>
		</div>
	</div>
</div>

<Footer></Footer>

<style>
	.error-section {
		min-height: calc(100lvh - var(--nav-height));
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.error-message {
		width: min(100% - 2rem, 600px);
		margin-inline: auto;
		text-align: center;
	}
	.button-container {
		margin: 2rem 0;
		display: flex;
		justify-content: center;
	}
</style>
