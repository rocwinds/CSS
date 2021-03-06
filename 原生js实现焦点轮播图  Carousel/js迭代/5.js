// ①已实现点击切换显示的功能：过程并不是那么直观，是通过调整#list与父容器两个左边的距离来控制#list的位置，再加上点击按钮运行输入参数的函数来达成点击切换的目的。
//②修正点击切换图片显示的bug：实现了点击切换图片功能后，会发现左边按钮点一次就动不了而右边按钮多点几次就显示空白了，这是因为实现功能的本质靠一排图片挪来挪去导致的，因此需要继续改进让这排图片只在必要范围内左右移动，超出就要自动重置这排图片的位置，因此需要回到animate()中添加if判断，当#list往左或往右平移到某个位置时就会自动重置#list的位置(还是通过调整#list与父容器两个左边的距离来控制)；
//③已实现自动轮播功能，设置setInterval定时器，按1500毫秒的间隔不停执行next.onclick()函数，相当于用定时器按一定时间间隔不停点击向右按钮；
//④但是实际使用发现自动轮播会和点击切换冲突，为了体验，需要在鼠标移动到容器也就是#container(整个轮播图)时执行clearInterval()暂时取消掉自动轮播，当鼠标移开时又能自动开始轮播，所以总结下来就是选取#container，用onmouseover方法执行当鼠标移入时取消自动轮播的函数，用onmouseout执行当鼠标移开时开始自动轮播的函数。
//⑤继续修bug，因为轮播图指示器没有跟着图片轮播一起动，因此需要选取#buttons并为其添加一个setInterval()定时器


window.onload = function() {
    //对整个页面起作用的函数都在这里了
    //声明变量第一是为了方便选取简化书写，第二是为了临时容纳某些值供函数使用
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    
    //定义简单的无限循环位移函数（通过style.left距离来控制）
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
    
    //定时执行部分（这里是执行next.onclick()）
    var timer;
    function play() {
        timer = setInterval(function () {next.onclick()}, 1500)
    }
    play();
    //取消定时执行部分
    var container = document.getElementById('container');//选取整个轮播图
    function stop() {
        clearInterval(timer);
    }
    //鼠标移入移出会触发才会触发不同函数，所以这里调用函数不加括号
    container.onmouseover = stop;
    container.onmouseout = play;

    
    //轮播指示器部分
    var buttons = document.getElementById('buttons').getElementsByTagName('span');//需要操作#buttons span也就是小点部分，所以需要提取span和其index属性，所以这里先声明好方便后续操作
    var index = 1;

    //定义小圆点添加classname修改样式的函数
    function buttonsShow() {
        //这个循环遍历全部span，如果class="on"就会被删去全部calssname
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }
        //数组从0开始，故index需要-1，重新给第一个span加上className="on"
        buttons[index - 1].className = 'on';
    }


    //点击会触发的函数部分，首先是index变化、然后是ndex变化被限制、调用buttonsShow()，调用animate(传入参数:600),
    prev.onclick = function() {
        //点击会让index变化，然后做一个判断限制index变化范围（其实和无限循环位移函数的原理图是一样的）
        index -= 1;
        if (index < 1) {
            index = 5;
        }
        buttonsShow();//调用修改小圆点样式的函数
        animate(600);//调用让#list对象整体位移的函数
    }
    next.onclick = function() {
        //同理，由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断限制index变化范围
        index += 1;
        if (index > 5) {
            index = 1;
        }
        buttonsShow();
        animate(-600);
    }
}
