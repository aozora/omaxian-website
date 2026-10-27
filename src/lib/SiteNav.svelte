<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Mark from '#lib/Mark.svelte';

	const tabs = [
		{ href: resolve('/shell'), label: 'Shell' },
		{ href: resolve('/os'), label: 'OS' }
	];
</script>

<header class="nav">
	<div class="nav-inner">
		<a class="home" href={resolve('/')}>
			<Mark class="nav-mark" title="" />
			<span>oma<span class="x">x</span>ian</span>
		</a>
		<nav aria-label="Products">
			{#each tabs as t (t.href)}
				<a
					class="tab"
					href={t.href}
					aria-current={page.url.pathname.startsWith(t.href) ? 'page' : undefined}>{t.label}</a
				>
			{/each}
		</nav>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in srgb, var(--omx-void) 78%, transparent);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: 74rem;
		margin: 0 auto;
		padding: 0.55rem clamp(1rem, 4vw, 3rem);
	}
	.home {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-decoration: none;
	}
	.home .x {
		color: var(--omx-red);
	}
	:global(.nav-mark) {
		width: 1.6rem;
		height: auto;
	}
	nav {
		display: flex;
		gap: 0.3rem;
	}
	.tab {
		padding: 0.4rem 0.9rem;
		font-size: 0.9rem;
		font-weight: 640;
		text-decoration: none;
		color: color-mix(in srgb, var(--omx-bone) 72%, transparent);
		border: 1px solid transparent;
		border-radius: 6px;
	}
	.tab:hover {
		color: var(--omx-bone);
		border-color: color-mix(in srgb, var(--omx-bone) 22%, transparent);
	}
	.tab[aria-current='page'] {
		color: var(--omx-void);
		background: var(--omx-accent);
	}
</style>
