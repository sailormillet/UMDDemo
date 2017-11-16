'use strict'
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const staticHtml = path.join(__dirname, '/dist/html/') ;//静态文件html的地址
const staticFile = path.join(__dirname, '/dist/') ;//静态文件目录
module.exports = {  
    devtool: 'eval-source-map',//eval-source-map用到中小型项目中，生产环境打包最好不要用source-mao
    //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    entry:  __dirname + "/src/main/js/main.js",//已多次提及的唯一入口文件

    output: {
      path: __dirname + "/dist/js/",//打包后的文件存放的地方
      filename: "bundle.js",//打包后输出文件的文件名
    //   publicPath: "http://millet.example.com/js/"
    },
    devtool: 'inline-source-map',
    devServer: {
      // port: 3333, // 资源服务器端口
      contentBase:path.join(__dirname, "dist"),
      hot: true, //hot: true = new webpack.HotModuleReplacementPlugin(),就可以只替换必要的模块（修改过的模块）
      historyApiFallback: true,//不跳转
      inline: true,//实时刷新
    },
    // dev: Object.assign({}, config, {
   
    //   proxy: { // 双服务器开发时，代理请求到后端服务器，如在浏览器请求http://loaclhost:3333/api/users则会请求http://localhost:3000/api/users
    //     '/api': {
    //       target: 'http://localhost:3000',
    //       changeOrigin: true
    //     },
    //     '/img': {
    //       target: 'http://localhost:3000',
    //       changeOrigin: true
    //     },
    //     '/offline.manifest': {
    //       target: 'http://localhost:3000',
    //       changeOrigin: true
    //     }
    // }}),
    module: {
      rules: [
          {
              test: /(\.jsx|\.js)$/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: [
                          "es2015", "react"
                      ]
                  }
              },
              exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                      modules: true
                  }
                },{
                    loader: "postcss-loader"
                  }
                
            ]
        },
      ]
  },
  plugins: [
    new webpack.BannerPlugin('millet Creation Time : '+ new Date()),
       // 在前端页面中判断运行环境
      //  new webpack.DefinePlugin({
      //   'process.env': {NODE_ENV: '"development"'}
      // }),
      //new webpack.HotModuleReplacementPlugin(),就可以只替换必要的模块（修改过的模块）在webpack 2中使用NoErrorsPlugin会有警告提示
    new webpack.NoEmitOnErrorsPlugin(),// 读取HTML模板文件，并输出HTML文件，开发环境实际输出到内存中，

    new FriendlyErrorsPlugin(),//用于更友好地输出webpack的警告、错误等信息
    new HtmlWebpackPlugin({
      
      title:'hello hello', //设置title的名字，在html模板的header上加<%= htmlWebpackPlugin.options.title%>
      
      filename:path.join(staticHtml, 'home.html'),//设置这个html的文件名
      
      template:__dirname + "/src/main/html/index.tmpl.html",//要使用的模块的路径
      
    }),
],
  }