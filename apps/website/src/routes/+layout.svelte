<script lang="ts">
	import '../app.css'
	import '@fontsource/cousine'
	import '@fontsource-variable/quicksand'
	import '@fontsource-variable/noto-sans'
	import '@fontsource-variable/figtree'
	import '@fontsource-variable/space-grotesk'
	import { env } from '$env/dynamic/public'
	import { window_height, window_width } from '$lib/stores/layout.svelte'
	import { theme } from '$lib/ui/utils/theme'
	let { children } = $props()
</script>

<svelte:head>
	{#if env.PUBLIC_NODE_ENV === 'production'}
		<script
			defer
			src="https://events.imago.ac.uk/script.js"
			data-website-id="a90d4bb4-e429-400e-9f89-9935f2570abe"
		></script>
	{/if}
	<title>Imago - SDRUK</title>
</svelte:head>
<svelte:window bind:innerWidth={$window_width} bind:innerHeight={$window_height} />
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
	<!-- 	<img class="watermark" src="/static/ui/banner.png" alt="" /> -->
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
