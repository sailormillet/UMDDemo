'use strict'
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const staticHtml = path.join(__dirname, '/dist/html/') ;//静态文件html的地址
const staticFile = path.join(__dirname, '/dist/') ;//静态文件目录
// const hashFileName = hash?'[name]_' + hash:'[name]_[hash:8]';
module.exports = {  
    context: __dirname,
    //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    entry:  __dirname + "/src/main/js/main.js",//已多次提及的唯一入口文件
    output: {
      path: __dirname + "/dist/js/",//打包后的文件存放的地方
      filename: "bundle.js",//打包后输出文件的文件名
    //   publicPath: "http://millet.example.com/js/"
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase:path.join(__dirname, "dist"),
      hot: true, //hot: true = new webpack.HotModuleReplacementPlugin(),就可以只替换必要的模块（修改过的模块）
      historyApiFallback: true,//不跳转
      inline: true,//实时刷新
    },
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
        //   {
        //     test: /\.css$/,
        //     use: [
        //         {
        //             loader: "style-loader"
        //         }, {
        //             loader: "css-loader",
        //             options: {
        //               modules: true
        //           }
        //         },{
        //             loader: "postcss-loader"
        //           }
                
        //     ]
        // },
        {
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
              use:[
                {
                  loader: 'css-loader',
                  options:{
                    modules:true,
                    importLoaders:1,
                    localIdentName:'[local]',
                  }
                },
                {
                  loader:'less-loader',
                },
              ],
              fallback: 'style-loader',
            }),
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
    new ExtractTextPlugin({
        filename:'../css/[name]_[hash:8].min.css',
        disable: false,
        allChunks: true,
      }),
],
  }