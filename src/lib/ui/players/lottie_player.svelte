<script lang="ts">
	import { obvrState } from '$lib/utils/observer.svelte'
	import { getId } from '@arturoguzman/art-ui'
	import type { AnimationItem } from 'lottie-web'
	import { onDestroy, onMount } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'
	let {
		height = 'auto',
		width = 'auto',
		src = '',
		play = false,
		renderer = 'svg',
		loop = false,
		onclick,
		ondblclick,
		mountAction
	}: {
		height?: string
		width?: string
		src?: string
		play?: boolean
		renderer?: 'svg' | 'canvas' | 'html'
		loop?: boolean
		onclick?: MouseEventHandler<HTMLButtonElement>
		ondblclick?: MouseEventHandler<HTMLButtonElement>
		mountAction?: () => void | Promise<void>
	} = $props()
	const id = `lt-player-${getId()}`
	let lt: AnimationItem | null = null
	function handlePlay(play: boolean, lt: AnimationItem | null) {
		if (lt && play) {
			lt.play()
			return
		}
		if (lt && !play) {
			lt.pause()
			lt.goToAndStop(0)
			return
		}
	}

	function observe(e: HTMLDivElement) {
		initLottie(e).then(() => obvrState.observer?.observe(e))
	}

	async function initLottie(e: HTMLDivElement) {
		const def = await import('lottie-web')
		const lottie = def.default
		lt = lottie.loadAnimation({
			container: e,
			renderer: renderer,
			loop: loop,
			autoplay: play,
			path: src
		})
	}
	$effect(() => {
		if (obvrState.intersecting.includes(id)) {
			handlePlay(true, lt)
			mountAction?.()
		}
	})
	onDestroy(() => {
		lt?.destroy()
	})
</script>

<div
	aria-labelledby="hehehe"
	style:--height={height}
	style:--width={width}
	class="lottie-player-container relative overflow-hidden"
>
	<div {id} class="h-full w-full" use:observe></div>
</div>

<style>
	.lottie-player-container {
		height: var(--height);
		width: var(--width);
	}
</style>
