<script lang="ts">
	import Title from '$lib/ui/blog/title.svelte'
	import Anchor from '$lib/ui/buttons/anchor.svelte'
	import ListSection from '$lib/ui/sections/list_section.svelte'
	import Fact from '$lib/ui/text/fact.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
	import { DateTime } from 'luxon'
	let { data } = $props()
</script>

<div class="page">
	<ListSection title="Calendar">
		{#each data.events as event}
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
						<Paragraph text={event.location}></Paragraph>
					</div>
					<div class="right-col">
						<Anchor label={event.type} href="/events/{event.slug}"></Anchor>
					</div>
				</div>
			</li>
		{/each}
	</ListSection>
</div>

<style>
	.list {
		border-top: 1px solid var(--theme-colour-primary);
		padding: 1.25rem 0;
		color: var(--theme-colour-text);
	}
	.list:last-of-type {
		border-bottom: 1px solid var(--theme-colour-primary);
	}
	.event-list {
		display: grid;
		grid-template-columns: minmax(0, max-content) minmax(100px, 1fr) minmax(0, max-content);
		gap: 2rem;
	}
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		justify-content: center;
		font-family: var(--theme-font-accent);
		font-weight: 300;
	}
	.time {
		display: flex;
		justify-content: space-between;
	}
	.centre-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		justify-content: center;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		justify-content: center;
	}
	.location {
		font-weight: 200;
	}
</style>
