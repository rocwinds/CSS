// 接下来继续完善功能，之前已经成功通过调整#list与父容器两个左边的距离来控制#list的位置，再加上点击按钮运行输入参数的函数来达成点击切换的目的。

window.onload = function() {
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    function animate(offset) {
        //对整个页面起作用的函数都在这里了
        //声明变量第一是为了方便选取简化书写，第二是为了临时容纳某些值供函数使用
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        // 根据切换几次就到尾显示空白的bug，返回来修改函数增加功能：
        //思路是当#list向左位移五次后或者向右位移一次后，重新设置#list与父容器两个左边之间的距离等于-600px来让#list对象恢复到原来的位置，首先知道#list与父容器两个左边之间的最初距离是-600px，其次#list从最初位置每次-600px向左整体移动五次之后容器显示的是#list的最右端图1，继续让#list整体左移就会重置距离来重置#list的位置；如果#list从最初位置+600px向左整体移动一次就会看到#list最左端的图5，所以根据这些情况用js代码表达就是：
        if(newLeft<-3000){
            list.style.left = -600 + 'px';
        }
        if(newLeft>-600){
            list.style.left = -3000 + 'px';
        }
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
