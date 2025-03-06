<script lang="ts">
	import '../app.css'
	import '@fontsource/cousine'
	import '@fontsource-variable/quicksand'
	import '@fontsource-variable/noto-sans'
	import '@fontsource-variable/figtree'
	import '@fontsource-variable/space-grotesk'
	import Nav from '$lib/ui/nav/nav.svelte'
	import Logos from '$lib/ui/cards/logos.svelte'
	import { PUBLIC_NODE_ENV } from '$env/static/public'

	let { children } = $props()
	const theme = {
		colours: {
			background: '#24226f',
			text: '#e2e5f3',
			primary: '#ff8f42',
			secondary: '#4584a5',
			tertiary: '#8c91a8',
			quarternary: '#4a4a49',
			highlight: '#03cea3'
		},
		fonts: {
			title: 'Figtree Variable',
			subtitle: 'Quicksand Variable',
			paragraph: 'Noto Sans Variable',
			accent: 'Space Grotesk Variable'
		}
	}
</script>

<svelte:head>
	{#if PUBLIC_NODE_ENV === 'production'}
		<script
			defer
			src="https://events.arturoguzman.art/script.js"
			data-website-id="6514d5fc-b640-45d3-92b3-3135517734a0"
		></script>
	{/if}
	<title>Imago - SDRUK</title>
</svelte:head>

<div
	style:--theme-colour-background={theme.colours.background}
	style:--theme-colour-text={theme.colours.text}
	style:--theme-colour-highlight={theme.colours.highlight}
	style:--theme-colour-primary={theme.colours.primary}
	style:--theme-colour-secondary={theme.colours.secondary}
	style:--theme-colour-tertiary={theme.colours.tertiary}
	style:--theme-colour-quarternary={theme.colours.quarternary}
	style:--theme-font-title={theme.fonts.title}
	style:--theme-font-subtitle={theme.fonts.subtitle}
	style:--theme-font-paragraph={theme.fonts.paragraph}
	style:--theme-font-accent={theme.fonts.accent}
	class="theme"
>
	<!-- <div class="watermark-container"> -->
	<!-- 	<img class="watermark" src="/ui/banner.png" alt="" /> -->
	<!-- </div> -->
	{@render children()}
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	.theme {
		min-height: 100lvh;
		background-color: var(--theme-colour-background);
	}
</style>
