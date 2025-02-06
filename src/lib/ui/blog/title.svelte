<script lang="ts">
	let { title, size = 'medium' }: { title: string; size?: 'medium' | 'large' } = $props()
</script>

<h2 class="title {size}">{title}</h2>

<style>
	h2 {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-title);
		font-weight: 600;
	}

	.medium {
		font-size: clamp(1.15rem, 0.983rem + 0.833vw, 1.65rem);
	}
	.large {
		font-size: clamp(1.25rem, 0.917rem + 1.667vw, 2.25rem);
	}
</style>
