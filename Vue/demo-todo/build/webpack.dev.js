//从node_modules导入webpack-merge包来实现webpack配置公共代码的抽离和打包时的拼接
const merge = require('webpack-merge')

//导入webpack公共配置代码
const baseConfig = require('./webpack.base.js')

//导入webpack包（为了使用模块热替换插件等功能）
const webpack = require('webpack')

//开发环境下的webpack配置代码
const devConfig = {
    //选择输出模式，可选填开发development或者生产production两种
    mode:'development',
    //使用开发服务器
    devServer: {
        contentBase: './dist',// contentBase指定服务器根目录
        open: true,// 开启运行时会自动打开浏览器功能
        hot:true//开启模块热替换
    },
    //开启源代码映射功能，
    devtool: 'cheap-module-eval-source-map',
    
    //webpack插件
    plugins:[
        //启用webpack的模块热替换插件
        new webpack.HotModuleReplacementPlugin()
    ],
}

//最终导出webpack配置（此处需要合并baseConfig和devConfig，输出的配置代码就同时包含有公共代码和以上开发环境的配置代码了）
module.exports = merge(baseConfig, devConfig)