'use strict'
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


const devMiddleWare = require('webpack-dev-middleware');
const hotMiddleWare = require('webpack-hot-middleware');
const baseConfig = require('./webpack.base.config');

const devOption = {
    entry: {
    app:['webpack-hot-middleware/client','../src/main/js/main.js'],
    },
    output: {
    path: '/',
    // publicPath: '/'
    },
    plugins: [
        new webpack.BannerPlugin('millet Creation Time : '+ new Date()),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),// 读取HTML模板文件，并输出HTML文件，开发环境实际输出到内存中，
        new FriendlyErrorsPlugin(),//用于更友好地输出webpack的警告、错误等信息
        new HtmlWebpackPlugin({
        template: './index.tmpl.html' 
        }),
    ]
    };

    

    module.exports = function(app){
        //Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
        let webpackconfig = Object.assign({}, baseConfig, devOption);
        // console.log(webpackconfig);
        
        var compiler = webpack(webpackconfig);
        // console.log(compiler);
        app.use(devMiddleWare(compiler,{
        publicPath: webpackconfig.output.publicPath,
        stats: {
        colors: true,
        chunks: false
        }
        }));
        app.use(hotMiddleWare(compiler));
        return app;
        }