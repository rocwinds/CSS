## 回顾原生js绑定事件的方法
```html
<head>
    <title>js-动态触发文本传递 </title>
</head>
<body>
    <button id="btn">请求</button>
    <script>
        //原生js选取id=btn的元素，加上事件click(其实就是onclick绑定，点击触发loadtext())
        document.getElementById('btn').addEventListener('click',loadtext);
        //定义事件/函数/方法loadtext();
        function loadtext(){
            console.log('成功完成了点击触发事件');
        } 
    </script>
</body>


可以在F12的管理者工具console里看到信息
```


## 使用ajax请求并接收数据的两种写法
```html
<head>
    <title>ajax1-两种方式调用接收到的数据 </title>
</head>
<body>
    <button id="btn" >请求</button>
    <script>
        //原生js选取id=btn的元素，加上事件click(其实就是onclick绑定，点击触发loadtext())
        document.getElementById('btn').addEventListener('click',loadtext);
        //定义事件/函数/方法loadtext()，加入xhr对象实现简单的ajax;
        function loadtext(){
            //AJAX1.创建xhr对象
            var xhr = new XMLHttpRequest();
            //xhr基本啥浏览器都支持，可以打印看看这个对象有些啥属性
            //console.log(xhr);

            //AJAX2.添加xhr.open()设置，括号里('GET/POST选择传递方法','url发送请求的网址'，是否异步请求true/flase)
            xhr.open('GET','01 SAMPLE.txt',true);

            //AJAX3确认在url能正确读取到数据，添加xhr.onload或xhr.onreadystatechange设置xhr对象接收到服务器响应后该做什么
            //AJAX3-1   xhr.onload会在发送请求后执行console.log(this.responseText)，打印出接收到的文字数据
            xhr.onload = function(){
                console.log(this.responseText)
            }
            //AJAX3-2   xhr.onreadystatechange
             xhr.onreadystatechange = function(){
                 console.log(this.responseText)
            }

            //AJAX4.发送请求
            //之前都只是准备工作(传递方式、url、是否异步请求设置、服务器一响应式该做什么)，现在发送了之后才会让之前的设置起效果
            xhr.send();         
        }
    </script>
</body>

可以在F12的管理者工具console里看到信息
```
