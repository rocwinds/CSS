<template>
  <div>
    <h1>TodoList</h1>
    <!-- 输入框，用v-model双向绑定了变量content，记得去data里注册 -->
    <input type="text" v-model="content"/>

    <!-- 确认键，用v-on:click绑定了事件addTodo，记得在methods注册一下-->
    <button @click="addTodo">添加</button>

    <!-- 列表部分，用v-for绑定了todoData数组来循环渲染列表，item即todoData数组每一项-->
    <ul>
      <li v-for="(item,index) of todoData" :key="index">{{item}}</li>
    </ul>

  </div>
</template>

<script>
import './assets/styles/global.styl'

// 加入了data(){}部分和methods:{}两个对象，里面分别放了vue页面需要的数据和方法，写法需要记一下
export default {
  name: 'App',
  data() {
    return {
      todoData: ['todo1', 'todo2', 'todo3'],
      content: ''
    }
  },
  methods: {
    addTodo() {
      if (this.content === '') return

      this.todoData.push(this.content)
      this.content = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
// 选择隔行的li，然后将其color指定,这里的书写格式不要瞎改否则会引起报错，毕竟写stylus省略了{}号和;号 
li:nth-of-type(odd)
    color:green
</style>

