<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { TAGLINE, PITCH } from '#lib/omaxian.ts';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Omaxian - {TAGLINE}</title>
	<meta name="description" content={PITCH} />
	<meta property="og:site_name" content="Omaxian" />
	<meta property="og:title" content={`Omaxian - ${TAGLINE}`} />
	<meta property="og:description" content={PITCH} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://omaxian.org/" />
	<meta property="og:image" content="https://omaxian.org/social-wallpaper.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="The Omaxian wordmark in the Nebula Ridge theme" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`Omaxian - ${TAGLINE}`} />
	<meta name="twitter:description" content={PITCH} />
	<meta name="twitter:image" content="https://omaxian.org/social-wallpaper.png" />
	<meta name="twitter:image:alt" content="The Omaxian wordmark in the Nebula Ridge theme" />
</svelte:head>

{@render children()}
