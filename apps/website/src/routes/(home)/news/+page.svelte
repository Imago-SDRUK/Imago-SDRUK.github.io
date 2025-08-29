<script lang="ts">
	import Title from '$lib/ui/blog/title.svelte'
	import NewsCard from '$lib/ui/cards/news_card.svelte'
	import Subtitle from '$lib/ui/text/subtitle.svelte'
	let { data } = $props()
</script>

<div class="news-section">
	<div class="title">
		<Title size="large" title="News"></Title>
	</div>
	<div class="cards">
		{#each data.articles as article}
			<NewsCard {article}></NewsCard>
		{/each}
		{#if data.articles.length === 0}
			<Title title="This section is currently empty." size="large"></Title>
			<Subtitle subtitle="Apologies, come back soon!"></Subtitle>
		{/if}
	</div>
</div>

<style>
	.news-section {
		width: min(100% - 2rem, 1200px);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 4rem;
		min-height: calc(100lvh - 4rem);
	}
	.cards {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
