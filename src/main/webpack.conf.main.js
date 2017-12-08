const baseConfig = require('../../build/base.config.js');

module.exports = baseConfig({
	htmlTitle : '我支持的',
	htmlFileURL : 'html/my/support.html',
	appDir: 'js/my/support',
	uglify: false,
	hash:''
})