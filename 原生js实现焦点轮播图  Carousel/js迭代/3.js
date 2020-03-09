// ①已实现点击切换显示的功能：过程并不是那么直观，是通过调整#list与父容器两个左边的距离来控制#list的位置，再加上点击按钮运行输入参数的函数来达成点击切换的目的。
//②修正点击切换图片显示的bug：实现了点击切换图片功能后，会发现左边按钮点一次就动不了而右边按钮多点几次就显示空白了，这是因为实现功能的本质靠一排图片挪来挪去导致的，因此需要继续改进让这排图片只在必要范围内左右移动，超出就要自动重置这排图片的位置，因此需要回到animate()中添加if判断，当#list往左或往右平移到某个位置时就会自动重置#list的位置(还是通过调整#list与父容器两个左边的距离来控制)；
//③接下来是实现自动轮播功能，这肯定需要内置的对象定时器，这里要注意有两种定时器：setInterval()能执行多次，setTimeout()只执行一次，做轮播图肯定是用setInterval()，因为我们的图片需要一直循环滚动显示

//setInterval()方法会按指定周期（设置数字为毫秒，1000毫秒=1秒）不停地调用函数或计算表达式，直到调用clearInterval()或窗口被关闭。
//最常见的语法：setInterval(code/function(){}, milliseconds);
//语法说明code/function必写，可以是代码串也可以是一个函数。
//语法说明milliseconds必写,周期性执行或调用code/function之间的时间间隔，以毫秒计。


window.onload = function() {
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    function animate(offset) {
        //对整个页面起作用的函数都在这里了
        //声明变量第一是为了方便选取简化书写，第二是为了临时容纳某些值供函数使用
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        if(newLeft<-3000){
            list.style.left = -600 + 'px';
        }
        if(newLeft>-600){
            list.style.left = -3000 + 'px';
        }
    }
    
    var timer;
    function play() {
        //设置setInterval定时器，按1500毫秒的间隔不停执行next.onclick()函数，相当于用定时器按一定时间间隔不停点击向右按钮
        timer = setInterval(function () {next.onclick()}, 1500)
    }
    play();//设置完就当场执行，所以用函数包裹这个定时器
    

    prev.onclick = function() {    
        //输入参数，让list元素整体向右边平移
        animate(600);
    }
    next.onclick = function() {  
        //输入参数，让list元素整体向左边平移
        animate(-600);
    }

}
