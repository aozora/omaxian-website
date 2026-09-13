<script lang="ts">
	import Wordmark from '#lib/Wordmark.svelte';
	import Lightbox from '#lib/Lightbox.svelte';
	import { THEMES } from '#lib/themes';
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
		TESTED_ON,
		UBUNTU_NOTE,
		COMMUNITY_PLUGINS,
		COMMUNITY_PLUGINS_DIR,
		CREDITS,
		type Shot
	} from '#lib/omaxian';

	let activeShot = $state<Shot | null>(null);

	// ---- live theme ------------------------------------------------------------
	let idx = $state(0);
	const t = $derived(THEMES[idx]);

	const stageStyle = $derived(
		[
			`--bg:${t.bg}`,
			`--bg-dark:${t.bgDark}`,
			`--fg:${t.fg}`,
			`--accent:${t.accent}`,
			`--sel:${t.sel}`,
			`--red:${t.red}`,
			`--green:${t.green}`,
			`--yellow:${t.yellow}`,
			`--blue:${t.blue}`,
			`--magenta:${t.magenta}`,
			`--cyan:${t.cyan}`
		].join(';')
	);

	function step(d: number) {
		idx = (idx + d + THEMES.length) % THEMES.length;
	}

	$effect(() => {
		// restore last pick
		try {
			const saved = localStorage.getItem('omx-theme');
			if (saved) {
				const i = THEMES.findIndex((x) => x.id === saved);
				if (i >= 0) idx = i;
			}
		} catch {
			/* private mode / blocked storage */
		}
	});

	$effect(() => {
		try {
			localStorage.setItem('omx-theme', t.id);
		} catch {
			/* ignore */
		}
	});

	// ---- live clock ----------------------------------------------------------
	let now = $state(new Date());
	$effect(() => {
		const id = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(id);
	});
	const clock = $derived(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));

	// ---- dock magnification -------------------------------------------------
	const dockApps = ['--accent', '--blue', '--green', '--yellow', '--magenta', '--red'];
	let scales = $state(dockApps.map(() => 1));
	let reduced = false;

	$effect(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function magnify(e: PointerEvent) {
		if (reduced) return;
		const row = e.currentTarget as HTMLElement;
		const items = Array.from(row.querySelectorAll<HTMLElement>('.app'));
		scales = items.map((el) => {
			const r = el.getBoundingClientRect();
			const d = Math.abs(e.clientX - (r.left + r.width / 2));
			return 1 + Math.max(0, 1 - d / 130) * 0.55;
		});
	}
	function resetDock() {
		scales = dockApps.map(() => 1);
	}

	// ---- install copy ------------------------------------------------------
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

	const workspaces = [1, 2, 3, 4];
</script>

<svelte:head>
	<title>Omaxian — the live desktop</title>
	<meta
		name="description"
		content="Omaxian ports the Omarchy shell — bar, dock, menu, themes and omarchy-* commands — to X11 / XLibre and i3 on the Debian family. The shell only, not a distribution."
	/>
</svelte:head>

<!-- ====================================================================== -->
<!-- HERO: a working slice of the desktop                                    -->
<!-- ====================================================================== -->
<section class="stage" style={stageStyle}>
	<div class="wall" aria-hidden="true"></div>

	<div class="bar" role="presentation">
		<div class="bar-l">
			<span class="menu-glyph" aria-hidden="true">
				<svg viewBox="0 0 20 20" width="16" height="16"
					><path
						d="M2 3h16M2 10h16M2 17h16"
						stroke="currentColor"
						stroke-width="2.4"
						stroke-linecap="round"
					/></svg
				>
			</span>
			<ul class="ws">
				{#each workspaces as w (w)}
					<li class:on={w === 1}>{w}</li>
				{/each}
			</ul>
		</div>

		<div class="bar-c">
			<span class="play" aria-hidden="true">
				<svg viewBox="0 0 12 12" width="10" height="10"
					><path d="M2 1l8 5-8 5z" fill="currentColor" /></svg
				>
			</span>
			MPD — aurora-borealis.flac
		</div>

		<div class="bar-r">
			<span>CPU 4%</span>
			<span class="dot" style="background:var(--green)"></span>
			<span>eth0</span>
			<span class="clock">{clock}</span>
		</div>
	</div>

	<div class="win">
		<div class="win-bar">
			<span class="tt">omaxian — welcome</span>
			<span class="win-dots" aria-hidden="true"><i></i><i></i><i></i></span>
		</div>
		<div class="win-body">
			<Wordmark class="hero-mark" glow="var(--accent)" spark="var(--red)" />
			<p class="tagline">{TAGLINE}</p>
			<p class="pitch">{PITCH}</p>
			<p class="scope">{SCOPE}</p>
			<p class="attribution">{ATTRIBUTION}</p>

			<div class="cta">
				<a class="btn primary" href={REPO} target="_blank" rel="noreferrer">Get it on GitHub</a>
				<a class="btn ghost" href="#install">Read the install</a>
			</div>

			<div class="switch">
				<button type="button" aria-label="Previous theme" onclick={() => step(-1)}>‹</button>
				<span class="switch-name">
					<span class="swatch" style="background:{t.accent}"></span>
					theme · {t.name}
				</span>
				<button type="button" aria-label="Next theme" onclick={() => step(1)}>›</button>
			</div>
			<div class="dots" role="tablist" aria-label="Themes">
				{#each THEMES as th, i (th.id)}
					<button
						type="button"
						role="tab"
						aria-selected={i === idx}
						aria-label={th.name}
						title={th.name}
						class:active={i === idx}
						style="background:{th.accent}"
						onclick={() => (idx = i)}
					></button>
				{/each}
			</div>
			<p class="hint">
				Every palette here ships with Omaxian. One keystroke — <kbd>Alt+Ctrl+T</kbd> — on the real thing.
			</p>
		</div>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="dock" onpointermove={magnify} onpointerleave={resetDock}>
		{#each dockApps as v, i (v)}
			<span
				class="app"
				style="--c:var({v}); transform:scale({scales[i]}); z-index:{Math.round(scales[i] * 10)}"
			></span>
		{/each}
	</div>

	<a class="scroll-cue" href="#adds" aria-label="Scroll to features">▾</a>
</section>

<!-- ====================================================================== -->
<!-- READOUT: the details, on the brand plate                                -->
<!-- ====================================================================== -->
<div class="readout">
	<section id="adds" class="block">
		<h2 class="rule">What Omaxian adds</h2>
		<p class="lede">
			Not just a backend swap. These pieces have no upstream counterpart — they exist because X11 /
			i3 / Debian needed them, or because a GUI was missing.
		</p>
		<ul class="features">
			{#each FEATURES as f (f.title)}
				<li class="feat">
					<h3>{f.title}</h3>
					{#if f.key}<span class="kbd-inline">{f.key}</span>{/if}
					<p>{f.blurb}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="block">
		<h2 class="rule">Community plugins</h2>
		<p class="lede">
			Opt-in third-party shell ports live in <code>community-plugins/</code> — never installed by
			<code>deploy.sh</code>. Each one passes <code>omarchy-plugin-check</code> and
			<code>omarchy-plugin-validate</code> before it's listed, and stays current with
			<code>omarchy-plugin-update</code>.
		</p>
		<ul class="features">
			{#each COMMUNITY_PLUGINS as p (p.id)}
				<li class="feat">
					<h3><a href={p.href} target="_blank" rel="noreferrer">{p.label}</a></h3>
					<p>{p.blurb}</p>
				</li>
			{/each}
		</ul>
		<p class="more-link">
			<a href={COMMUNITY_PLUGINS_DIR} target="_blank" rel="noreferrer"
				>Browse community-plugins/ →</a
			>
		</p>
	</section>

	<section class="block">
		<h2 class="rule">On screen</h2>
		<!-- focusable so keyboard users can scroll the overflow region (WCAG 2.1.1) -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class="shots" role="region" tabindex="0" aria-label="Screenshot gallery, scrollable">
			{#each SHOTS as s, i (s.src)}
				<figure>
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

	<section class="block">
		<h2 class="rule">Keys</h2>
		<dl class="binds">
			{#each KEYBINDINGS as [k, v] (k)}
				<div>
					<dt>{k}</dt>
					<dd>{v}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section id="install" class="block">
		<h2 class="rule">Install</h2>
		<p class="lede">
			You need an X11 session with i3 and a login path that runs <code>/etc/X11/Xsession</code>
			(most display managers do; <code>startx</code> with a proper <code>.xsession</code> also
			works). Then log out and back in — not <code>i3 restart</code>.
		</p>
		<p class="tested">
			Regularly tested against
			{#each TESTED_ON as d, i (d)}{#if i > 0},
				{/if}<b>{d}</b>{/each}.
		</p>
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

	<section class="block">
		<h2 class="rule">Where it is not 1:1 with Omarchy</h2>
		<p class="lede">
			Omaxian tracks the Omarchy shell, but X11 / XLibre is not Wayland and i3 is not Hyprland — so
			parity is partial by design.
		</p>
		<ul class="caveats">
			{#each NOT_1_1 as c (c)}<li>{c}</li>{/each}
		</ul>
	</section>

	<footer class="foot">
		<Wordmark class="foot-mark" />
		<p class="attribution attribution--foot">
			{ATTRIBUTION}
			<a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>
		</p>
		<div class="foot-links">
			<a href={REPO} target="_blank" rel="noreferrer">GitHub</a>
			<a href="/">Other concepts</a>
		</div>
		<p class="credits">
			{#each CREDITS as c, i (c.label)}{#if i > 0}
					·
				{/if}<a href={c.href} target="_blank" rel="noreferrer">{c.label}</a> — {c.by}{/each}
		</p>
	</footer>
</div>

<Lightbox shot={activeShot} onclose={() => (activeShot = null)} />

<style>
	/* ---------- hero stage ------------------------------------------------- */
	.stage {
		position: relative;
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		/* clip the wallpaper horizontally, but let a tall hero window grow the
		   page rather than getting cropped on short viewports */
		overflow-x: clip;
		background: var(--bg-dark);
		color: var(--fg);
		transition:
			background-color 0.5s ease,
			color 0.5s ease;
	}

	/* the constellation wallpaper, washed by the current theme so switching
	   themes still visibly recolours the hero */
	.wall {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(
				120% 90% at 15% 0%,
				color-mix(in srgb, var(--accent) 24%, transparent),
				transparent 58%
			),
			radial-gradient(
				120% 90% at 100% 100%,
				color-mix(in srgb, var(--magenta) 20%, transparent),
				transparent 55%
			),
			linear-gradient(
				180deg,
				color-mix(in srgb, var(--bg) 55%, transparent),
				color-mix(in srgb, var(--bg-dark) 82%, transparent)
			),
			url('/wallpaper.svg') center / cover no-repeat var(--omx-void);
		transition: background 0.5s ease;
	}

	.bar,
	.win,
	.dock,
	.scroll-cue {
		position: relative;
		z-index: 1;
	}

	/* top bar */
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin: 0.6rem;
		padding: 0.4rem 0.7rem;
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		color: var(--fg);
		background: color-mix(in srgb, var(--bg-dark) 82%, transparent);
		border: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
		border-radius: 8px;
		backdrop-filter: blur(6px);
	}
	.bar-l,
	.bar-r,
	.bar-c {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}
	.bar-r {
		color: color-mix(in srgb, var(--fg) 78%, transparent);
	}
	.menu-glyph {
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		border-radius: 6px;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 16%, transparent);
	}
	.ws {
		display: flex;
		gap: 0.3rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.ws li {
		display: grid;
		place-items: center;
		width: 20px;
		height: 20px;
		border-radius: 5px;
		color: color-mix(in srgb, var(--fg) 45%, transparent);
	}
	.ws li.on {
		color: var(--bg-dark);
		background: var(--accent);
		font-weight: 700;
	}
	.bar-c {
		color: color-mix(in srgb, var(--fg) 88%, transparent);
	}
	.play {
		color: var(--green);
		display: inline-grid;
		place-items: center;
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		display: inline-block;
	}
	.clock {
		color: var(--fg);
		font-variant-numeric: tabular-nums;
	}

	/* floating window */
	.win {
		align-self: center;
		justify-self: center;
		width: min(46rem, 92vw);
		margin: 1.5rem 0;
		background: color-mix(in srgb, var(--bg) 92%, #000 8%);
		border: 1px solid color-mix(in srgb, var(--fg) 16%, transparent);
		border-radius: 10px;
		box-shadow:
			0 30px 80px -20px rgba(0, 0, 0, 0.6),
			0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent);
		overflow: hidden;
	}
	.win-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.8rem;
		font-family: var(--omx-mono);
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--fg) 62%, transparent);
		background: color-mix(in srgb, var(--bg-dark) 60%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
	}
	.win-dots {
		display: flex;
		gap: 5px;
	}
	.win-dots i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--fg) 22%, transparent);
	}
	.win-dots i:last-child {
		background: var(--red);
	}
	.win-body {
		padding: clamp(1.5rem, 4vw, 2.75rem);
	}
	:global(.hero-mark) {
		display: block;
		width: min(24rem, 64vw);
		height: auto;
		color: var(--fg);
	}
	.tagline {
		margin: 1.1rem 0 0;
		font-family: var(--omx-mono);
		font-size: 0.85rem;
		letter-spacing: 0.02em;
		color: var(--accent);
	}
	.pitch {
		margin: 0.7rem 0 0;
		max-width: 34rem;
		font-size: 1.05rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--fg) 90%, transparent);
	}
	.scope {
		margin: 0.7rem 0 0;
		max-width: 34rem;
		font-size: 0.92rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--fg) 66%, transparent);
	}
	.attribution {
		margin: 0.9rem 0 0;
		max-width: 34rem;
		padding-left: 0.8rem;
		border-left: 2px solid var(--red);
		font-size: 0.85rem;
		line-height: 1.55;
		color: color-mix(in srgb, var(--fg) 60%, transparent);
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 1.5rem;
	}
	.btn {
		display: inline-block;
		padding: 0.7rem 1.2rem;
		font-weight: 600;
		font-size: 0.92rem;
		text-decoration: none;
		border-radius: 7px;
		transition:
			transform 0.15s ease,
			filter 0.15s ease;
	}
	.btn.primary {
		background: var(--accent);
		color: var(--bg-dark);
	}
	.btn.ghost {
		border: 1px solid color-mix(in srgb, var(--fg) 30%, transparent);
		color: var(--fg);
	}
	.btn:hover {
		transform: translateY(-2px);
		filter: brightness(1.05);
	}

	.switch {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-top: 1.8rem;
	}
	.switch button {
		width: 30px;
		height: 30px;
		border-radius: 6px;
		border: 1px solid color-mix(in srgb, var(--fg) 24%, transparent);
		background: transparent;
		color: var(--fg);
		font-size: 1.1rem;
		line-height: 1;
		cursor: pointer;
	}
	.switch button:hover {
		border-color: var(--accent);
		color: var(--accent);
	}
	.switch-name {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--omx-mono);
		font-size: 0.85rem;
	}
	.swatch {
		width: 12px;
		height: 12px;
		border-radius: 3px;
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--fg) 25%, transparent);
	}
	.dots {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 0.9rem;
	}
	.dots button {
		width: 16px;
		height: 16px;
		padding: 0;
		border-radius: 4px;
		border: 1px solid color-mix(in srgb, #000 25%, transparent);
		cursor: pointer;
		opacity: 0.5;
		transition:
			opacity 0.15s ease,
			transform 0.15s ease;
	}
	.dots button:hover {
		opacity: 1;
	}
	.dots button.active {
		opacity: 1;
		transform: scale(1.2);
		box-shadow: 0 0 0 2px var(--fg);
	}
	.hint {
		margin: 1rem 0 0;
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--fg) 60%, transparent);
	}
	kbd,
	.kbd-inline {
		font-family: var(--omx-mono);
		font-size: 0.78em;
		padding: 0.12em 0.4em;
		border-radius: 4px;
		background: color-mix(in srgb, var(--fg) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--fg) 18%, transparent);
		white-space: nowrap;
	}

	/* dock */
	.dock {
		align-self: end;
		justify-self: center;
		display: flex;
		align-items: flex-end;
		gap: 0.6rem;
		margin: 0 0 1.1rem;
		padding: 0.55rem 0.8rem;
		background: color-mix(in srgb, var(--bg-dark) 78%, transparent);
		border: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
		border-radius: 14px;
		backdrop-filter: blur(6px);
	}
	.app {
		width: 34px;
		height: 34px;
		border-radius: 9px;
		background: var(--c);
		transform-origin: bottom center;
		transition: transform 0.12s ease;
		box-shadow: 0 6px 16px -6px color-mix(in srgb, var(--c) 70%, transparent);
	}

	.scroll-cue {
		position: absolute;
		bottom: 0.4rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		font-size: 0.9rem;
		text-decoration: none;
		color: color-mix(in srgb, var(--fg) 55%, transparent);
		animation: bob 1.8s ease-in-out infinite;
	}
	@keyframes bob {
		50% {
			transform: translate(-50%, 4px);
		}
	}

	/* ---------- readout -------------------------------------------------- */
	.readout {
		background: var(--omx-plate);
		color: var(--omx-bone);
	}
	.block {
		max-width: 72rem;
		margin: 0 auto;
		padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem);
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
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
	.lede code,
	code {
		font-family: var(--omx-mono);
		font-size: 0.88em;
		color: var(--omx-bone);
	}
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

	.features {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1px;
		background: color-mix(in srgb, var(--omx-bone) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}
	.feat {
		background: var(--omx-plate);
		padding: 1.5rem 1.4rem;
	}
	.feat h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 640;
	}
	.feat h3 a {
		text-decoration: none;
	}
	.feat h3 a:hover {
		color: var(--omx-accent);
		text-decoration: underline;
	}
	.more-link {
		margin: 1rem 0 0;
		font-size: 0.9rem;
	}
	.more-link a {
		color: var(--omx-accent);
	}
	.more-link a:hover {
		text-decoration: none;
	}
	.feat .kbd-inline {
		display: inline-block;
		margin-top: 0.5rem;
		color: var(--omx-bone);
		background: color-mix(in srgb, var(--omx-bone) 10%, transparent);
		border-color: color-mix(in srgb, var(--omx-bone) 16%, transparent);
	}
	.feat p {
		margin: 0.6rem 0 0;
		font-size: 0.92rem;
		line-height: 1.55;
		color: color-mix(in srgb, var(--omx-bone) 66%, transparent);
	}

	.shots {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding-bottom: 1rem;
		scrollbar-color: var(--omx-accent) transparent;
	}
	.shots figure {
		flex: 0 0 min(38rem, 82vw);
		scroll-snap-align: center;
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
		width: 100%;
		height: auto;
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

	.binds {
		margin: 0;
		display: grid;
		gap: 1px;
		background: color-mix(in srgb, var(--omx-bone) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.binds > div {
		display: grid;
		grid-template-columns: minmax(11rem, 22rem) 1fr;
		background: var(--omx-plate);
	}
	.binds dt {
		padding: 0.85rem 1.2rem;
		font-family: var(--omx-mono);
		font-size: 0.85rem;
		color: var(--omx-accent);
		border-right: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.binds dd {
		margin: 0;
		padding: 0.85rem 1.2rem;
		font-size: 0.92rem;
		color: color-mix(in srgb, var(--omx-bone) 78%, transparent);
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

	.foot {
		max-width: 72rem;
		margin: 0 auto;
		padding: 3rem clamp(1.25rem, 4vw, 3rem) 4rem;
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	:global(.foot-mark) {
		display: block;
		width: 14rem;
		height: auto;
		color: color-mix(in srgb, var(--omx-bone) 70%, transparent);
	}
	.foot-links {
		display: flex;
		gap: 1.5rem;
		margin: 1.2rem 0 0.8rem;
		font-family: var(--omx-mono);
		font-size: 0.85rem;
	}
	.foot-links a:hover {
		color: var(--omx-accent);
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
		max-width: 40rem;
		margin: 1.5rem 0 0;
		padding-left: 0.9rem;
		border-left: 2px solid var(--omx-accent);
		font-size: 0.88rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 68%, transparent);
	}
	.attribution--foot a {
		color: var(--omx-bone);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	/* ---------- scroll reveal (progressive enhancement) ------------------ */
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			.block,
			.foot {
				animation: reveal linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 45%;
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
		.stage,
		.wall,
		.app,
		.btn {
			transition: none;
		}
		.scroll-cue {
			animation: none;
		}
	}

	@media (max-width: 640px) {
		.bar {
			font-size: 0.7rem;
		}
		.bar-r span:first-child,
		.bar-r .dot {
			display: none;
		}
		.binds > div {
			grid-template-columns: 1fr;
		}
		.binds dt {
			border-right: 0;
			border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
		}
	}
</style>
