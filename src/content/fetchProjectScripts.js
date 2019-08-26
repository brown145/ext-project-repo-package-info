const fetchProjectScripts = async ({limit, project, domain}) => {
	const removeUndefined = objects => objects.reduce((accumlator, currentValue) =>
		((currentValue) ? [ ...accumlator, currentValue ] : accumlator), []);

	const reduceBy = key => items => items.reduce((acc, item) => {
		acc.values[item[key]] = item;
		acc.ids.push(item[key]);
		return acc;
	}, { values: {}, ids: [] });

	// TODO: make this limit 100 for final version
	const repos = await fetch(`${domain}/rest/api/latest/projects/${project}/repos?limit=${limit}`)
		.then(response => response.json())
		.then(response => response.values)
		.then(reduceBy('slug'));

	const packageJSONs = await Promise.all(
		repos.ids.map(id =>
			fetch(`${domain}/projects/UI/repos/${id}/raw/package.json`)
				.then(response => response.json())
				.then(response => ({
					repoId: id,
					...response
				}))
				.catch(err => console.log('some error', err))
		)
	)
		.then(removeUndefined);

	const packageReducer = (reducerLogic) => packageJSONs.reduce((acc, packageJSON) => {
		if (!packageJSON.scripts) {
			return acc;
		}

		return reducerLogic(acc, packageJSON);
	}, { ids: [], values: {} });

	const scriptNames = packageReducer((acc, packageJSON) => {
			Object.entries(packageJSON.scripts).forEach(([key, value]) => {
				if (!acc.ids.includes(key)){
					acc.ids.push(key);
					acc.values[key] = {
						repoIds: [],
						commands: [],
						id: key
					};
				}

				acc.values[key].repoIds.push(packageJSON.repoId);
				acc.values[key].commands.push(value);
			});
			return acc;
	});

	const scriptCommands = packageReducer((acc, packageJSON) => {
			Object.entries(packageJSON.scripts).forEach(([key, value]) => {
				if (!acc.ids.includes(value)){
					acc.ids.push(value);
					acc.values[value] = {
						repoIds: [],
						names: [],
						id: value
					};
				}

				acc.values[value].repoIds.push(packageJSON.repoId);
				acc.values[value].names.push(key);
			});
			return acc;
	});

	const repoScripts = packageReducer((acc, packageJSON) => {
		acc.ids.push(packageJSON.repoId);
		acc.values[packageJSON.repoId] = {
			id: packageJSON.repoId,
			names: Object.keys(packageJSON.scripts),
			commands: Object.values(packageJSON.scripts),
		};
			return acc;
	});

	const dataPackage = {
		repoScripts,
		scriptNames,
		scriptCommands,
	};

	// console.log(dataPackage);
	// console.log(JSON.stringify(dataPackage));

	return dataPackage;
};

export default fetchProjectScripts;
