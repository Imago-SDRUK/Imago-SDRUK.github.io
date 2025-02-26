<script lang="ts">
	import Title from '../blog/title.svelte'
	import BaseSection from './base_section.svelte'
</script>

<BaseSection>
	<div class="hero-section">
		<div class="title-wrapper">
			<Title size="huge" title="Satellite imagery for"></Title>
		</div>
	</div>
</BaseSection>

<style>
	.hero-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, 3fr);
	}

	.title-wrapper {
		text-align: center;
	}
</style>
