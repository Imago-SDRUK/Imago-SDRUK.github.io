<script lang="ts">
	import type { Event } from '$lib/types/directus'
	import Title from '$lib/ui/blog/title.svelte'
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import ListSection from '$lib/ui/sections/list_section.svelte'
	import Fact from '$lib/ui/text/fact.svelte'
	import Subtitle from '$lib/ui/text/subtitle.svelte'
	import { DateTime } from 'luxon'
	import Button from '../buttons/button.svelte'
	let { events }: { events: Event[] } = $props()
	type Filters = 'Past' | 'Current' | 'Future' | 'All'
	let active_filter: Filters = $state('All')
	const filters: Record<Filters, (event: Event) => boolean> = {
		All: () => true,
		Past: (event) => {
			const difference = DateTime.fromISO(event.date_start).diffNow('milliseconds')
			console.log(difference.milliseconds)
			if (difference.milliseconds < 0) {
				return true
			}
			return false
		},
		Current: (event) => {
			const difference = DateTime.fromISO(event.date_start).diffNow()
			if (difference.milliseconds >= 0 && difference.milliseconds <= 604800000) {
				return true
			}
			return false
		},
		Future: (event) => {
			const difference = DateTime.fromISO(event.date_start).diffNow()
			if (difference.milliseconds > 604800001) {
				return true
			}
			return false
		}
	}
	const filtered_events = $derived(events.filter((x) => filters[active_filter](x)))
</script>

<ListSection title="Events">
	<div class="filter-buttons">
		{#each Object.keys(filters) as filter}
			<Button
				active={active_filter === filter}
				onclick={() => {
					const _filter = filter as Filters
					if (active_filter === _filter) {
						active_filter = 'All'
					} else {
						active_filter = _filter
					}
				}}
				>{#snippet leftCol()}
					<p>{filter}</p>
				{/snippet}</Button
			>
		{/each}
	</div>
	{#if filtered_events.length === 0}
		<button
			onclick={() => {
				active_filter = 'All'
			}}
		>
			<Title
				title="There are no events that match this search, please try another filter or click here to clear your search."
			></Title>
		</button>
	{/if}
	{#each filtered_events as event}
		<li class="list">
			<div class="event-list">
				<div class="left-col">
					<Fact
						text={DateTime.fromISO(event.date_start)
							.setLocale('en-gb')
							.toLocaleString(DateTime.DATE_FULL)}
					></Fact>
					<div class="time">
						<Fact
							text={DateTime.fromISO(event.date_start)
								.setLocale('en-gb')
								.toLocaleString(DateTime.TIME_SIMPLE)}
						></Fact>
						{#if event.date_end}
							<Fact
								text={`to ${DateTime.fromISO(event.date_end)
									.setLocale('en-gb')
									.toLocaleString(DateTime.TIME_SIMPLE)}`}
							></Fact>
						{/if}
					</div>
				</div>
				<div class="centre-col">
					<Title title={event.title}></Title>
					<!-- <Paragraph text={event.location}></Paragraph> -->
					<Subtitle size="small" subtitle={event.location}></Subtitle>
				</div>
				<div class="right-col">
					<Anchor label={event.type} href="/events/{event.slug}"></Anchor>
				</div>
			</div>
		</li>
	{/each}
</ListSection>

<style>
	.filter-buttons {
		display: flex;
		gap: 0.5rem;
	}
	.list {
		border-top: 1px solid var(--theme-colour-primary);
		padding: 0.5rem 0;
		color: var(--theme-colour-text);
	}
	.list:last-of-type {
		border-bottom: 1px solid var(--theme-colour-primary);
	}
	.time {
		display: flex;
		gap: 0.35rem;
	}
	.event-list {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		gap: 1rem;
	}
	.centre-col {
		grid-column: 1 /3;
		grid-row: 1/2;
	}
	.left-col {
		grid-row: 2/3;
	}
	.right-col {
		grid-row: 2/3;
	}

	@media (min-width: 768px) {
		.list {
			padding: 1.25rem 0;
		}
		.event-list {
			display: grid;
			grid-template-columns: minmax(0, max-content) minmax(100px, 1fr) minmax(0, max-content);
			grid-template-rows: minmax(0, 1fr);
			gap: 2rem;
		}
		.left-col {
			grid-column: initial;
			grid-row: initial;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			justify-content: center;
			font-family: var(--theme-font-accent);
			font-weight: 300;
		}
		.centre-col {
			grid-column: initial;
			grid-row: initial;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			justify-content: center;
		}
		.right-col {
			grid-column: initial;
			grid-row: initial;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			justify-content: center;
		}
	}
</style>
