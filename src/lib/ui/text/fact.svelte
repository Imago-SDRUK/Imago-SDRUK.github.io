<script lang="ts">
	import Subtitle from '../text/subtitle.svelte'
	let {
		title,
		text,
		active,
		inactive
	}: { title?: string; text: string; active?: boolean; inactive?: boolean } = $props()
</script>

<div class="fact">
	{#if title}
		<Subtitle subtitle={title}></Subtitle>
	{/if}
	<p class="paragraph" class:active class:inactive>
		{text}
	</p>
</div>

<style>
	.paragraph {
		font-weight: 300;
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
		font-size: clamp(0.8rem, 0.742rem + 0.292vw, 0.975rem);
	}
	.active {
		color: var(--theme-colour-highlight);
		font-weight: 600;
	}
	.inactive {
		color: red;
	}
</style>
