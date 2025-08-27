<script lang="ts">
	import Notification from '$lib/ui/cards/notification.svelte'
	import Footer from '$lib/ui/footer/footer.svelte'
	import Nav from '$lib/ui/nav/nav.svelte'
	import { observeRoot } from '$lib/utils/observer.svelte'
	let { children } = $props()
</script>

<div class="screen" use:observeRoot></div>
<Nav></Nav>
<main id="main">
	{@render children()}
</main>
<Footer></Footer>
<Notification></Notification>

<style>
</style>
