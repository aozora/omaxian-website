<script lang="ts">
	import GithubIcon from '#lib/GithubIcon.svelte';
	import Seo from '#lib/Seo.svelte';
	import ShotGallery from '#lib/ShotGallery.svelte';
	import { resolve } from '$app/paths';
	import { PUBLIC_POSTHOG_PROJECT_TOKEN, PUBLIC_POSTHOG_HOST } from '$app/env/public';
	import posthog from 'posthog-js';
	import {
		REPO,
		DOCS,
		TAGLINE,
		PITCH,
		SCOPE,
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
		type Shot
	} from '#lib/omaxian';

	const posthogConfigured = PUBLIC_POSTHOG_PROJECT_TOKEN && PUBLIC_POSTHOG_HOST;

	function onScreenshot(shot: Shot) {
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

<Seo title={`Omaxian Shell - ${TAGLINE}`} description={PITCH} path="/shell" />

<main id="main" class="page">
	<!-- ============ HERO: what it is + the one thing to do ============ -->
	<section class="hero full-bleed">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="hero-inner">
			<p class="eyebrow">Omaxian Shell</p>
			<h1 class="title">The shell, for the Debian you <span class="x">already run</span></h1>
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
			<p class="crosslink">
				Starting from a blank disk? <a href={resolve('/os')}>Omaxian OS ships it preinstalled →</a>
			</p>
		</div>
	</section>

	<!-- ============ ABOUT ============ -->
	<section class="band">
		<div class="block-centered">
			<h2 class="rule">What is it?</h2>
			<p class="pitch">{PITCH}</p>
			<p class="scope">{SCOPE}</p>
		</div>
	</section>

	<!-- ============ SCREENSHOTS ============ -->
	<section class="band alt">
		<div class="block-centered">
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
			<ShotGallery shots={SHOTS} onopen={onScreenshot} />
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
			Opt-in third-party ports, not part of the default desktop. Pick them during installation, or
			check any other Omarchy plugin with
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
	<section class="block-centered">
		<h2 class="rule">Before you install</h2>
		<ul class="caveats">
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
</main>

<style>
	.install {
		max-width: 40rem;
	}
	.install .term-body {
		font-size: clamp(0.78rem, 1.6vw, 0.95rem);
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
</style>
