<script lang="ts">
	import { DateTime } from 'luxon'
	import Title from '../blog/title.svelte'
	import Logos from '../cards/logos.svelte'
	import FooterCollection from './footer_collection.svelte'
	import { FOOTER_HEIGHT } from '$lib/globals/style'
</script>

<footer style:--footer-height={FOOTER_HEIGHT}>
	<div class="footer-content">
		<div class="top">
			<div class="left-col">
				<Title title="Imago - {DateTime.now().year}"></Title>
			</div>

			<FooterCollection title="Platform"></FooterCollection>
			<FooterCollection title="Documentation"></FooterCollection>
			<FooterCollection title="Company"></FooterCollection>

			<!-- <div class="centre-col"></div> -->
			<!-- <div class="right-col"></div> -->
		</div>

		<div class="bottom">
			<Logos></Logos>
			<div class="social-media">
				<p>iconssss</p>
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
		width: min(100%, 1440px);
		margin-inline: auto;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		gap: 2rem;
		padding: 4rem 0;
	}
	.top {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
		justify-content: space-evenly;
	}
	.left-col {
	}
	.bottom {
		display: flex;
		justify-content: space-between;
	}
</style>
