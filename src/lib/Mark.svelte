<script lang="ts">
	// The Omaxian short mark: the constellation X with two comet-swirl arms.
	// Distilled from logo-4 for small placements (nav, footers, favicons).
	// Colours flow through `style` so `var(--…)` resolves.
	let { class: klass = '', title = 'Omaxian' }: { class?: string; title?: string } = $props();

	const uid = $props.id();
	const nodes: Array<[number, number]> = [
		[38, 38],
		[82, 82],
		[82, 38],
		[38, 82],
		[60, 60]
	];
</script>

<svg
	class={klass}
	viewBox="0 0 120 120"
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label={title}
	fill="none"
>
	<defs>
		<linearGradient id="omx-arm-{uid}" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" style="stop-color: var(--omx-line, #c8fff8)" />
			<stop offset="1" style="stop-color: var(--omx-red, #d70a53)" />
		</linearGradient>
	</defs>

	<!-- comet-swirl arms -->
	<g stroke="url(#omx-arm-{uid})" stroke-width="3" stroke-linecap="round" opacity="0.9">
		<path d="M14 108 Q1 58 42 26" />
		<path d="M106 12 Q124 66 82 100" />
	</g>
	<g style="fill: var(--omx-red, #d70a53)">
		<circle cx="27" cy="52" r="1.9" />
		<circle cx="20" cy="74" r="1.5" />
		<circle cx="95" cy="46" r="1.8" />
		<circle cx="90" cy="70" r="1.5" />
	</g>

	<!-- the X -->
	<g style="stroke: var(--omx-line, #c8fff8)" stroke-width="3" stroke-linecap="round">
		<line x1="38" y1="38" x2="82" y2="82" />
		<line x1="82" y1="38" x2="38" y2="82" />
	</g>

	<!-- nodes -->
	{#each nodes as [cx, cy] (`${cx}-${cy}`)}
		<circle {cx} {cy} r="8.5" style="fill: var(--omx-accent, #5fe6d8)" fill-opacity="0.22" />
		<circle {cx} {cy} r="3.4" style="fill: var(--omx-bone, #eafffb)" />
	{/each}
</svg>
