<script lang="ts">
	import './layout.css';
	import './site.css';
	import favicon from '#lib/assets/favicon.svg';
	import SiteNav from '#lib/SiteNav.svelte';
	import SiteFooter from '#lib/SiteFooter.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteNav />
{@render children()}
<SiteFooter />
