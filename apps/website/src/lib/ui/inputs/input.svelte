<script lang="ts">
	import { getId } from '@arturoguzman/art-ui'
	import InputLayout from './input_layout.svelte'
	import InputLabel from './input_label.svelte'
	import type { Snippet } from 'svelte'
	let {
		layout,
		label_text,
		label_design,
		children
	}: {
		layout: 1 | 2 | 3 | 4
		label_text: string
		label_design: 1 | 2 | 3 | 4
		children?: Snippet
	} = $props()
	const id = `input-${getId()}`
	// export { className as class }
</script>

<InputLayout {layout}>
	{#snippet label()}
		<InputLabel {id} {label_design} {label_text}></InputLabel>
	{/snippet}
	{#snippet input()}
		{@render children?.()}
	{/snippet}
</InputLayout>
