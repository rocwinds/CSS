//导入node里的path模块
const path =require('path')

//导入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//导入html-webpack-plugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

//从node_modules导入clean-webpack-plugin 插件，因为clean-webpack-plugin引入的是对象，所以用结构赋值来提取clean-webpack-plugin的构造函数赋给CleanWebpackPlugin来正常引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


//webpack输出设置
module.exports = {
    //打包入口，即指定要打包的文件的路径
    entry:'./src/main.js',

    //打包出口，指定输出文件名、路径，在这里用了path模块，因此需要导入path模块
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'../dist')//path模块的固定写法，__dirname代表的是webpack配置文件所在当前目录，后面是放置输出文件的目录（一般是dist），意味着会把'bundle.js'放到'dist'文件夹里，现在'dist'文件夹会创建在webpack.base.js文件上一级的目录里而不是在同一级目录里
    },

    //模组,是一个对象
    module:{
        //打包规则，是一个包含了很多个规则对象的数组
        rules:[
        {
            test:/\.vue$/,
            loader:'vue-loader'
            //test代表了正则表达式，这里匹配的是以vue结尾的文件，而loader代表了用什么loader完成打包
        },
        {
            test: /\.(jpg|jpeg|png|svg)$/,
            loader: 'url-loader',
            options: {
               name: '[name].[ext]',//文件名占位符，表示使用'[原文件名].[原文件扩展名]'输出文件
               limit: 2048
            }  
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            //正则匹配结尾为css的文件，使用css-loader再用style-loader，值得一提之前都是写loader,这里用use是因为用了多个loader所以写法不一样，记住use是按照从右到左, 从下到上的顺序依次执行的，不能随意乱写
        },

        {
            test: /\.styl(us)?$/,
            use: ['style-loader', 'css-loader','postcss-loader' ,'stylus-loader']
            //'postcss-loader' 可以直接和'stylus-loader'、'css-loader'和'style-loader'配合使用，在stylus文件转化成css文件之后再用postcss-loader的autoprefixer来添加不同厂商的样式前缀
        }
        ]
    },

    //webpack插件,因为plugins可能会有很多插件对象所以也是一个数组
    plugins:[
        //启用vue-loader插件(必须有)
        new VueLoaderPlugin(),
        
        //启用打包自动生成指定index.html插件
        new HtmlWebpackPlugin({
            template:'./index.html'//不加这一条就会按照插件生成默认的html代码和文件，实际应用中经常会有指定生成内容的需求，所以给插件指定一个照着写的html模板文件
        }),

        //启用清除打包出口文件夹插件
        new CleanWebpackPlugin(),

    ],
    //指定加载vue包时使用vue.js，而不是默认的vue.common.js来生成文件
    resolve: {
        alias: {
          'vue': 'vue/dist/vue.js'
        }
    },
}