const baseConfig = require('../../build/base.config.js');

module.exports = baseConfig({
	htmlTitle : 'hello world',
	htmlFileURL : 'html/index.html',
	appDir: 'js/index/',
	uglify: false,
	hash:''
})