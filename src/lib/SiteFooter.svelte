<script lang="ts">
	import { OMARCHY, ATTRIBUTION, CREDITS } from '#lib/omaxian';
</script>

<footer class="foot">
	<div class="foot-log">
		<p class="attribution">
			{ATTRIBUTION}
			<a href={OMARCHY} target="_blank" rel="noreferrer">omarchy.org</a>
		</p>
		<span>&nbsp;</span>
		<span>omaxian@linux:~$ cat CREDITS</span>
		{#each CREDITS as c (c.label)}
			<div>
				<a href={c.href} target="_blank" rel="noreferrer"># {c.label}</a>
				<span> — {c.by}</span>
			</div>
		{/each}
		<span>&nbsp;</span>
		<p class="disclaimer">
			Omaxian is not affiliated with or endorsed by Omarchy, Devuan, or Debian.
		</p>
		<p class="copyright"># © 2026 Marcello Palmitessa</p>
	</div>
</footer>

<style>
	.foot {
		border-top: 1px solid color-mix(in srgb, var(--omx-bone) 10%, transparent);
	}
	.foot-log {
		max-width: 74rem;
		margin: 0 auto;
		padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem);
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--omx-bone) 62%, transparent);
	}
	.foot-log div,
	.foot-log > span {
		display: block;
		white-space: pre-wrap;
	}
	.foot-log a {
		white-space: pre-wrap;
		text-decoration: underline;
	}
	.attribution {
		margin: 0;
		max-width: 46rem;
		padding-left: 0.9rem;
		border-left: 2px solid var(--omx-red);
		line-height: 1.6;
	}
	.attribution a {
		color: var(--omx-bone);
		text-underline-offset: 2px;
	}
	.attribution a:hover {
		color: var(--omx-accent);
	}
	.disclaimer {
		margin: 0 0 0.4rem;
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--omx-bone) 52%, transparent);
	}
	.copyright {
		margin: 0;
		font-size: 0.8rem;
		color: color-mix(in srgb, var(--omx-bone) 40%, transparent);
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			.foot {
				animation: reveal linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 40%;
			}
			@keyframes reveal {
				from {
					opacity: 0;
					transform: translateY(2rem);
				}
			}
		}
	}
</style>
