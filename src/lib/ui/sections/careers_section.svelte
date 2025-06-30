<script lang="ts">
	import type { Career } from '$lib/types/directus'
	import BaseSection from './base_section.svelte'
	import Content from '$lib/ui/blog/content.svelte'
	import Title from '$lib/ui/blog/title.svelte'
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import { dateAvailable, dateExpired } from '$lib/utils/data.js'
	import { DateTime } from 'luxon'
	import Fact from '../text/fact.svelte'
	let { career }: { career: Career } = $props()
	const { title, url, salary, closing_date, location, hours, contract, content, posted_on } = career
	const getCurrentAndFuture = () => {
		const difference = DateTime.fromISO(career.closing_date).diffNow()
		if (difference.milliseconds >= 0) {
			console.log('returning false')
			return true
		}
		console.log('returning true')
		return false
	}
	const current = getCurrentAndFuture()
</script>

<BaseSection>
	<div class="career-section">
		<Title size="large" {title}></Title>
		<div class="career-content-grid">
			<div class="meta-container">
				<div class="facts">
					<Fact title="Location" text={location}></Fact>
					{#if current}
						<Fact title="Salary" text={salary}></Fact>
						<Fact title="Hours" text={hours}></Fact>
						<Fact title="Contract" text={contract}></Fact>
					{/if}
					{#if posted_on}
						<Fact
							title="Posted on"
							text={DateTime.fromISO(posted_on)
								.setLocale('en-gb')
								.toLocaleString(DateTime.DATE_FULL)}
						></Fact>
					{/if}
					<Fact
						title="Closing date"
						active={dateAvailable(DateTime.fromISO(closing_date))}
						inactive={dateExpired(DateTime.fromISO(closing_date))}
						text={DateTime.fromISO(closing_date)
							.setLocale('en-gb')
							.toLocaleString(DateTime.DATE_FULL)}
					></Fact>
					{#if current}
						<Anchor href={url} label="Apply"></Anchor>
					{/if}
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
