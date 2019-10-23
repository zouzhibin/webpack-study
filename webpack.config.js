let HtmlWebpaclPlugin = require("html-webpack-plugin")
const TeserWebpackPlugin = require('teser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
module.exports={
    optimization:{ // 这里放着优化的内容
        minimizer:[ // 表示放优化的插件
            new TeserWebpackPlugin({
                parallel:true, // 开启多进程并行压缩
                cache:true // 开启缓存
            }),
            new OptimizeCssAssetsWebpackPlugin({
                assetNameRegExp:/\.css$/g, // 指定要压缩的模块的正则
                // cssnano是postcss的css优化和分解插件,cssnano采用格式很好的css,并通过许多优化，以确保最终的生产环境尽可能小。
                cssProcessor:require('cssnano')
            })
        ]
    },
    // externals:{
    //     'jquery':'jQuery', // key是jquery,是一个包的名字，值是jQuery，是全局的变量名
    // },
    // entry:"./src/index.js",
    // entry:{
    //     index:'./src/index.js',
    //     // vendor:glob.sync('./node_modules/**/*.js'),
    //     // 把在nodemodule里面引用的包用vendor.js打包出来
    //     vendor:/node_modules/  // 每个entry都会产出一个chunk,
    // },
    // 定制了查找文件的规则
    resolve:{
        extensions:['.js','.json','jsx','.css']
    },
    module:{
        rules:[
            {
                test:/\.(js)$/, // 如果要require 或import的文件是css文件的话
                // 从右向左处理css文件 loader是一个函数
                enfore:'pre', //强制loader提前执行
                use:['eslint-loader'],
                include:path.join(__dirname,'src')

            },
            {
                test:/\.css$/, // 如果要require 或import的文件是css文件的话
                // 从右向左处理css文件 loader是一个函数
                use:[MiniCssExtractPlugin.loader,'css-loader']

            },
            {
                test:/\.less$/, // 如果要require 或import的文件是css文件的话
                // 从右向左处理css文件 loader是一个函数
                use:[MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                          plugins: [
                            require('autoprefixer')
                          ]
                        }
                      },
                    'less-loader']

            },
            {
                test:/\.scss$/, // 如果要require 或import的文件是css文件的话
                // 从右向左处理css文件 loader是一个函数
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:2,
                            // 0 =>no loaders (default)
                            // 1 =>postcss-loader
                            // 2 =>postcss-loader sass-loader
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]

            },
            {
                test:/\.(jpg|png|jpeg|gif|svg)/,
                use:['file-loader']

            },
            {
                test:/\.(jpg|png|jpeg|gif|svg)/,
                use:{
                    // url-loader 内置了file-loader
                    loader:['url-loader'],
                    options:{
                        // 如果要加载的图片小于10k的话 就把图片内联到html中去
                        limit:10*1024,
                        outputPath:"images", // 当前的图片拷贝到哪个目录下面
                        publicPath:'/images' // 访问的路径
                    }
                }
            },
            {
                test: /\.(htm|html)$/i,
                //处理在html中直接使用img标签src加载图片的问题
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(ttf|svg|eot|woff|woff2|otf)$/,
                use:{
                    loader:'url-loader'
                }
            }
        ]
    },
    plugins:[
        // 此插件会自动向所有的模块注入一个_变量
        // 引用的就是loadsh模块
        // 不需要再使用require import 
        // 这种模式相当于向模块内部注入了一个局部变量 
        new webpack.ProviderPlugin({
            _:'loadsh'
        }),
        // 这个插件是产出html文件 在编译的时候 会读取模板文件
        new HtmlWebpaclPlugin({
            template:"./index.html", // 指定模板文件
            filename:"index.html", // 产出后的文件名
            hash:true, // 为了避免缓存可以在产出的资源后面添加hash值
            //chunks:[]   // 可以配置多入口 ,同时可以配置顺序
            chunksSortMode:"manual", // 对引入的代码块进行排序的模式 针对 chunks ['','']
        }),
        new HtmlWebpackExternalsPlugin({
            externals:[
                {
                    module:'jquery', // 模块名
                    entry:"cdn外部链接",
                    global:'jQuery'//从全局对象的哪个属性上获取的导出名
                }
            ]
        }),
        new CopyWebpackPlugin([{
            from :path.resolve(__dirname,'src/assets'), // 静态资源目录源地址
            to :path.resolve(__dirname,'data/assets'), // 目标地址 相对于output的 path目录
        }])
    ]
}