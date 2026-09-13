<script lang="ts">
	// The Omaxian wordmark: monospace "oma" + a 5-node constellation X + "ian".
	// Letters use `currentColor`; the X strokes and node glow are themeable.
	// textLength pins each half to a fixed width so the X always aligns,
	// regardless of which monospace font the browser falls back to.
	// Colours go through `style` (not presentation attributes) so `var(--…)`
	// and the props actually resolve.
	let {
		class: klass = '',
		tagline = false,
		line = 'var(--omx-line, #c8fff8)',
		glow = 'var(--omx-accent, #5fe6d8)',
		spark = ''
	}: {
		class?: string;
		tagline?: boolean;
		line?: string;
		glow?: string;
		/** optional accent colour for the top-right node (Debian spark) */
		spark?: string;
	} = $props();

	const FONT =
		"ui-monospace, 'JetBrains Mono', 'Cascadia Code', 'SF Mono', Menlo, Consolas, monospace";

	// [x, y, isSpark] inside the X box  x[420..540]  y[64..210]
	const nodes: Array<[number, number, boolean]> = [
		[420, 64, false],
		[540, 64, true], // top-right — takes the spark when provided
		[420, 210, false],
		[540, 210, false],
		[480, 137, false]
	];
</script>

<svg
	class={klass}
	viewBox={tagline ? '24 0 912 300' : '24 30 912 210'}
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label="Omaxian"
	fill="none"
>
	<text
		x="40"
		y="210"
		textLength="360"
		lengthAdjust="spacingAndGlyphs"
		font-family={FONT}
		font-size="200"
		fill="currentColor">oma</text
	>

	<g style:stroke={line} stroke-width="5" stroke-linecap="round">
		<line x1="420" y1="64" x2="540" y2="210" />
		<line x1="540" y1="64" x2="420" y2="210" />
	</g>
	{#each nodes as [cx, cy, isSpark] (`${cx}-${cy}`)}
		<circle
			{cx}
			{cy}
			r="16"
			style:fill={isSpark && spark ? spark : glow}
			fill-opacity={isSpark && spark ? '0.32' : '0.24'}
		/>
		<circle {cx} {cy} r="6.4" style:fill={isSpark && spark ? spark : 'currentColor'} />
	{/each}

	<text
		x="560"
		y="210"
		textLength="360"
		lengthAdjust="spacingAndGlyphs"
		font-family={FONT}
		font-size="200"
		fill="currentColor">ian</text
	>

	{#if tagline}
		<text
			x="42"
			y="272"
			font-family={FONT}
			font-size="33"
			letter-spacing="0.5"
			style="fill: var(--omx-mute, #8fd8cd)">omakase + x11 + debian</text
		>
	{/if}
</svg>
