<script lang="ts">
	// One merged landing page — the former /live, /boot and chooser routes
	// collapsed into a single scroll. /chiseled was retired outright.
	import Mark from '#lib/Mark.svelte';
	import GithubIcon from '#lib/GithubIcon.svelte';
	import Lightbox from '#lib/Lightbox.svelte';
	import { ALL_THEME_NAMES } from '#lib/themes';
	import { PUBLIC_POSTHOG_PROJECT_TOKEN, PUBLIC_POSTHOG_HOST } from '$app/env/public';
	import type { Picture } from 'vite-imagetools';
	import posthog from 'posthog-js';
	import {
		REPO,
		LATEST_RELEASE,
		OMARCHY,
		TAGLINE,
		PITCH,
		SCOPE,
		ATTRIBUTION,
		FEATURES,
		COMMUNITY_PLUGINS,
		COMMUNITY_PLUGINS_DIR,
		INSTALL,
		SHOTS,
		NOT_1_1,
		TESTED_ON,
		UBUNTU_NOTE,
		CREDITS,
		type Shot
	} from '#lib/omaxian';

	const posthogConfigured = PUBLIC_POSTHOG_PROJECT_TOKEN && PUBLIC_POSTHOG_HOST;

	let activeShot = $state<Shot | null>(null);

	// Screenshots live in src/lib/assets so enhanced:img can optimize them;
	// this glob resolves each Shot.src path to its compiled Picture object.
	const shotImages = import.meta.glob<Picture>('/src/lib/assets/shots/*.{png,webp}', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	});

	const BOOT: string[] = [
		'booting session …',
		'[  ok  ]  elogind session registered — no systemd, no uwsm',
		'[  ok  ]  connected to i3 IPC socket',
		'[  ok  ]  picom compositor started',
		'[  ok  ]  dunst notification daemon started',
		'starting quickshell (omarchy-shell) …',
		'[  ok  ]  bar mounted: workspaces, clock, network, tray',
		'[  ok  ]  widgets loaded: media, weather, sysstats, vpn, apt',
		'[  ok  ]  dock mounted — 6 pinned',
		'loading plugins from ~/.local/share/omarchy/shell/plugins …',
		'[  ok  ]  37 first-party plugins registered',
		'scanning ~/.config/omarchy/plugins (community, opt-in) …',
		`[  ok  ]  ${COMMUNITY_PLUGINS.length} found, 0 enabled`,
		`applying theme nebula-ridge (${ALL_THEME_NAMES.length} installed) …`,
		'[  ok  ]  theme applied — Alt+Ctrl+T to switch',
		'[  ok  ]  redshift night light armed',
		'[  ok  ]  omarchy-* commands linked into PATH',
		'session ready.'
	];

	// Progressive enhancement: SSR / no-JS / reduced-motion shows the full log.
	// With JS + motion allowed, it types out only once the terminal box actually
	// scrolls into view, rather than while it's still hidden below the hero.
	let shown = $state(BOOT.length);
	let booted = $state(true);
	let termEl = $state<HTMLDivElement | null>(null);
	let started = $state(false);

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		// hide immediately; the observer below reveals it on scroll-into-view
		shown = 0;
		booted = false;
	});

	$effect(() => {
		if (!termEl || started) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					started = true;
					io.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		io.observe(termEl);
		return () => io.disconnect();
	});

	$effect(() => {
		if (!started) return;
		let i = 0;
		const id = setInterval(() => {
			shown = ++i;
			if (i >= BOOT.length) {
				clearInterval(id);
				setTimeout(() => (booted = true), 450);
			}
		}, 180);
		return () => clearInterval(id);
	});

	function openScreenshot(shot: Shot) {
		activeShot = shot;
		if (posthogConfigured) {
			posthog.capture('screenshot_viewed', { screenshot_label: shot.label });
		}
	}

	let copied = $state(false);
	async function copyInstall() {
		try {
			await navigator.clipboard.writeText(INSTALL.join('\n'));
			if (posthogConfigured) {
				posthog.capture('installation_instructions_copied');
			}
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<svelte:head>
	<title>Omaxian — a port of the Omarchy shell</title>
	<meta
		name="description"
		content="Omaxian ports the Omarchy shell — bar, dock, menu, themes and omarchy-* commands — to X11 / XLibre and i3 on the Debian family. The shell only, not a distribution."
	/>
</svelte:head>

<main id="main">
	<!-- ============ HERO ============ -->
	<section class="hero full-bleed">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="hero-inner">
			<Mark class="glyph" title="Omaxian" />

			<div class="banner-wrap">
				<!-- prettier-ignore -->
				<pre class="banner" role="img" aria-label="OMAXIAN"> ██████  ███    ███  █████  <span class="x">██   ██</span> ██  █████  ███    ██
██    ██ ████  ████ ██   ██ <span class="x"> ██ ██ </span> ██ ██   ██ ████   ██
██    ██ ██ ████ ██ ███████ <span class="x">  ███  </span> ██ ███████ ██ ██  ██
██    ██ ██  ██  ██ ██   ██ <span class="x"> ██ ██ </span> ██ ██   ██ ██  ██ ██
 ██████  ██      ██ ██   ██ <span class="x">██   ██</span> ██ ██   ██ ██   ████</pre>
			</div>

			<p class="tagline">{TAGLINE}</p>

			<div class="cta">
				<a
					class="btn primary"
					href={LATEST_RELEASE}
					target="_blank"
					rel="noreferrer"
					onclick={() => {
						if (posthogConfigured) posthog.capture('github_release_opened');
					}}
				>
					<GithubIcon class="gh-icon" /> Get it on GitHub
				</a>
				<a class="btn ghost" href="#install">How to install</a>
			</div>
		</div>
	</section>

	<!-- ============ BOOT LOG (boxed terminal) ============ -->
	<section class="term-section">
		<!-- <div class="term-bg" aria-hidden="true"></div> -->
		<div class="block">
			<div class="term-shell" bind:this={termEl}>
				<div class="term-chrome">
					<span class="term-dots" aria-hidden="true"><i></i><i></i><i></i></span>
					<span class="term-name">omaxian@linux: booting session</span>
				</div>
				<div class="term-screen">
					<div class="term-scan" aria-hidden="true"></div>
					<div class="log" aria-label="boot log">
						{#each BOOT.slice(0, shown) as line, i (i)}
							<span
								class="line"
								class:hdr={i === 0}
								class:okline={line.startsWith('[  ok')}
								class:warnline={line.startsWith('[ warn')}
								class:pending={i !== 0 && !line.startsWith('[')}>{line}</span
							>
						{/each}{#if !booted}<span class="cursor" aria-hidden="true">█</span>{/if}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ============ ABOUT (pitch · scope · attribution) ============ -->
	<section class="about">
		<div class="about-inner block-centered">
			<h2 class="rule">About</h2>
			<p class="pitch">{PITCH}</p>
			<p class="scope">{SCOPE}</p>
			<p class="attribution">
				{ATTRIBUTION}
				<a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>
			</p>
		</div>
	</section>

	<!-- ============ WHAT IT ADDS ============ -->
	<section class="block-centered" id="adds">
		<h2 class="rule">What Omaxian adds</h2>
		<p class="lede">
			Not just a backend swap. Most pieces have no upstream counterpart — they exist because X11 /
			i3 / Debian needed them, or because a GUI was missing.
		</p>
		<ul class="feats">
			{#each FEATURES as f (f.title)}
				<li>
					<span class="bullet">▸</span>
					<div>
						<b>{f.title}</b>{#if f.key}<span class="key">{f.key}</span>{/if}
						<span class="desc">{f.blurb}</span>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<!-- ============ COMMUNITY PLUGINS ============ -->
	<section class="block-centered">
		<h2 class="rule">Community plugins</h2>
		<p class="lede">
			Opt-in, third-party shell ports live in <code>community-plugins/</code> — never installed by
			<code>deploy.sh</code>.
		</p>
		<ul class="feats">
			{#each COMMUNITY_PLUGINS as p (p.id)}
				<li>
					<span class="bullet">▸</span>
					<div>
						<b><a href={p.href} target="_blank" rel="noreferrer">{p.label}</a></b>
						<span class="desc">{p.blurb} <code>{p.id}</code></span>
					</div>
				</li>
			{/each}
		</ul>
		<p class="callout">
			More plugins can join this list. Run <code>omarchy-plugin-check</code> against any other Omarchy
			community plugin first — a clean pass means it already works as-is; flagged Wayland / Hyprland /
			PipeWire / systemd couplings just mean it needs a quick port before it's ready.
		</p>
		<p class="more-link">
			<a href={COMMUNITY_PLUGINS_DIR} target="_blank" rel="noreferrer">
				<GithubIcon class="gh-icon" /> Browse community-plugins/ →
			</a>
		</p>
	</section>

	<!-- ============ ON SCREEN ============ -->
	<section class="gallery">
		<div class="gallery-inner block-centered">
			<h2 class="rule">On screen</h2>
			<div class="shots">
				{#each SHOTS as s, i (s.src)}
					<figure>
						<button
							type="button"
							class="shot-btn"
							onclick={() => (activeShot = s)}
							aria-label={`Open ${s.label} screenshot`}
						>
							<enhanced:img
								src={shotImages[s.src]}
								alt={s.label + ' — ' + s.desc}
								sizes="(max-width: 767px) 100vw, 767px"
								loading={i === 0 ? 'eager' : 'lazy'}
								decoding="async"
								fetchpriority={i === 0 ? 'high' : 'auto'}
							/>
						</button>
						<figcaption><b>{s.label}</b> — {s.desc}</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============ INSTALL ============ -->
	<section id="install" class="block-centered">
		<h2 class="rule">Install</h2>
		<p class="lede">
			You need an X11 session with i3 and a login path that runs <code>/etc/X11/Xsession</code>
			(most display managers do; <code>startx</code> with a proper <code>.xsession</code> also
			works). Then log out and back in — not <code>i3 restart</code>.
		</p>
		<p class="tested">Regularly tested against <b>{TESTED_ON.join(', ')}</b>.</p>
		<p class="tested note">{UBUNTU_NOTE}</p>
		<div class="term">
			<div class="term-top">
				<span>~/projects</span>
				<button type="button" onclick={copyInstall}>{copied ? 'copied ✓' : 'copy'}</button>
			</div>
			<div class="term-body">
				{#each INSTALL as line (line)}<span class="ln">{line}</span>{/each}
			</div>
		</div>
	</section>

	<!-- ============ NOT 1:1 ============ -->
	<section class="block-centered">
		<h2 class="rule">Where it is not 1:1 with Omarchy</h2>
		<p class="lede">
			Omaxian tracks the Omarchy shell, but X11 / XLibre is not Wayland and i3 is not Hyprland — so
			parity is partial by design.
		</p>
		<ul class="caveats list-disc">
			{#each NOT_1_1 as c (c)}<li class="break-all">{c}</li>{/each}
		</ul>
	</section>

	<!-- ============ FOOT ============ -->
	<footer class="foot">
		<div class="foot-log block-centered">
			<span>omaxian@linux:~$ cat CREDITS</span>
			<span>&nbsp;</span>
			{#each CREDITS as c (c.label)}
				<div>
					<a href={c.href} target="_blank" rel="noreferrer"># {c.label}</a>
					<span> — {c.by}</span>
				</div>
			{/each}
			<span>&nbsp;</span>
			<span>omaxian@linux:~$ logout</span>
			<div class="foot-cta">
				<a class="btn primary" href={REPO} target="_blank" rel="noreferrer">
					<GithubIcon class="gh-icon" /> github.com/aozora/omaxian
				</a>
			</div>
			<p class="copyright"># © 2026 Marcello Palmitessa</p>
		</div>
	</footer>

	<Lightbox
		shot={activeShot}
		image={activeShot ? shotImages[activeShot.src] : undefined}
		onclose={() => (activeShot = null)}
	/>
</main>

<style lang="scss">
	main {
		z-index: 0;
		overflow-x: clip;
		position: relative;
		display: grid;
		grid-template-columns: 20px 1fr 20px;
		justify-content: center;
		min-height: calc(90vh);
		min-height: calc(90dvh);

		> * {
			grid-column: 2;
		}

		> .full-bleed {
			width: 100%;
			grid-column: 1 / -1;
		}

		@media (min-width: 90em) {
			grid-template-columns: 1fr minmax(auto, 1216px) 1fr;
		}
	}

	/* ---------- shared primitives ------------------------------------------ */
	.block {
		/* max-width: 74rem; */
		/* margin: 0 auto; */
		padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem);
		/* border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent); */
	}
	.block-centered {
		width: 100%;
		max-width: 74rem;
		margin: 0 auto;
		padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem);
		/* border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent); */
	}
	.rule {
		margin: 0 0 1.4rem;
		font-size: clamp(1.5rem, 4vw, 2.2rem);
		font-weight: 680;
		letter-spacing: -0.02em;
		padding-bottom: 0.5rem;
		border-bottom: 3px solid var(--omx-accent);
		display: inline-block;
	}
	.lede {
		max-width: 46rem;
		margin: 0 0 2rem;
		font-size: 1.05rem;
		line-height: 1.65;
		color: color-mix(in srgb, var(--omx-bone) 72%, transparent);
	}
	code {
		font-family: var(--omx-mono);
		font-size: 0.88em;
		color: var(--omx-bone);
		background: color-mix(in srgb, var(--omx-bone) 8%, transparent);
		padding: 0.08em 0.35em;
		border-radius: 3px;
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		justify-content: center;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.8rem 1.4rem;
		font-weight: 640;
		font-size: 0.95rem;
		text-decoration: none;
		border-radius: 7px;
		transition:
			transform 0.15s ease,
			border-color 0.15s ease,
			filter 0.15s ease;
	}
	.btn.primary {
		background: var(--omx-accent);
		color: var(--omx-void);
	}
	.btn.ghost {
		border: 1px solid color-mix(in srgb, var(--omx-bone) 30%, transparent);
		color: var(--omx-bone);
	}
	.btn:hover {
		transform: translateY(-2px);
	}
	.btn.ghost:hover {
		border-color: var(--omx-accent);
	}
	:global(.gh-icon) {
		width: 1.05em;
		height: 1.05em;
		flex: none;
	}

	/* ---------- hero -------------------------------------------------------- */
	.hero {
		position: relative;
		min-height: 100dvh;
		display: grid;
		/* an explicit minmax(0, 1fr) track, not the default auto one — an auto
		   track sizes itself to its item's max-content width, and .hero-inner's
		   max-content width is the banner's un-wrapped width (many hundreds of
		   px). That circularity is what let the banner/tagline silently bleed
		   past the viewport on narrow screens instead of wrapping/scrolling. */
		grid-template-columns: minmax(0, 1fr);
		place-items: center;
		text-align: center;
		padding: clamp(2rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem);
		overflow: hidden;
	}
	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			repeating-linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.035) 0,
				rgba(255, 255, 255, 0.035) 1px,
				transparent 1px,
				transparent 3px
			),
			url('/wallpaper-bg.svg') center / cover no-repeat var(--omx-void);
	}
	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(1.25rem, 3vw, 2rem);
		/* an explicit (not shrink-to-fit) width — otherwise this grid item sizes
		   itself to the banner's un-wrapped max-content width (many hundreds of
		   px at the 2x banner size) and everything else, incl. the tagline,
		   inherits that oversized box and silently bleeds past the viewport
		   under .hero's overflow:hidden instead of wrapping/scrolling */
		width: 100%;
		max-width: 64rem;
	}
	:global(.glyph) {
		width: clamp(2.75rem, 6vw, 3.75rem);
		height: auto;
	}
	.banner-wrap {
		max-width: 100%;
		/* flex items don't shrink past their content's intrinsic width by
		   default; without this, overflow-x below never gets the chance to
		   engage and the banner just overflows the box instead of scrolling */
		min-width: 0;
		overflow-x: auto;
		overflow-y: hidden;
	}
	.banner {
		margin: 0;
		color: var(--omx-accent);
		font-family: var(--omx-mono);
		/* font-size: clamp(0.68rem, 3.4vw, 1.4rem); */
		font-size: clamp(0.68rem, 1vw + 0.5rem, 1.4rem);
		line-height: 1.05;
		text-shadow: 0 0 22px color-mix(in srgb, var(--omx-accent) 45%, transparent);
		white-space: pre;

		@media (max-width: 480px) {
			font-size: 2vw;
		}
	}
	.banner .x {
		color: var(--omx-red);
		text-shadow: 0 0 22px color-mix(in srgb, var(--omx-red) 55%, transparent);
	}
	.tagline {
		margin: 0;
		max-width: 100%;
		font-family: var(--omx-mono);
		font-size: clamp(0.95rem, 2.2vw, 1.15rem);
		color: var(--omx-mute);
		letter-spacing: 0.01em;
	}

	/* ---------- boxed boot-log terminal ------------------------------------ */
	.term-section {
		grid-column: 1 / -1;
		border-top: 0;
		background:
			repeating-linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.035) 0,
				rgba(255, 255, 255, 0.035) 1px,
				transparent 1px,
				transparent 3px
			),
			var(--omx-galaxy-darkest-blue);
	}
	.term-shell {
		max-width: 52rem;
		margin: 0 auto;
		background: var(--omx-void);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 16%, transparent);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.6);
	}
	.term-chrome {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.6rem 0.9rem;
		background: var(--omx-plate-2);
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 14%, transparent);
		font-family: var(--omx-mono);
		font-size: 0.78rem;
		color: color-mix(in srgb, var(--omx-bone) 55%, transparent);
	}
	.term-dots {
		display: flex;
		gap: 5px;
	}
	.term-dots i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--omx-bone) 22%, transparent);
	}
	.term-screen {
		position: relative;
		padding: 1.4rem 1.3rem;
		font-family: var(--omx-mono);
		font-size: clamp(0.78rem, 1.6vw, 0.92rem);
		line-height: 1.75;
		overflow-x: auto;
	}
	.term-scan {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: repeating-linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.03) 0,
			rgba(255, 255, 255, 0.03) 1px,
			transparent 1px,
			transparent 3px
		);
		mix-blend-mode: overlay;
	}
	.log .line {
		position: relative;
		display: block;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.log .hdr {
		color: var(--omx-bone);
		text-shadow: 0 0 10px color-mix(in srgb, var(--omx-accent) 50%, transparent);
		margin-bottom: 0.4rem;
	}
	.log .okline {
		color: color-mix(in srgb, var(--omx-bone) 55%, transparent);
	}
	.log .warnline {
		color: var(--omx-red);
	}
	.log .pending {
		color: color-mix(in srgb, var(--omx-bone) 82%, transparent);
		margin-top: 0.5rem;
	}
	.cursor {
		position: relative;
		color: var(--omx-red);
	}
	@media (prefers-reduced-motion: no-preference) {
		.cursor {
			animation: blink 1s steps(1) infinite;
		}
		@keyframes blink {
			50% {
				opacity: 0;
			}
		}
	}

	/* ---------- about -------------------------------------------------------- */
	.about {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		border-top: 0;
		background:
			repeating-linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.035) 0,
				rgba(255, 255, 255, 0.035) 1px,
				transparent 1px,
				transparent 3px
			),
			var(--omx-galaxy-darker-blue);
	}
	.about-inner {
		grid-column: 2;
	}

	.pitch {
		margin: 0 0 0.9rem;
		max-width: 46rem;
		font-size: 1.05rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 90%, transparent);
	}
	.scope {
		margin: 0 0 1.2rem;
		max-width: 46rem;
		font-size: 0.96rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 66%, transparent);
	}
	.attribution {
		margin: 0;
		max-width: 46rem;
		padding-left: 0.9rem;
		border-left: 2px solid var(--omx-red);
		font-size: 0.88rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 62%, transparent);
	}
	.attribution a {
		color: var(--omx-bone);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.attribution a:hover {
		color: var(--omx-accent);
	}

	/* ---------- feature / plugin lists --------------------------------------- */
	.feats {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.feats li {
		display: grid;
		grid-template-columns: 1.4rem 1fr;
		gap: 0.5rem;
		padding: 0.85rem 0;
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.feats li:first-child {
		border-top: 0;
	}
	.bullet {
		color: var(--omx-accent);
		font-family: var(--omx-mono);
	}
	.feats b {
		color: var(--omx-bone);
		font-weight: 700;
	}
	.feats a {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--omx-bone) 30%, transparent);
	}
	.feats a:hover {
		color: var(--omx-accent);
	}
	.feats .key {
		margin-left: 0.6rem;
		padding: 0 0.4rem;
		font-family: var(--omx-mono);
		font-size: 0.78em;
		color: var(--omx-accent);
		border: 1px solid color-mix(in srgb, var(--omx-accent) 45%, transparent);
		border-radius: 4px;
		white-space: nowrap;
	}
	.feats .desc {
		display: block;
		margin-top: 0.2rem;
		font-size: 0.94rem;
		line-height: 1.55;
		color: color-mix(in srgb, var(--omx-bone) 66%, transparent);
	}
	.feats .desc code {
		font-size: 0.9em;
	}

	.callout {
		margin: 1.6rem 0 0;
		max-width: 46rem;
		padding: 1rem 1.2rem;
		border-left: 3px solid var(--omx-red);
		background: color-mix(in srgb, var(--omx-red) 6%, transparent);
		font-size: 0.92rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 82%, transparent);
	}
	.more-link {
		margin: 1.2rem 0 0;
		font-size: 0.9rem;
	}
	.more-link a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--omx-accent);
	}
	.more-link a:hover {
		text-decoration: none;
	}

	/* ---------- screenshot gallery ------------------------------------------- */
	.gallery {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		border-top: 0;
		background:
			repeating-linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.035) 0,
				rgba(255, 255, 255, 0.035) 1px,
				transparent 1px,
				transparent 3px
			),
			var(--omx-galaxy-dark-blue);
	}
	.gallery-inner {
		grid-column: 2;
	}
	.shots {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}
	.shots figure {
		margin: 0;
	}
	.shot-btn {
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		border-radius: 8px;
	}
	.shot-btn img {
		/* the source screenshots aren't quite the same aspect ratio (903–1004px
		   tall at 1600 wide) — crop them to one fixed box so every thumbnail in
		   the grid lines up, regardless of row length or source dimensions */
		width: 100%;
		aspect-ratio: 8 / 5;
		object-fit: cover;
		object-position: top;
		display: block;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 14%, transparent);
		border-radius: 8px;
		background: var(--omx-plate-2);
		transition: border-color 0.15s ease;
	}
	.shot-btn:hover img,
	.shot-btn:focus-visible img {
		border-color: var(--omx-accent);
	}
	.shots figcaption {
		margin-top: 0.6rem;
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--omx-bone) 62%, transparent);
	}
	.shots figcaption b {
		color: var(--omx-bone);
	}

	/* ---------- install / caveats -------------------------------------------- */
	.tested {
		margin: -1rem 0 2rem;
		font-size: 0.92rem;
		color: color-mix(in srgb, var(--omx-bone) 60%, transparent);
	}
	.tested b {
		color: var(--omx-bone);
		font-weight: 600;
	}
	.tested.note {
		margin: -1.5rem 0 2rem;
		font-size: 0.82rem;
		color: color-mix(in srgb, var(--omx-bone) 42%, transparent);
	}

	.term {
		background: var(--omx-plate-2);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 14%, transparent);
		border-radius: 8px;
		overflow: hidden;
		max-width: 52rem;
	}
	.term-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.9rem;
		font-family: var(--omx-mono);
		font-size: 0.78rem;
		color: color-mix(in srgb, var(--omx-bone) 55%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
	}
	.term-top button {
		font: inherit;
		color: var(--omx-bone);
		background: transparent;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 22%, transparent);
		border-radius: 5px;
		padding: 0.15rem 0.6rem;
		cursor: pointer;
	}
	.term-top button:hover {
		border-color: var(--omx-accent);
	}
	.term-body {
		padding: 1rem 1.1rem;
		overflow-x: auto;
		font-family: var(--omx-mono);
		font-size: 0.82rem;
		line-height: 1.75;
		color: var(--omx-bone);
	}
	.term-body .ln {
		display: block;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.term-body .ln::before {
		content: '$ ';
		color: var(--omx-accent);
	}

	.caveats {
		margin: 0;
		padding-left: 1.1rem;
		max-width: 46rem;
	}
	.caveats li {
		margin: 0.6rem 0;
		font-size: 0.95rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 74%, transparent);
	}

	/* ---------- footer -------------------------------------------------------- */
	.foot {
		/* max-width: 74rem;
		margin: 0 auto; */
		/* padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem) 4rem; */
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.foot-log {
		/* margin: 0 0 1.6rem; */
		font-family: var(--omx-mono);
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--omx-bone) 62%, transparent);
	}
	.foot-log div,
	.foot-log > span {
		display: block;
		white-space: pre-wrap;
	}
	.foot-log a {
		/* display: block; */
		white-space: pre-wrap;
		text-decoration: underline;
	}
	.foot-cta {
		margin: 1.2rem 0;
	}
	.copyright {
		margin: 0;
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--omx-bone) 40%, transparent);
	}

	/* ---------- scroll reveal (progressive enhancement) ---------------------- */
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			.block,
			.foot {
				animation: reveal linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 40%;
			}
			@keyframes reveal {
				from {
					opacity: 0;
					transform: translateY(2rem);
				}
			}
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition: none;
		}
	}
</style>
