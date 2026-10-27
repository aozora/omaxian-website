<script lang="ts">
	import Lightbox from '#lib/Lightbox.svelte';
	import type { Shot } from '#lib/omaxian';
	import type { Picture } from 'vite-imagetools';

	let { shots, onopen }: { shots: Shot[]; onopen?: (shot: Shot) => void } = $props();

	let activeShot = $state<Shot | null>(null);

	// Screenshots live in src/lib/assets so enhanced:img can optimize them;
	// this glob resolves each Shot.src path to its compiled Picture object.
	const shotImages = import.meta.glob<Picture>('/src/lib/assets/{shots,os-shots}/*.{png,webp}', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	});

	function open(shot: Shot) {
		activeShot = shot;
		onopen?.(shot);
	}
</script>

<div class="shots">
	{#each shots as s (s.src)}
		<figure>
			<button
				type="button"
				class="shot-btn"
				onclick={() => open(s)}
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

<Lightbox
	shot={activeShot}
	image={activeShot ? shotImages[activeShot.src] : undefined}
	onclose={() => (activeShot = null)}
/>

<style>
	.shots {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}
	figure {
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
	.shot-btn :global(img) {
		/* the source screenshots aren't all the same aspect ratio — crop them
		   to one fixed box so every thumbnail in the grid lines up */
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
	.shot-btn:hover :global(img),
	.shot-btn:focus-visible :global(img) {
		border-color: var(--omx-accent);
	}
	figcaption {
		margin-top: 0.6rem;
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--omx-bone) 62%, transparent);
	}
	figcaption b {
		color: var(--omx-bone);
	}
</style>
