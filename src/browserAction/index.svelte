<article>
	{#if (!scriptData)}
		<Loading />
	{:else}
		<Tabs>
			<section slot="head">
				<!-- <Tab key={0} label="TODO" /> -->
				<Tab key={1} label="Scripts" />
				<Tab key={2} label="Repos" />
				<Tab key={3} label="Commands" />
			</section>
			<section slot="content">
				<!-- <TabPanel key={0}>
					<ol>
						<li class="done">tabs for views, byScript, byRepo</li>
						<li class="done">list for byScript view with sum of repos using</li>
						<li class="done">list for byRepo view with sum of scripts</li>
						<li class="done">drill down for byScript view to see repos w/implemnetation</li>
						<li class="done">drill down for byRepo view to see scripts w/implemnetation</li>
						<li class="done">sorting</li>
						<li class="done">style for script name</li>
						<li class="done">style for repo name</li>
						<li class="done">make bitbucket project name an option</li>
						<li>hot reloading / watch / webpack dev server?</li>
						<li>icons?</li>
						<li>loading?</li>
						<li>css?</li>
						<li>deep link from script name to byScript view</li>
						<li>deep link from repo name to byRepo view</li>
						<li>restrict to bitbuckt urls?</li>
						<li>package and release</li>
						<li>lint/prittier</li>
					</ol>
				</TabPanel> -->
				<TabPanel key={1}>
					<List
						countBy="repoIds"
						expandTo= {[['repoIds', 'repoScripts'], ['commands', 'scriptCommands']]}
						items={scriptData.scriptNames.values}
						itemType="scriptNames"
					/>
				</TabPanel>
				<TabPanel key={2}>
					<List
						countBy="names"
						expandTo= {[['names', 'scriptNames'], ['commands', 'scriptCommands']]}
						items={scriptData.repoScripts.values}
						itemType="repoScripts"
					/>
				</TabPanel>
				<TabPanel key={3}>
					<List
						countBy="repoIds"
						expandTo= {[['repoIds', 'repoScripts'], ['names', 'scriptNames']]}
						items={scriptData.scriptCommands.values}
						itemType="scriptCommands"
					/>
				</TabPanel>
			</section>
		</Tabs>
	{/if}
</article>

<style>
	article {
		min-width: 600px;
		padding: 8px 0;
	}
	/* .done {
		text-decoration: line-through;
	} */
</style>

<script>
	import browser from '../common/browser';
	import eventTypes from '../common/eventTypes';
	import activeTabQuery from '../common/activeTabQuery';

	import Loading from './Loading.svelte';
	import List from './expandingList/List.svelte';
	import Tab from './tabs/Tab.svelte';
	import TabPanel from './tabs/TabPanel.svelte';
	import Tabs from './tabs/Tabs.svelte';

	import { repoScriptStore } from './repoScriptStore.js';

	// import normMockData from '../common/mockData.json';
	// $: scriptData = normMockData;

	$: scriptData = null;

	const fetchData = (options) => {
		browser.tabs.query(activeTabQuery, function(tabs) {
			browser.tabs.sendMessage(
				tabs[0].id,
				{ type: eventTypes.GET_SCRIPTS, options },
				response => { scriptData = response; }
			);
		});
	};

	browser.storage.sync.get(
		{ limit: 1, project: '', domain: '' },
		fetchData
	);

</script>
