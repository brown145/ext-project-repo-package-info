<li on:click={selectTab} class:is-active={isSelected}>
	<span>{label}</span>
</li>

<style>
	li {
		border-radius: 3px 3px 0 0;
		border: 1px solid #333;
		bottom: 1px;
		cursor: pointer;
		display: inline;
		margin: 0 5px 0 0;
		padding: 2px 6px;
		position: relative;
	}

	li.is-active {
		border-color: #000;
		border-bottom-color: #fff;
	}
</style>

<script>
	import { selectedTab } from './tabStore.js';

	let isSelected = false;
	export let key = '';
	export let label = '';

	const unsubscribe = selectedTab.subscribe(selectedTabIndex => {
		isSelected = selectedTabIndex === key;
	});

	const selectTab = () =>
		selectedTab.update(() => key);
</script>
