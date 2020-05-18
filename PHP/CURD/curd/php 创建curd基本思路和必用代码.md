#### 0.常用php代码
```php
//引用
    include('config.php');//include引用同目录下的config.php这个文件（别的目录要写路径）
    require_once 'config.php';//require引用(不会重复引用)同目录下的config.php这个文件

//打印变量的值或类型
    echo 填变量名
    exit;

//打印数组
    echo"<pre>";
    print_r(填变量名); 
    echo"</pre>";
    exit;
//_POST 和 _GET
里面有post或get方式传递的各种值

//统计某个表里的特定部分一共有几条记录(统计数据),从表里选择一些数据,然后用mysqli_num_rows()方法
$sql="select * from 表名";
$result = $conn->query($sql);
$numrow=mysqli_num_rows($result);

//统计某个表里特定部分,从这些结果里集中取得一行作为关联数组：
$sql="select * from 表名";
$result = $conn->query($sql);
$numrow=mysqli_fetch_assoc($result);//可以打印看看$numrow里都有些啥

//跳转到本网站指定的页面(此处会跳到本网站的index.php页面)
header("Location:index.php");
```




#### 1.php登录mysql
```php
//准备地址账号密码
$servername="localhost";//服务器地址
$username="root";//填写自己数据库用户名
$password="root123";//连接数据库密码

//登录mysql
$conn=new mysqli($servername,$username,$password);

//连接后测试一下是否正常，没通过测试就会报错
if($conn->connect_error){
    //连接失败就输出一条消息并退出这段php脚本
    die("连接失败:".$conn->connect_error);
}
```

#### 2.php连接mysql里的某个数据库（其实就是1加了一个数据库名字，数据库得存在才能连接上）
```php
$servername="localhost";//服务器地址
$username="root";//填写自己数据库用户名
$password="root_123";//连接数据库密码
$databasename="mydb";//自定义数据库名字
//登录mysql里并连接里面的mydb
$conn = new mysqli($servername,$username,$password,$databasename)

//测试是否成功连接mydb
if($conn->connect_error){
    //连接失败就输出一条消息并退出这段php脚本
    die("连接失败:".$conn->connect_error);
}
```

#### 3.php登录mysql后调用query方法创建一个数据库并连接（库名字为mydb）(增表)
```php
$servername="localhost";//服务器地址
$username="root";//填写自己数据库用户名
$password="root_123";//连接数据库密码
$databasename="mydb";//自定义数据库名字

//登录mysql（不判断了）
$conn = new mysqli($servername,$username,$password)

//提前准备创建数据库的sql命令（未执行）
$sql="create database mydb";

//mysql调用query方法执行$sql，也就是创建数据库mydb
$conn->query($sql);
//或写也一样mysqli_query($conn,$sql);

//测试创建是否成功（if条件可以直接触发调用query方法）
if($conn->query($sql)===true){
    echo "已成功创建表$databasename";

    //再登录mysql里并连接里面的mydb
    $conn = new mysqli($servername,$username,$password,$databasename)
    //测试mydb是否连接上了，连接成功无提示
    if($conn->connect_error){
    //连接失败输出消息并退出脚本
    die("连接失败:".$conn->connect_error);
    }
}

```

#### 4.php连接mysql里的mydb数据库，创建user表并添入字段(增表和增数据)
```php
$servername="localhost";//服务器地址
$username="root";//填写自己数据库用户名
$password="root_123";//连接数据库密码
$databasename="mydb";//自定义数据库名字

//登录mysql里并连接里面的mydb（数据库里要有mydb这个库才会连接成功）
$conn = new mysqli($servername,$username,$password,$databasename);
//准备sql命令，创建user表，并添加字段id、name、password、email和各自的字段属性，需要注意id 的属性auto_increment会自增
$sql="create table user (
			id int(4) unsigned auto_increment primary key,
			name varchar(20) not null,
			password varchar(11) not null,
            email varchar(11) not null
            )";
//判断时会执行一次$conn->query($sql)
if ($conn->query($sql) === true) {
    echo "已经成功在表 $databasename 里创建了字段";
    exit;//退出脚本
} else {
    //   .$conn->error;是php自己的提示语
    echo "创建数据表错误: " . $conn->error;
    exit;
}
```

#### 5.向数据库的指定表里插入数据(按照表的结构来插入数据)(增数据)<!-- 思路:连上数据库,收集post发来的表单数据,一一对应执行插入数据填入数据库然后返回首页 -->
```php
记得先链接上数据库并赋值为$conn
//准备值
$name=值;
$password=值;
$email=值;
//准备好插入数据的sql命令
$sql="insert into 表名(字段名,字段名2,字段名3..) values('$name','$password','$email');"
//执行语句
mysqli_query($conn,$sql);
```


#### 6.在数据库中删除掉指定数据(根据某些值作为条件删除对应数据)(删)<!-- 思路:连上数据库,收集跳转时get发来的id网址参数(参数是渲染表格时完成的),执行删除对应数据就行, -->
```php
//连接数据库,准备好$conn
//准备值
$id=值;
//准备sql命令,删除表中数据,删除条件是id字段等于某个值
$sql="delete from 表名 where id='$id'";
//执行语句
mysqli_query($conn,$sql);
//另一种但功能相同的执行语句
$conn->query($sql);
```

#### 7.在数据库更新指定数据(改)<!-- 思路:连上数据库,收集post发来的表单数据,执行插入数据然后返回首页 -->
```php
//连接数据库,准备好$conn
//准备值
$id=值;
//准备sql命令,更新某个表的某个字段的值,必须满足条件where条件才会被对应修改为新值;
$sql="updata 表名 set 字段名 = 新值 where id='$id'";
//执行语句
mysqli_query($conn,$sql);
//另一种但功能相同的执行语句
$conn->query($sql);
```


#### 8.在数据库中搜索指定数据(查)<!-- 思路:连上数据库,收集post发来的表单数据,执行插入数据然后返回首页 -->
其实已经做过
```php
//连接数据库,准备好$conn
//准备值
$id=值;
//准备sql命令,根据where条件的字段名 = 值来在表名选择对应字段出来
$sql="select 字段名 from 表名 where 字段名 = 值";
//执行语句
mysqli_query($conn,$sql);
//另一种但功能相同的执行语句
$conn->query($sql);
```


