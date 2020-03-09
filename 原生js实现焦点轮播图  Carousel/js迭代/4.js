// ①已实现点击切换显示的功能：过程并不是那么直观，是通过调整#list与父容器两个左边的距离来控制#list的位置，再加上点击按钮运行输入参数的函数来达成点击切换的目的。
//②修正点击切换图片显示的bug：实现了点击切换图片功能后，会发现左边按钮点一次就动不了而右边按钮多点几次就显示空白了，这是因为实现功能的本质靠一排图片挪来挪去导致的，因此需要继续改进让这排图片只在必要范围内左右移动，超出就要自动重置这排图片的位置，因此需要回到animate()中添加if判断，当#list往左或往右平移到某个位置时就会自动重置#list的位置(还是通过调整#list与父容器两个左边的距离来控制)；
//③已实现自动轮播功能，设置setInterval定时器，按1500毫秒的间隔不停执行next.onclick()函数，相当于用定时器按一定时间间隔不停点击向右按钮；
//④但是实际使用发现自动轮播会和点击切换冲突，为了体验，需要在鼠标移动到容器也就是#container(整个轮播图)时执行clearInterval()暂时取消掉自动轮播，当鼠标移开时又能自动开始轮播，所以总结下来就是选取#container，用onmouseover方法执行当鼠标移入时取消自动轮播的函数，用onmouseout执行当鼠标移开时开始自动轮播的函数。

window.onload = function() {
    //对整个页面起作用的函数都在这里了
    //声明变量第一是为了方便选取简化书写，第二是为了临时容纳某些值供函数使用
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    function animate(offset) {
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
        timer = setInterval(function () {next.onclick()}, 1500)
    }
    play();

    var container = document.getElementById('container');//选取整个轮播图
    function stop() {
        clearInterval(timer);//用clearInterval方法消除setInterval(function () {next.onclick()}, 1500)这个定时器
    }
    container.onmouseover = stop;//给整个轮播图加上方法onmouseover，监听到鼠标移入就执行stop();
    container.onmouseout = play;//同理，onmouseout方法监听到鼠标移开就执行play();


    prev.onclick = function() {    
        //输入参数，让list元素整体向右边平移
        animate(600);
    }
    next.onclick = function() {  
        //输入参数，让list元素整体向左边平移
        animate(-600);
    }

}
