<script lang="ts">
	import Title from '../blog/title.svelte'
	import LottiePlayer from '../players/lottie_player.svelte'
	let height = $state(300)
	let width = $state(300)
	const ids = [
		{
			id: 'animation-button-prosperity',
			label: 'Prosperity',
			action: (ev: MouseEvent) => {
				console.log('go to prosperity')
			}
		},
		{
			id: 'animation-button-wellbeing',
			label: 'Wellbeing',
			action: (ev: MouseEvent) => {
				console.log('go to wellbeing')
			}
		},
		{
			id: 'animation-button-sustainability',
			label: 'Sustainability',
			action: (ev: MouseEvent) => {
				console.log('go to sustainability')
			}
		}
	]
</script>

<svelte:window onresize={() => {}} bind:innerHeight={height} bind:innerWidth={width} />
<div class="hero-section">
	<div class="bg-image-container">
		<img class="bg-image" src="/ui/terrain_1.png" alt="" />
	</div>
	<div class="title-wrapper">
		<Title size="huge" title="Making satellite imagery useful, usable and used for..."></Title>
	</div>
	<div class="beacons-buttons">
		{#each ids as id (id)}
			<button
				class="beacon-button"
				onclick={(ev) => {
					id.action(ev)
				}}>{id.label}</button
			>
		{/each}
	</div>
	<div class="animation-container">
		<LottiePlayer
			src="/city/data.json"
			mountAction={() => {
				setTimeout(() => {
					for (const id of ids) {
						const el = document.getElementById(id.id)
						if (el) {
							el.style.cursor = 'pointer'
							el.addEventListener('click', id.action)
						}
					}
				}, 1000)
			}}
		></LottiePlayer>
	</div>
</div>

<style>
	.hero-section {
		position: relative;
		background: linear-gradient(var(--theme-colour-tertiary), var(--theme-colour-background));
		transform: translate(0, -4rem);
		height: 100lvh;
		display: flex;
		gap: 4rem;
		flex-direction: column;
		padding: 1rem;
		justify-content: center;
	}

	.bg-image-container {
		height: 100lvh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.bg-image-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			color-mix(in oklab, 75% var(--theme-colour-tertiary), 25% transparent) 15%,
			var(--theme-colour-background)
		);
	}
	.bg-image {
		height: 100lvh;
		aspect-ratio: auto;
		object-fit: cover;
	}
	.title-wrapper {
		text-align: center;
	}

	.animation-container {
		display: none;
	}
	.beacons-buttons {
		display: flex;
		flex-direction: column;
		/* height: 100%; */
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	}
	.beacon-button {
		background-color: var(--theme-colour-background);
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
		font-weight: 600;
		font-size: clamp(1.25rem, 1.083rem + 0.833vw, 1.75rem);
		padding: clamp(0.8rem, 0.733rem + 0.333vw, 1rem);
		width: min(100% - 1rem, 250px);
		border: 1px solid var(--theme-colour-highlight);
		border-radius: 0.5rem;
		box-shadow:
			0 4px 6px -1px color-mix(in oklab, var(--theme-colour-highlight) 40%, transparent 60%),
			0 2px 4px -2px color-mix(in oklab, white 40%, transparent 60%);
		transition: all 0.3s ease-in-out;
	}
	.beacon-button:hover {
		box-shadow:
			0 10px 15px -5px var(--theme-colour-highlight),
			0 6px 8px -6px white;
	}
	@media (min-width: 768px) {
		.hero-section {
			display: block;
			padding: initial;
		}
		.title-wrapper {
			text-align: center;
			transform: translate(-50%, 100%);
			left: 50%;
			position: absolute;
		}
		.beacons-buttons {
			display: none;
		}
		.animation-container {
			display: flex;
			height: 110lvh;
			width: 100%;
			overflow: hidden;
			align-items: flex-end;
			position: relative;
		}
		.animation-container::after {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			background: linear-gradient(transparent 75%, var(--theme-colour-background));
			pointer-events: none;
		}
		.bg-image-container {
			display: none;
		}
	}
</style>
