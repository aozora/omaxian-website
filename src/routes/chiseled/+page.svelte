<script lang="ts">
	import Wordmark from '#lib/Wordmark.svelte';
	import Lightbox from '#lib/Lightbox.svelte';
	import { ALL_THEME_NAMES } from '#lib/themes';
	import {
		REPO,
		OMARCHY,
		PITCH,
		SCOPE,
		ATTRIBUTION,
		TAGLINE,
		FEATURES,
		KEYBINDINGS,
		INSTALL,
		SHOTS,
		NOT_1_1,
		STACK,
		TESTED_ON,
		UBUNTU_NOTE,
		COMMUNITY_PLUGINS,
		COMMUNITY_PLUGINS_DIR,
		CREDITS,
		type Shot
	} from '#lib/omaxian';

	let activeShot = $state<Shot | null>(null);

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
	<title>Omaxian — no Wayland, no systemd</title>
	<meta
		name="description"
		content="Omaxian ports the Omarchy shell — bar, dock, menu, themes and omarchy-* commands — to X11 / XLibre and i3 on the Debian family. Not a distribution."
	/>
</svelte:head>

<main>
	<!-- ============ HERO ============ -->
	<header class="hero">
		<div class="plate">
			<p class="eyebrow">{TAGLINE}</p>
			<Wordmark class="mark" />
			<h1 class="statement">
				The shell,<br />not the distro.<br /><span class="hl">Omarchy on X11.</span>
			</h1>
			<p class="pitch">{PITCH}</p>
			<p class="scope">{SCOPE}</p>
			<p class="attribution">{ATTRIBUTION}</p>
			<div class="cta">
				<a class="btn primary" href={REPO} target="_blank" rel="noreferrer">Get it on GitHub</a>
				<a class="btn ghost" href="#install">Install</a>
			</div>
			<ul class="stack">
				{#each STACK as s (s)}<li>{s}</li>{/each}
			</ul>
		</div>
	</header>

	<!-- ============ ADDS ============ -->
	<section class="sec" id="adds">
		<div class="sec-head">
			<span class="num">01</span>
			<h2>What Omaxian adds</h2>
			<p>
				Omaxian is not only a backend swap. Several first-party pieces have no upstream counterpart
				— they exist because X11 / i3 / Debian needed them, or because a GUI was simply missing.
			</p>
		</div>
		<ol class="feats">
			{#each FEATURES as f, i (f.title)}
				<li>
					<span class="fi">{String(i + 1).padStart(2, '0')}</span>
					<div class="ft">
						<h3>
							{f.title}{#if f.key}<kbd>{f.key}</kbd>{/if}
						</h3>
						<p>{f.blurb}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<!-- ============ THEMES ============ -->
	<section class="sec themes">
		<div class="sec-head">
			<span class="num">02</span>
			<h2>{ALL_THEME_NAMES.length} themes. One keystroke.</h2>
			<p>
				<kbd>Alt+Ctrl+T</kbd> restyles the bar, i3, dunst, GTK icons, kitty and the wallpaper in one
				move — including the new default, <b>Nebula Ridge</b>, and <b>Galaxy Swirl</b>. The same
				data still lives in <code>~/.config/omarchy/shell.json</code> if you prefer a text editor.
			</p>
		</div>
		<ul class="chips">
			{#each ALL_THEME_NAMES as name (name)}<li>{name}</li>{/each}
		</ul>
	</section>

	<!-- ============ COMMUNITY PLUGINS ============ -->
	<section class="sec">
		<div class="sec-head">
			<span class="num">03</span>
			<h2>Community plugins</h2>
			<p>
				Opt-in, third-party shell ports live in <code>community-plugins/</code> — never installed by
				<code>deploy.sh</code>. Each one is checked with <kbd>omarchy-plugin-check</kbd> and
				<kbd>omarchy-plugin-validate</kbd> before it's listed, and kept current with
				<kbd>omarchy-plugin-update</kbd>.
			</p>
		</div>
		<ul class="feats">
			{#each COMMUNITY_PLUGINS as p, i (p.id)}
				<li>
					<span class="fi">{String(i + 1).padStart(2, '0')}</span>
					<div class="ft">
						<h3><a href={p.href} target="_blank" rel="noreferrer">{p.label}</a></h3>
						<p>{p.blurb} <code>{p.id}</code></p>
					</div>
				</li>
			{/each}
		</ul>
		<p class="more-link">
			<a href={COMMUNITY_PLUGINS_DIR} target="_blank" rel="noreferrer"
				>Browse community-plugins/ →</a
			>
		</p>
	</section>

	<!-- ============ KEYS ============ -->
	<section class="sec">
		<div class="sec-head">
			<span class="num">04</span>
			<h2>The whole session, from the keyboard</h2>
		</div>
		<dl class="keys">
			{#each KEYBINDINGS as [k, v] (k)}
				<div>
					<dt><kbd>{k}</kbd></dt>
					<dd>{v}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<!-- ============ SCREENS ============ -->
	<section class="sec">
		<div class="sec-head">
			<span class="num">05</span>
			<h2>On screen</h2>
		</div>
		<div class="gallery">
			{#each SHOTS as s, i (s.src)}
				<figure class:offset={i % 2 === 1}>
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
					<figcaption><b>{s.label}</b> — {s.desc}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<!-- ============ INSTALL ============ -->
	<section class="sec" id="install">
		<div class="sec-head">
			<span class="num">06</span>
			<h2>Install</h2>
			<p>
				You need an X11 session with i3 and a login path that runs
				<code>/etc/X11/Xsession</code> (most display managers do; <code>startx</code> with a proper
				<code>.xsession</code>
				also works). Afterwards, log out and back in — not
				<code>i3 restart</code> — so i3 picks up <code>PATH</code>.
			</p>
			<p class="tested">
				Regularly tested against
				{#each TESTED_ON as d, i (d)}{#if i > 0},
					{/if}<b>{d}</b>{/each}.
			</p>
			<p class="tested note">{UBUNTU_NOTE}</p>
		</div>
		<div class="term">
			<div class="term-top">
				<span>root@omaxian</span>
				<button type="button" onclick={copyInstall}>{copied ? 'copied ✓' : 'copy'}</button>
			</div>
			<div class="term-body">
				{#each INSTALL as line (line)}<span class="ln">{line}</span>{/each}
			</div>
		</div>
		<div class="caveat-box">
			<h3>Where it is not 1:1 with Omarchy</h3>
			<ul>
				{#each NOT_1_1 as c (c)}<li>{c}</li>{/each}
			</ul>
		</div>
	</section>

	<!-- ============ FOOT ============ -->
	<footer class="foot">
		<Wordmark class="foot-mark" />
		<p class="attribution attribution--foot">
			{ATTRIBUTION}
			<a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>
		</p>
		<div class="foot-cta">
			<a class="btn primary" href={REPO} target="_blank" rel="noreferrer"
				>github.com/aozora/omaxian</a
			>
			<a class="btn ghost" href="/">Other concepts</a>
		</div>
		<p class="credits">
			{#each CREDITS as c, i (c.label)}{#if i > 0}
					·
				{/if}<a href={c.href} target="_blank" rel="noreferrer">{c.label}</a> — {c.by}{/each}
		</p>
	</footer>
</main>

<Lightbox shot={activeShot} onclose={() => (activeShot = null)} />

<style>
	main {
		--cut: 22px;
		--maxw: 74rem;
	}

	kbd {
		font-family: var(--omx-mono);
		font-size: 0.76em;
		padding: 0.14em 0.45em;
		margin-left: 0.5rem;
		border-radius: 4px;
		background: color-mix(in srgb, var(--omx-bone) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 20%, transparent);
		white-space: nowrap;
		vertical-align: middle;
	}
	code {
		font-family: var(--omx-mono);
		font-size: 0.88em;
		color: var(--omx-bone);
		background: color-mix(in srgb, var(--omx-bone) 8%, transparent);
		padding: 0.08em 0.35em;
		border-radius: 3px;
	}

	/* ---------- hero ---------- */
	.hero {
		min-height: 100dvh;
		display: grid;
		place-items: center;
		padding: clamp(1.5rem, 5vw, 4rem);
		/* the constellation wallpaper, held well back so the plate stays the subject */
		background:
			radial-gradient(
				60% 50% at 82% 4%,
				color-mix(in srgb, var(--omx-accent) 12%, transparent),
				transparent 70%
			),
			linear-gradient(
				color-mix(in srgb, var(--omx-void) 78%, transparent),
				color-mix(in srgb, var(--omx-void) 88%, transparent) 55%,
				var(--omx-void)
			),
			url('/wallpaper-bg.svg') center / cover no-repeat var(--omx-void);
	}
	.plate {
		position: relative;
		width: min(var(--maxw), 100%);
		padding: clamp(2rem, 6vw, 5rem);
		background: color-mix(in srgb, var(--omx-panel) 88%, transparent);
		border: 1px solid color-mix(in srgb, var(--omx-accent) 24%, transparent);
		box-shadow: 0 40px 120px -40px rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(3px);
		clip-path: polygon(
			0 0,
			calc(100% - 46px) 0,
			100% 46px,
			100% 100%,
			46px 100%,
			0 calc(100% - 46px)
		);
	}
	.eyebrow {
		margin: 0 0 1.75rem;
		font-family: var(--omx-mono);
		font-size: clamp(0.72rem, 1.6vw, 0.85rem);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--omx-accent);
	}
	:global(.mark) {
		display: block;
		width: min(52rem, 100%);
		height: auto;
		color: var(--omx-bone);
	}
	.statement {
		margin: 2.25rem 0 0;
		font-size: clamp(2.2rem, 7vw, 4.6rem);
		line-height: 1.1;
		font-weight: 720;
		letter-spacing: -0.03em;
	}
	.statement .hl {
		color: var(--omx-accent);
	}
	.pitch {
		margin: 1.75rem 0 0;
		max-width: 40rem;
		font-size: clamp(1rem, 2.2vw, 1.2rem);
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 74%, transparent);
	}
	.scope {
		margin: 1rem 0 0;
		max-width: 40rem;
		font-size: 0.95rem;
		line-height: 1.65;
		color: color-mix(in srgb, var(--omx-bone) 58%, transparent);
	}
	.attribution {
		margin: 1.5rem 0 0;
		max-width: 40rem;
		padding: 0.9rem 1.1rem;
		border-left: 3px solid var(--omx-accent);
		background: color-mix(in srgb, var(--omx-accent) 7%, transparent);
		font-size: 0.9rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 80%, transparent);
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-top: 2.25rem;
	}
	.btn {
		display: inline-block;
		padding: 0.85rem 1.5rem;
		font-weight: 640;
		font-size: 0.95rem;
		text-decoration: none;
		clip-path: polygon(
			0 0,
			calc(100% - 10px) 0,
			100% 10px,
			100% 100%,
			10px 100%,
			0 calc(100% - 10px)
		);
		transition: transform 0.15s ease;
	}
	.btn.primary {
		background: var(--omx-accent);
		color: #fff;
	}
	.btn.ghost {
		background: transparent;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 34%, transparent);
		color: var(--omx-bone);
	}
	.btn:hover {
		transform: translate(-2px, -2px);
	}
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 0.5rem;
		margin: 2.5rem 0 0;
		padding: 0;
		list-style: none;
	}
	.stack li {
		font-family: var(--omx-mono);
		font-size: 0.72rem;
		padding: 0.28rem 0.6rem;
		color: color-mix(in srgb, var(--omx-bone) 62%, transparent);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 16%, transparent);
	}

	/* ---------- sections ---------- */
	.sec {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: clamp(3.5rem, 9vw, 7rem) clamp(1.25rem, 4vw, 3rem);
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.sec-head {
		max-width: 44rem;
		margin-bottom: 2.5rem;
	}
	.num {
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		color: var(--omx-accent);
	}
	.sec-head h2 {
		margin: 0.5rem 0 0;
		font-size: clamp(1.7rem, 4.5vw, 2.7rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 1.1;
	}
	.sec-head p {
		margin: 1rem 0 0;
		font-size: 1.02rem;
		line-height: 1.65;
		color: color-mix(in srgb, var(--omx-bone) 70%, transparent);
	}
	.sec-head .tested {
		font-size: 0.92rem;
		color: color-mix(in srgb, var(--omx-bone) 55%, transparent);
	}
	.sec-head .tested b {
		color: var(--omx-bone);
		font-weight: 600;
	}
	.sec-head .tested.note {
		margin-top: 0.5rem;
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--omx-bone) 42%, transparent);
	}

	/* features */
	.feats {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.feats li {
		display: grid;
		grid-template-columns: 4rem 1fr;
		gap: 1rem;
		padding: 1.6rem 0;
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
	}
	.feats li:last-child {
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
	}
	.fi {
		font-family: var(--omx-mono);
		font-size: 1.6rem;
		color: color-mix(in srgb, var(--omx-bone) 28%, transparent);
	}
	.ft h3 {
		margin: 0;
		font-size: 1.2rem;
		font-weight: 640;
	}
	.ft h3 a {
		text-decoration: none;
	}
	.ft h3 a:hover {
		color: var(--omx-accent);
		text-decoration: underline;
	}
	.ft p {
		margin: 0.5rem 0 0;
		font-size: 0.96rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 68%, transparent);
		max-width: 46rem;
	}
	.more-link {
		margin: 1.5rem 0 0;
		font-size: 0.92rem;
	}
	.more-link a {
		color: var(--omx-accent);
	}
	.more-link a:hover {
		text-decoration: none;
	}

	/* themes */
	.chips {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.chips li {
		font-family: var(--omx-mono);
		font-size: 0.82rem;
		padding: 0.5rem 0.9rem;
		background: var(--omx-plate-2);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 14%, transparent);
		clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
	}
	.themes .chips li:nth-child(3n + 1) {
		border-color: color-mix(in srgb, var(--omx-accent) 45%, transparent);
	}

	/* keys */
	.keys {
		margin: 0;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
	}
	.keys > div {
		display: grid;
		grid-template-columns: minmax(14rem, 26rem) 1fr;
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.keys > div:first-child {
		border-top: 0;
	}
	.keys dt {
		padding: 1rem 1.3rem;
		border-right: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.keys dt kbd {
		margin: 0;
	}
	.keys dd {
		margin: 0;
		padding: 1rem 1.3rem;
		font-size: 0.96rem;
		color: color-mix(in srgb, var(--omx-bone) 76%, transparent);
	}

	/* gallery */
	.gallery {
		display: grid;
		gap: clamp(1.5rem, 5vw, 3.5rem);
	}
	.gallery figure {
		margin: 0;
		max-width: 52rem;
	}
	.gallery figure.offset {
		margin-left: auto;
		text-align: right;
	}
	.shot-btn {
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
	}
	.gallery img {
		width: 100%;
		height: auto;
		display: block;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 16%, transparent);
		clip-path: polygon(
			0 0,
			calc(100% - 20px) 0,
			100% 20px,
			100% 100%,
			20px 100%,
			0 calc(100% - 20px)
		);
		transition: border-color 0.15s ease;
	}
	.shot-btn:hover img,
	.shot-btn:focus-visible img {
		border-color: var(--omx-accent);
	}
	.shot-btn:focus-visible {
		outline: 2px solid var(--omx-accent);
		outline-offset: 4px;
	}
	.gallery figcaption {
		margin-top: 0.7rem;
		font-size: 0.88rem;
		color: color-mix(in srgb, var(--omx-bone) 60%, transparent);
	}
	.gallery figcaption b {
		color: var(--omx-bone);
	}

	/* install */
	.term {
		max-width: 52rem;
		background: var(--omx-plate-2);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 16%, transparent);
		clip-path: polygon(
			0 0,
			calc(100% - 16px) 0,
			100% 16px,
			100% 100%,
			16px 100%,
			0 calc(100% - 16px)
		);
	}
	.term-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.55rem 1rem;
		font-family: var(--omx-mono);
		font-size: 0.78rem;
		color: color-mix(in srgb, var(--omx-bone) 55%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
	}
	.term-top button {
		font: inherit;
		color: var(--omx-bone);
		background: transparent;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 24%, transparent);
		padding: 0.15rem 0.7rem;
		cursor: pointer;
	}
	.term-top button:hover {
		border-color: var(--omx-accent);
	}
	.term-body {
		padding: 1.1rem 1.2rem;
		overflow-x: auto;
		font-family: var(--omx-mono);
		font-size: 0.83rem;
		line-height: 1.8;
		color: var(--omx-bone);
	}
	.term-body .ln {
		display: block;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.term-body .ln::before {
		content: '# ';
		color: var(--omx-accent);
	}

	.caveat-box {
		margin-top: 2.5rem;
		padding: 1.6rem 1.8rem;
		border-left: 3px solid var(--omx-accent);
		background: var(--omx-plate-2);
	}
	.caveat-box h3 {
		margin: 0 0 0.8rem;
		font-size: 1.05rem;
	}
	.caveat-box ul {
		margin: 0;
		padding-left: 1.1rem;
	}
	.caveat-box li {
		margin: 0.5rem 0;
		font-size: 0.93rem;
		line-height: 1.55;
		color: color-mix(in srgb, var(--omx-bone) 72%, transparent);
	}

	/* foot */
	.foot {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem) 5rem;
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	:global(.foot-mark) {
		display: block;
		width: min(30rem, 80%);
		height: auto;
		color: color-mix(in srgb, var(--omx-bone) 78%, transparent);
	}
	.foot-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin: 2rem 0 1.5rem;
	}
	.credits {
		margin: 0;
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--omx-bone) 45%, transparent);
	}
	.credits a:hover {
		color: var(--omx-bone);
	}
	.attribution--foot {
		margin: 0 0 1.75rem;
	}
	.attribution--foot a {
		color: var(--omx-bone);
		text-decoration: underline;
		text-underline-offset: 2px;
		white-space: nowrap;
	}

	/* ---------- scroll reveal ---------- */
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			.sec,
			.foot {
				animation: rise linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 40%;
			}
			@keyframes rise {
				from {
					opacity: 0;
					transform: translateY(2.5rem);
				}
			}
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition: none;
		}
	}

	@media (max-width: 640px) {
		.feats li {
			grid-template-columns: 1fr;
			gap: 0.3rem;
		}
		.keys > div {
			grid-template-columns: 1fr;
		}
		.keys dt {
			border-right: 0;
			border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
		}
		.gallery figure.offset {
			text-align: left;
		}
	}
</style>
