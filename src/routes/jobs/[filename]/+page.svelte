<script lang="ts">
	import Content from '$lib/ui/blog/content.svelte'
	import Title from '$lib/ui/blog/title.svelte'
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import { dateAvailable, dateExpired } from '$lib/utils/data.js'
	import { DateTime } from 'luxon'
	import { fly } from 'svelte/transition'
	let { data } = $props()
	const { title, url, salary, posted, closing_date, location, hours, contract } = data.meta
</script>

<div class="jobs-page" in:fly={{ y: 40 }}>
	<div class="jobs-page-grid">
		<Title size="large" {title}></Title>
		<div class="meta-container">
			<div class="facts">
				<h3 class="fact">Location: {location}</h3>
				<h3 class="fact">Salary: {salary}</h3>
				<h3 class="fact">Hours: {hours}</h3>
				<h3 class="fact">Contract: {contract}</h3>
				<h3 class="fact">
					Posted on: {DateTime.fromISO(posted)
						.setLocale('en-gb')
						.toLocaleString(DateTime.DATE_FULL)}
				</h3>
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

			<Anchor href={url} label="Apply"></Anchor>
		</div>
		<Content>
			<data.content />
		</Content>
	</div>
</div>

<style>
	.jobs-page {
		padding: 1rem 1rem 4rem 1rem;
		width: min(100lvw - 4rem, 800px);
		margin-inline: auto;
	}
	.jobs-page-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr);
		z-index: 1;
		position: relative;
	}
	.facts {
		font-weight: 500;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.fact {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
		font-size: clamp(0.8rem, 0.742rem + 0.292vw, 0.975rem);
	}

	.meta-container {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.available {
		color: var(--theme-colour-highlight);
		font-weight: 600;
	}
	.expired {
		color: red;
	}
</style>
