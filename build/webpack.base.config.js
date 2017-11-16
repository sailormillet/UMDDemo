'use strict'
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
const staticHtml = path.join(__dirname, '/dist/html/') ;//静态文件html的地址
const staticFile = path.join(__dirname, '/dist/') ;//静态文件目录

module.exports = {  
    // entry: path.resolve(__dirname, '../src/main/js/main.js'),//已多次提及的唯一入口文件
    entry:['../src/main/js/main.js'],//已多次提及的唯一入口文件

    output: {
      path:path.resolve(__dirname, '../dist/js/'),//打包后的文件存放的地方
      filename: "bundle.js",//打包后输出文件的文件名
    //   publicPath: "http://millet.example.com/js/"
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
  }