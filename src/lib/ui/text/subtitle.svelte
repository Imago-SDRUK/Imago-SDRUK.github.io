<script lang="ts">
	let {
		subtitle,
		size = 'small'
	}: { subtitle: string; size?: 'micro' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge' } =
		$props()
</script>

<h3 class="title {size}">{subtitle}</h3>

<style>
	h3 {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-subtitle);
		font-weight: 400;
	}
	.micro {
		font-size: clamp(0.875rem, 0.858rem + 0.083vw, 0.925rem);
	}
	.small {
		font-size: clamp(0.925rem, 0.85rem + 0.375vw, 1.15rem);
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
