<script lang="ts">
	import { enhance } from '$app/forms'
	import { window_width } from '$lib/stores/layout.svelte'
	import { notify } from '$lib/stores/notify'
	import Title from '../blog/title.svelte'
	import Button from '../buttons/button.svelte'
	import Email from '../inputs/email.svelte'
	import Input from '../inputs/input.svelte'
	import Text from '../inputs/text.svelte'
	import Paragraph from '../text/paragraph.svelte'
	import OneColumnSection from './one_column_section.svelte'
	import TwoColumnsSection from './two_columns_section.svelte'
</script>

{#snippet form(background?: string)}
	<div class="form-col" data-background={background} style:--background-url="url({background})">
		<div class="newsletter-form">
			<div class="title">
				<Title title="Newsletter" size="large"></Title>
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
				<Input label_text="Name" layout={1} label_design={1}>
					<Text key="name" design={1}></Text>
				</Input>
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
		/* border: 1px solid var(--theme-colour-text); */
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
</style>
