//从node_modules导入webpack-marge包来实现webpack配置公共代码的抽离和打包时的拼接
const merge = require('webpack-merge')

//导入webpack公共配置代码
const baseConfig = require('./webpack.base.js')

//生产环境下的webpack配置代码
const prodConfig = {
    //选择输出模式，可选填开发development或者生产production两种
    mode:'production',
}

//最终导出webpack配置（此处需要合并baseConfig和prodConfig，输出的配置代码就同时包含有公共代码和以上生产环境的配置代码了）
module.exports = merge(baseConfig,prodConfig)
