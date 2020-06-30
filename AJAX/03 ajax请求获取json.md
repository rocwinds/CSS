本节学习如何用ajax读取json文件（单个对象和数组对象里的全部值）
提前新建好包含一个对象（多个属性）的user.json和包含了多个对象的数组的users.json

## 获取包含单个对象和多个对象两种数据的json里的数据
```html
<body>
    <button id="id1">请求json单个对象</button>
    <button id="id2">请求json多个对象</button>
    <br>
    <h1>单个对象数据显示</h1>
    <div id="user"></div>
    <h1>多个对象数据显示</h1>
    <div id="users"></div>

    <script>
        //给两个button添加上click事件，分别调用getUser和getUsers
        document.getElementById('id1').addEventListener('click',getUser);
        document.getElementById('id2').addEventListener('click',getUsers);

        //定义ajax获取数据的getUser方法（ajax要获取的json文件为一个对象数据）
        function getUser(){
            var xhr = new XMLHttpRequest(); 
            xhr.open("GET","03 user.json",true);//url为同目录下的03 user.json
            xhr.onload = function(){     
                if(this.status == 200 && this.readyState == 4){
                    console.log(this.responseText);//看看AJAX获取到的json数组，虽然能打印但无法直接使用，需要JSON.parse转换
                    var user = JSON.parse(this.responseText);
                    console.log(user.name);//若没经过JSON.parse转换直接打印获取的json数组的键值就只能看到undefined
                    
                    //接下来将获取到的数组显示到网页对应标签里
                    //错误示范（只会显示出数据类型）：document.getElementById('user').innerHTML = user;    
                    //用ES6的方式将数组显示到标签里，就是把提取到的对象数据一一对应塞进li列表字符串里，然后再通过变量innerHTML才对
                    var output = '';
                    output += ` <ul>
                                <li>${user.id}</li>
                                <li>${user.name}</li>
                                <li>${user.email}</li>
                                </ul>`;
                    // 原生js的写法，注意字符串的引号和加号就行了
                    // output +=   '<ul>'+
                    //             '<li>'+user.id+'</li>'+
                    //             '<li>'+user.name+'</li>'+
                    //             '<li>'+user.email+'</li>'+
                    //             '</ul>';
                    document.getElementById('user').innerHTML = output; 
                }
            }
            xhr.send();//记得send出去ajax才会执行
        };



        //getUsers方法基本一致的，要对应地修改url、函数名字、变量名等，还需要注意因为提取的数据是数组所以要for循环遍历才能正确地输出数据
        function getUsers(){
            var xhr = new XMLHttpRequest(); 
            xhr.open("GET","03 users.json",true);
            xhr.onload = function(){     
                if(this.status == 200 && this.readyState == 4){
                    console.log(this.responseText);//看看AJAX获取到的json数组，虽然能打印但无法直接使用，需要JSON.parse转换
                    var users = JSON.parse(this.responseText);
                    var output2 = '';
                    //一维数组一层循环就可以了，for（var i in 对象数组）就会根据对象数组里的对象数量进行i次循环！
                    for(var i in users){
                        output2 += '<ul>'+
                                '<li>'+users[i].id+'</li>'+
                                '<li>'+users[i].name+'</li>'+
                                '<li>'+users[i].email+'</li>'+
                                '</ul>';
                    };
                    document.getElementById('users').innerHTML = output2;  
                }
            }
            xhr.send();
        };
    
    
    </script>
</body>
```