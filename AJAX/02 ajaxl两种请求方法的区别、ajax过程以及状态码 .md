## 尝试打印xhr的状态
```js
html部分：
<button id="btn" ></button>
    在js里修改后再点击看看console打印的state码
    可以修改js里的xhr.open的url部分看看  
=============
    function loadtext(){
        var xhr = new XMLHttpRequest(); //1创建xhr对象         
        xhr.open('GET','02 SAMPLE.txt',false);//2设置传输选项

        //3设置接收到响应后操作的方法1
        xhr.onload = function(){
            console.log(this.responseText)
        }
        //3设置接收到响应后操作的方法2，如果打印太多就减少console.log部分
        xhr.onreadystatechange = function(){
            //在不同地方打印xhr.readyState能看到ajax不同阶段的状态码(xhr.readyStateb不要写错)
            console.log("方法2Readystate:",xhr.readyState);
            console.log(this.responseText)
        }
        xhr.send();//4发送 
    }
```
## ajax每个不同阶段会有哪些state状态码？
```js
    function loadtext(){
        var xhr = new XMLHttpRequest();         
        xhr.open('GET','02 SAMPLE.txt',false);
        console.log("Readystate:",xhr.readyState);//此处写会看到state状态为1,因为设置了url等传输设置所以已经建立连接服务器
        
        xhr.onprogress = function(){
            console.log("Readystate:",xhr.readyState);//此处写会看到state状态为3,网页未加载完成
            //console.log(this.responseText);
            
        }
        //设置接收到响应后操作的方法1
        xhr.onload = function(){
            console.log("Readystate:",xhr.readyState);//此处写会看到state状态为4，onload只会在完成请求接收到相应才会触发
            console.log(this.responseText); 
        }

        //设置接收到响应后操作的方法2
        xhr.onreadystatechange = function(){
            console.log("Readystate:",xhr.readyState);//此处写会看到state状态为4，onreadystatechange在经过xhr.send();这一步后从到接收服务器返回信息23再到准备就绪4
            console.log(this.responseText);
        }
        xhr.send();
    }


    附带说明：
    AJAX的STATE状态码
    0：初始化，XMLHttpRequest对象还没有完成初始化
    1：载入，XMLHttpRequest对象开始发送请求
    2：载入完成，XMLHttpRequest对象的请求发送完成
    3：解析，XMLHttpRequest对象开始读取服务器的响应
    4：完成，XMLHttpRequest对象读取服务器响应结束

    HTTP状态，status码,常用三个码
    200——成功
    404——url查无此网页文件（网页路径不正确）
    500——服务器内部错误

```

## 接收成功的判断写法（onreadystatechange）
```js
    function loadtext(){
        var xhr = new XMLHttpRequest();         
        xhr.open('GET','02 SAMPLE.txt',false);
        //console.log("Readystate:",xhr.readyState);//此处写会看到state状态为1,因为设置了url等传输设置所以已经建立连接服务器

        //设置接收到响应后操作的方法1
        xhr.onload = function(){
            //console.log("Readystate:",xhr.readyState);//此处写会看到state状态为4，onload只会在完成请求接收到相应才会触发
            //console.log(this.responseText);
            
        }
        //设置接收到响应后操作的方法2
        xhr.onreadystatechange = function(){
            //进入接收响应环节先做个判断，判断http状态码是否为成功(status==200)以及xhr是否接收到数据的就绪状态(readyState==4)，如果status=404就打印报错文字
            if(this.status==200 && this.readyState==4){
                console.log(this.responseText);
            }else if(this.status==404){
                console.log('错误404，找不到网页');
            }

            //console.log("Readystate:",xhr.readyState);//此处写会看到state状态为2、3、4，onreadystatechange在经过xhr.send();这一步后从到接收服务器返回信息23再到准备就绪4
        }
        xhr.send();
    }
```



## 简单的ajax发送请求、接收判断、修改页面
```html
<body>
    <button id="btn">点击这里</button>
    在js里修改后再点击看看console打印的state码
    可以修改js里的xhr.open的url部分看看
    <br>
    点击之后在这里会显示url读取到的文字内容！：<div id='text'></div>

    <script>
    document.getElementById('btn').addEventListener('click',loadtext);
    function loadtext(){
        var xhr = new XMLHttpRequest();         
        xhr.open('GET','02 SAMPLE.txt',false);
        //console.log("Readystate:",xhr.readyState);//此处写会看到state状态为1,因为设置了url等传输设置所以已经建立连接服务器
        xhr.onprogress = function(){
            console.log("测试Readystate:",xhr.readyState);//此处写会看到state状态为3,网页未加载完成
            //console.log(this.responseText);
        }

        //设置接收到响应后操作的方法1
        xhr.onload = function(){
            //console.log("Readystate:",xhr.readyState);//此处写会看到state状态为4，onload只会在完成请求接收到相应才会触发
            //console.log(this.responseText);
            
        }
        
        //设置接收到响应后操作的方法2
        xhr.onreadystatechange = function(){
            //进入接收响应环节先做个判断，判断http状态码是否为成功(status==200)以及xhr是否接收到数据的就绪状态(readyState==4)，如果status=404就打印报错文字
            if(this.status==200 && this.readyState==4){
                //console.log(this.responseText);
                document.getElementById('text').innerHTML = this.responseText;
            }else if(this.status==404){
                console.log('错误404，找不到网页');
            }
            //console.log("Readystate:",xhr.readyState);//此处写会看到state状态为2、3、4，onreadystatechange在经过xhr.send();这一步后从到接收服务器返回信息23再到准备就绪4
        }
        xhr.send();
    }
    </script>
</body>
```