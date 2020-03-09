//首要是将手动点击左右按钮切换图片的功能做出来，自动运行的js代码应该设置window.onload=function(){...}以保证js代码生效；

//第一件事是定义出一个功能模块，即点击触发执行的函数，所以重新整理思路：
//点击谁？点击#prev和#next；触发了函数能干什么？函数会让list整体向左或向右移动一张图片的距离
//思路继续深入，向左或向右移动一张图片的距离是600px(正负代表方向)，那么图片的位置(#list元素的位置)该如何表示？用绝对定位+left就蛮合适的，但还有更直接的，就是用Object.style.left来获取、重新设置元素内容区域左边与父容器左边的距离，通过#list元素和容器两个对象左边的距离来控制#list元素的位置。

window.onload = function() {
    //对整个页面起作用的函数都在这里了
    //声明变量第一是为了方便选取简化书写，第二是为了临时容纳某些值供函数使用
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    function animate(offset) {
        //开始定义函数，重申一次要实现的功能是调整list元素位置的左移和右移，思路是通过Object.style.left方法获取后修改list左边与容器左边的距离。
        //回顾css和html，会知道list这个元素的左边与容器左边的距离实际是负600（list中图一在容器外面，图二才在容器中，图三之后又在容器外）
        //需要注意style.left返回字符串，所以用parseInt()将值转化为数字。
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        //整个animate函数通过获取list与父容器左边的距离，然后加上参数再修改这个距离，实现了调整list元素位置的左移和右移的功能  
    }

    prev.onclick = function() {    
        //输入参数，让list元素整体向右边平移
        animate(600);
    }
    next.onclick = function() {  
        //输入参数，让list元素整体向左边平移
        animate(-600);
    }
//到这里为止，只实现了点击按钮切换图片的功能，而且还有bug，多点几次切换就没有图了，因此需要继续改进，因此需要回到animate中添加判断；

}
