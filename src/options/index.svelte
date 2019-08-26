<label>
	<input
		bind:value={limit}
		max="1000"
		min="25"
		on:change={handleChange}
		step="25"
		type="number"
	/>
	Limit
</label>
<br />
<label>
	<input
		bind:value={project}
		on:change={handleChange}
		type="text"
	/>
	Project
</label>
<br />
<label>
	<input
		bind:value={domain}
		on:change={handleChange}
		type="text"
	/>
	Domain
</label>

<script>
	import browser from '../common/browser';
	let limit = 100;
	let project = 'UI';
	let domain = 'https://whsbitbucket.webmd.net';

	browser.storage.sync.get(
		{ limit, project, domain },
		options => {
			limit = options.limit;
			project = options.project;
			domain = options.domain;
		}
	);

	const handleChange = event =>
		browser.storage.sync
			.set({ limit, project, domain });

</script>
