<script lang="ts">
	import type { Event } from '$lib/types/directus'
	import BaseSection from './base_section.svelte'
	import Content from '$lib/ui/blog/content.svelte'
	import Title from '$lib/ui/blog/title.svelte'
	import { DateTime } from 'luxon'
	import Fact from '../text/fact.svelte'
	import Subtitle from '../text/subtitle.svelte'
	import Anchor from '../buttons/anchor.svelte'
	let { event }: { event: Event } = $props()
	const { title, content, location, date_start, date_end, media, type, subtitle, id, agenda, url } =
		event
</script>

<BaseSection>
	<div class="career-section">
		<Title size="large" {title}></Title>
		{#if subtitle}
			<Subtitle size="small" {subtitle}></Subtitle>
		{/if}
		<div class="career-content-grid">
			<div class="meta-container">
				<div class="facts">
					<Anchor label="Tickets" href={url}></Anchor>
					<Subtitle subtitle="Location"></Subtitle>
					<Fact text={location}></Fact>
					<Subtitle subtitle="Date"></Subtitle>
					<Fact
						text={DateTime.fromISO(date_start)
							.setLocale('en-gb')
							.toLocaleString(DateTime.DATE_FULL)}
					></Fact>
					<Subtitle subtitle="Time"></Subtitle>
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
					{#if agenda}
						<Subtitle subtitle="Agenda"></Subtitle>

						{#each agenda as _agenda}
							<div class="agenda-element">
								<Fact
									text="{DateTime.fromISO(_agenda.time_start).toLocaleString(
										DateTime.TIME_SIMPLE
									)} - {DateTime.fromISO(_agenda.time_end).toLocaleString(DateTime.TIME_SIMPLE)}"
								></Fact>
								<Fact text={_agenda.title}></Fact>
							</div>
						{/each}
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
	.agenda-element {
		border: 1px solid var(--theme-colour-secondary);
		padding: 0.25rem 1rem;
		border-radius: 0.35rem;
	}
</style>
