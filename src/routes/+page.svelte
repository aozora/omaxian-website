<script lang="ts">
	import Wordmark from '#lib/Wordmark.svelte';
	import Mark from '#lib/Mark.svelte';
	import { REPO, TAGLINE } from '#lib/omaxian';

	const variants = [
		{
			href: '/live',
			n: '01',
			name: 'Live desktop',
			line: 'An interactive mock of the bar, dock and a window. A working theme switcher restyles the whole page through the real palettes.'
		},
		{
			href: '/chiseled',
			n: '02',
			name: 'Chiseled editorial',
			line: 'Monumental type on a chamfered plate. Bevelled section cards, the keybinding cheat-sheet as a design element. Mostly static.'
		},
		{
			href: '/boot',
			n: '03',
			name: 'Retro-TUI boot',
			line: 'The page as a boot sequence: typed-out install log, an ASCII banner, scanlines and a blinking cursor.'
		}
	];
</script>

<svelte:head>
	<title>Omaxian — landing page concepts</title>
	<meta
		name="description"
		content="Three landing-page concepts for Omaxian: a port of the Omarchy shell to X11 / XLibre and i3 on the Debian family."
	/>
</svelte:head>

<div class="bg" aria-hidden="true"></div>

<main>
	<header>
		<div class="lockup">
			<Mark class="glyph" />
			<Wordmark class="mark" tagline />
		</div>
		<p class="kicker">{TAGLINE}</p>
		<p class="note">Three takes on the landing page. Pick one.</p>
	</header>

	<ul class="grid">
		{#each variants as v (v.href)}
			<li>
				<a class="card" href={v.href}>
					<span class="n">{v.n}</span>
					<span class="name">{v.name}</span>
					<span class="line">{v.line}</span>
					<span class="go">Open concept →</span>
				</a>
			</li>
		{/each}
	</ul>

	<footer>
		<a href={REPO} target="_blank" rel="noreferrer">github.com/aozora/omaxian</a>
	</footer>
</main>

<style>
	.bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		background:
			linear-gradient(
				var(--omx-void) 0%,
				color-mix(in srgb, var(--omx-void) 62%, transparent) 40%,
				color-mix(in srgb, var(--omx-void) 78%, transparent) 100%
			),
			url('/wallpaper-bg.svg') center / cover no-repeat var(--omx-void);
	}

	main {
		max-width: 78rem;
		margin: 0 auto;
		padding: clamp(2rem, 6vw, 6rem) clamp(1.25rem, 4vw, 3rem) 3rem;
	}

	header {
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 14%, transparent);
		padding-bottom: 2rem;
	}

	.lockup {
		display: flex;
		align-items: center;
		gap: clamp(0.9rem, 2.5vw, 1.6rem);
	}
	:global(.glyph) {
		flex: none;
		width: clamp(2.75rem, 8vw, 4rem);
		height: auto;
	}
	:global(.mark) {
		display: block;
		width: min(34rem, 74vw);
		height: auto;
		color: var(--omx-bone);
	}

	.kicker {
		margin: 1.5rem 0 0;
		font-family: var(--omx-mono);
		font-size: 0.82rem;
		letter-spacing: 0.02em;
		color: var(--omx-mute);
	}

	.note {
		margin: 0.4rem 0 0;
		font-size: 1.05rem;
		color: var(--omx-bone);
	}

	.grid {
		list-style: none;
		margin: 2.5rem 0 0;
		padding: 0;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		height: 100%;
		padding: 1.5rem 1.4rem 1.3rem;
		text-decoration: none;
		background: color-mix(in srgb, var(--omx-panel) 82%, transparent);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
		backdrop-filter: blur(3px);
		clip-path: polygon(
			0 0,
			calc(100% - 18px) 0,
			100% 18px,
			100% 100%,
			18px 100%,
			0 calc(100% - 18px)
		);
		transition:
			border-color 0.18s ease,
			transform 0.18s ease,
			background 0.18s ease;
	}

	.card:hover,
	.card:focus-visible {
		background: color-mix(in srgb, var(--omx-panel) 96%, transparent);
		border-color: var(--omx-accent);
		transform: translateY(-3px);
	}

	.n {
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		color: var(--omx-accent);
	}

	.name {
		font-size: 1.35rem;
		font-weight: 650;
		letter-spacing: -0.01em;
	}

	.line {
		font-size: 0.92rem;
		line-height: 1.5;
		color: color-mix(in srgb, var(--omx-bone) 68%, transparent);
	}

	.go {
		margin-top: auto;
		padding-top: 0.5rem;
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--omx-bone) 80%, transparent);
	}

	footer {
		margin-top: 3rem;
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--omx-bone) 55%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}
		.card:hover,
		.card:focus-visible {
			transform: none;
		}
	}
</style>
