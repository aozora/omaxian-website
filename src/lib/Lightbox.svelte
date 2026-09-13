<script lang="ts">
	import type { Shot } from '#lib/omaxian';

	// Controlled: parent passes the shot to show (or null), and a close callback.
	let { shot = null, onclose }: { shot?: Shot | null; onclose: () => void } = $props();

	let dialog = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		const d = dialog;
		if (!d) return;
		if (shot) {
			if (!d.open) d.showModal();
			document.body.style.overflow = 'hidden';
		} else {
			if (d.open) d.close();
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	// Fallback light-dismiss for browsers without `closedby="any"`:
	// a click that lands on the <dialog> itself (the backdrop / padding), not its content.
	function onBackdropClick(e: MouseEvent) {
		const d = dialog;
		if (!d || e.target !== d) return;
		const r = d.getBoundingClientRect();
		const inside =
			e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
		if (!inside) d.close();
	}
</script>

<dialog
	bind:this={dialog}
	class="lb"
	closedby="any"
	aria-label={shot ? `${shot.label} screenshot` : 'Screenshot viewer'}
	{onclose}
	onclick={onBackdropClick}
>
	{#if shot}
		<div class="lb-inner">
			<button type="button" class="lb-close" onclick={() => dialog?.close()} aria-label="Close">
				✕
			</button>
			<img src={shot.src} alt={`${shot.label} — ${shot.desc}`} width="1600" height="1004" />
			<p class="lb-cap"><b>{shot.label}</b> — {shot.desc}</p>
		</div>
	{/if}
</dialog>

<style>
	.lb {
		/* explicit viewport centring — Tailwind Preflight resets the UA
		   `dialog { margin: auto }` that would otherwise centre a modal */
		position: fixed;
		inset: 0;
		margin: auto;
		width: 80vw;
		height: 80vh;
		max-width: none;
		max-height: none;
		padding: 0;
		border: 1px solid color-mix(in srgb, var(--omx-bone) 22%, transparent);
		border-radius: 12px;
		background: var(--omx-plate, #12121a);
		color: var(--omx-bone, #eceae4);
		overflow: hidden;
	}
	.lb:not([open]) {
		display: none;
	}
	.lb::backdrop {
		background: rgba(5, 5, 8, 0.82);
		backdrop-filter: blur(3px);
	}

	.lb-inner {
		position: relative;
		display: grid;
		grid-template-rows: 1fr auto;
		gap: 0.75rem;
		width: 100%;
		height: 100%;
		padding: 1.25rem;
	}
	.lb img {
		min-height: 0;
		max-width: 100%;
		max-height: 100%;
		margin: 0 auto;
		object-fit: contain;
		border-radius: 6px;
	}
	.lb-cap {
		margin: 0;
		text-align: center;
		font-family: var(--omx-mono, ui-monospace, monospace);
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--omx-bone, #eceae4) 62%, transparent);
	}
	.lb-cap b {
		color: var(--omx-bone, #eceae4);
	}

	.lb-close {
		position: absolute;
		top: 0.7rem;
		right: 0.7rem;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 1px solid color-mix(in srgb, var(--omx-bone, #eceae4) 28%, transparent);
		border-radius: 7px;
		background: color-mix(in srgb, #000 45%, transparent);
		color: inherit;
		font-size: 0.95rem;
		line-height: 1;
		cursor: pointer;
	}
	.lb-close:hover {
		border-color: var(--omx-accent, #5fe6d8);
		color: var(--omx-accent, #5fe6d8);
	}

	@media (prefers-reduced-motion: no-preference) {
		.lb[open] {
			animation: lb-pop 0.16s ease both;
		}
		.lb[open]::backdrop {
			animation: lb-fade 0.16s ease both;
		}
		@keyframes lb-pop {
			from {
				opacity: 0;
				transform: scale(0.98);
			}
		}
		@keyframes lb-fade {
			from {
				opacity: 0;
			}
		}
	}

	@media (max-width: 640px) {
		.lb {
			width: 94vw;
			height: 88vh;
		}
	}
</style>
