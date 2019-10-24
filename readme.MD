## webpack配置 
- clean-webpack-plugin 清除文件
- html-webpack-plugin 模板编译
- mini-css-extract-plugin 抽离css出来减少包的大小 因为现在浏览器可以进行并行下载资源
- teser-webpack-plugin 可以替换uglifyjs-webpack-plugin 解决uglifyjs不支持es6语法的问题
- optimize-css-assets-webpack-plugin 压缩css
- cssnano(插件) 是postcss的css优化和分解插件,cssnano采用格式很好的css,并通过许多优化，以确保最终的生产环境尽可能小。
- hash  
    - hash 代表本次的编译,每当编译一次,hash会变,所有的产出的资源hash都一样
    - chunkhash 代码块的hash 因为一般来说每个entry,都会产出一个chunk 其实就是某个独立的模块里面内容变了 
        对应的模块才会生成对应的hash
    - contenthash  文件内容变了 就变
- html-withimg-loader   处理在html中直接使用img标签src加载图片的问题
- glob 查找所有模块的文件,文件匹配模式
- externals 如果我们想引入一个库，但是又不想让webpack进行打包
  并且又不影响我们在程序中以CMD、AMD或者window/hlobal全局等方式进行使用，那就可以通过配置externals
- html-webpack-externals-plugin 外链CDN 
- copy-webpack-plugin 拷贝静态文件
- extensions 指定extensions 之后可以不用再require 或是import的时候加文件扩展名，会一次尝试添加扩展名进行匹配
- alias 配置别名可以加快webpack查找模块的速度 
- DefinePlugin 创建一些在编译时可以配置的全局常量
- webpack-merge 合并配置文件
- IgnorePlugin 用于忽略某些特定的模块，让webpack不把这些指定的模块打包进去
- image-webpack-loader 可以对图片进行压缩和优化
- purgecss-webpack-plugin 可以去除未使用的 css，一般与 glob、glob-all 配合使用
- CDN 内容分发网络，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，
- px2rem-loader 页面渲染时计算根元素的font-size值
从而加速资源的获取速度
 ```
 let glob = require("glob")
 let files = glob.sync('./src/**/*.js')
 返回一个数组，所有的文件名
 ```

 - less less-loader
 - node-sass sass-loader 自动添加浏览器前缀
 - postcss-loader autoprefixer
    - postcss-loader 第一个主要是把css解析成javascript可以操作的抽象语法树结构(AST)
    - 第二个就是调用插件来处理AST并得到结果


- @babel/preset-env 转译es6 es7
- @babel/preset-react 转译JSX语法    

- eslint-config-airbnb 其中一個最流行的 JavaScript 代碼規範，它差不多包含所有 JavaScript 的角度
 > https://juejin.im/entry/5a02d18d6fb9a045076f178e


 - webpack devtool
    - eval 使用eval 包裹模块代码
    - source-map 产生.map文件
    - cheap 不包含列信息 也不包含loader的sourcemap
    - module 包含loader的sourcemap(比如jsx to js ,babel的sourcemap),否则无法定义源文件
    - inline 将.map作为DataURI 嵌入 ，不单独生成.map文件
    - module-source-map 能看到真正的源码 source-map只能看到或者说调试babel转移后的代码


    ## 多入口
    - 有时候我们的页面可以不止一个HTML页面，会有多个页面，所以就需要多入口
    - 每一次页面跳转的试试，后台服务器都会返回一个新的html文档，这种类型的网站就是多页网站，也叫多页应用