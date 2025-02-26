<script lang="ts">
	import HeroSection from '$lib/ui/sections/hero_section.svelte'
	let { data } = $props()
</script>

<div class="page">
	<HeroSection></HeroSection>
</div>

<style>
	/* .page { */
	/* 	padding: 1.25rem; */
	/* } */
	/* .page-grid { */
	/* 	display: grid; */
	/* 	gap: 1rem; */
	/* 	grid-template-columns: repeat(2, minmax(0, 1fr)); */
	/* 	z-index: 1; */
	/* } */
</style>
