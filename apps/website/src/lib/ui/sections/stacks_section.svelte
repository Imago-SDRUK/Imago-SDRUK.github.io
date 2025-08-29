<script lang="ts">
	import { animate, scroll } from 'motion'
	import { window_width } from '$lib/stores/layout.svelte'
	import type { Section } from '$lib/types/directus'
	import PageBlock from '../cards/page_block.svelte'
	import { getId } from '@arturoguzman/art-ui'
	let {
		id = `section-${getId()}`,
		sticky_top = 0,
		index = 0,
		section
	}: {
		id?: string
		sticky_top?: string | number
		index?: number
		section: Section
	} = $props()

	$effect(() => {
		if (id) {
			const section_element = document.getElementById(id)
			if (section_element && section) {
				const left_col = section_element.querySelector('.left-col')
				if (left_col) {
					const wrappers = left_col.querySelectorAll('.wrapper')
					wrappers.forEach((el, i, arr) => {
						const limit = 1 / arr.length
						if (el) {
							const start = limit * i
							const finish = start + limit + limit * 0.5
							const animation = animate(
								el,
								{ opacity: [1, 0, 0] },
								{ times: [start, finish > 1 ? 1 : finish] }
							)
							if ($window_width < 768) {
								animation.cancel()
								return
							}
							scroll(animation, {
								target: section_element ?? undefined,
								offset: [`start start`, `end ${1 - i * limit}`]
							})
						}
					})
				}
			}
		}
	})
</script>

<div
	class="section"
	{id}
	style:--sticky-top={sticky_top}
	style:--index={index}
	style:--margin="{index}rem"
>
	<div class="left-col">
		{#each section.left_column ?? [] as { blocks_id }}
			<div class="wrapper">
				<PageBlock {blocks_id}></PageBlock>
			</div>
		{/each}
	</div>
	<div class="right-col">
		{#each section.right_column ?? [] as { blocks_id }, i}
			<div class="wrapper" style:--padding-top="{i * 8}rem">
				<PageBlock {blocks_id}></PageBlock>
			</div>
		{/each}
	</div>
</div>

<style>
	.section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		gap: 1rem;
		width: min(100% - 4rem, 1280px);
		margin-inline: auto;
	}
	.left-col {
		grid-row: 2 / 3;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.wrapper {
		opacity: 1;
	}
	@media (min-width: 768px) {
		.section {
			padding: 2rem 0;
			align-items: center;
			position: relative;
		}
		.section {
			grid-template-rows: minmax(0, 1fr);
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: 4rem;
			/* height: 100lvh; */
			/* position: sticky; */
			top: var(--sticky-top);
			left: 0;
		}
		.left-col {
			grid-row: auto;
		}

		.wrapper {
			min-height: 100lvh;
			position: sticky;
			left: 0;
			top: 0;
			display: grid;
			align-items: center;
			padding-top: var(--padding-top, 0);
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
