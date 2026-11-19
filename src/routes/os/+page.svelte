<script lang="ts">
	import GithubIcon from '#lib/GithubIcon.svelte';
	import Seo from '#lib/Seo.svelte';
	import ShotGallery from '#lib/ShotGallery.svelte';
	import CodeBlock from '#lib/CodeBlock.svelte';
	import { resolve } from '$app/paths';
	import { PUBLIC_POSTHOG_PROJECT_TOKEN, PUBLIC_POSTHOG_HOST } from '$app/env/public';
	import posthog from 'posthog-js';
	import desktop from '#lib/assets/os-shots/desktop.png?enhanced';
	import { OMARCHY, type Shot } from '#lib/omaxian';
	import {
		OS_REPO,
		OS_VERSION,
		OS_CODENAME,
		OS_BASE,
		OS_TAGLINE,
		OS_PITCH,
		ISOS,
		OS_REQUIREMENTS,
		OS_SHA256SUMS_HREF,
		OS_VERIFY,
		OS_FEATURES,
		OS_RELEASE_FILE,
		OS_STACK,
		OS_REFUSED,
		OS_STEPS,
		OS_OPTIONAL,
		OS_FIT,
		OS_APPS,
		OS_RELEASE_NOTES,
		OS_NOTES,
		OS_SHOTS,
		type Iso
	} from '#lib/os';

	const posthogConfigured = PUBLIC_POSTHOG_PROJECT_TOKEN && PUBLIC_POSTHOG_HOST;

	function onDownload(iso: Iso) {
		if (posthogConfigured) {
			posthog.capture('iso_download_clicked', { flavor: iso.id, version: OS_VERSION });
		}
	}

	function onScreenshot(shot: Shot) {
		if (posthogConfigured) {
			posthog.capture('screenshot_viewed', { screenshot_label: shot.label, page: 'os' });
		}
	}
</script>

<Seo title={`Omaxian OS - ${OS_TAGLINE}`} description={OS_PITCH} path="/os" />

<main id="main" class="page">
	<!-- ============ HERO ============ -->
	<section class="hero">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="wrap hero-grid">
			<div class="hero-copy">
				<p class="eyebrow">Omaxian OS <b>{OS_VERSION}</b> · “{OS_CODENAME}”</p>
				<h1 class="display">A whole desktop on X11, with <em>no systemd</em></h1>
				<p class="lede">
					Omaxian OS is a Linux distribution built on {OS_BASE}. It boots into i3 with the Omaxian
					shell, the Omarchy desktop carried over to X11, and it runs on sysvinit and the XLibre X
					server.
				</p>
				<div class="cta">
					<a class="btn primary" href="#download">Download {OS_VERSION}</a>
					<a class="btn ghost" href={OS_REPO} target="_blank" rel="noreferrer">
						<GithubIcon class="gh-icon" /> View on GitHub
					</a>
				</div>
				<p class="req">{OS_REQUIREMENTS}</p>
			</div>
			<CodeBlock label="/etc/os-release" lines={OS_RELEASE_FILE} plain class="release-file" />
		</div>
		<div class="wrap">
			<figure class="shot">
				<enhanced:img
					src={desktop}
					alt="The installed Omaxian OS desktop: the bar across the top with workspaces, clock and status icons, over the default night-sky wallpaper."
					sizes="(max-width: 60rem) 100vw, 960px"
					fetchpriority="high"
				/>
				<figcaption>The installed system, a moment after login.</figcaption>
			</figure>
		</div>
	</section>

	<!-- ============ STACK ============ -->
	<section class="sec">
		<div class="wrap split">
			<div class="sec-head sticky">
				<p class="kicker"><span class="star"></span>What's in it</p>
				<h2 class="h2">From your windows down to the firmware</h2>
				<p class="lede">
					Every layer is a named, deliberate choice. Read it top to bottom and you know the whole
					system.
				</p>
				<div class="refused">
					<p>The build stops if the image ends up containing any of these:</p>
					<ul class="chips">
						{#each OS_REFUSED as r (r)}
							<li>{r}</li>
						{/each}
					</ul>
				</div>
			</div>
			<ol class="stack">
				{#each OS_STACK as s (s.layer)}
					<li class="reveal">
						<span class="star"></span>
						<span class="layer">{s.layer}</span>
						<span class="body">
							<b>{s.what}</b>
							<span class="note">{s.note}</span>
						</span>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ============ SCREENSHOTS ============ -->
	<section class="sec tint">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>A first boot</p>
				<h2 class="h2">From the boot menu to the desktop</h2>
				<p class="lede">The screens you meet, in the order you meet them.</p>
			</div>
			<ShotGallery shots={OS_SHOTS} onopen={onScreenshot} numbered />
		</div>
	</section>

	<!-- ============ HIGHLIGHTS ============ -->
	<section class="sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Living with it</p>
				<h2 class="h2">Set up for people who'd rather use it than configure it</h2>
			</div>
			<div class="tiles cols-3">
				{#each OS_FEATURES as f (f.title)}
					<div class="panel reveal">
						<h3 class="card-title">{f.title}</h3>
						<p class="card-text">{f.blurb}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============ FIT ============ -->
	<section class="sec tint">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Is it for you?</p>
				<h2 class="h2">An honest guess</h2>
			</div>
			<div class="tiles cols-2">
				<div class="panel">
					<h3 class="card-title">Probably yes, if</h3>
					<ul class="ticks">
						{#each OS_FIT.yes as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
				<div class="panel">
					<h3 class="card-title">Probably not, if</h3>
					<ul class="ticks no">
						{#each OS_FIT.no as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
					<p class="aside">
						For Wayland, go to <a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>.
						Already on Debian, Devuan or Xubuntu?
						<a href={resolve('/shell')}>Install just the shell</a>.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ============ DOWNLOAD ============ -->
	<section id="download" class="sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Download</p>
				<h2 class="h2">Get {OS_VERSION} “{OS_CODENAME}”</h2>
				<p class="lede">
					Two images of the same release. Both boot BIOS and UEFI, run a live session and install
					with Calamares.
				</p>
			</div>

			<div class="tiles cols-2">
				{#each ISOS as iso (iso.id)}
					<article class="panel iso" class:preferred={iso.id === 'base'}>
						<header>
							<h3>{iso.label}</h3>
							<span class="size">{iso.size}</span>
						</header>
						<p class="iso-blurb">{iso.blurb}</p>
						<ul class="ticks">
							{#each iso.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
						<div class="iso-actions">
							<a
								class="btn {iso.id === 'base' ? 'primary' : 'ghost'}"
								href={iso.href}
								onclick={() => onDownload(iso)}>Download {iso.label} ISO</a
							>
							<a class="sha" href={iso.sha256Href}>.sha256 file</a>
						</div>
						<dl class="digest">
							<dt>size</dt>
							<dd>{iso.bytesLabel}</dd>
							<dt>sha256</dt>
							<dd>{iso.sha256}</dd>
						</dl>
					</article>
				{/each}
			</div>

			<ol class="steps">
				{#each OS_STEPS as step, i (step.title)}
					<li>
						<span class="n">{i + 1}</span>
						<div>
							<h3 class="card-title">{step.title}</h3>
							<p class="card-text">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
			<CodeBlock label="verify, then write to a USB stick (replace /dev/sdX)" lines={OS_VERIFY} />
			<p class="sub">
				<a href={OS_SHA256SUMS_HREF}>SHA256SUMS</a> lists both images. Double-check the device name
				before running <code>dd</code>: it overwrites whatever you point it at.
			</p>
		</div>
	</section>

	<!-- ============ SOFTWARE ============ -->
	<section class="sec tint">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Software</p>
				<h2 class="h2">What's installed, and what's optional</h2>
			</div>
			<div class="apps">
				{#each OS_APPS as g (g.title)}
					<div class="app-group">
						<h3 class="card-title">{g.title}</h3>
						<p class="app-note">{g.note}</p>
						<ul class="chips">
							{#each g.apps as app (app)}
								<li>{app}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
			<div class="later">
				<div>
					<h3 class="card-title">Changed your mind after installing?</h3>
					<p class="card-text">
						<code>omaxian-optional</code> adds any optional group or app later. Updates come through
						apt, from Devuan and from the signed repository at <code>apt.omaxian.org</code>.
					</p>
				</div>
				<CodeBlock label="on an installed system" lines={OS_OPTIONAL} />
			</div>
		</div>
	</section>

	<!-- ============ RELEASE NOTES + NOTES ============ -->
	<section class="sec">
		<div class="wrap tiles cols-2 notes">
			<div>
				<p class="kicker"><span class="star"></span>Release notes</p>
				{#each OS_RELEASE_NOTES as note (note.version)}
					<h2 class="h2">New in {note.version}</h2>
					<ul class="ticks">
						{#each note.points as point (point)}
							<li>{point}</li>
						{/each}
					</ul>
				{/each}
			</div>
			<div>
				<p class="kicker"><span class="star"></span>Small print</p>
				<h2 class="h2">Before you install</h2>
				<ul class="ticks">
					{#each OS_NOTES as note (note)}
						<li>{note}</li>
					{/each}
					<li>
						<span>
							Build it yourself, or read how it's made, in the
							<a href={OS_REPO} target="_blank" rel="noreferrer">omaxian-os repository</a>.
						</span>
					</li>
				</ul>
			</div>
		</div>
	</section>
</main>

<style>
	/* ---- hero ---- */
	.hero-grid {
		display: grid;
		gap: clamp(2rem, 1rem + 4vw, 4rem);
		align-items: center;
	}
	@media (min-width: 60rem) {
		.hero-grid {
			grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
		}
	}
	.hero-copy .lede {
		margin-top: 1.25rem;
	}
	.hero-copy .cta {
		margin: 1.75rem 0 1rem;
	}
	.hero-grid :global(.release-file) {
		background: color-mix(in srgb, var(--omx-plate-2) 82%, transparent);
		backdrop-filter: blur(6px);
	}
	.shot {
		/* the source is 1280px wide: don't stretch it past what stays sharp */
		max-width: 60rem;
		margin: clamp(2.5rem, 2rem + 3vw, 4.5rem) auto 0;
	}
	.shot :global(img) {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 22%, transparent);
		border-radius: 14px;
		box-shadow:
			0 2rem 5rem -1rem color-mix(in srgb, var(--omx-void) 90%, transparent),
			0 0 6rem color-mix(in srgb, var(--omx-pink) 14%, transparent);
	}
	.shot figcaption {
		margin-top: 0.9rem;
		text-align: center;
		font-size: 0.9rem;
		color: var(--omx-mute);
	}

	/* ---- stack: one star per layer, joined by a line ---- */
	.split {
		display: grid;
		gap: 2rem clamp(2rem, 1rem + 5vw, 5rem);
		align-items: start;
	}
	@media (min-width: 60rem) {
		.split {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
		}
		.sticky {
			position: sticky;
			top: calc(var(--omx-bar-h) + 2rem);
		}
	}
	.refused {
		margin-top: 1.75rem;
		padding-left: 1rem;
		border-left: 2px solid var(--omx-red);
		font-size: 0.95rem;
		color: var(--omx-mute);
	}
	.refused p {
		margin: 0 0 0.6rem;
	}
	.stack {
		position: relative;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.stack::before {
		content: '';
		position: absolute;
		top: 1.5rem;
		bottom: 1.5rem;
		left: calc(0.55rem - 1px);
		width: 2px;
		background: linear-gradient(to bottom, var(--omx-accent), var(--omx-violet), var(--omx-red));
		opacity: 0.55;
	}
	.stack li {
		position: relative;
		display: grid;
		grid-template-columns: 1.1rem minmax(0, 1fr);
		gap: 0.1rem 1.25rem;
		padding: 0.9rem 0;
	}
	.stack .star {
		grid-row: 1 / span 2;
		align-self: start;
		margin: 0.55rem 0 0 0.3rem;
	}
	.layer {
		font-family: var(--omx-mono);
		font-size: 0.76rem;
		letter-spacing: 0.06em;
		color: var(--omx-accent);
	}
	.body {
		grid-column: 2;
	}
	.body b {
		display: block;
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}
	.note {
		display: block;
		margin-top: 0.15rem;
		font-size: 0.96rem;
		color: color-mix(in srgb, var(--omx-bone) 68%, transparent);
	}

	/* ---- fit ---- */
	.aside {
		margin: 1.25rem 0 0;
		padding-top: 1rem;
		border-top: 1px dashed var(--omx-edge);
		font-size: 0.95rem;
		color: var(--omx-mute);
	}

	/* ---- download ---- */
	.iso {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}
	.iso.preferred {
		border-color: color-mix(in srgb, var(--omx-accent) 60%, transparent);
	}
	.iso header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}
	.iso h3 {
		margin: 0;
		font-size: 1.7rem;
		font-weight: 750;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.size {
		font-family: var(--omx-mono);
		font-size: 0.85rem;
		color: var(--omx-mute);
	}
	.iso-blurb {
		margin: 0;
		font-size: 1.08rem;
	}
	.iso-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem 1.2rem;
		margin-top: auto;
		padding-top: 0.5rem;
	}
	.sha {
		font-family: var(--omx-mono);
		font-size: 0.82rem;
	}
	.digest {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.25rem 0.9rem;
		margin: 0;
		padding-top: 0.85rem;
		border-top: 1px dashed var(--omx-edge);
		font-family: var(--omx-mono);
		font-size: 0.7rem;
		line-height: 1.5;
	}
	.digest dt {
		color: var(--omx-mute);
	}
	.digest dd {
		margin: 0;
		color: color-mix(in srgb, var(--omx-bone) 62%, transparent);
		overflow-wrap: anywhere;
	}
	.steps {
		display: grid;
		gap: 1.5rem 2rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: clamp(2rem, 1.5rem + 2vw, 3.25rem) 0 1.5rem;
		padding: 0;
		list-style: none;
	}
	.steps li {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.9rem;
	}
	.n {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		font-family: var(--omx-mono);
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--omx-accent);
		border: 1px solid color-mix(in srgb, var(--omx-accent) 50%, transparent);
		border-radius: 50%;
	}

	/* ---- software ---- */
	.apps {
		display: grid;
		gap: 2rem 2.5rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
	}
	.app-note {
		margin: 0 0 0.9rem;
		font-size: 0.92rem;
		color: var(--omx-mute);
	}
	.later {
		display: grid;
		gap: 1.5rem 2.5rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		align-items: center;
		margin-top: clamp(2rem, 1.5rem + 2vw, 3.25rem);
		padding-top: clamp(2rem, 1.5rem + 2vw, 3.25rem);
		border-top: 1px solid var(--omx-edge);
	}

	/* ---- notes ---- */
	.notes {
		gap: 3rem clamp(2rem, 1rem + 5vw, 5rem);
	}
	.notes .h2 {
		font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
	}
</style>
