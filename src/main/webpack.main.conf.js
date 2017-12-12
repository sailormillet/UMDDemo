const baseConfig = require('../../build/base.config.js');

module.exports = baseConfig({
	htmlTitle : 'hello world',//html的标题
	htmlFileURL : 'html/index.html',//html生成的地址
	appDir: 'js/index/', //静态文件的地址
	uglify: false, //是否压缩文件
	hash:''//固定的hash值
})