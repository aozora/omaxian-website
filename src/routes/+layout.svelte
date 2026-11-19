<script lang="ts">
	import './layout.css';
	import './site.css';
	import favicon from '#lib/assets/favicon.svg';
	import SiteNav from '#lib/SiteNav.svelte';
	import SiteFooter from '#lib/SiteFooter.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	// Cross-fade between pages where the browser supports view transitions;
	// elsewhere the navigation just happens. SvelteKit moves focus itself.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteNav />
{@render children()}
<SiteFooter />
