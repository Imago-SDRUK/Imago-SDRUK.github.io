<script lang="ts">
	let {
		title,
		size = 'small'
	}: { title: string; size?: 'micro' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge' } =
		$props()
</script>

<h2 class="title {size}">{title}</h2>

<style>
	h2 {
		color: var(--theme-colour-text);
		font-family: var(--theme-font-title);
		font-weight: 600;
	}
	.micro {
		font-size: clamp(0.9rem, 0.867rem + 0.167vw, 1rem);
	}
	.small {
		font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.35rem);
	}
	.medium {
		font-size: clamp(1.15rem, 0.983rem + 0.833vw, 1.65rem);
	}
	.large {
		font-size: clamp(1.25rem, 0.917rem + 1.667vw, 2.25rem);
		line-height: clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem);
	}
	.extra-large {
		font-size: clamp(1.95rem, 1.6rem + 1.75vw, 3rem);
		line-height: clamp(2.25rem, 2rem + 1.25vw, 3rem);
	}
	.huge {
		font-size: clamp(3rem, 2.667rem + 1.667vw, 4rem);
		line-height: clamp(3rem, 2.833rem + 0.833vw, 3.5rem);
	}
</style>
