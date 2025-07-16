<script lang="ts">
	import Title from '$lib/ui/blog/title.svelte'
	import Button from '$lib/ui/buttons/button.svelte'
	import Fact from '$lib/ui/text/fact.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
	import Subtitle from '$lib/ui/text/subtitle.svelte'
	import { getArticleSections } from '$lib/utils/directus/articles.js'
	import { DateTime } from 'luxon'
	let { data } = $props()
</script>

<div class="page">
	{#each data.article as article}
		{@const sections = getArticleSections(article)}
		<div class="article">
			<div class="header">
				<div class="left-col">
					<Title size="extra-large" title={article.title}></Title>
					{#if article.description}
						<Paragraph text={article.description}></Paragraph>
					{/if}
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
				<div class="right-col">
					{#if article.user_created && typeof article.user_created !== 'string' && article.user_created.first_name}
						<Fact text="By {article.user_created.first_name} {article.user_created.last_name ?? ''}"
						></Fact>
					{/if}
					{#if article.date_updated}
						<Fact
							text={`Updated on ${DateTime.fromISO(article.date_updated).toLocaleString(DateTime.DATE_MED)}`}
						></Fact>
					{/if}
					{#if article.date_created}
						<Fact
							text={`Posted on ${DateTime.fromISO(article.date_created).toLocaleString(DateTime.DATE_MED)}`}
						></Fact>
					{/if}
				</div>
			</div>
			<div class="image">
				<img src="https://picsum.photos/1200/1200" alt="" />
			</div>
			{#each sections as section}
				{#if typeof section !== 'string'}
					<div class="section">
						<div class="section-header">
							{#if section.title}
								<Subtitle subtitle={section.title}></Subtitle>
							{/if}
							{#if section.subtitle}
								<Subtitle subtitle={section.subtitle}></Subtitle>
							{/if}
						</div>
						<div class="section-blocks">
							{#each section.content as block}
								{#if block.content}
									<div class="content prose">
										<Paragraph text={block.content}></Paragraph>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.page {
		color: var(--theme-colour-text);
		padding-top: 4rem;
	}
	.article {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: min(100% - 2rem, 1280px);
		margin-inline: auto;
	}
	.tags {
		display: flex;
		gap: 0.5rem;
	}
	.header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
		gap: 1rem;
	}
	.left-col {
		border-right: 1px solid var(--theme-colour-highlight);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-right: 1rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.image {
		height: 100%;
		width: 100%;
		object-fit: cover;
		overflow: hidden;
		display: flex;
	}
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		overflow: hidden;
	}
	.section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.section-blocks {
		padding-left: 3rem;
	}
	.content {
		width: min(100% - 2rem, 600px);
		padding-bottom: 4rem;
		margin-bottom: 4rem;
		border-bottom: 1px solid
			color-mix(in oklab, var(--theme-colour-text) 30%, var(--theme-colour-background) 70%);
	}
</style>
