<section class="tabs">
	<ul>
		<slot name="head" />
	</ul>
	<div class="content">
		<slot name="content" />
	</div>
</section>

<style>
	ul {
		border-bottom: 1px solid #333;
		list-style: none;
		margin: 0;
		margin-bottom: 8px;
		padding: 0 8px;
	}

	.content {
		padding: 0 16px;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { selectedTab } from './tabStore.js';

	export let value = 1;

	onMount(() => (
		selectedTab.update(() => value)
	));

</script>
