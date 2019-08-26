{#if isActive}
	<slot />
{/if}

<script>
	import { selectedTab } from './tabStore.js';

	export let key;
	let isActive = false;
	const unsubscribe = selectedTab.subscribe(selectedTabIndex => {
		isActive = selectedTabIndex === key;
	});
</script>
