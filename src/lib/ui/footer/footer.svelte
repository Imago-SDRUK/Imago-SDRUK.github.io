<script lang="ts">
	import { DateTime } from 'luxon'
	import Title from '../blog/title.svelte'
	import Logos from '../cards/logos.svelte'
	import FooterCollection from './footer_collection.svelte'
	// import { FOOTER_HEIGHT } from '$lib/globals/style'
	import {
		IconBrandLinkedin,
		IconBrandMastodon,
		IconBrandTwitter,
		IconLink
	} from '@tabler/icons-svelte'
	import IconButton from '../buttons/icon_button.svelte'
	import { goto } from '$app/navigation'
	const platform_collection = [1, 2, 3].map((x) => ({
		href: '/',
		label: `Data product ${x}`
	}))
	const documentation_collection = [
		{
			href: '/',
			label: 'Book of imagery'
		},

		{
			href: '/',
			label: 'Researchers'
		}
	]
	const company_documentation = [
		{
			href: '/',
			label: 'Copyright'
		},
		{
			href: '/',
			label: 'Accessibility'
		},
		{
			href: '/',
			label: 'Privacy'
		},
		{
			href: '/',
			label: 'Contact'
		}
	]
</script>

<footer>
	<div class="footer-content">
		<div class="top">
			<div class="left-col">
				<Title title="Imago © {DateTime.now().year}"></Title>
			</div>

			<div class="footer-collections">
				<FooterCollection routes={platform_collection} title="Platform"></FooterCollection>
				<FooterCollection routes={documentation_collection} title="Documentation"
				></FooterCollection>
				<FooterCollection routes={company_documentation} title="Company"></FooterCollection>
			</div>
			<!-- <div class="centre-col"></div> -->
			<!-- <div class="right-col"></div> -->
		</div>

		<div class="bottom">
			<Logos></Logos>
			<div class="social-media">
				<IconButton
					onclick={() => {
						goto('https://www.linkedin.com/company/sdr-imago')
					}}
				>
					<IconBrandLinkedin></IconBrandLinkedin>
				</IconButton>
				<IconButton>
					<IconBrandMastodon></IconBrandMastodon>
				</IconButton>
				<IconButton>
					<IconBrandTwitter></IconBrandTwitter>
				</IconButton>
				<IconButton>
					<IconLink></IconLink>
				</IconButton>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		height: var(--footer-height);
		background-color: #040326;
	}
	.footer-content {
		width: min(100% - 6rem, 1440px);
		margin-inline: auto;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		gap: 2rem;
		padding: 4rem 0;
	}
	.top {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.footer-collections {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	}
	.social-media {
		color: white;
		display: flex;
		gap: 0.25rem;
	}

	@media (min-width: 1024px) {
		/* .left-col { */
		/* 	text-align: center; */
		/* } */
		.top {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
			justify-content: center;
			gap: 2rem;
		}
		.footer-collections {
			flex-direction: initial;
			gap: 4rem;
		}
		.bottom {
			flex-direction: initial;
		}
	}
</style>
