<script lang="ts">
	// Per-page title/description plus the shared Open Graph / Twitter card.
	let { title, description, path }: { title: string; description: string; path: string } = $props();

	const url = $derived(`https://omaxian.org${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:site_name" content="Omaxian" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="https://omaxian.org/social-wallpaper.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="The Omaxian wordmark in the Nebula Ridge theme" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://omaxian.org/social-wallpaper.png" />
	<meta name="twitter:image:alt" content="The Omaxian wordmark in the Nebula Ridge theme" />
</svelte:head>
