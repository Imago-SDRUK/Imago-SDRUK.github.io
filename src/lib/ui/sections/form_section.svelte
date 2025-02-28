<script lang="ts">
	import Title from '../blog/title.svelte'
	import Button from '../buttons/button.svelte'
	import Email from '../inputs/email.svelte'
	import Input from '../inputs/input.svelte'
	import Paragraph from '../text/paragraph.svelte'
	import TwoColumnsSection from './two_columns_section.svelte'
</script>

<TwoColumnsSection>
	{#snippet leftCol()}
		<img src="/ui/terrain_1.png" alt="" class="img" />
	{/snippet}
	{#snippet rightCol()}
		<div class="form-col">
			<div class="newsletter-form">
				<div class="title">
					<Title title="Newsletter" size="large"></Title>
					<Paragraph
						text="Subscribe to the newsletter to keep updated on Imago news and data products."
					></Paragraph>
				</div>
				<form class="form-content">
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
</TwoColumnsSection>

<style>
	.form-col {
		height: 100lvh;
		display: flex;
		align-items: center;
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
		width: min(100%, 400px);
		margin-inline: auto;
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
