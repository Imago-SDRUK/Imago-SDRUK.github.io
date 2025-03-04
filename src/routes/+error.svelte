<script lang="ts">
	import Footer from '$lib/ui/footer/footer.svelte'
	import Nav from '$lib/ui/nav/nav.svelte'
	import { page } from '$app/state'
	import { FOOTER_HEIGHT, NAV_HEIGHT } from '$lib/globals/style'
	import Title from '$lib/ui/blog/title.svelte'
</script>

<Nav></Nav>
<div class="error-section" style:--nav-height={NAV_HEIGHT} style:--footer-height={FOOTER_HEIGHT}>
	<div class="error-message">
		<Title title={`${page.status} ${page.error?.message}`}></Title>
	</div>
</div>

<Footer></Footer>

<style>
	.error-section {
		height: calc(100lvh - var(--nav-height) - var(--footer-height));
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.error-message {
		width: min(100% - 2rem, 600px);
		margin-inline: auto;
		text-align: center;
	}
</style>
