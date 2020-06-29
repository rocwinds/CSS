//导入node里的path模块
const path =require('path')

//导入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//webpack输出设置
module.exports = {
    //选择输出模式，开发development或者生产production两种
    mode:'development',

    //打包入口，即指定要打包的文件的路径
    entry:'./src/main.js',

    //打包出口，指定输出文件名、路径，在这里用了path模块，因此需要导入path模块
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')//path模块的固定写法，__dirname代表的是当前目录，后面跟着的是放置输出文件的文件夹名，意味着会把'bundle.js'放到'dist'文件夹里，'dist'文件夹会创建在当前目录也就是项目的根目录文件夹里
    },

    //vue-loader打包规则,是一个对象
    module:{
        //打包规则，是一个包含了很多个规则对象的数组
        rules:[{
            test:/\.vue$/,
            loader:'vue-loader'
            //test代表了正则表达式，这里匹配的是以vue结尾的文件，而loader代表了用什么loader完成打包
        },
        {
            test: /\.(jpg|jpeg|png)$/,
            loader: 'file-loader',
            options: {
               name: '[name].[ext]'//文件名占位符，表示使用'[原文件名].[原文件扩展名]'输出文件
            }
            
        },
        // {
        //     test: /\.(jpg|jpeg|png|svg)$/,
        //     loader: 'url-loader',
        //     options: {
        //        name: '[name].[ext]',//文件名占位符，表示使用'[原文件名].[原文件扩展名]'输出文件
        //        limit: 4096//单位是byte，当jpg、jpeg、png、svg文件小于4096byte时, 会以base64形式直接打包到js文件中
        //     }
        // },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            //正则匹配结尾为css的文件，使用css-loader再用style-loader，值得一提之前都是写loader,这里用use是因为用了多个loader所以写法不一样，记住use是按照从右到左, 从下到上的顺序依次执行的，不能随意乱写
        },
        // {
        //     test: /\.styl(us)?$/,
        //     use: ['style-loader', 'css-loader', 'stylus-loader']
        //     //正则匹配以styl结尾或者stylus结尾的文件，依次根据配置从右往左调用'stylus-loader'、'css-loader'、'style-loader'，就是stylus-loader先会将stylus文件转换成css文件，然后css-loader将全部css汇总生成一个总的css文件，然后style-loader将总的css文件代码挂载到vue页面的<style>标签对里
        // },
        {
            test: /\.styl(us)?$/,
            use: ['vue-style-loader', 'css-loader', 'stylus-loader']
            //用法类似style-loader，只不过专门用于打包vue的stylus样式，另外不能两个loader一起生效，会报错
        }
        ]
    },

    //配置vue-loader插件，需要实例化VueLoaderPlugin,因为plugins可能会有很多插件对象所以也是一个数组
    plugins:[
        //实例化VueLoaderPlugin,到这一步才是引入vue-loader插件
        new VueLoaderPlugin()
    ],
    //指定加载vue包时使用vue.js，而不是默认的vue.common.js来生成文件
    resolve: {
        alias: {
          'vue': 'vue/dist/vue.js'
        }
    },
}