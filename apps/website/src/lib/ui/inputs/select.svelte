<script lang="ts">
	import type { SelectOption } from '$lib/types'
	let {
		key,
		options,
		value,
		select_mode,
		hidden_options,
		enable_initial_value,
		design,
		onChange
	}: {
		key: string
		options: (string | number | SelectOption)[]
		value: string | number | boolean | undefined | null | SelectOption
		select_mode: boolean
		hidden_options: (string | number)[]
		enable_initial_value: boolean | string | undefined
		design: 1 | 2 | 3 | 4
		onChange?: () => void
	} = $props()
</script>

<select
	name={key}
	class="capitalize select-{design}"
	disabled={select_mode ? true : undefined}
	id={key}
	bind:value
	onchange={() => {
		onChange?.()
	}}
>
	{#if enable_initial_value}
		<option class="" value="" selected
			>{typeof enable_initial_value === 'string' ? enable_initial_value : '-'}</option
		>
	{/if}
	{#each options.filter((o) => {
		if (typeof o === 'string' || typeof o === 'number') {
			if (!hidden_options.includes(o)) return true
		} else {
			if (!hidden_options.includes(typeof o.value === 'boolean' ? String(o.value) : o.value)) return true
		}
	}) as option}
		<option
			value={typeof option === 'string' || typeof option === 'number' ? option : option.value}
			class="capitalize"
			>{typeof option === 'string'
				? option.replaceAll('_', ' ')
				: typeof option === 'number'
					? option
					: option.label}</option
		>
	{/each}
</select>

<style>
	select {
		background-color: var(--theme-colour-background);
		color: var(--theme-colour-text);
		border: 1px solid var(--theme-colour-text);
		border-radius: 0.25rem;
		font-size: clamp(0.85rem, 0.625rem + 0.4688vw, 1rem);
		font-family: var(--theme-font-title);
	}
	.select-1 {
		padding: 0.25rem 0.5rem;
		font-size: clamp(0.85rem, 0.625rem + 0.4688vw, 1rem);
	}
	.select-2 {
		padding: 0.2rem 0.35rem;
		font-size: clamp(0.8rem, 0.767rem + 0.167vw, 0.9rem);
	}
	.select-3 {
		padding: 0.15rem 0.25rem;
		font-size: clamp(0.75rem, 0.717rem + 0.167vw, 0.85rem);
	}
	.select-4 {
		padding: 0.05rem 0.15rem;
		font-size: clamp(0.685rem, 0.652rem + 0.167vw, 0.785rem);
	}
</style>
