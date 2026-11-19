<script lang="ts">
	import Seo from '#lib/Seo.svelte';
	import Constellation from '#lib/Constellation.svelte';
	import { resolve } from '$app/paths';
	import desktop from '#lib/assets/shots/menu-nebula-ridge.png?enhanced';
	import {
		SITE_TAGLINE,
		SITE_PITCH,
		SITE_LEDE,
		EQUATION,
		PILLARS,
		TESTED_ON,
		INSTALL_ONESHOT,
		SHELL_VERSION,
		OMARCHY_VERSION
	} from '#lib/omaxian';
	import { OS_VERSION, OS_CODENAME, OS_BASE } from '#lib/os';

	// Each term of the wallpaper's equation points at the pillar it stands for.
	const equationTarget: Record<string, string> = {
		omakase: '#omarchy',
		x11: '#x11',
		debian: '#debian'
	};

	const products = [
		{
			id: 'os',
			href: resolve('/os'),
			name: 'Omaxian OS',
			badge: `${OS_VERSION} · ${OS_CODENAME}`,
			lead: 'A whole distribution, ready to boot.',
			points: [
				`Based on ${OS_BASE}: sysvinit, no systemd`,
				'XLibre, i3 and the Omaxian shell as the only session',
				'Live USB and a graphical installer, BIOS and UEFI',
				'Nine community apps, plus the groups you pick'
			],
			cmd: null,
			action: `Download ${OS_VERSION}`
		},
		{
			id: 'shell',
			href: resolve('/shell'),
			name: 'Omaxian Shell',
			badge: `v${SHELL_VERSION}`,
			lead: 'For the system you already have.',
			points: [
				'Bar, dock, menu, themes and omarchy-* commands on i3',
				`Tested on ${TESTED_ON.join(', ')}`,
				'AI agent usage meter and 50 UI languages',
				'One command to install, then log out and back in'
			],
			cmd: INSTALL_ONESHOT[0],
			action: 'Get the shell'
		}
	];
</script>

<Seo title={`Omaxian - ${SITE_TAGLINE}`} description={SITE_PITCH} path="/" />

<main id="main" class="page">
	<!-- ============ HERO ============ -->
	<section class="hero home">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="wrap hero-inner">
			<p class="eyebrow">The Omarchy desktop, on X11</p>
			<h1 class="wordmark">oma<span class="x">x</span>ian</h1>
			<p class="equation">
				<span class="op">=</span>
				{#each EQUATION as term, i (term)}
					{#if i > 0}<span class="op">+</span>{/if}
					<a href={equationTarget[term]}>{term}</a>
				{/each}
			</p>
			<p class="lede">{SITE_LEDE}</p>
			<div class="cta">
				<a class="btn primary" href={resolve('/os')}>Get Omaxian OS</a>
				<a class="btn ghost" href={resolve('/shell')}>Install the shell</a>
			</div>
			<p class="req">
				OS {OS_VERSION} “{OS_CODENAME}” · Shell v{SHELL_VERSION} · tracks Omarchy {OMARCHY_VERSION}
			</p>
		</div>
		<div class="wrap">
			<figure class="shot">
				<enhanced:img
					src={desktop}
					alt="The Omaxian desktop in the Nebula Ridge theme: a bar across the top, the menu open in the centre, and the dock along the bottom."
					sizes="(max-width: 72rem) 100vw, 1152px"
					fetchpriority="high"
				/>
			</figure>
		</div>
	</section>

	<!-- ============ PILLARS ============ -->
	<section class="sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>What it's made of</p>
				<h2 class="h2">Four stars, one desktop</h2>
				<p class="lede">
					The mark is an X with a star at each end. Each one stands for a choice Omaxian makes on
					purpose.
				</p>
			</div>
			<Constellation pillars={PILLARS} />
		</div>
	</section>

	<!-- ============ WHICH ONE ============ -->
	<section class="sec tint">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker"><span class="star"></span>Two ways in</p>
				<h2 class="h2">A whole OS, or just the shell</h2>
				<p class="lede">{SITE_PITCH}</p>
			</div>

			<div class="tiles cols-2">
				{#each products as p (p.id)}
					<a class="panel product reveal" href={p.href}>
						<span class="badge">{p.badge}</span>
						<h3>{p.name}</h3>
						<p class="lead">{p.lead}</p>
						<ul class="ticks">
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

			<div class="compare-wrap">
				<table class="compare">
					<thead>
						<tr>
							<th scope="col"><span class="visually-hidden">Question</span></th>
							<th scope="col">OS</th>
							<th scope="col">Shell</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">You start from</th>
							<td>A blank disk or a USB stick</td>
							<td>Debian 13, Devuan or Xubuntu, already installed</td>
						</tr>
						<tr>
							<th scope="row">Init system</th>
							<td>sysvinit</td>
							<td>Whatever yours is</td>
						</tr>
						<tr>
							<th scope="row">X server</th>
							<td>XLibre</td>
							<td>Your X11 or XLibre</td>
						</tr>
						<tr>
							<th scope="row">Apps</th>
							<td>Nine community apps by default, plus optional groups</td>
							<td>Yours, untouched</td>
						</tr>
						<tr>
							<th scope="row">Get it</th>
							<td><a href={resolve('/os')}>ISO download</a></td>
							<td><a href={resolve('/shell')}>One curl command</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</main>

<style>
	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.wordmark {
		margin: 0;
		font-family: var(--omx-mono);
		font-size: clamp(3.4rem, 1.6rem + 9vw, 8.5rem);
		font-weight: 700;
		letter-spacing: -0.05em;
		line-height: 1;
		text-shadow: 0 0 3rem color-mix(in srgb, var(--omx-accent) 30%, transparent);
	}
	.wordmark .x {
		color: var(--omx-red);
	}
	.equation {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0 0.6em;
		margin: 0.75rem 0 1.75rem;
		font-family: var(--omx-mono);
		font-size: clamp(1rem, 0.8rem + 1.2vw, 1.6rem);
		color: var(--omx-bone);
	}
	.equation .op {
		color: var(--omx-mute);
	}
	.equation a {
		text-decoration-style: dotted;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.3em;
	}
	.hero-inner .cta {
		justify-content: center;
		margin: 1.75rem 0 1rem;
	}
	.shot {
		margin: clamp(2.5rem, 2rem + 3vw, 4.5rem) 0 0;
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

	.product {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.badge {
		align-self: flex-start;
		padding: 0.1rem 0.6rem;
		font-family: var(--omx-mono);
		font-size: 0.74rem;
		color: var(--omx-mute);
		border: 1px solid color-mix(in srgb, var(--omx-mute) 40%, transparent);
		border-radius: 999px;
	}
	.product h3 {
		margin: 0;
		font-size: clamp(1.6rem, 1.3rem + 1.2vw, 2.1rem);
		font-weight: 750;
		letter-spacing: -0.025em;
		line-height: 1.1;
	}
	.lead {
		margin: 0 0 0.25rem;
		font-size: 1.1rem;
		color: var(--omx-bone);
	}
	.cmd {
		display: block;
		padding: 0.6rem 0.8rem;
		font-size: 0.74rem;
		overflow-wrap: anywhere;
		color: var(--omx-bone);
		background: var(--omx-plate-2);
		border: 1px solid var(--omx-edge);
		border-radius: 8px;
	}
	.go {
		margin-top: auto;
		padding-top: 0.5rem;
		font-family: var(--omx-mono);
		font-size: 0.92rem;
		font-weight: 700;
		color: var(--omx-accent);
	}

	.compare-wrap {
		margin-top: clamp(2rem, 1.5rem + 2vw, 3.5rem);
		overflow-x: auto;
	}
	.compare {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.98rem;
		line-height: 1.5;
	}
	.compare th,
	.compare td {
		padding: 0.8rem 1rem 0.8rem 0;
		text-align: start;
		vertical-align: top;
		border-bottom: 1px solid var(--omx-edge);
	}
	.compare thead th {
		font-family: var(--omx-mono);
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--omx-accent);
	}
	.compare tbody th {
		font-weight: 600;
		color: var(--omx-mute);
	}
	.compare td {
		color: color-mix(in srgb, var(--omx-bone) 84%, transparent);
	}
</style>
