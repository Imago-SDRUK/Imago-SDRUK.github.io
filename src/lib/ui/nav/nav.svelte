<script lang="ts">
	import { IconArrowLeft, IconMenu2 } from '@tabler/icons-svelte'
	import { page } from '$app/state'
	import Logos from '../cards/logos.svelte'
	import NavButton from '../buttons/nav_button.svelte'
	import { NAV_HEIGHT } from '$lib/globals/style'
	import Menu from '../menus/menu.svelte'
	import Anchor from '../buttons/anchor.svelte'
	import { ROUTES } from '$lib/globals/routes'
	import { window_height, window_width } from '$lib/stores/layout.svelte'
	let scroll = $state(0)
	let desktop = $derived($window_width > 768)
	let menu_open = $state(true)
	let mobile_menu_selection = $state(ROUTES[0].href ?? '')
	const getBgPercentage = (scroll: number, height: number) => {
		const result = (scroll * 100) / height
		if (result > 100) return 100
		return result
	}
</script>

<svelte:window
	bind:scrollY={scroll}
	onscroll={() => {
		menu_open = false
	}}
/>
<nav
	class:compact-nav={scroll > 256 && desktop}
	style:--nav-height={NAV_HEIGHT}
	style:--bg-percentage="{getBgPercentage(scroll, $window_height)}%"
>
	<div class="left-col">
		{#if page.url.pathname !== '/'}
			<button
				class="button-link"
				onclick={() => {
					history.back()
				}}
			>
				<IconArrowLeft size={32} stroke-width={2}></IconArrowLeft>
			</button>
		{/if}
		{#if desktop}
			{#if page.url.pathname === '/'}
				<Logos {scroll}></Logos>
			{/if}
			{#if page.url.pathname !== '/'}
				<a href="/">
					<img class="icon" src="/favicon.png" alt="" />
				</a>
			{/if}
		{/if}
		{#if !desktop}
			<a href="/">
				<img class="icon" src="/favicon.png" alt="" />
			</a>
		{/if}
	</div>
	<div class="right-col">
		{#if !desktop}
			<button
				onclick={() => {
					menu_open = !menu_open
				}}
			>
				<IconMenu2></IconMenu2>
			</button>
		{/if}
		<div class="routes" data-menu={menu_open ? true : undefined}>
			{#if desktop}
				{#each ROUTES as { href, label, subpaths }}
					<Menu>
						{#snippet trigger({ toggleMenu })}
							{#if desktop}
								<NavButton onpointerdown={() => toggleMenu(false)} {href} {label}></NavButton>
							{/if}
						{/snippet}
						{#snippet children()}
							<div class="subpaths">
								{#each subpaths as { href, label }}
									<Anchor {href} {label}></Anchor>
								{/each}
							</div>
						{/snippet}
					</Menu>
				{/each}
			{:else}
				<div class="mobile-menu">
					<div class="mobile-menu-tabs">
						{#each ROUTES as { href, label }}
							{#if href === mobile_menu_selection}
								<a
									onclick={() => {
										menu_open = false
									}}
									{href}><p>{label}</p></a
								>
							{:else}
								<button
									onclick={() => {
										mobile_menu_selection = href
									}}><p>{label}</p></button
								>
							{/if}
						{/each}
					</div>
					<div class="mobile-menu-routes">
						{#each ROUTES.filter((route) => route.href === mobile_menu_selection) as { subpaths }}
							{#each subpaths as { href, label }}
								<a
									onclick={() => {
										menu_open = false
									}}
									{href}><p>{label}</p></a
								>
							{/each}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style>
	nav {
		background: color-mix(in oklab, white 0%, var(--theme-colour-background) var(--bg-percentage));
		color: var(--theme-colour-highlight);
		border: 1px solid transparent;
		width: 100%;
		height: var(--nav-height);
		position: sticky;
		top: 0rem;
		left: 0rem;
		padding: 1rem;
		display: grid;
		margin-inline: auto;
		grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
		transition: all 0.3s ease-in-out;
		/* background-color: var(--theme-colour-background); */
		z-index: 99;
	}
	.compact-nav {
		top: 1rem;
		background-color: var(--theme-colour-background);
		width: min(100% - 2rem, 600px);
		margin-inline: auto;
		border: 1px solid var(--theme-colour-highlight);
	}
	.button-link {
		transition: all 0.3s ease-in-out;
	}
	.button-link:target {
		background-color: red;
	}
	.left-col {
		display: flex;
		gap: 2rem;
	}
	.right-col {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		align-items: center;
	}
	.routes {
		position: fixed;
		top: 0;
		right: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: flex-end;
		align-items: center;
		transform: translate(200%, 4rem);
		border: 1px solid var(--theme-colour-highlight);
		border-radius: 0.35rem;
		background-color: var(--theme-colour-background);
		transition: all 0.3s ease-in-out;
		padding: 2rem;
		width: calc(100% - 2rem);
	}
	.routes[data-menu] {
		z-index: 2;
		transform: translate(0%, 4rem);
		/* width: calc(100% - 2rem); */
	}
	.icon {
		height: 2rem;
	}
	.subpaths {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.mobile-menu {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		width: 100%;
		gap: 1rem;
	}
	.mobile-menu-tabs {
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid var(--theme-colour-secondary);
	}
	.mobile-menu-routes {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	@media (min-width: 768px) {
		nav {
			border-radius: 999px;
			background-color: initial;
		}
		.routes {
			position: initial;
			top: initial;
			right: initial;
			border: none;
			background-color: initial;
			transform: initial;
			display: flex;
			flex-direction: initial;
			padding: 0;
			gap: 1rem;
			justify-content: flex-end;
			align-items: center;
			width: initial;
		}
		.routes[data-menu] {
			transform: translate(0, 0);
		}
	}
</style>
