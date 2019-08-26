const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

const config = () => ({
	module: {
		rules: [
			{
				test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
				loader: 'file-loader?name=[name].[ext]',
				exclude: /node_modules/
			}
		]
	}
});

module.exports = config;
