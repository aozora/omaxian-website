<script lang="ts">
	// The four pillars laid out as the four outer stars of the Omaxian mark,
	// joined through the centre by the strokes of its X.
	import Mark from '#lib/Mark.svelte';
	import type { Pillar } from '#lib/omaxian';

	let { pillars }: { pillars: Pillar[] } = $props();
</script>

<div class="sky">
	<svg class="strokes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
		<line x1="22" y1="22" x2="78" y2="78" />
		<line x1="78" y1="22" x2="22" y2="78" />
	</svg>
	<div class="centre" aria-hidden="true">
		<Mark class="centre-mark" title="" />
	</div>
	<ul class="stars">
		{#each pillars as p (p.id)}
			<li class="pillar reveal" id={p.id}>
				<p class="kicker"><span class="star"></span>{p.name}</p>
				<h3>{p.title}</h3>
				<p class="text">{p.text}</p>
				<ul class="facts">
					{#each p.facts as fact (fact)}
						<li>{fact}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<style>
	.sky {
		position: relative;
	}
	.stars {
		position: relative;
		display: grid;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.pillar {
		padding: clamp(1.25rem, 1rem + 1.2vw, 1.9rem);
		/* opaque, so the strokes only show in the gap between the four */
		background: var(--omx-plate);
		border: 1px solid var(--omx-edge);
		border-radius: 14px;
		scroll-margin-top: calc(var(--omx-bar-h) + 1rem);
	}
	.pillar:target {
		border-color: var(--omx-accent);
	}
	h3 {
		margin: 0 0 0.5rem;
		font-size: clamp(1.3rem, 1.1rem + 0.8vw, 1.65rem);
		font-weight: 750;
		letter-spacing: -0.02em;
		line-height: 1.15;
		text-wrap: balance;
	}
	.text {
		margin: 0;
		color: color-mix(in srgb, var(--omx-bone) 76%, transparent);
		text-wrap: pretty;
	}
	.facts {
		margin: 1.1rem 0 0;
		padding: 0.9rem 0 0;
		list-style: none;
		display: grid;
		gap: 0.3rem;
		font-family: var(--omx-mono);
		font-size: 0.78rem;
		line-height: 1.55;
		color: var(--omx-mute);
		border-top: 1px dashed var(--omx-edge);
	}
	.strokes,
	.centre {
		display: none;
	}

	@media (min-width: 52rem) {
		.stars {
			grid-template-columns: 1fr 1fr;
			gap: clamp(4.5rem, 9vw, 7rem);
		}
		.strokes {
			display: block;
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			overflow: visible;
		}
		.strokes line {
			stroke: var(--omx-line);
			stroke-width: 2;
			stroke-linecap: round;
			vector-effect: non-scaling-stroke;
			opacity: 0.55;
		}
		.centre {
			display: grid;
			place-items: center;
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 1;
			width: clamp(4rem, 7vw, 5.5rem);
			aspect-ratio: 1;
			translate: -50% -50%;
			background: var(--omx-void);
			border: 1px solid color-mix(in srgb, var(--omx-accent) 50%, transparent);
			border-radius: 50%;
			box-shadow: 0 0 2.5rem color-mix(in srgb, var(--omx-accent) 22%, transparent);
		}
		.centre :global(.centre-mark) {
			width: 68%;
			height: auto;
		}
	}
</style>
