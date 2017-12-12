'use strict'
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


const os = require('os');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');//webpack-uglify-parallel的是实现原理是采用了多核并行压缩的方式来提升我们的压缩速度。

const ExtractTextPlugin = require('extract-text-webpack-plugin');//解析css、less, 并把css变成文件通过link标签引入
const autoprefixer = require('autoprefixer');//自动补全css3前缀
const CleanWebpackPlugin = require('clean-webpack-plugin'); //使用前需要安装clean-w webpack删除文件夹

// const hashFileName = hash?'[name]_' + hash:'[name]_[hash:8]';
// paramObj ={
// 	htmlTitle : '我支持的',
// 	htmlFileURL : 'html/my/support.html',
// 	appDir: 'js/my/support',
// 	uglify: false,
// 	hash:''
// }
module.exports = (paramObj) => {  

  let htmlTitle = paramObj.htmlTitle;
  let htmlFileURL = path.resolve(__dirname ,'../dist/','./'+paramObj.htmlFileURL);//生成html文件的路径
  let appDir = paramObj.appDir;
  let cssDir = path.resolve(__dirname ,'../dist/','./'+appDir.replace(/js/,'css'));//生成css文件的路径
  let jsDir = path.resolve(__dirname ,'../dist/','./'+appDir);//生成js文件的路径
  let uglify = paramObj.uglify;//文件是否压缩
  let hash = paramObj.hash;
  let hashFileName = hash?'[name]_' + hash:'[name]_[hash:8]';
  let distDir =path.resolve(__dirname ,'../dist/');//dist路径下面


  const obj = {}; 
  /**
   * debugger 配置 应该在开发环境
   */

  // obj.devtool = 'cheap-module-source-map';
  obj.devtool = 'source-map';
  // obj.devtool = 'hidden-source-map';

  /**
   * context是entry配置项的根目录（绝对路径）。如果output.pathinfo也设置了，它的pathinfo是基于这个根目录。
   * “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
   */
  // obj.context = path.resolve(__dirname,'../');//文件的根目录

  /**
   * entry唯一入口文件
   */

  obj.entry = './js/main.js';//已多次提及的唯一入口文件
  // obj.entry = {
  //   app:'./js/main.js',
  //   vendor: 'moment'
  // };

  /**
   * output编译输出的配置项
   */
  obj.output={
    path: distDir,//打包后的文件存放的地方
    filename: "./"+appDir+"/[name]_[hash].min.js",//打包后输出文件的文件名
  //   publicPath: "http://millet.example.com/js/"
  };

  /**
   * devServer 热加载
   */

  // obj.devServer = {
  //   contentBase:path.join(__dirname, "dist"),
  //   hot: true, //hot: true = new webpack.HotModuleReplacementPlugin(),就可以只替换必要的模块（修改过的模块）
  //   historyApiFallback: true,//不跳转
  //   inline: true,//实时刷新
  // };

  /**
   * module 路由模块
   */
  
  obj.module ={
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
          test: /\.juicer$/,
          loader: 'juicer-loader',
        },
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
              {
                loader: 'postcss-loader',
                // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
                options: {
                    plugins: function() {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }
            ],
            fallback: 'style-loader',
          }),
        },
        {
          
          test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
          
          use: [{
          
          loader:'url-loader',
          
          query:{
          
          limit:10000,//用的图片并且会按照文件大小, 或者转化为 base64, 或者单独作为文件,这里大于1kb的图片会作为文件
          
          name:'[path][name].[ext]'//在某个路径的文件夹下生成那个图片名字的文件
          
          }
          
          }]}
      
    ]
};
  /**
   * plugins 插件
   */
  
  const pluginsArr = [
    new webpack.BannerPlugin('millet Creation Time : '+ new Date()),
    // 在前端页面中判断运行环境
   //  new webpack.DefinePlugin({
   //   'process.env': {NODE_ENV: '"development"'}
   // }),
   //new webpack.HotModuleReplacementPlugin(),就可以只替换必要的模块（修改过的模块）在webpack 2中使用NoErrorsPlugin会有警告提示
 // new webpack.NoEmitOnErrorsPlugin(),// 读取HTML模板文件，并输出HTML文件，开发环境实际输出到内存中，

 new FriendlyErrorsPlugin(),//用于更友好地输出webpack的警告、错误等信息
 new HtmlWebpackPlugin({
   
   title: htmlTitle , //设置title的名字，在html模板的header上加<%= htmlWebpackPlugin.options.title%>
   
   filename:htmlFileURL,//设置这个html的文件名
   
   template: path.resolve(__dirname ,'../src/common/','./index.tmpl.html'),//要使用的模块的路径
   
 }),
 new ExtractTextPlugin({
     filename:'./'+appDir.replace(/js/,'css')+'[name]_[hash:8].min.css',
     disable: false,
     allChunks: true,
   }),
 //   new webpack.optimize.UglifyJsPlugin({
 //     exclude:/\.min\.js$/,
 //     mangle:true,
 //     compress: { warnings: false },
 //     output: { comments: false }
 //  }),

   new CleanWebpackPlugin(
     [jsDir,cssDir,htmlFileURL],　 //匹配删除的文件
     {
         root: path.resolve(__dirname ,'../dist/'),  //静态文件
         verbose:  true,  //开启在控制台输出信息
         dry: false    //启用删除文件
     }),
   ]
   if(uglify){
    pluginsArr.push(   
      new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
       }
    }))
   }
   obj.plugins = pluginsArr;
  return obj;

  }