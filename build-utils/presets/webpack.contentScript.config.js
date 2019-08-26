const path = require('path');

const config = () => ({
	entry: {
		content: path.resolve('./src/content/index.js')
	}
});

module.exports = config;
