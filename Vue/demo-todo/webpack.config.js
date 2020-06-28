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
        }]
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