<script lang="ts">
	import type { Snippet } from 'svelte'
	import Title from '../blog/title.svelte'
	import Subtitle from '../text/subtitle.svelte'
	let {
		text,
		title,
		id,
		buttons,
		sticky_top = 0,
		index = 0
	}: {
		text: string
		title: string
		id?: string
		sticky_top?: string | number
		index?: number
		buttons?: Snippet
	} = $props()
</script>

<div
	class="section"
	{id}
	style:--sticky-top={sticky_top}
	style:--index={index}
	style:--margin="{index}rem"
>
	<div class="left-col">
		<div class="stack-text">
			<Subtitle subtitle={text}></Subtitle>
			{#if buttons}
				{@render buttons()}
			{/if}
		</div>
	</div>
	<div class="right-col">
		<div class="card">
			<div class="card-title">
				<Title {title} size="large"></Title>
			</div>
			<div class="card-content">
				<div class="card-image"></div>
			</div>
		</div>
	</div>
</div>

<style>
	.section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		width: min(100% - 4rem, 1280px);
		margin-inline: auto;
		gap: 1rem;
		padding: 2rem 0;
		align-items: center;
	}
	.card {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		border: 1px solid var(--theme-colour-highlight);
		background-color: var(--theme-colour-background);
		border-radius: 0.35rem;
	}
	.left-col {
		grid-row: 2 / 3;
	}
	.stack-text {
		width: min(100% - 2rem, 400px);
		background: radial-gradient(
			/* transparent 5%, */ color-mix(in oklab, var(--theme-colour-background) 10%, transparent 20%),
			transparent 95%
		);
		/* background-color: color-mix(in oklab, var(--theme-colour-background) 89%, transparent 20%); */
	}

	.card-title {
		border-bottom: 1px solid var(--theme-colour-highlight);
		padding: 1rem;
	}
	.card-image {
		width: 100%;
		aspect-ratio: 1 / 1;
		background-color: var(--theme-colour-primary);
	}
	@media (min-width: 768px) {
		.section {
			grid-template-rows: minmax(0, 1fr);
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: 4rem;
			height: 100lvh;
			position: sticky;
			top: var(--sticky-top);
			left: 0;
		}
		.left-col {
			grid-row: auto;
		}
		/* .left-col::before { */
		/* 	content: ''; */
		/* 	position: absolute; */
		/* 	top: 0; */
		/* 	left: 0; */
		/* 	height: 100%; */
		/* 	width: 50%; */
		/* 	background: linear-gradient(transparent, var(--theme-colour-background) 35%); */
		/* 	z-index: -1; */
		/* } */
	}
</style>
