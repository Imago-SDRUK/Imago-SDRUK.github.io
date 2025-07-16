<script lang="ts">
	import type { Article } from '$lib/types/directus'
	import Title from '$lib/ui/blog/title.svelte'
	import Button from '$lib/ui/buttons/button.svelte'
	import BaseCard from '$lib/ui/cards/base_card.svelte'
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right'
	import { DateTime } from 'luxon'
	let { article }: { article: Article } = $props()
</script>

<BaseCard>
	<div class="article-card">
		<div class="left-col">
			<div class="image">
				<img src="https://picsum.photos/800/600" alt="" />
			</div>
		</div>
		<div class="right-col">
			<div class="title">
				<Title size="large" title={article.title}></Title>
				<!-- <div class="tags"> -->
				<!-- 	<Button alt -->
				<!-- 		>{#snippet leftCol()} -->
				<!-- 			<p>Tag</p> -->
				<!-- 		{/snippet}</Button -->
				<!-- 	> -->
				<!-- 	<Button alt -->
				<!-- 		>{#snippet leftCol()} -->
				<!-- 			<p>Tag</p> -->
				<!-- 		{/snippet}</Button -->
				<!-- 	> -->
				<!-- 	<Button alt -->
				<!-- 		>{#snippet leftCol()} -->
				<!-- 			<p>Tag</p> -->
				<!-- 		{/snippet}</Button -->
				<!-- 	> -->
				<!-- </div> -->
			</div>
			<div class="content">
				<div class="description">
					<span class="prose-sm">
						{@html article.description}
					</span>
				</div>
			</div>
			<div class="footer">
				{#if article.date_created}
					<p class="posted-on">
						Posted on {DateTime.fromISO(article.date_created).toLocaleString(DateTime.DATE_MED)}
					</p>
				{/if}
				<Button anchor href="/news/{article.slug}">
					{#snippet rightCol()}
						<ArrowRight></ArrowRight>
					{/snippet}</Button
				>
			</div>
		</div>
	</div>
</BaseCard>

<style>
	.article-card {
		background: color-mix(in oklab, var(--theme-colour-background) 20%, transparent 80%);
		box-shadow: var(--glass);
		color: var(--theme-colour-text);
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 2rem;
	}
	.content {
		display: flex;
		gap: 1rem;
		align-items: flex-end;
		/* padding: 0.5rem 1rem 1rem 1rem; */
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem 2rem 2rem 0;
		justify-content: space-between;
	}
	.image {
		/* aspect-ratio: 1 / 1; */
		height: 100%;
		width: 100%;
		object-fit: cover;
		overflow: hidden;
		display: flex;
		position: relative;
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		overflow: hidden;
	}
	.title {
		transform: translate(0, 0);
		transition: all 0.3s ease-in-out;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.tags {
		display: flex;
		gap: 0.5rem;
	}
	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding: 1rem; */
	}
	/* .article-card:hover .title { */
	/* 	border: 1px solid var(--theme-colour-highlight); */
	/* 	transform: translate(1rem, -1rem); */
	/* } */
</style>
