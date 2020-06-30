ajax+php的demo需要丢到服务器环境进行，直接用vscode运行会导致php文件不执行而是只输出php代码

所以需要准备好
1.php文件（已写好执行代码）
2.html文件（在html文件里的scrpit标签里写好ajax代码）


然后把php和html文件都放在WAMP搭建的网站wwwroot文件夹里，再用vscode执行html（WAMP软件整个环境已经放在vscode工作区内了，所以vscode Liveserves插件也能正常工作）

## 在html用ajax请求php代码（服务器环境下就会自动执行）
```php
打开05 ajax.php文件，加入简单的代码
<?php   

//先尝试输出打印文字
echo "NIHAO";
//运行判断，如果$_GET里存在name参数就打印文字！
if(isset ($_GET['name'])){
    echo "传递的名字是".$_GET['name'];
}

?>
```
```html
打开html文件，写入以下代码
<body>
    <button id="button">获取PHP数据</button>
    <script>
        document.getElementById('button').addEventListener('click',getDate);
        
        //加入ajax，记得是带参数的url，因为是用get方法传递的ajax（如果url不带参数相应地也不会传递参数，也不会在php中的_GET变量里拿到数据了）
        function getDate(){
            var xhr = new XMLHttpRequest();
            xhr.open('get','05 ajax.php?name=hhh',true);
            xhr.onload = function(){
                console.log(this.responseText);
            }
            xhr.send();
        }
    </script>
</body>
```
到这里就会看到点击会通过ajax请求php代码（并执行）的效果！

## 不通过点击，而是通过表单输入到php的方式来用ajax请求php数据（并执行）（指定表单的action和method）
```html
<body>
    <button id="button">获取PHP数据</button>
    <!-- form属性表示向此url地址发送表单数据，用get方式发送 -->
    <form action="05 ajax.php" method="GET">
        <!-- input的name属性就是get传递必须要的 -->
        <input type="text" name="name">
        <input type="submit" value="提交">
    </form>
    <!-- ajax部分没有改动所以省略script部分 -->
</body>
```
到这里就会看到在inputtext框里输入的数据被以get方式提交到了05 ajax.php并执行，然后返回执行后的数据给ajax输出

## 不通过表单发送数据而是直接执行js的ajax来请求php数据，即表单不指定action和method）
重新写一个html代码
```html
<body>
    <form id="getformdata" >
        <input type="text" name="name1" id="getform">
        <input type="submit" value="get提交">
    </form>
    <form id="postformdata" >
        <input type="text" name="name2" id="postform">
        <input type="submit" value="post提交">
    </form>
    <button id="button">获取PHP数据</button>
    <script>
        document.getElementById('button').addEventListener('click',getDate);
        document.getElementById('getformdata').addEventListener('submit',getFormDate);
        document.getElementById('postformdata').addEventListener('click',postFormDate);        
        
        function getDate(){
            var xhr = new XMLHttpRequest();
            xhr.open('get','05 ajax.php?name=hhh',true);
            xhr.onload = function(){
                console.log(this.responseText);
            }
            xhr.send();
        }
        function getFormDate(e){
            e.preventDefault();
            var getForm = document.getElementById('getform').value
            var xhr = new XMLHttpRequest();
            xhr.open('GET','05 ajax.php?name='+getForm,true);
            xhr.onload = function(){
            console.log(this.responseText);
            }
            xhr.send();
        }
        function postFormDate(){
            var xhr = new XMLHttpRequest();
            xhr.open('get','05 ajax.php?name=hhh',true);
            xhr.onload = function(){
            console.log(this.responseText);
            }
            xhr.send();
        }

    </script>
</body>
```
https://www.bilibili.com/video/BV11J411k78L?p=7