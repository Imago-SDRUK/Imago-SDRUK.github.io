<script lang="ts">
	import { colour, notify, textColour } from '$lib/stores/notify'
	import { fly } from 'svelte/transition'
</script>

{#if $notify !== ''}
	<div
		id="notification"
		class="notification-container fixed right-0 top-2 px-3"
		in:fly|global={{ y: -200, duration: 1000 }}
		out:fly|global={{ y: -200, duration: 2000 }}
		on:pointerdown={() => {
			$notify = ''
		}}
		style:--background={$colour}
		style:--colour={$textColour}
	>
		<p
			class="notification-text flex h-full cursor-pointer items-center justify-center p-4 text-sm md:text-lg"
		>
			{$notify}
		</p>
	</div>
{/if}

<style>
	.notification-text {
		border: 1px solid var(--theme-colour-background);
		color: var(--theme-colour-background);
		background-color: var(--theme-colour-text);
		font-family: var(--theme-font-title);
		font-weight: 600;
		border-radius: 1rem;
	}
	#notification {
		z-index: 100000;
	}
</style>
