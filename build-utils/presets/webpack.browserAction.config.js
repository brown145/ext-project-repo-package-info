const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = () => ({
	entry: {
		popup: path.resolve('./src/browserAction/index.js')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./src/browserAction/index.html'),
			filename: 'popup.html',
			chunks: ['popup']
		})
	]
});

module.exports = config;
