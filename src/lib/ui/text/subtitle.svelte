<script lang="ts">
	let {
		subtitle,
		size = 'small'
	}: { subtitle: string; size?: 'small' | 'medium' | 'large' | 'extra-large' | 'huge' } = $props()
</script>

<h3 class="title {size}">{subtitle}</h3>

<style>
	h3 {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
		font-weight: 400;
	}
	.small {
		font-size: clamp(1rem, 0.933rem + 0.333vw, 1.2rem);
	}
	.medium {
		font-size: clamp(1.075rem, 0.933rem + 0.708vw, 1.5rem);
	}
	.large {
		font-size: clamp(1.35rem, 1.133rem + 1.083vw, 2rem);
	}
	.extra-large {
		font-size: clamp(1.725rem, 1.55rem + 0.875vw, 2.25rem);
	}
	.huge {
		font-size: clamp(2rem, 1.667rem + 1.667vw, 3rem);
	}
</style>
