<script lang="ts">
	let {
		id,
		label_text,
		label_design
	}: { id: string; label_text: string; label_design: 1 | 2 | 3 | 4 } = $props()
</script>

<label for={id} class="input-label input-label-{label_design}">
	{label_text}
</label>

<style>
	.input-label {
		font-family: var(--theme-font-title);
		color: var(--theme-colour-text);
	}
	.input-label-1 {
		font-size: clamp(0.85rem, 0.625rem + 0.4688vw, 1rem);
	}
	.input-label-2 {
		font-size: clamp(0.8rem, 0.767rem + 0.167vw, 0.9rem);
	}
	.input-label-3 {
		font-size: clamp(0.75rem, 0.717rem + 0.167vw, 0.85rem);
	}
	.input-label-4 {
		font-size: clamp(0.685rem, 0.652rem + 0.167vw, 0.785rem);
	}
</style>
