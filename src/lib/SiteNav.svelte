<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Mark from '#lib/Mark.svelte';
	import GithubIcon from '#lib/GithubIcon.svelte';
	import { REPO } from '#lib/omaxian';

	const links = [
		{ href: resolve('/os'), label: 'OS' },
		{ href: resolve('/shell'), label: 'Shell' }
	];
</script>

<header class="nav">
	<div class="nav-inner">
		<a class="home" href={resolve('/')}>
			<Mark class="nav-mark" title="" />
			<span>oma<span class="x">x</span>ian</span>
		</a>
		<nav aria-label="Main">
			{#each links as l (l.href)}
				<a
					class="link"
					href={l.href}
					aria-current={page.url.pathname.startsWith(l.href) ? 'page' : undefined}>{l.label}</a
				>
			{/each}
			<a
				class="link gh"
				href={REPO}
				target="_blank"
				rel="noreferrer"
				aria-label="Omaxian on GitHub"
			>
				<GithubIcon class="gh-icon" />
			</a>
		</nav>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 10;
		view-transition-name: site-nav;
		background: color-mix(in srgb, var(--omx-void) 72%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--omx-edge);
	}
	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: min(100% - 2.5rem, 72rem);
		min-height: var(--omx-bar-h);
		margin-inline: auto;
	}
	.home {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--omx-mono);
		font-weight: 700;
		letter-spacing: 0.02em;
		text-decoration: none;
	}
	.home .x {
		color: var(--omx-red);
	}
	:global(.nav-mark) {
		width: 1.7rem;
		height: auto;
	}
	nav {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.link {
		display: inline-flex;
		align-items: center;
		padding: 0.35rem 0.85rem;
		font-family: var(--omx-mono);
		font-size: 0.88rem;
		font-weight: 600;
		text-decoration: none;
		color: var(--omx-mute);
		border-radius: 999px;
		transition:
			color 0.15s ease,
			background-color 0.15s ease;
	}
	.link:hover {
		color: var(--omx-bone);
		background: color-mix(in srgb, var(--omx-bone) 8%, transparent);
	}
	.link[aria-current='page'] {
		color: var(--omx-void);
		background: var(--omx-accent);
	}
	.gh {
		padding-inline: 0.6rem;
		font-size: 1.1rem;
	}
</style>
