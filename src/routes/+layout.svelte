<script lang="ts">
	import '../app.css'
	import '@fontsource/cousine'
	import '@fontsource-variable/quicksand'
	import '@fontsource-variable/noto-sans'
	import '@fontsource-variable/figtree'
	import Nav from '$lib/ui/nav/nav.svelte'
	import Logos from '$lib/ui/cards/logos.svelte'

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
			accent: 'Cousine'
		}
	}
</script>

<svelte:head>
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
	<div class="watermark-container">
		<img class="watermark" src="/ui/banner.png" alt="" />
	</div>
	<Nav></Nav>
	<main>
		{@render children()}
	</main>
	<div class="logos-container">
		<Logos></Logos>
	</div>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	.theme {
		min-height: 100lvh;
		background-color: var(--theme-colour-background);
	}
	main {
		background-color: var(--theme-colour-background);
		/* min-height: 100lvh; */
	}
	.watermark-container {
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		height: 100lvh;
		width: 100lvw;
		pointer-events: none;
	}
	.watermark {
		filter: saturate(0.35);
		mix-blend-mode: luminosity;
		position: absolute;
		top: 50%;
		right: -37.5%;
		rotate: 270deg;
		opacity: 0.15;
	}
	.logos-container {
		pointer-events: none;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
