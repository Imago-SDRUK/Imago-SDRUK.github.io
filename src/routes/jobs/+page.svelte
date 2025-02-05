<script lang="ts">
	import CardJob from '$lib/ui/cards/card_job.svelte'
	let { data } = $props()
</script>

<div class="jobs-page">
	<div class="jobs-page-grid">
		{#each data.posts as job}}
			<CardJob {job}></CardJob>
		{/each}
	</div>
</div>

<style>
	.jobs-page {
		padding: 1-25rem;
		width: min(100lvw - 4rem, 800px);
		margin-inline: auto;
	}
	.jobs-page-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		z-index: 1;
	}
</style>
