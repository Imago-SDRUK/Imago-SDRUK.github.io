<script lang="ts">
	import type { Event } from '$lib/types/directus'
	import BaseSection from './base_section.svelte'
	import Content from '$lib/ui/blog/content.svelte'
	import Title from '$lib/ui/blog/title.svelte'
	// import Anchor from '$lib/ui/buttons/anchor.svelte'
	// import { dateAvailable, dateExpired } from '$lib/utils/data.js'
	import { DateTime } from 'luxon'
	import Fact from '../text/fact.svelte'
	let { event }: { event: Event } = $props()
	const { title, content, location, date_start, date_end, media, type, subtitle, id } = event
</script>

<BaseSection>
	<div class="career-section">
		<Title size="large" {title}></Title>
		<div class="career-content-grid">
			<div class="meta-container">
				<div class="facts">
					<Fact text={location}></Fact>
					<Fact
						text={DateTime.fromISO(date_start)
							.setLocale('en-gb')
							.toLocaleString(DateTime.DATE_FULL)}
					></Fact>
					<div class="time">
						<Fact
							text={DateTime.fromISO(date_start)
								.setLocale('en-gb')
								.toLocaleString(DateTime.TIME_SIMPLE)}
						></Fact>
						{#if date_end}
							<Fact
								text={`to ${DateTime.fromISO(date_end)
									.setLocale('en-gb')
									.toLocaleString(DateTime.TIME_SIMPLE)}`}
							></Fact>
						{/if}
					</div>

					<!-- <Anchor href={url} label="Apply"></Anchor> -->
				</div>
			</div>
			<Content>
				{@html content}
			</Content>
		</div>
	</div>
</BaseSection>

<style>
	.career-section {
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		z-index: 1;
		position: relative;
	}
	.career-content-grid {
		display: grid;
		grid-template-columns: minmax(0, 400px) minmax(0, 1fr);
		gap: 2rem;
		position: relative;
	}
	.time {
		display: flex;
		gap: 0.25rem;
		color: var(--theme-colour-text);
	}
	.meta-container {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.facts {
		font-weight: 500;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		position: sticky;
		top: 6rem;
		left: 0;
	}
	.fact {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
		font-size: clamp(0.8rem, 0.742rem + 0.292vw, 0.975rem);
	}

	.available {
		color: var(--theme-colour-highlight);
		font-weight: 600;
	}
	.expired {
		color: red;
	}
</style>
