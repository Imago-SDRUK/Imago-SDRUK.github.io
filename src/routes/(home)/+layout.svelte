<script lang="ts">
	import Notification from '$lib/ui/cards/notification.svelte'
	import Footer from '$lib/ui/footer/footer.svelte'
	import Nav from '$lib/ui/nav/nav.svelte'

	let { children } = $props()
</script>

<Nav></Nav>
<main>
	{@render children()}
</main>
<Footer></Footer>
<Notification></Notification>
