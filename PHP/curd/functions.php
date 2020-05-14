<?php
//引入写好了账号密码的常量php（require_once只引用一次）
require_once 'config.php';

//创建连接(调用mysqli扩展，参数为地址账号密码)
$conn=new mysqli(MYSQL_HOST,MYSQL_USER,MYSQL_PW);
//检测连接是否正常，用if判断调用后connect_error属性是否为true
if($conn->connect_error){
    //输出一条消息并退出这段php脚本
    die("连接失败:".$conn->connect_error);
}
//$conn存在connect_error是因为没有数据库，现在开始创建一个名为mydatabase数据库
//提前写好sql语句：创建数据库名为mydatabase（等待调用，这一步并不是创建）
$sql="create database mydatabase";
//调用query执行语句($sql)创建mysql数据库，赋值为$conn,只要创建成功就执行：调用mysqli方法，输入参数为数据库地址、账号、密码、数据库名字
//用if方法控制创建过程，成功就执行链接数据库
if($conn->query($sql)===true){
    //提前准备要创建的数据库名字赋值给变量$databasename
    $databasename="mydatabase";
    //调用mysqli方法连接数据库
    $conn = new mysqli($servername,$username,$password,$databasename);
   
    //创建的mysql数据库$conn，调用query方法执行语句是$sql如果成功为true就执行里面的语句
   
        
        $conn=new mysqli(MYSQL_HOST,MYSQL_USER,MYSQL_PW);
    }   




    //创建链接mysql数据库的代码（账号密码上面引入）
//包括了测试链接数据库功能和创建数据库功能
function connnetDb(){

    //链接成功就打印出提示
    echo "连接成功";
}








