<script lang="ts">
	import Lightbox from '#lib/Lightbox.svelte';
	import {
		REPO,
		OMARCHY,
		TAGLINE,
		ATTRIBUTION,
		FEATURES,
		KEYBINDINGS,
		INSTALL,
		SHOTS,
		NOT_1_1,
		TESTED_ON,
		UBUNTU_NOTE,
		COMMUNITY_PLUGINS,
		COMMUNITY_PLUGINS_DIR,
		CREDITS,
		type Shot
	} from '#lib/omaxian';
	import { ALL_THEME_NAMES } from '#lib/themes';

	let activeShot = $state<Shot | null>(null);

	const BOOT: string[] = [
		'Omaxian  ·  a port of the Omarchy shell · X11 / XLibre · i3',
		'booting session …',
		'[  ok  ]  base:  Omarchy shell (upstream: DHH & 37signals)',
		'[  ok  ]  elogind (loginctl) — no systemd, no uwsm',
		'[  ok  ]  host:  omarchy-host (systemd | elogind | shutdown)',
		'[  ok  ]  picom compositor',
		'[  ok  ]  dunst notifications',
		'[  ok  ]  quickshell:  bar · dock · osd',
		'[  ok  ]  widgets:  workspaces clock media net weather tray sysstats vpn apt',
		`[  ok  ]  themes:  ${ALL_THEME_NAMES.length} loaded   (Alt+Ctrl+T to switch, default: nebula-ridge)`,
		`[  ok  ]  community plugins:  ${COMMUNITY_PLUGINS.length} available   (opt-in, ~/.config/omarchy/plugins/)`,
		'[  ok  ]  omarchy-* commands linked into PATH',
		'[  ok  ]  redshift night light armed',
		`[  ok  ]  tested on:  ${TESTED_ON.join(' · ')}`,
		'[ warn ]  X11 ≠ Wayland — partial parity with upstream Omarchy',
		'[ warn ]  Ubuntu 26 dropped X11 — use Xubuntu',
		'session ready.'
	];

	// Progressive enhancement: SSR / no-JS / reduced-motion shows the full log.
	let shown = $state(BOOT.length);
	let booted = $state(true);

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		shown = 0;
		booted = false;
		let i = 0;
		const id = setInterval(() => {
			shown = ++i;
			if (i >= BOOT.length) {
				clearInterval(id);
				setTimeout(() => (booted = true), 450);
			}
		}, 230);
		return () => clearInterval(id);
	});

	let copied = $state(false);
	async function copyInstall() {
		try {
			await navigator.clipboard.writeText(INSTALL.join('\n'));
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<svelte:head>
	<title>Omaxian — session ready</title>
	<meta
		name="description"
		content="Omaxian carries the Omarchy shell — bar, dock, menu, themes and omarchy-* commands — to X11 / XLibre and i3 on the Debian family. The shell only, not a distribution."
	/>
</svelte:head>

<div class="crt">
	<div class="stars" aria-hidden="true"></div>
	<div class="scan" aria-hidden="true"></div>
	<div class="vignette" aria-hidden="true"></div>

	<main class="screen">
		<!-- ===== boot log ===== -->
		<section class="boot">
			<div class="log" aria-label="boot log">
				{#each BOOT.slice(0, shown) as line, i (i)}
					<span
						class="line"
						class:hdr={i === 0}
						class:okline={line.startsWith('[  ok')}
						class:warnline={line.startsWith('[ warn')}>{line}</span
					>
				{/each}{#if !booted}<span class="cursor" aria-hidden="true">█</span>{/if}
			</div>

			{#if booted}
				<div class="banner-wrap">
					<!-- prettier-ignore -->
					<pre class="banner" role="img" aria-label="OMAXIAN"> ██████  ███    ███  █████  <span class="x">██   ██</span> ██  █████  ███    ██
██    ██ ████  ████ ██   ██ <span class="x"> ██ ██ </span> ██ ██   ██ ████   ██
██    ██ ██ ████ ██ ███████ <span class="x">  ███  </span> ██ ███████ ██ ██  ██
██    ██ ██  ██  ██ ██   ██ <span class="x"> ██ ██ </span> ██ ██   ██ ██  ██ ██
 ██████  ██      ██ ██   ██ <span class="x">██   ██</span> ██ ██   ██ ██   ████</pre>
				</div>

				<!-- prettier-ignore -->
				<pre class="prompt">omaxian@linux:~$ whatis omaxian
<span class="man">omaxian (7)</span>   {TAGLINE}.
              Ports the Omarchy <span class="tok">shell</span> only — bar, dock, menu, themes
              and <span class="tok">omarchy-*</span> commands. Not a distribution.

omaxian@linux:~$ omaxian --upstream
Built on <span class="tok">Omarchy</span> by DHH &amp; 37signals · <a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>
X11 / XLibre and Wayland differ, so parity with upstream is partial.

omaxian@linux:~$ <span class="cmd">_</span></pre>

				<div class="cta">
					<a class="btn" href={REPO} target="_blank" rel="noreferrer"
						>$ xdg-open github.com/aozora/omaxian</a
					>
					<a class="btn ghost" href="#install">$ less INSTALL</a>
				</div>
			{/if}
		</section>

		<!-- ===== features ===== -->
		<section class="sec" id="features">
			<h2 class="h">$ omaxian --what-it-adds</h2>
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

		<!-- ===== community plugins ===== -->
		<section class="sec">
			<h2 class="h">$ ls ~/.config/omarchy/plugins/</h2>
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
			<p class="note">
				# opt-in only — not installed by deploy.sh. <a
					href={COMMUNITY_PLUGINS_DIR}
					target="_blank"
					rel="noreferrer">browse community-plugins/ →</a
				>
			</p>
		</section>

		<!-- ===== screenshots ===== -->
		<section class="sec">
			<h2 class="h">$ for f in shots/*.webp; do feh "$f"; done</h2>
			<div class="fb">
				{#each SHOTS as s, i (s.src)}
					<figure>
						<div class="fb-title">── {s.label.toLowerCase().replace(/\s+/g, '-')}.webp ──</div>
						<button
							type="button"
							class="shot-btn"
							onclick={() => (activeShot = s)}
							aria-label={`Open ${s.label} screenshot`}
						>
							<img
								src={s.src}
								alt={s.label + ' — ' + s.desc}
								width="1600"
								height="1004"
								loading={i === 0 ? 'eager' : 'lazy'}
								decoding="async"
								fetchpriority={i === 0 ? 'high' : 'auto'}
							/>
						</button>
						<figcaption>{s.desc}</figcaption>
					</figure>
				{/each}
			</div>
		</section>

		<!-- ===== keys ===== -->
		<section class="sec">
			<h2 class="h">$ cat ~/.config/omaxian/binds</h2>
			<div class="binds">
				{#each KEYBINDINGS as [k, v] (k)}
					<span class="brow">
						<span class="bk">{k}</span><span class="bsep">→</span><span class="bv">{v}</span>
					</span>
				{/each}
			</div>
		</section>

		<!-- ===== install ===== -->
		<section class="sec" id="install">
			<h2 class="h">$ sudo ./setup.sh</h2>
			<p class="note">
				Needs an X11 session with i3 and a login path that runs <b>/etc/X11/Xsession</b> (most
				display managers do; <b>startx</b> with a proper <b>.xsession</b> also works). Then log out
				and back in — not <b>i3 restart</b>.
			</p>
			<p class="note">
				# tested on {TESTED_ON.join(' · ')}
			</p>
			<p class="note dim"># {UBUNTU_NOTE}</p>
			<div class="term">
				<div class="term-top">
					<span>~/projects</span>
					<button type="button" onclick={copyInstall}>{copied ? 'copied ✓' : '[ copy ]'}</button>
				</div>
				<div class="term-body">
					{#each INSTALL as line (line)}<span class="ln">{line}</span>{/each}
				</div>
			</div>
			<div class="caveats">
				<span># not 1:1 with Omarchy</span>
				{#each NOT_1_1 as c (c)}<span># · {c}</span>{/each}
			</div>
		</section>

		<!-- ===== foot ===== -->
		<footer class="foot">
			<div class="foot-log">
				<span>omaxian@linux:~$ cat CREDITS</span>
				<span>&nbsp;</span>
				<span class="foot-attr">{ATTRIBUTION}</span>
				<span>&nbsp;</span>
				{#each CREDITS as c (c.label)}<span># {c.label} — {c.by}</span>{/each}
				<span>&nbsp;</span>
				<span>omaxian@linux:~$ logout</span>
			</div>
			<div class="cta">
				<a class="btn" href={REPO} target="_blank" rel="noreferrer">github.com/aozora/omaxian</a>
				<a class="btn ghost" href="/">$ cd ../concepts</a>
			</div>
		</footer>
	</main>
</div>

<Lightbox shot={activeShot} onclose={() => (activeShot = null)} />

<style>
	.crt {
		--ink: #e6fff9; /* teal phosphor */
		--dim: #6f9e97;
		--acc: #5fe6d8; /* teal — primary */
		--spark: #ff3d78; /* warm spark — cursor, warnings */
		--bg: #04090b;
		position: relative;
		min-height: 100dvh;
		background: var(--bg);
		color: var(--ink);
		font-family: var(--omx-mono);
		overflow-x: hidden;
	}

	.stars {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		background: url('/wallpaper-bg.svg') center / cover no-repeat;
		opacity: 0.16;
	}
	.scan,
	.vignette {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 5;
	}
	.scan {
		background: repeating-linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.035) 0,
			rgba(255, 255, 255, 0.035) 1px,
			transparent 1px,
			transparent 3px
		);
		mix-blend-mode: overlay;
	}
	.vignette {
		background: radial-gradient(115% 85% at 50% 42%, transparent 48%, rgba(0, 0, 0, 0.78) 100%);
	}

	.screen {
		position: relative;
		z-index: 1;
		max-width: 60rem;
		margin: 0 auto;
		padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2.5rem) 5rem;
		font-size: clamp(0.82rem, 2.2vw, 0.95rem);
		line-height: 1.7;
		animation: poweron 0.5s ease both;
	}
	@keyframes poweron {
		0% {
			opacity: 0;
			filter: brightness(3) blur(2px);
			transform: scaleY(0.7);
		}
		60% {
			opacity: 1;
			transform: scaleY(1.01);
		}
		100% {
			filter: none;
			transform: none;
		}
	}

	/* Each row is its own block; per-row pre-wrap keeps internal spacing and
	   still wraps long lines. Whitespace *between* rows collapses (parent stays
	   white-space: normal), so template indentation never leaks into the page. */
	.log .line,
	.term-body .ln,
	.caveats span,
	.foot-log span {
		display: block;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.log .hdr {
		color: var(--ink);
		text-shadow: 0 0 12px color-mix(in srgb, var(--acc) 55%, transparent);
		margin-bottom: 0.4rem;
	}
	.log .okline {
		color: var(--dim);
	}
	.log .warnline {
		color: var(--spark);
	}

	.cursor,
	.cmd {
		color: var(--spark);
	}
	@media (prefers-reduced-motion: no-preference) {
		.cursor,
		.cmd {
			animation: blink 1s steps(1) infinite;
		}
		@keyframes blink {
			50% {
				opacity: 0;
			}
		}
	}

	.banner-wrap {
		overflow-x: auto;
		margin: 1.6rem 0 0.4rem;
	}
	.banner {
		margin: 0;
		color: var(--acc);
		font: inherit;
		font-size: clamp(0.34rem, 1.7vw, 0.7rem);
		line-height: 1.05;
		text-shadow: 0 0 14px color-mix(in srgb, var(--acc) 45%, transparent);
		white-space: pre;
	}
	.banner .x {
		color: var(--spark);
		text-shadow: 0 0 14px color-mix(in srgb, var(--spark) 55%, transparent);
	}

	.prompt {
		margin: 1rem 0 0;
		font: inherit;
		white-space: pre-wrap;
		word-break: break-word;
		color: var(--dim);
	}
	.prompt .man {
		color: var(--acc);
	}
	.prompt .tok {
		color: var(--ink);
	}
	.prompt a {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.prompt a:hover {
		color: var(--acc);
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin: 1.6rem 0 0;
	}
	.btn {
		display: inline-block;
		padding: 0.55rem 0.95rem;
		font: inherit;
		font-size: 0.85em;
		text-decoration: none;
		color: var(--bg);
		background: var(--acc);
		border: 1px solid var(--acc);
	}
	.btn.ghost {
		color: var(--ink);
		background: transparent;
	}
	.btn:hover {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--bg);
	}

	.sec {
		margin-top: clamp(3rem, 8vw, 5rem);
		border-top: 1px dashed color-mix(in srgb, var(--ink) 22%, transparent);
		padding-top: clamp(1.5rem, 4vw, 2.5rem);
	}
	.h {
		margin: 0 0 1.2rem;
		font-size: 1em;
		font-weight: 400;
		color: var(--ink);
	}

	.feats {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.feats li {
		display: grid;
		grid-template-columns: 1.4rem 1fr;
		gap: 0.4rem;
		padding: 0.55rem 0;
	}
	.bullet {
		color: var(--acc);
	}
	.feats b {
		color: var(--ink);
		font-weight: 700;
	}
	.feats .key {
		margin-left: 0.6rem;
		padding: 0 0.4rem;
		font-size: 0.82em;
		color: var(--acc);
		border: 1px solid color-mix(in srgb, var(--acc) 55%, transparent);
	}
	.feats .desc {
		display: block;
		color: var(--dim);
		margin-top: 0.15rem;
	}

	.fb {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
	}
	.fb figure {
		margin: 0;
		border: 1px solid color-mix(in srgb, var(--ink) 26%, transparent);
	}
	.fb-title {
		padding: 0.35rem 0.7rem;
		color: var(--dim);
		border-bottom: 1px solid color-mix(in srgb, var(--ink) 26%, transparent);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.shot-btn {
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		cursor: zoom-in;
	}
	.shot-btn:focus-visible {
		outline: 2px solid var(--acc);
		outline-offset: -2px;
	}
	.fb img {
		width: 100%;
		height: auto;
		display: block;
		filter: saturate(0.9) contrast(1.02);
		transition: filter 0.15s ease;
	}
	.shot-btn:hover img {
		filter: saturate(1.05) contrast(1.05) brightness(1.08);
	}
	.fb figcaption {
		padding: 0.5rem 0.7rem;
		color: var(--dim);
		font-size: 0.85em;
	}

	.binds {
		color: var(--dim);
	}
	.binds .brow {
		display: grid;
		grid-template-columns: minmax(0, 16rem) 1.5rem 1fr;
		gap: 0.5rem;
	}
	.binds .bk {
		color: var(--acc);
	}
	.binds .bsep {
		color: color-mix(in srgb, var(--ink) 35%, transparent);
	}
	.binds .bv {
		color: var(--ink);
	}

	.note {
		color: var(--dim);
		margin: 0 0 1rem;
	}
	.note b {
		color: var(--ink);
		font-weight: 400;
	}
	.note.dim {
		font-size: 0.85em;
		opacity: 0.75;
	}
	.note a,
	.feats a {
		color: var(--acc);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.note a:hover,
	.feats a:hover {
		color: var(--spark);
	}
	.feats .desc code {
		color: var(--dim);
		opacity: 0.85;
	}

	.term {
		border: 1px solid color-mix(in srgb, var(--ink) 28%, transparent);
		max-width: 46rem;
	}
	.term-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.35rem 0.7rem;
		color: var(--dim);
		border-bottom: 1px solid color-mix(in srgb, var(--ink) 28%, transparent);
	}
	.term-top button {
		font: inherit;
		color: var(--ink);
		background: transparent;
		border: 0;
		cursor: pointer;
	}
	.term-top button:hover {
		color: var(--acc);
	}
	.term-body {
		padding: 0.9rem 1rem;
		overflow-x: auto;
	}
	.term-body .ln::before {
		content: '$ ';
		color: var(--acc);
	}

	.caveats {
		margin-top: 1.5rem;
		color: color-mix(in srgb, var(--ink) 45%, transparent);
	}

	.foot {
		margin-top: clamp(3rem, 8vw, 5rem);
		border-top: 1px dashed color-mix(in srgb, var(--ink) 22%, transparent);
		padding-top: 2rem;
		color: var(--dim);
	}
	.foot-log {
		margin-bottom: 0.5rem;
	}
	.foot-log .foot-attr {
		color: color-mix(in srgb, var(--ink) 78%, transparent);
		max-width: 44rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.screen {
			animation: none;
		}
	}
</style>
