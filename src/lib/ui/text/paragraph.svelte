<script lang="ts">
	let { text }: { text: string } = $props()
</script>

<p class="paragraph">
	{text}
</p>

<style>
	.paragraph {
		font-family: var(--theme-font-paragraph);
		color: var(--theme-colour-text);
		font-weight: 300;
		font-size: clamp(0.875rem, 0.842rem + 0.167vw, 0.975rem);
	}
</style>
