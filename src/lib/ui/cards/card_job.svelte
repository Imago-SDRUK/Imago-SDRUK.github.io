<script lang="ts">
	import { DateTime } from 'luxon'
	import Title from '../blog/title.svelte'
	import Anchor from '../buttons/anchor.svelte'
	import BaseCard from './base_card.svelte'
	import { dateAvailable, dateExpired } from '$lib/utils/data'
	import type { Career } from '$lib/types/directus'
	let { career }: { career: Career } = $props()
	const { title, url, closing_date, contract, slug, salary, posted_on, location, hours } = career
</script>

<BaseCard>
	<div class="job-card">
		<div class="card-title">
			<Title {title}></Title>
		</div>
		<div class="facts">
			<h3 class="fact">Location: {location}</h3>
			<h3 class="fact">Salary: {salary}</h3>
			<h3 class="fact">Hours: {hours}</h3>
			<h3 class="fact">Contract: {contract}</h3>
			{#if posted_on}
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
		</div>
		<div class="buttons">
			<Anchor href="/careers/{slug}" label="See more"></Anchor>
			<Anchor href={url} label="Apply"></Anchor>
		</div>
	</div>
</BaseCard>

<style>
	.job-card {
		display: grid;
		height: 100%;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr) minmax(0, max-content);
		position: relative;
		background-color: color-mix(in oklab, var(--theme-colour-text) 3%, transparent 97%);
		padding: 1rem;
		transition: all 0.3s ease-in-out;
		z-index: 1;
	}
	.job-card:hover::before {
		top: 1rem;
		left: -1rem;
	}
	.job-card::before {
		content: '';
		height: 100%;
		width: 100%;
		background-color: color-mix(in oklab, var(--theme-colour-text) 8%, transparent 92%);
		position: absolute;
		top: 0.5rem;
		left: -0.5rem;
		transition: all 0.3s ease-in-out;
		pointer-events: none;
	}
	.card-title {
		margin-bottom: 0.35rem;
		border-bottom: 2px solid var(--theme-colour-text);
		padding: 0 0 0.35rem 0;
	}
	.facts {
		margin: 1rem 0;
		color: var(--theme-colour-text);
		font-weight: 500;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.fact {
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

	.buttons {
		display: flex;
		padding: 1rem 0rem 0 0rem;
		gap: 0.5rem;
		justify-content: flex-end;
		font-family: var(--theme-font-subtitle);
	}
</style>
