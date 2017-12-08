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

const staticHtml = path.join(__dirname, '/dist/html/') ;//静态文件html的地址
const staticFile = path.join(__dirname, '/dist/') ;//静态文件目录
console.log(staticHtml)
console.log(path.resolve(__dirname , "/dist/src/main/js/main.js") )
// const hashFileName = hash?'[name]_' + hash:'[name]_[hash:8]';
module.exports = {  
    devtool: 'cheap-module-source-map',
    context: __dirname,
    //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    entry: __dirname + "/src/main/js/main.js",//已多次提及的唯一入口文件
    // entry: {
      // app:path.resolve(__dirname , "./src/main/js/main.js") ,
      // vendor: 'moment'
  // },
    output: {
      path: path.resolve(__dirname , "./dist/js/"),//打包后的文件存放的地方
      filename: "[name]_[hash].min.js",//打包后输出文件的文件名
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
  },
  plugins: [
    new webpack.BannerPlugin('millet Creation Time : '+ new Date()),
       // 在前端页面中判断运行环境
      //  new webpack.DefinePlugin({
      //   'process.env': {NODE_ENV: '"development"'}
      // }),
      //new webpack.HotModuleReplacementPlugin(),就可以只替换必要的模块（修改过的模块）在webpack 2中使用NoErrorsPlugin会有警告提示
    // new webpack.NoEmitOnErrorsPlugin(),// 读取HTML模板文件，并输出HTML文件，开发环境实际输出到内存中，

    new FriendlyErrorsPlugin(),//用于更友好地输出webpack的警告、错误等信息
    new HtmlWebpackPlugin({
      
      title:'hello hello', //设置title的名字，在html模板的header上加<%= htmlWebpackPlugin.options.title%>
      
      filename:path.join(staticHtml, 'home.html'),//设置这个html的文件名
      
      template:__dirname + "/src/main/html/index.tmpl.html",//要使用的模块的路径
      
    }),
    new ExtractTextPlugin({
        filename:'../css/[name]/[name]_[hash:8].min.css',
        disable: false,
        allChunks: true,
      }),
    //   new webpack.optimize.UglifyJsPlugin({
    //     exclude:/\.min\.js$/,
    //     mangle:true,
    //     compress: { warnings: false },
    //     output: { comments: false }
    //  }),
      new UglifyJsParallelPlugin({
        workers: os.cpus().length,
        mangle: true,
        compressor: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
         }
      }),
      new CleanWebpackPlugin(
        ['js/*.js','css/main/*.min.css'],　 //匹配删除的文件
        {
            root: staticFile,  //静态文件
            verbose:  true,  //开启在控制台输出信息
            dry: false    //启用删除文件
        }),

],
  }