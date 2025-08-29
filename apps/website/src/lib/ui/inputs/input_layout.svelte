<script lang="ts">
	import type { Snippet } from 'svelte'
	let { layout, label, input }: { layout: 1 | 2 | 3 | 4; label?: Snippet; input?: Snippet } =
		$props()
</script>

<div class="input-layout input-layout-{layout}">
	<div class="label">
		{@render label?.()}
	</div>
	<div class="input">
		{@render input?.()}
	</div>
</div>

<style>
	.input-layout {
		display: grid;
		position: relative;
		flex-shrink: 0;
		height: min(100%, 2.5rem);
	}
	.input {
		font-family: var(--theme-font-paragraph);
	}
	.input-layout-1 {
		gap: 0.25rem;
	}
	.input-layout-1 > .input {
		border: 1px solid var(--theme-colour-text);
		color: var(--theme-colour-text);
		border-radius: 0.35rem;
	}

	.input-layout-2 {
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
		grid-template-rows: minmax(0, 1fr);
	}
	.input-layout-2 > .label {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.input-layout-2 > .input {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.input-layout-3 {
	}
	.input-layout-3 > .label {
		border: 1px solid var(--theme-colour-text);
		position: absolute;
		border-radius: 0.25rem;
		padding: 0 0.25rem;
		background-color: var(--theme-colour-background);
		z-index: 2;
		transform: translate(15%, -50%);
	}
	.input-layout-3 > .input {
		border: 1px solid var(--theme-colour-text);
		border-radius: 0.35rem;
		position: relative;
	}
	.input-layout-4 {
	}
</style>
