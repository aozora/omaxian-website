<script lang="ts">
	import GithubIcon from '#lib/GithubIcon.svelte';
	import Seo from '#lib/Seo.svelte';
	import ShotGallery from '#lib/ShotGallery.svelte';
	import CodeBlock from '#lib/CodeBlock.svelte';
	import { resolve } from '$app/paths';
	import { PUBLIC_POSTHOG_PROJECT_TOKEN, PUBLIC_POSTHOG_HOST } from '$app/env/public';
	import posthog from 'posthog-js';
	import {
		REPO,
		DOCS,
		TAGLINE,
		PITCH,
		OMARCHY,
		FEATURES,
		COMMUNITY_PLUGINS,
		COMMUNITY_PLUGINS_DIR,
		COMMUNITY_APPS,
		COMMUNITY_APPS_DIR,
		INSTALL_ONESHOT,
		REQUIREMENTS,
		TESTED_ON,
		UBUNTU_NOTE,
		QUICKSHELL_NOTE,
		QUICKSHELL_INSTALL,
		SHOTS,
		SHELL_VERSION,
		OMARCHY_VERSION,
		type Shot
	} from '#lib/omaxian';

	const posthogConfigured = PUBLIC_POSTHOG_PROJECT_TOKEN && PUBLIC_POSTHOG_HOST;

	function onScreenshot(shot: Shot) {
		if (posthogConfigured) {
			posthog.capture('screenshot_viewed', { screenshot_label: shot.label });
		}
	}

	function onCopyInstall() {
		if (posthogConfigured) {
			posthog.capture('installation_instructions_copied', { kind: 'oneshot' });
		}
	}
</script>

<Seo title={`Omaxian Shell - ${TAGLINE}`} description={PITCH} path="/shell" />

<main id="main" class="page">
	<!-- ============ HERO: what it is + the one thing to do ============ -->
	<section class="hero">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="wrap hero-inner">
			<p class="eyebrow">
				Omaxian Shell <b>v{SHELL_VERSION}</b> · tracks Omarchy {OMARCHY_VERSION}
			</p>
			<h1 class="display">The Omarchy desktop, for the Debian you <em>already run</em></h1>
			<p class="lede">
				One command adds the bar, dock, menu, themes and <code>omarchy-*</code> commands to an i3 session
				on X11 or XLibre. Your system and your apps stay as they are.
			</p>

			<CodeBlock label="install" lines={INSTALL_ONESHOT} oncopy={onCopyInstall} class="install" />
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
			<p class="sub">
				Starting from a blank disk? <a href={resolve('/os')}>Omaxian OS ships it preinstalled</a>.
			</p>
		</div>
	</section>

	<!-- ============ ABOUT ============ -->
	<section class="sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>What it is</p>
				<h2 class="h2">A port of the shell, not a distribution</h2>
				<p class="lede">{PITCH}</p>
				<p class="sub">
					It ports only the shell, and X11 differs from Wayland, so compatibility with Omarchy is
					partial. Omarchy itself, on Arch and Wayland, lives at
					<a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>.
				</p>
			</div>
		</div>
	</section>

	<!-- ============ SCREENSHOTS ============ -->
	<section class="sec tint">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>See it</p>
				<h2 class="h2">Five panels, five themes</h2>
			</div>
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
			<ShotGallery shots={SHOTS} onopen={onScreenshot} />
		</div>
	</section>

	<!-- ============ HIGHLIGHTS ============ -->
	<section class="sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Highlights</p>
				<h2 class="h2">What you get on top of i3</h2>
			</div>
			<div class="tiles cols-3">
				{#each FEATURES as f (f.title)}
					<div class="panel reveal">
						<h3 class="card-title">{f.title}</h3>
						{#if f.key}<p class="keyline"><kbd class="key">{f.key}</kbd></p>{/if}
						<p class="card-text">{f.blurb}</p>
					</div>
				{/each}
			</div>
			<p class="more-link">
				<a href={DOCS} target="_blank" rel="noreferrer"
					>All features and known differences from Omarchy →</a
				>
			</p>
		</div>
	</section>

	<!-- ============ COMMUNITY ============ -->
	<section class="sec tint">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Community</p>
				<h2 class="h2">Opt-in plugins and apps</h2>
				<p class="lede">
					Third-party ports, not part of the default install. Pick them in the installer, or add
					them later.
				</p>
			</div>
			<div class="tiles cols-2 community">
				<div>
					<h3 class="card-title">Plugins <span class="count">{COMMUNITY_PLUGINS.length}</span></h3>
					<p class="group-note">
						They live in the bar. Check any other Omarchy plugin with
						<code>omarchy-plugin-check</code>.
					</p>
					<ul class="rows">
						{#each COMMUNITY_PLUGINS as p (p.id)}
							<li>
								<b><a href={p.href} target="_blank" rel="noreferrer">{p.label}</a></b>
								<span class="desc">{p.blurb}</span>
							</li>
						{/each}
					</ul>
					<p class="more-link">
						<a href={COMMUNITY_PLUGINS_DIR} target="_blank" rel="noreferrer">
							<GithubIcon class="gh-icon" /> Browse community plugins →
						</a>
					</p>
				</div>
				<div>
					<h3 class="card-title">Apps <span class="count">{COMMUNITY_APPS.length}</span></h3>
					<p class="group-note">
						Standalone GTK and Qt programs with their own window. Install with
						<code>scripts/install-community-apps.sh</code>, which downloads a pinned binary, or
						builds from source with <code>--from-source</code>.
					</p>
					<ul class="rows">
						{#each COMMUNITY_APPS as app (app.id)}
							<li>
								<b><a href={app.href} target="_blank" rel="noreferrer">{app.label}</a></b>
								<span class="desc">{app.blurb}</span>
							</li>
						{/each}
					</ul>
					<p class="more-link">
						<a href={COMMUNITY_APPS_DIR} target="_blank" rel="noreferrer">
							<GithubIcon class="gh-icon" /> Browse community apps →
						</a>
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ============ INSTALL NOTES ============ -->
	<section class="sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Small print</p>
				<h2 class="h2">Before you install</h2>
			</div>
			<ul class="ticks notes">
				<li>{UBUNTU_NOTE}</li>
				<li>
					<span>
						{QUICKSHELL_NOTE}
						<a href={QUICKSHELL_INSTALL} target="_blank" rel="noreferrer">Build from source →</a>
					</span>
				</li>
				<li>
					<span>
						Prefer a clone or manual steps? See the
						<a href={DOCS} target="_blank" rel="noreferrer">install docs</a>.
					</span>
				</li>
			</ul>
		</div>
	</section>
</main>

<style>
	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.hero-inner .display {
		max-width: 18ch;
	}
	.hero-inner .lede {
		margin: 1.25rem 0 1.75rem;
	}
	.hero-inner :global(.install) {
		width: 100%;
		max-width: 46rem;
		margin-bottom: 0.75rem;
		background: color-mix(in srgb, var(--omx-plate-2) 82%, transparent);
		backdrop-filter: blur(6px);
	}
	.hero-inner .cta {
		margin: 1.5rem 0 0.25rem;
	}
	.video {
		aspect-ratio: 16 / 9;
		margin-bottom: 2rem;
		border: 1px solid var(--omx-edge);
		border-radius: 14px;
		overflow: hidden;
	}
	.video iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}
	.keyline {
		margin: 0 0 0.5rem;
	}
	.more-link {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.8rem;
		margin: 1.5rem 0 0;
		font-size: 0.95rem;
	}
	.more-link a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}
	.community {
		gap: 3rem clamp(2rem, 1rem + 5vw, 5rem);
		align-items: start;
	}
	.count {
		margin-left: 0.35rem;
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--omx-mute);
	}
	.group-note {
		margin: 0 0 1.25rem;
		font-size: 0.95rem;
		color: var(--omx-mute);
	}
	.notes {
		max-width: 62ch;
	}
</style>
