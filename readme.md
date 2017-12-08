# UMDDEMO
>这个库主要是搭一个UMD模块开发的架子

>主要用html5、css3、less、es6、jQuery、bootstrap、webpack压缩、juicer模版渲染

## 架构
- #### 类库框(mvc开发思想)
   jquery、CommonJs模块定义系统

- #### dist  为生产环境目录，包含CSS、JavaScript、图片素材 和 用于演示的Html文件。
     - html    
     - 压缩后的css
     - 压缩后的js 
     

- #### src 存放 Less、JavaScrip文件源码 和 第三方库文件。
     - common 
         - 第三方库文件
   

## 编码开发

- #### 编辑器 
   - vscode（Visual Studio Code）

       
- #### 效率工具

   - webpack
      - webpack可以在终端中使用，在基本的使用方法如下：

       ```
       ＃{entry file}文件入口
       ＃{destination for bundled file}文件输出路经
        webpack {entry file} {destination for bundled file}
       # webpack非全局安装的情况 当前路经找到node_modules安装的位置 node_modules/.bin/webpack 代表webpack
        node_modules/.bin/webpack {entry file} {destination for bundled file}

       ```
      - webpack用到的插件
        - html-webpack-plugin：
        这个插件用来简化创建服务于 webpack bundle 的 HTML 文件，尤其是对于在文件名中包含了 hash 值，而这个值在每次编译的时候都发生变化的情况。你既可以让这个插件来帮助你自动生成 HTML 文件，也可以使用 lodash 模板加载生成的 bundles，或者自己加载这些 bundles。需要让webpack.config.js认识这个插件，首先require这个插件，在webpack.config.js下面的plugins下写new这个插件,
    



      
      
- #### 模块定义
    - CommonJS : CommonJS规范是由NodeJS发扬光大，这标志着JavaScript模块化编程正式登上舞台
    
    - UMD: 通用模块规范,既然CommonJs和AMD风格一样流行，似乎缺少一个统一的规范。所以人们产生了这样的需求，希望有支持两种风格的“通用”模式，于是通用模块规范（UMD）诞生了。
    
    
- #### 版本管理

   - git github



- 配置命令行HTTP服务器 - http-server (nodeJs)
  - npm install http-server 
  - sudo node http-server路经 静态资源路经

  
# Forexample
# demo1 src/main 在src路径下
```../node_modules/.bin/webpack src/main/js/main.js dist/js/bundle.js```


# 执行在package.json下面的scripts设置快捷指令，用npm执行
npm run server 热加载
npm start 、webpack 压缩文件npm start ＝ webpack



＃ 案例

## 压缩方式
 ../../node_modules/.bin/webpack --config webpack.conf.main.js