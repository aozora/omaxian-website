<script lang="ts">
	import Mark from '#lib/Mark.svelte';
	import GithubIcon from '#lib/GithubIcon.svelte';
	import Lightbox from '#lib/Lightbox.svelte';
	import { PUBLIC_POSTHOG_PROJECT_TOKEN, PUBLIC_POSTHOG_HOST } from '$app/env/public';
	import type { Picture } from 'vite-imagetools';
	import posthog from 'posthog-js';
	import {
		REPO,
		OMARCHY,
		DOCS,
		TAGLINE,
		PITCH,
		SCOPE,
		ATTRIBUTION,
		FEATURES,
		COMMUNITY_PLUGINS,
		COMMUNITY_PLUGINS_DIR,
		INSTALL_ONESHOT,
		REQUIREMENTS,
		TESTED_ON,
		UBUNTU_NOTE,
		QUICKSHELL_NOTE,
		QUICKSHELL_INSTALL,
		SHOTS,
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

	function openScreenshot(shot: Shot) {
		activeShot = shot;
		if (posthogConfigured) {
			posthog.capture('screenshot_viewed', { screenshot_label: shot.label });
		}
	}

	let copied = $state(false);
	async function copyInstall() {
		try {
			await navigator.clipboard.writeText(INSTALL_ONESHOT.join('\n'));
			if (posthogConfigured) {
				posthog.capture('installation_instructions_copied', { kind: 'oneshot' });
			}
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<main id="main">
	<!-- ============ HERO: what it is + the one thing to do ============ -->
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

			<div class="term install">
				<div class="term-top">
					<span>install</span>
					<button type="button" onclick={copyInstall}>{copied ? 'copied ✓' : 'copy'}</button>
				</div>
				<div class="term-body">
					{#each INSTALL_ONESHOT as line (line)}<span class="ln">{line}</span>{/each}
				</div>
			</div>
			<p class="req">{REQUIREMENTS} Tested on {TESTED_ON.join(', ')}.</p>

			<div class="cta">
				<a
					class="btn primary"
					href={REPO}
					target="_blank"
					rel="noreferrer"
					onclick={() => {
						if (posthogConfigured) posthog.capture('github_release_opened');
					}}
				>
					<GithubIcon class="gh-icon" /> View on GitHub
				</a>
				<a class="btn ghost" href={DOCS} target="_blank" rel="noreferrer">Read the docs</a>
			</div>
		</div>
	</section>

	<!-- ============ ABOUT ============ -->
	<section class="about">
		<div class="about-inner block-centered">
			<h2 class="rule">What is it?</h2>
			<p class="pitch">{PITCH}</p>
			<p class="scope">{SCOPE}</p>
		</div>
	</section>

	<!-- ============ SCREENSHOTS ============ -->
	<section class="gallery">
		<div class="gallery-inner block-centered">
			<h2 class="rule">See it</h2>
			<div class="video">
				<iframe
					src="https://www.youtube.com/embed/-JV9oh1XsAU?si=6Tl6SACcEIaEhbGo"
					title="Omaxian demo video"
					loading="lazy"
					allow="encrypted-media; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
			<div class="shots">
				{#each SHOTS as s (s.src)}
					<figure>
						<button
							type="button"
							class="shot-btn"
							onclick={() => openScreenshot(s)}
							aria-label={`Open ${s.label} screenshot`}
						>
							<enhanced:img
								src={shotImages[s.src]}
								alt={s.label + ' — ' + s.desc}
								sizes="(max-width: 767px) 100vw, 400px"
								loading="lazy"
								decoding="async"
							/>
						</button>
						<figcaption><b>{s.label}</b> — {s.desc}</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============ HIGHLIGHTS ============ -->
	<section class="block-centered">
		<h2 class="rule">Highlights</h2>
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
		<p class="more-link">
			<a href={COMMUNITY_PLUGINS_DIR} target="_blank" rel="noreferrer">
				<GithubIcon class="gh-icon" /> Browse community plugins →
			</a>
			<a href={DOCS} target="_blank" rel="noreferrer"
				>All features and known differences from Omarchy →</a
			>
		</p>
	</section>

	<!-- ============ COMMUNITY PLUGINS ============ -->
	<section class="block-centered">
		<h2 class="rule">Community plugins</h2>
		<p class="intro">
			Opt-in third-party ports, not part of the default desktop. Pick them during
			installation, or check any other Omarchy plugin with
			<code>omarchy-plugin-check</code>.
		</p>
		<ul class="feats">
			{#each COMMUNITY_PLUGINS as p (p.id)}
				<li>
					<span class="bullet">▸</span>
					<div>
						<b><a href={p.href} target="_blank" rel="noreferrer">{p.label}</a></b>
						<span class="desc">{p.blurb}</span>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<!-- ============ INSTALL NOTES ============ -->
	<section class="block-centered notes">
		<h2 class="rule">Before you install</h2>
		<ul class="caveats list-disc">
			<li>{UBUNTU_NOTE}</li>
			<li>
				{QUICKSHELL_NOTE}
				<a href={QUICKSHELL_INSTALL} target="_blank" rel="noreferrer">Build from source →</a>
			</li>
			<li>
				Prefer a clone or manual steps? See the
				<a href={DOCS} target="_blank" rel="noreferrer">install docs</a>.
			</li>
		</ul>
	</section>

	<!-- ============ FOOT ============ -->
	<footer class="foot">
		<div class="foot-log block-centered">
			<p class="attribution">
				{ATTRIBUTION}
				<a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>
			</p>
			<span>&nbsp;</span>
			<span>omaxian@linux:~$ cat CREDITS</span>
			{#each CREDITS as c (c.label)}
				<div>
					<a href={c.href} target="_blank" rel="noreferrer"># {c.label}</a>
					<span> — {c.by}</span>
				</div>
			{/each}
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
		min-height: 90dvh;
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
	.intro {
		max-width: 46rem;
		margin: 0 0 1.5rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--omx-bone) 72%, transparent);
	}
	.intro code {
		font-family: var(--omx-mono);
		font-size: 0.88em;
		background: color-mix(in srgb, var(--omx-bone) 8%, transparent);
		padding: 0.08em 0.35em;
		border-radius: 3px;
	}
	.feats a {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--omx-bone) 30%, transparent);
	}
	.feats a:hover {
		color: var(--omx-accent);
	}
	.feats b {
		color: var(--omx-bone);
		font-weight: 700;
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
	.more-link {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.8rem;
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
	.install {
		width: 100%;
		max-width: 40rem;
		text-align: left;
	}
	.install .term-body {
		font-size: clamp(0.78rem, 1.6vw, 0.95rem);
	}
	.req {
		margin: 0;
		font-size: 0.85rem;
		color: var(--omx-mute);
	}
	.video {
		aspect-ratio: 16 / 9;
		margin-bottom: 1.5rem;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 14%, transparent);
		border-radius: 8px;
		overflow: hidden;
	}
	.video iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}
	.caveats a {
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
	.copyright {
		margin: 0;
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--omx-bone) 40%, transparent);
	}

	/* ---------- scroll reveal (progressive enhancement) ---------------------- */
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
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
