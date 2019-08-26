<section class="sortBy">
	<input bind:group={sortBy} type="radio" id="alpha" name="sortBy" value="alpha">
	<label for="alpha">Alpha</label>
	<input bind:group={sortBy} type="radio" id="sum" name="sortBy" value="sum">
	<label for="sum">Sum</label>
</section>
<section>
	<ul>
		{#each sortedItems as item}
			<ListItem
				countBy={countBy}
				expandTo={expandTo}
				item={item}
				itemType={itemType}
			/>
		{/each}
	</ul>
</section>

<style>
	.sortBy {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	label {
		padding: 0 4px;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>

<script>
	import ListItem from './ListItem.svelte';

	export let countBy;
	export let expandTo = [];
	export let items = [];
	export let itemType = '';

	let sortBy = 'sum';

	const alphaSorter = (rhs, lhs) => {
		if(rhs.id < lhs.id) { return -1; }
		if(rhs.id > lhs.id) { return 1; }
		return 0;
	}

	const sumSorter = (rhs, lhs) => {
		if (!rhs[countBy] || !lhs[countBy]) { return alphaSorter(rhs, lhs); }
		if(rhs[countBy].length < lhs[countBy].length) { return 1; }
		if(rhs[countBy].length > lhs[countBy].length) { return -1; }
		return 0;
	}

	const getSorter = (sortedBy, sortingEnabled) => {
		if (!sortingEnabled) {
			return alphaSorter;
		}

		switch (sortBy) {
			case 'alpha':
				return alphaSorter;
			default:
				return sumSorter;
		}
	};

	console.log(items, items);

	$: sorter = getSorter(sortBy, true);
	$: sortedItems = Object.values(items).sort(sorter);
</script>
