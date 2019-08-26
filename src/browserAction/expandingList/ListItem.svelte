<li class="item">
	<section class="item-container" on:click={handleExpand}>
		<div class="item-description">
			<span class={`item-${itemType}`}>{item.id}</span>
		</div>
		<div>
			<em>{item[countBy].length}</em>
		</div>
	</section>
	{#if (isExpanded)}
		<section class="expanded">
			<ol>
			{#each _.zip(item[expandTo[0][0]], item[expandTo[1][0]]) as subItems}
				<li>
					<span class={`item-${expandTo[0][1]}`}>{subItems[0]}</span>
					-
					<span class={`item-${expandTo[1][1]}`}>{subItems[1]}</span>
				</li>
			{/each}
			<ol>
		</section>
	{/if}
</li>

<style>
	.item {
		padding-bottom: 4px;
	}
	.item-container {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px dotted #eee;
		cursor: pointer;
	}
	.item-description {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 2px;
	}
	.item-scriptNames {
		font-family: courier, monospace;
		color: #384a50;
		font-style: italic;
	}
	.item-repoScripts {
		color: #333;
		font-size: 120%;
		font-family: helvetica;
	}
	.item-scriptCommands {
		color: #9dff98;
		background-color: #5a5858;
		font-family: monospace;
		padding: 2px 6px;
		border-radius: 2px;
	}
	ol {
		list-style: none;
		margin: 0 0 0 8px;
		padding: 0;
	}
	.expanded {
		padding: 2px 0 0 6px;
	}
</style>

<script>
	import _ from 'lodash';

	export let countBy = '';
	export let expandTo = [];
	export let item = {};
	export let itemType = '';

	let isExpanded = false;
	const handleExpand = () => isExpanded = !isExpanded;
</script>
