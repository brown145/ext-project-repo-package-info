const path = require('path');
const webpackMerge = require('webpack-merge');
const manifestConfig = require('./build-utils/presets/webpack.manifest.config');
const svelteConfig = require('./build-utils/presets/webpack.svelte.config');
const contentScriptConfig = require('./build-utils/presets/webpack.contentScript.config');
const browserActionConfig = require('./build-utils/presets/webpack.browserAction.config.js');
const optionsConfig = require('./build-utils/presets/webpack.options.config.js');
const fileLoaderConfig = require('./build-utils/presets/webpack.fileLoader.config');
const cssLoaderConfig = require('./build-utils/presets/webpack.cssLoader.config');

const output = {
	path: path.resolve('./build'),
	filename: '[name].bundle.js'
};

const config = ({ mode = 'production' }) =>
	webpackMerge(
		{ mode, output },
		manifestConfig(),
		fileLoaderConfig(),
		cssLoaderConfig(),
		contentScriptConfig(),
		browserActionConfig(),
		optionsConfig(),
		svelteConfig()
	);

module.exports = config;
