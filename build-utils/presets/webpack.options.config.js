const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = () => ({
	entry: {
		options: path.resolve('./src/options/index.js')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./src/options/index.html'),
			filename: 'options.html',
			chunks: ['options']
		})
	]
});

module.exports = config;
