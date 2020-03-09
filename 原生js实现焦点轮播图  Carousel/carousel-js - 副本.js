window.onload = function () {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var animateComplete = true;//动画是否切换完成
    var timer;//定时器
    function setButtonClass(offset) {
        var index = Math.abs(offset / 600);
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className) {
                buttons[i].removeAttribute('class');
                break;
            }
        }
        buttons[index - 1].setAttribute('class', 'on');
    }

    function animated(offset) {
        animateComplete = false;
        var newLeft = parseInt(list.style.left) + offset;
        var time = 300;//位移总时间
        var interval = 10;//位移的间隔时间
        var speed = offset/(time/interval);//每次位移走的距离
        function go(){
            if((speed<0 && parseInt(list.style.left)>newLeft) || (speed>0 && parseInt(list.style.left)<newLeft)){
                list.style.left = parseInt(list.style.left)+speed+'px';
                setTimeout(go,interval);
            }else{
                list.style.left = newLeft + 'px';
                if (newLeft > -600) {
                    list.style.left = -3000 + 'px';
                }
                if (newLeft < -3000) {
                    list.style.left = -600 + 'px';
                }
                setButtonClass(parseInt(list.style.left));
                animateComplete = true;
            }
        }
        go();
    }

    function autoPlay(){
        timer = setInterval(function(){
            next.onclick();
        },2000);
    }

    function stopAutoPlay(){
        clearInterval(timer);
    }

    prev.onclick = function () {
        if(animateComplete){
            animated(600);
        }
    };

    next.onclick = function () {
        if(animateComplete){
            animated(-600);
        }
    };

    //按钮切换
    for (var i = 0, length = buttons.length; i < length; i++) {
        buttons[i].onclick = function () {
            if (this.className === 'on') {
                return;
            }
            if(animateComplete){
                var index = this.getAttribute('index');
                var newLeft = index * (-600);
                if(parseInt(list.style.left) === -3000 && newLeft === -600){
                    animated(-600);
                }else if(parseInt(list.style.left) === -600 && newLeft === -3000){
                    animated(600);
                }else{
                    animated(newLeft-parseInt(list.style.left));
                }
            }
        }
    }

    container.onmouseover = stopAutoPlay;
    container.onmouseout = autoPlay;

    autoPlay();
}