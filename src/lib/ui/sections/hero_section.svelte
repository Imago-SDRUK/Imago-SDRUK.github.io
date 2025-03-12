<script lang="ts">
	import { onMount } from 'svelte'
	import Title from '../blog/title.svelte'
	import BaseSection from './base_section.svelte'
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte'
	import { DotLottie } from '@lottiefiles/dotlottie-web'
	import { debounce } from '@arturoguzman/art-ui'
	let height = $state(300)
	let width = $state(300)
	let lottie: DotLottie | undefined = $state(undefined)
	// onMount(() => {
	// 	lottie = new DotLottie({
	// 		autoplay: true,
	// 		// loop: true,
	// 		canvas: document.querySelector('#city-canvas'),
	// 		src: '/city/data.json', // or .json file
	// 		renderConfig: {
	// 			// autoResize: true,
	// 			devicePixelRatio: 2
	// 		}
	// 	})
	// })
	// const createshit = debounce(() => {
	// 	lottie = new DotLottie({
	// 		autoplay: true,
	// 		// loop: true,
	// 		canvas: document.querySelector('#city-canvas'),
	// 		src: '/city/data.json', // or .json file
	// 		renderConfig: {
	// 			// autoResize: true,
	// 			devicePixelRatio: 2
	// 		}
	// 	})
	// }, 400)
</script>

<svelte:window
	onresize={() => {
		// if (lottie) {
		// 	lottie.destroy()
		// }
		// createshit()
	}}
	bind:innerHeight={height}
	bind:innerWidth={width}
/>
<!-- <BaseSection> -->
<div class="hero-section">
	<div class="title-wrapper">
		<Title size="huge" title="Making satellite imagery useful, usable and for"></Title>
	</div>
	<!-- <canvas class="city-canvas" id="city-canvas"></canvas> -->
	<div class="animation-container">
		<DotLottieSvelte
			renderConfig={{ devicePixelRatio: 2, autoResize: true }}
			src="/city/data.json"
			autoplay
		/>
	</div>
</div>

<!-- </BaseSection> -->

<style>
	.hero-section {
		/* display: grid; */
		/* grid-template-columns: minmax(0, 1fr); */
		/* grid-template-rows: minmax(0, 1fr) minmax(0, max-content); */
		/* overflow: hidden; */
		/* width: min(100%, 1280px); */
		/* margin-inline: auto; */
		/* height: calc(100lvh - 4rem); */
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

	.city-canvas {
		transform: translate(-7%, -25%);
	}
	.animation-container {
		height: 120lvh;
		width: 100%;
		overflow: hidden;
	}
	/* @media (min-width: 1280px) { */
	/* 	.hero-section { */
	/* 		border: 1px solid var(--theme-colour-text); */
	/* 	} */
	/* } */
</style>
