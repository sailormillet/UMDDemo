const path = require("path")
module.exports = {
    devtool: 'eval-source-map',//eval-source-map用到中小型项目中，生产环境打包最好不要用source-mao
    //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    entry:  __dirname + "/src/main/js/main.js",//已多次提及的唯一入口文件

    output: {
      path: __dirname + "/dist/js/",//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
      contentBase:"./dist/html/",
      historyApiFallback: true,//不跳转
      inline: true,//实时刷新
    } 
  }