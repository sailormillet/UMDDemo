# UMDDEMO
> 这个库主要是搭一个UMD模块开发的架子

> 主要用html5、css3、less、es6、jQuery、bootstrap、webpack压缩、juicer模版渲染

> 此版本没有考虑seo的优化

> webpack 压缩的文件会生成html ，js ，同时提取css 。js，css生成的问价加了hash值防止缓存

> webpack 的版本是3.8.1


## 架构
***
- #### 类库框(mvc开发思想)
   jquery、CommonJs模块定义系统

- #### dist  为生产环境目录，包含CSS、JavaScript、图片素材 和 用于演示的Html文件。
     - html    
     - 压缩后的css
     - 压缩后的js 
     

- #### src 存放 Less、JavaScrip文件源码 和 第三方库文件。
     - common 公共的文件
         - libs第三方库文件
         - less公共的样式
         - index.tmpl.html webpack生成html模版
     - main 第一个demo 的压缩方式 ```../../node_modules/.bin/webpack --config webpack.conf.main.js```
         - js demo的js
         - less demo的less
         - tpl demo的juicer模版
   
- #### build  为webpack基本配置文件

## 编码开发
***

- #### 编辑器 
   - vscode（Visual Studio Code）

       
- #### 效率工具

   - webpack 版本是3.8.1，此webpack的配置都是根据3.8.1版本配置的所以压缩
   
      - webpack可以在终端中使用，在基本的使用方法如下：

       ```
       1、{entry file}文件入口
          {destination for bundled file}文件输出路经
          webpack {entry file} {destination for bundled file}
        
       2、webpack非全局安装的情况 
          当前路经找到node_modules安装的位置 node_modules/.bin/webpack 代表webpack
          node_modules/.bin/webpack {entry file} {destination for bundled file}
          

       ```
       
      - ```webpack用到的plugins（插件）```
      
      
          具体配置请看<http://www.jianshu.com/p/66bedb73d05f>
      
        - html-webpack-plugin：简单创建 HTML 文件，用于服务器访问  
             
        - 为每个 chunk 文件头部添加 banner 不需要安装
        
        - ExtractTextWebpackPlugin  从 bundle 中提取文本（CSS）到单独的文件
        
        - 增强 uglifyPlugin webpack-uglify-parallel压缩比例高
        
        - clean-webpack-plugin 清除dist文件夹中重复的文件
                
        - autoprefixer自动补全css3前缀
        
      - ```webpack loader加载器```
      
        具体配置请看<http://www.jianshu.com/p/5558bb60534f>
        - 样式

           - style-loader将模块的导出作为样式添加到 DOM 中

           - css-loader解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码

           - less-loader加载和转译 LESS 文件

        	- postcss-loader使用PostCSS加载和转译 CSS/SSS 文件

        	- stylus-loader加载和转译 Stylus 文件
        
        - CSS预处理器

			- Less Loader、Sass Loader、Stylus Loader

				需要先安装 postcss-loader 、autoprefixer（自动添加前缀的插件）
		- 图片url-loader

                把小图片转成base64来打包css中，在webpack.config.js下面的module的rule下写规则一般限制小图片转base64可以用url-loader，其他情况都用file-loader。url-loader应该是file-loader上加了一层过滤。
                
        - 转换编译(Transpiling)

			- babel-loader加载 ES2015+ 代码，然后使用Babel转译为 ES5

              解析Es6的 babel-preset-es2015 包和解析JSX的 babel-preset-react
        - juicer-loader juicer模版渲染
      
      
- #### 模块定义
    - CommonJS : CommonJS规范是由NodeJS发扬光大，这标志着JavaScript模块化编程正式登上舞台
    
    - UMD: 通用模块规范,既然CommonJs和AMD风格一样流行，似乎缺少一个统一的规范。所以人们产生了这样的需求，希望有支持两种风格的“通用”模式，于是通用模块规范（UMD）诞生了。
    
    
- #### 版本管理

   - git 


- #### 配置命令行HTTP服务器 - http-server (nodeJs)

  - npm install http-server 
  - sudo node http-server 路经 静态资源路经

  
## 例子 example
***
> 个人开发的问题有各种版本，我这里就没有安装全局的webpack.

> 版本3.8.1的webpack安装到的当前的文件夹下面的node_modules

> 所以我的压缩方式 ../../node_modules/.bin/webpack --config webpack.conf.main.js
 
### demo1 src/main


   - js demo的js
   - less demo的less
   - tpl demo的juicer模版


# 执行在package.json下面的scripts设置快捷指令，用npm执行
***
npm run server 热加载
npm start 、webpack 压缩文件npm start ＝ webpack


 