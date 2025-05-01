<script lang="ts">
	import type { Career } from '$lib/types/directus/index.js'
	import Title from '$lib/ui/blog/title.svelte'
	import Button from '$lib/ui/buttons/button.svelte'
	import CardJob from '$lib/ui/cards/card_job.svelte'
	import CardsSection from '$lib/ui/sections/cards_section.svelte'
	import { DateTime } from 'luxon'

	let { data } = $props()
	type Filters = 'Past' | 'Current' | 'Future' | 'All'
	let active_filter: Filters = $state('All')
	const filters: Record<Filters, (career: Career) => boolean> = {
		All: () => true,
		Past: (career) => {
			const difference = DateTime.fromISO(career.closing_date).diffNow('milliseconds')
			console.log(difference.milliseconds)
			if (difference.milliseconds < 0) {
				return true
			}
			return false
		},
		Current: (career) => {
			const difference = DateTime.fromISO(career.closing_date).diffNow()
			if (difference.milliseconds >= 0 && difference.milliseconds <= 604800000) {
				return true
			}
			return false
		},
		Future: (career) => {
			const difference = DateTime.fromISO(career.closing_date).diffNow()
			if (difference.milliseconds > 604800001) {
				return true
			}
			return false
		}
	}
	const careers = $derived(data.careers.filter((x) => filters[active_filter](x)))
</script>

<CardsSection title="Careers">
	{#snippet sectionNav()}
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
		{#if careers.length === 0}
			<button
				onclick={() => {
					active_filter = 'All'
				}}
			>
				<Title
					title="There are no careers that match this search, please try another filter or click here to clear your search."
				></Title>
			</button>
		{/if}
	{/snippet}
	{#each careers as career}
		<CardJob {career}></CardJob>
	{/each}
</CardsSection>

<style>
	.filter-buttons {
		display: flex;
		gap: 0.5rem;
	}
</style>
