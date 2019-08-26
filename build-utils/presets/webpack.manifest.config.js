const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = () => ({
	plugins: [
		new CopyWebpackPlugin([{
			from: path.resolve('src/manifest.json'),
			transform: function (content, path) {
				// generates the manifest file using the package.json informations
				return Buffer.from(JSON.stringify({
					description: process.env.npm_package_description,
					version: process.env.npm_package_version,
					...JSON.parse(content.toString())
				}))
			}
		}])
	]
});

module.exports = config;
