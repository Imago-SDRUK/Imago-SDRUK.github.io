<script lang="ts">
	import type { Career } from '$lib/types/directus'
	import BaseSection from './base_section.svelte'
	import Content from '$lib/ui/blog/content.svelte'
	import Title from '$lib/ui/blog/title.svelte'
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import { dateAvailable, dateExpired } from '$lib/utils/data.js'
	import { DateTime } from 'luxon'
	let { career }: { career: Career } = $props()
	const {
		title,
		url,
		salary,
		date_created,
		closing_date,
		location,
		hours,
		contract,
		content,
		posted_on
	} = career
</script>

<BaseSection>
	<div class="career-section">
		<Title size="large" {title}></Title>
		<div class="career-content-grid">
			<div class="meta-container">
				<div class="facts">
					<h3 class="fact">Location: {location}</h3>
					<h3 class="fact">Salary: {salary}</h3>
					<h3 class="fact">Hours: {hours}</h3>
					<h3 class="fact">Contract: {contract}</h3>
					{#if date_created}
						<h3 class="fact">
							Posted on: {DateTime.fromISO(posted_on)
								.setLocale('en-gb')
								.toLocaleString(DateTime.DATE_FULL)}
						</h3>
					{/if}
					<h3
						class="fact"
						class:expired={dateExpired(DateTime.fromISO(closing_date))}
						class:available={dateAvailable(DateTime.fromISO(closing_date))}
					>
						Closing date: {DateTime.fromISO(closing_date)
							.setLocale('en-gb')
							.toLocaleString(DateTime.DATE_FULL)}
					</h3>
					<Anchor href={url} label="Apply"></Anchor>
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
		display: flex;
		flex-direction: column;
		position: relative;
		gap: 2rem;
	}
	.career-content-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		position: relative;
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
	@media (min-width: 768px) {
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
	}
</style>
