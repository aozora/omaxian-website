<script lang="ts">
	import Mark from '#lib/Mark.svelte';
	import Banner from '#lib/Banner.svelte';
	import Seo from '#lib/Seo.svelte';
	import { resolve } from '$app/paths';
	import { SITE_TAGLINE, SITE_PITCH, TESTED_ON, INSTALL_ONESHOT } from '#lib/omaxian';
	import { OS_VERSION, OS_CODENAME, OS_BASE } from '#lib/os';

	const products = [
		{
			id: 'shell',
			href: resolve('/shell'),
			name: 'Omaxian Shell',
			lead: 'For the system you already have.',
			points: [
				'Bar, dock, menu, themes and omarchy-* commands on i3',
				`Tested on ${TESTED_ON.join(', ')}`,
				'One command to install, log out and back in'
			],
			cmd: INSTALL_ONESHOT[0],
			action: 'Get the shell'
		},
		{
			id: 'os',
			href: resolve('/os'),
			name: 'Omaxian OS',
			lead: 'A whole distribution, ready to boot.',
			points: [
				`Based on ${OS_BASE}: sysvinit, no systemd`,
				'Omaxian as the default desktop, XFCE as an alternative',
				'Live USB and Calamares installer, BIOS and UEFI'
			],
			cmd: null,
			action: `Download ${OS_VERSION}`
		}
	];
</script>

<Seo title={`Omaxian - ${SITE_TAGLINE}`} description={SITE_PITCH} path="/" />

<main id="main" class="page">
	<section class="hero home full-bleed">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="hero-inner">
			<Mark class="glyph" title="Omaxian" />
			<h1 class="visually-hidden">Omaxian</h1>
			<Banner />
			<p class="tagline">{SITE_TAGLINE}</p>

			<div class="products">
				{#each products as p (p.id)}
					<a class="product" href={p.href}>
						<span class="badge">
							{#if p.id === 'os'}{OS_VERSION} · {OS_CODENAME}{:else}shell{/if}
						</span>
						<h2>{p.name}</h2>
						<p class="lead">{p.lead}</p>
						<ul>
							{#each p.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
						{#if p.cmd}
							<code class="cmd">$ {p.cmd}</code>
						{/if}
						<span class="go">{p.action} →</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section class="band">
		<div class="block-centered">
			<h2 class="rule">Which one?</h2>
			<p class="pitch">{SITE_PITCH}</p>
			<div class="compare-wrap">
				<table class="compare">
					<thead>
						<tr>
							<th scope="col"><span class="visually-hidden">Question</span></th>
							<th scope="col">Shell</th>
							<th scope="col">OS</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">You start from</th>
							<td>Debian 13, Devuan or Xubuntu, already installed</td>
							<td>A blank disk or a USB stick</td>
						</tr>
						<tr>
							<th scope="row">Init system</th>
							<td>Whatever yours is</td>
							<td>sysvinit</td>
						</tr>
						<tr>
							<th scope="row">X server</th>
							<td>Your X11 or XLibre</td>
							<td>XLibre</td>
						</tr>
						<tr>
							<th scope="row">Apps</th>
							<td>Yours, untouched</td>
							<td>A curated set, plus optional groups at install</td>
						</tr>
						<tr>
							<th scope="row">Get it</th>
							<td><a href={resolve('/shell')}>One curl command</a></td>
							<td><a href={resolve('/os')}>ISO download</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</main>

<style>
	.home {
		min-height: calc(100dvh - 3rem);
	}
	:global(.glyph) {
		width: clamp(2.75rem, 6vw, 3.75rem);
		height: auto;
	}
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.products {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
		width: 100%;
		margin-top: 0.5rem;
		text-align: left;
	}
	.product {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		padding: 1.5rem;
		text-decoration: none;
		background: color-mix(in srgb, var(--omx-void) 62%, transparent);
		backdrop-filter: blur(4px);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 16%, transparent);
		border-radius: 12px;
		transition:
			transform 0.15s ease,
			border-color 0.15s ease;
	}
	.product:hover,
	.product:focus-visible {
		transform: translateY(-3px);
		border-color: var(--omx-accent);
	}
	.badge {
		align-self: flex-start;
		padding: 0.1rem 0.5rem;
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--omx-mute);
		border: 1px solid color-mix(in srgb, var(--omx-mute) 40%, transparent);
		border-radius: 4px;
	}
	.product h2 {
		margin: 0;
		font-size: clamp(1.5rem, 3.4vw, 1.9rem);
		font-weight: 740;
		letter-spacing: -0.02em;
	}
	.lead {
		margin: 0;
		color: var(--omx-bone);
	}
	.product ul {
		margin: 0;
		padding-left: 1.1rem;
		list-style: '▸  ';
		font-size: 0.9rem;
		line-height: 1.55;
		color: color-mix(in srgb, var(--omx-bone) 70%, transparent);
	}
	.product li::marker {
		color: var(--omx-accent);
	}
	.cmd {
		display: block;
		padding: 0.55rem 0.7rem;
		overflow-x: auto;
		font-size: 0.74rem;
		white-space: nowrap;
		color: var(--omx-bone);
		background: var(--omx-plate-2);
		border: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
		border-radius: 6px;
	}
	.go {
		margin-top: auto;
		padding-top: 0.3rem;
		font-weight: 680;
		color: var(--omx-accent);
	}

	.compare-wrap {
		max-width: 52rem;
		overflow-x: auto;
	}
	.compare {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.92rem;
		line-height: 1.5;
	}
	.compare th,
	.compare td {
		padding: 0.7rem 0.9rem 0.7rem 0;
		text-align: left;
		vertical-align: top;
		border-bottom: 1px solid color-mix(in srgb, var(--omx-bone) 12%, transparent);
	}
	.compare thead th {
		color: var(--omx-accent);
		font-weight: 700;
	}
	.compare tbody th {
		font-weight: 600;
		color: var(--omx-mute);
		white-space: nowrap;
	}
	.compare td {
		color: color-mix(in srgb, var(--omx-bone) 82%, transparent);
	}
	.compare a {
		color: var(--omx-accent);
	}

	@media (prefers-reduced-motion: reduce) {
		.product {
			transition: none;
		}
	}
</style>
