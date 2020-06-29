<template>
    <div>
        <h1>this is VueApp</h1>
    </div>
</template>

<script>
// import img from './assets/images/bg.jpg'
// import './assets/images/2.svg'
// import './assets/styles/test1.css'
import './assets/styles/global.styl'


export default {
    name:'App'//默认输出名
    /*
    created(){
        console.log(img)
    }
    //vue里初始化完成就会执行这里的语句，可以打印一下img的信息，webpack打包之后会返回文件名，就会打印文件名了
    */
}
</script>

<style lang='stylus' scoped>//lang='stylus'代表了App.vue的style样式使用的是stylus语法，scoped代表了这些样式只会在本文件生效，style标签里的语法就按照stylus写就行了（需要注意下因为vscode插件省略了{}和; ）
    h1
        color:red
        transform:translate(100px,100px)//让h1元素偏移
</style>