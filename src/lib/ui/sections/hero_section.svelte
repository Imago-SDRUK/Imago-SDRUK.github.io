<script lang="ts">
	import Title from '../blog/title.svelte'
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte'
	let height = $state(300)
	let width = $state(300)
</script>

<svelte:window onresize={() => {}} bind:innerHeight={height} bind:innerWidth={width} />
<div class="hero-section">
	<div class="title-wrapper">
		<Title size="huge" title="Making satellite imagery useful, usable and used for..."></Title>
	</div>
	<div class="animation-container">
		<DotLottieSvelte
			renderConfig={{ devicePixelRatio: 2, autoResize: true }}
			src="/city/data.json"
			autoplay
		/>
	</div>
</div>

<style>
	.hero-section {
		position: relative;
		background: linear-gradient(var(--theme-colour-tertiary), var(--theme-colour-background));
		transform: translate(0, -4rem);
	}

	.title-wrapper {
		text-align: center;
		transform: translate(-50%, 100%);
		left: 50%;
		position: absolute;
	}

	.animation-container {
		height: 120lvh;
		width: 100%;
		overflow: hidden;
	}
</style>
