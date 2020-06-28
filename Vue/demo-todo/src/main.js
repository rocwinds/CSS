//导入安装好的vue，导入App组件
import Vue from 'vue'//安装了vue之后，从node_modules里导入vue，注意大小写
import App from './App.vue'//从同目录的app.vue引入App组件,注意与默认输出的组件名字要一致不能打错字

//创建vue根实例
new Vue({
    el:'#app',//用vue接管id=app的元素
    components:{
        //定义组件名，写法：组件名：组件对象名（导入的那个对象名）
        //App:App,可以简写
        App:App
    },
    //挂载组件
    template:'<App/>'//写component里的定义的组件名，不要写错
})
