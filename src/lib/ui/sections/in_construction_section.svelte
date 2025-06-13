<script lang="ts">
	import { enhance } from '$app/forms'
	import { window_width } from '$lib/stores/layout.svelte'
	import { notify } from '$lib/stores/notify'
	import Title from '$lib/ui/blog/title.svelte'
	import Button from '$lib/ui/buttons/button.svelte'
	import Email from '$lib/ui/inputs/email.svelte'
	import Input from '$lib/ui/inputs/input.svelte'
	import OneColumnSection from '$lib/ui/sections/one_column_section.svelte'
	import TwoColumnsSection from '$lib/ui/sections/two_columns_section.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
</script>

{#snippet form(background?: string)}
	<div class="form-col" data-background={background} style:--background-url="url({background})">
		<div class="newsletter-form">
			<div class="title">
				<Title title="Page in construction" size="large"></Title>
				<Paragraph
					text="Subscribe to the newsletter to keep updated on Imago news and data products."
				></Paragraph>
			</div>
			<form
				class="form-content"
				method="POST"
				action="/?/newsletter"
				use:enhance={() => {
					return async ({ result, update }) => {
						notify.send({
							value:
								'data' in result
									? String(result.data?.message)
									: `There's been an error submitting this request, please try again`
						})
						if (result.type === 'failure') notify.send({ value: String(result.data?.message) })
						if (result.type === 'error')
							notify.send({
								value: `There's been an error submitting this request, please try again`
							})
						if (result.type === 'success') update({ reset: true, invalidateAll: true })
					}
				}}
			>
				<Input label_text="Email" layout={1} label_design={1}>
					<Email key="email" design={1}></Email>
				</Input>
				<div class="button-container">
					<Button
						>{#snippet leftCol()}
							<p>Subscribe</p>
						{/snippet}</Button
					>
				</div>
			</form>
		</div>
	</div>
{/snippet}

{#if $window_width < 768}
	<OneColumnSection>
		{@render form(`/ui/terrain_1.png`)}
	</OneColumnSection>
{/if}

{#if $window_width > 767}
	<TwoColumnsSection>
		{#snippet leftCol()}
			<img src="/ui/terrain_1.png" alt="" class="img" />
		{/snippet}
		{#snippet rightCol()}
			{@render form()}
		{/snippet}
	</TwoColumnsSection>
{/if}

<style>
	.form-col {
		height: 100lvh;
		display: flex;
		align-items: center;
	}
	.form-col[data-background] {
		background: center / cover no-repeat var(--background-url);
		position: relative;
	}
	.form-col[data-background]::before {
		content: '';
		background: color-mix(in oklab, var(--theme-colour-background) 80%, transparent 20%);
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.form-content {
		display: grid;
		gap: 0.5rem;
	}
	.button-container {
		display: flex;
		justify-content: flex-end;
	}
	.newsletter-form {
		width: min(100% - 1rem, 400px);
		margin-inline: auto;
		z-index: 1;
		background: color-mix(in oklab, var(--theme-colour-background) 80%, transparent 20%);
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: var(--glass);
	}
	.form-content {
		padding: 1rem 0;
	}
	.img {
		height: 100lvh;
		object-fit: cover;
		opacity: 0.5;
	}
	.title {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
