<script lang="ts">
	import GithubIcon from '#lib/GithubIcon.svelte';
	import Seo from '#lib/Seo.svelte';
	import ShotGallery from '#lib/ShotGallery.svelte';
	import { resolve } from '$app/paths';
	import { PUBLIC_POSTHOG_PROJECT_TOKEN, PUBLIC_POSTHOG_HOST } from '$app/env/public';
	import posthog from 'posthog-js';
	import type { Shot } from '#lib/omaxian';
	import {
		OS_REPO,
		OS_VERSION,
		OS_CODENAME,
		OS_TAGLINE,
		OS_PITCH,
		OS_SCOPE,
		ISOS,
		OS_REQUIREMENTS,
		OS_VERIFY,
		OS_FEATURES,
		OS_APPS,
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

	let copied = $state(false);
	async function copyVerify() {
		try {
			await navigator.clipboard.writeText(OS_VERIFY.join('\n'));
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<Seo title={`Omaxian OS - ${OS_TAGLINE}`} description={OS_PITCH} path="/os" />

<main id="main" class="page">
	<!-- ============ HERO ============ -->
	<section class="hero full-bleed">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="hero-inner">
			<p class="eyebrow">Omaxian OS {OS_VERSION} · “{OS_CODENAME}”</p>
			<h1 class="title">The whole desktop, <span class="x">no systemd</span></h1>
			<p class="tagline">{OS_TAGLINE}.</p>
			<div class="cta">
				<a class="btn primary" href="#download">Download {OS_VERSION}</a>
				<a class="btn ghost" href={OS_REPO} target="_blank" rel="noreferrer">
					<GithubIcon class="gh-icon" /> View on GitHub
				</a>
			</div>
			<p class="req">{OS_REQUIREMENTS}</p>
			<p class="crosslink">
				Already on Debian, Devuan or Xubuntu? <a href={resolve('/shell')}
					>Install just the shell →</a
				>
			</p>
		</div>
	</section>

	<!-- ============ ABOUT ============ -->
	<section class="band">
		<div class="block-centered">
			<h2 class="rule">What is it?</h2>
			<p class="pitch">{OS_PITCH}</p>
			<p class="scope">{OS_SCOPE}</p>
		</div>
	</section>

	<!-- ============ SCREENSHOTS ============ -->
	<section class="band alt">
		<div class="block-centered">
			<h2 class="rule">From boot to desktop</h2>
			<ShotGallery shots={OS_SHOTS} onopen={onScreenshot} />
		</div>
	</section>

	<!-- ============ HIGHLIGHTS ============ -->
	<section class="block-centered">
		<h2 class="rule">Highlights</h2>
		<ul class="feats">
			{#each OS_FEATURES as f (f.title)}
				<li>
					<span class="bullet">▸</span>
					<div>
						<b>{f.title}</b>
						<span class="desc">{f.blurb}</span>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<!-- ============ DOWNLOAD ============ -->
	<section id="download" class="band">
		<div class="block-centered">
			<h2 class="rule">Download</h2>
			<p class="intro">
				Two images of the same release. Both boot BIOS and UEFI, run a live session and install with
				Calamares.
			</p>
			<div class="isos">
				{#each ISOS as iso (iso.id)}
					<article class="iso">
						<header>
							<h3>{iso.label}</h3>
							<span class="size">{iso.size}</span>
						</header>
						<p class="iso-blurb">{iso.blurb}</p>
						<ul>
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
							<a class="sha" href={iso.sha256Href}>sha256</a>
						</div>
					</article>
				{/each}
			</div>

			<div class="term verify">
				<div class="term-top">
					<span>verify, then write to a USB stick (replace /dev/sdX)</span>
					<button type="button" onclick={copyVerify}>{copied ? 'copied ✓' : 'copy'}</button>
				</div>
				<div class="term-body">
					{#each OS_VERIFY as line (line)}<span class="ln">{line}</span>{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ============ SOFTWARE ============ -->
	<section class="block-centered">
		<h2 class="rule">What's inside</h2>
		<div class="apps">
			{#each OS_APPS as g (g.title)}
				<div class="app-group">
					<h3>{g.title}</h3>
					<p class="note">{g.note}</p>
					<ul>
						{#each g.apps as app (app)}
							<li>{app}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- ============ NOTES ============ -->
	<section class="block-centered">
		<h2 class="rule">Before you install</h2>
		<ul class="caveats">
			{#each OS_NOTES as note (note)}
				<li>{note}</li>
			{/each}
			<li>
				Build it yourself, or read how it's made, in the
				<a href={OS_REPO} target="_blank" rel="noreferrer">omaxian-os repository</a>.
			</li>
		</ul>
	</section>
</main>

<style>
	#download {
		scroll-margin-top: 3.5rem;
	}
	.isos {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		margin-bottom: 1.75rem;
	}
	.iso {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding: 1.4rem;
		background: color-mix(in srgb, var(--omx-void) 55%, transparent);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 14%, transparent);
		border-radius: 10px;
	}
	.iso:first-child {
		border-color: color-mix(in srgb, var(--omx-accent) 55%, transparent);
	}
	.iso header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}
	.iso h3 {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 720;
	}
	.size {
		font-size: 0.85rem;
		color: var(--omx-mute);
	}
	.iso-blurb {
		margin: 0;
		color: var(--omx-bone);
	}
	.iso ul {
		margin: 0;
		padding-left: 1.1rem;
		list-style: '▸  ';
		font-size: 0.9rem;
		line-height: 1.55;
		color: color-mix(in srgb, var(--omx-bone) 70%, transparent);
	}
	.iso li::marker {
		color: var(--omx-accent);
	}
	.iso-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem 1.2rem;
		margin-top: auto;
		padding-top: 0.4rem;
	}
	.sha {
		font-size: 0.85rem;
		color: var(--omx-accent);
	}
	.verify {
		max-width: none;
	}

	.apps {
		display: grid;
		gap: 1.5rem 2.5rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
	}
	.app-group h3 {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
	}
	.note {
		margin: 0.2rem 0 0.8rem;
		font-size: 0.82rem;
		color: var(--omx-mute);
	}
	.app-group ul {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.app-group li {
		padding: 0.45rem 0;
		font-size: 0.92rem;
		color: color-mix(in srgb, var(--omx-bone) 80%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
</style>
