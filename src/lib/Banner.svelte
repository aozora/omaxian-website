<!-- The pixel-block OMAXIAN wordmark, X in --omx-red. -->
<div class="banner-wrap">
	<!-- prettier-ignore -->
	<pre class="banner" role="img" aria-label="OMAXIAN"> ██████  ███    ███  █████  <span class="x">██   ██</span> ██  █████  ███    ██
██    ██ ████  ████ ██   ██ <span class="x"> ██ ██ </span> ██ ██   ██ ████   ██
██    ██ ██ ████ ██ ███████ <span class="x">  ███  </span> ██ ███████ ██ ██  ██
██    ██ ██  ██  ██ ██   ██ <span class="x"> ██ ██ </span> ██ ██   ██ ██  ██ ██
 ██████  ██      ██ ██   ██ <span class="x">██   ██</span> ██ ██   ██ ██   ████</pre>
</div>

<style>
	.banner-wrap {
		max-width: 100%;
		/* flex items don't shrink past their content's intrinsic width by
		   default; without this, overflow-x below never gets the chance to
		   engage and the banner just overflows the box instead of scrolling */
		min-width: 0;
		overflow-x: auto;
		overflow-y: hidden;
	}
	.banner {
		margin: 0;
		color: var(--omx-accent);
		font-family: var(--omx-mono);
		font-size: clamp(0.68rem, 1vw + 0.5rem, 1.4rem);
		line-height: 1.05;
		text-shadow: 0 0 22px color-mix(in srgb, var(--omx-accent) 45%, transparent);
		white-space: pre;
	}
	@media (max-width: 480px) {
		.banner {
			font-size: 2vw;
		}
	}
	.banner .x {
		color: var(--omx-red);
		text-shadow: 0 0 22px color-mix(in srgb, var(--omx-red) 55%, transparent);
	}
</style>
