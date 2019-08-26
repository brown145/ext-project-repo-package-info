const config = () => ({
	module: {
		rules: [{
			test: /\.svelte$/,
			exclude: /node_modules/,
			use: {
				loader: 'svelte-loader',
				options: {
					emitCss: false,
					hotReload: false
				}
			}
		}]
	}
});

module.exports = config;
