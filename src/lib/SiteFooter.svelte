<script lang="ts">
	import { resolve } from '$app/paths';
	import Mark from '#lib/Mark.svelte';
	import { OMARCHY, ATTRIBUTION, CREDITS, REPO, DOCS } from '#lib/omaxian';
	import { OS_REPO } from '#lib/os';
</script>

<footer class="foot">
	<div class="foot-inner">
		<div class="about">
			<a class="home" href={resolve('/')}>
				<Mark class="foot-mark" title="" />
				<span>oma<span class="x">x</span>ian</span>
			</a>
			<p class="attribution">
				{ATTRIBUTION}
				<a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>
			</p>
		</div>

		<nav class="col" aria-label="Footer">
			<h2>Omaxian</h2>
			<a href={resolve('/os')}>Omaxian OS</a>
			<a href={resolve('/shell')}>Omaxian Shell</a>
			<a href={DOCS} target="_blank" rel="noreferrer">Documentation</a>
			<a href={REPO} target="_blank" rel="noreferrer">Shell source</a>
			<a href={OS_REPO} target="_blank" rel="noreferrer">OS source</a>
		</nav>

		<div class="col">
			<h2>Built on</h2>
			{#each CREDITS as c (c.label)}
				<p>
					<a href={c.href} target="_blank" rel="noreferrer">{c.label}</a>
					<span>{c.by}</span>
				</p>
			{/each}
		</div>
	</div>
	<div class="foot-inner legal">
		<p>Omaxian is not affiliated with or endorsed by Omarchy, Devuan, or Debian.</p>
		<p>© 2026 Marcello Palmitessa</p>
	</div>
</footer>

<style>
	.foot {
		border-top: 1px solid var(--omx-edge);
		background: color-mix(in srgb, var(--omx-plate) 88%, transparent);
		font-size: 0.92rem;
		color: color-mix(in srgb, var(--omx-bone) 68%, transparent);
	}
	.foot-inner {
		display: grid;
		gap: 2.5rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		width: min(100% - 2.5rem, 72rem);
		margin-inline: auto;
		padding-block: clamp(2.5rem, 2rem + 3vw, 4rem);
	}
	.home {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-bottom: 1rem;
		font-family: var(--omx-mono);
		font-weight: 700;
		color: var(--omx-bone);
		text-decoration: none;
	}
	.home .x {
		color: var(--omx-red);
	}
	:global(.foot-mark) {
		width: 1.7rem;
		height: auto;
	}
	.attribution {
		margin: 0;
		max-width: 44ch;
		text-wrap: pretty;
	}
	a {
		color: var(--omx-bone);
		text-underline-offset: 3px;
	}
	a:hover {
		color: var(--omx-accent);
	}
	.col {
		display: grid;
		align-content: start;
		gap: 0.45rem;
	}
	.col h2 {
		margin: 0 0 0.35rem;
		font-family: var(--omx-mono);
		font-size: 0.76rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--omx-mute);
	}
	.col p {
		margin: 0;
	}
	.col p span {
		display: block;
		font-size: 0.84rem;
		color: color-mix(in srgb, var(--omx-bone) 52%, transparent);
	}
	.legal {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 2rem;
		padding-block: 1.25rem;
		border-top: 1px solid var(--omx-edge);
		font-size: 0.82rem;
		color: color-mix(in srgb, var(--omx-bone) 50%, transparent);
	}
	.legal p {
		margin: 0;
	}
</style>
