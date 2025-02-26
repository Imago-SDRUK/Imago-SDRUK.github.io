<script lang="ts">
	let { text }: { text: string } = $props()
</script>

<p class="paragraph">
	{text}
</p>

<style>
	.paragraph {
		font-weight: 300;
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
		font-size: clamp(0.8rem, 0.742rem + 0.292vw, 0.975rem);
	}
</style>
