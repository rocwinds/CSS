登录
`mysql -h地址 -u账号 -p` 回车输入密码后登录数据库
 

登录之后
`show databases;`  查看mysql里的所有数据库;

`use 数据库名字;`   进入某个数据库

`show tables;`   查看该数据库下所有表

`desc 表名;`   查看某个表里的字段和值等内容

`select * from 表名`   选择某个表里的所有内容
`select *或者字段名 from 表名 where 字段名 = 值;`  选择某个表里指定字段或全部符合条件‘字段名 = 值’的内容
`select * from 表名 order by id desc` 根据id字段倒序显示 (order by 字段 asc/desc 升序或小降序显示)   


增删改查
`insert into 表名(字段名1,字段名2,字段名3..) values('值1','值2','值3'...)";`  向某个表插入数据(对应字段插入值)

`delete from 表名 where 条件;`      删除某个表内符合某些条件的记录

`updata 表名 set 字段名 = 新值  where 条件 ;`    向某个表内更新某个记录的值,需要满足"where 条件"的记录才会被更新,条件可以是"某个字段=某个值"

 
