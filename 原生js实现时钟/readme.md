简单制作思路

时间可以用js获取；不同时间用不同img显示这个操作也可以用js实现；乃至动态刷新也可以用js实现。

需要注意的：obj.getHours()、obj.getMinutes()、obj.getSeconds()这几个从new Date()获取时间的方法必须要加括号！！

charAt()方法是获取字符串某个位置的字符，用法stringObject.charAt(index)   ，只有写了index才会确定从哪获取字符所以必须写；



想要全局自动运行的js，必须放在 window.onload = function(){这里面}。





//JS语法很多很杂，但总结起来就三种错误，第一是初学的语法拼写错误，第二个是初学的用法错误，第三个是编写的逻辑错误也是js最难找出来的错误：语法错误比较好找直接点F12chrome开发工具看报错就能迅速定位了，而用法错误需要慢慢理慢慢读有时候用F12也不错，js编写逻辑错误就很难定位出来了，需要一句一句断点测试。
//本次遇到的错误主要是拼写错误，首先对全局生效的js忘了套进window.onload = function(){这里面}
//其次是getElementsByTagName()方法，document漏了写，ElementsByTagName漏了s和Name；
//在for循环中对长度length拼写错误，对循环对象也没指定对，导致无法遍历进而没反应；
//