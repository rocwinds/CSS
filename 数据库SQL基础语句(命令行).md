SQL数据库的库操作（命令行）
## 首先是先用地址、账号、密码登录到MySQL中才能进行数据库的操作
shift右键点mysql文件夹里的bin文件夹,然后输入登录:
`mysql -hlocalhost -uroot -proot123`
回车上述命令行就能登录本地服务器mysql的账号了，而`exit;` 或 `\q;` 或 `quit；`能退出sql数据库 
-h主机ip地址或域名(不能写错否则无法登录)
-P监听端口(mysql一般3306)(端口是大写P)
-u用户名
-p密码(可以先输入
-p直接换行就能加密输入了)

之前在phpstudy改了管理员账号的密码
-h为数据库的地址(localhost/127.0.0.1)
-u账号名
-p密码,还可以直接不输入就回车转成密文输入

登录上去看到里面welcome to the MySQL啥啥的就对了说明已经正确登录进入了SQL数据库了，接下来开始操作数据库

库操作->表操作->字段操作->数据操作
__________________________________________________________
## 库操作部分
### 库操作-创建一个数据库 create database
语法:`create database 数据库名字 库选项 库选项值;`
实例:`create database mydatabase charest gbk;`
会看到query ok的字样就证明创建成功了

额外补充:
库选项，即数据库指定的表存储的默认相关属性，有字符集charset和校对集collate
一般来说字符集都默认为uft8，也可以手动指定为gbk

### 库操作-显示全部或者某个数据库 show databases 或者 show database like
语法:
查看全部数据库命令:`show databases;`
查看部分数据库命令:`show databases like "匹配模式";`
实例:查看部分数据库:`show database like "my%";`，意思是指会显示所有my开头的数据库；
`show database like "m_database";`,意思是显示以m开头的,最后为database的全部数据库；
`show database like '%database';`，意思是显示以database结尾的全部数据库；

查看全部数据库命令注意是database's',匹配模式是按字符位置来匹配的，并且用'_'替代单个字符而'%'替代多个字符。
在windows里可以找到mysql安装目录里的data里看到,一个数据库一个文件夹,目录下opt对应的是数据库选项。

额外补充:
除了自己创的还有几个系统自带的数据库:
information_schema是指所有保存数据库的结构信息(表,库)
mysql是指核心数据库存储权限关系
performance_schema效率库看看运行效率如何
sys 空库,专门做测试的

### 库操作-显示某个数据库创建时的创建语句 show create database
语法:`show create database 数据库名字;`
实例:`show create database mydatabase;`
会显示创建 mydatabase这个数据库是说输入的代码（例如指定charest gbk）

### 库操作-选择某个数据库 use
语法:`use 数据库名字;`
实例:`use mydatabase;`
选择我之前创建的这个mydatabase数据库，需要注意有才能选择，输入代码却因为没有同名数据库的话只会报错
运行后会显示Database changed,代表当前已经进入到指定的数据库里了！

### 库操作-修改某个数据库的选项 alter database
语法:`alter database 数据库名字 库选项 库选项值;`
实例:`alter database mydatabase charset utf8;`
之前mydatabase的charset选项属性是gbk，现在在这里修改字符集成utf8，只要修改成功，对应的数据库文件夹内的opt文件就会立刻显示改动

### 库操作-删除数据库 drop database
语法:`drop database 数据库名字;`
实例:`drop database my_database2;`(把之前创建的my_database2数据库给删掉)
安全操作注意:！！删除之前必须保证里面的数据没问题再删!!(删除之后对应文件夹会被删除)
__________________________________________________________

## 进入表操作部分，以下步骤均要在`use 数据库名称`进入某个数据库之后再进行操作数据表（字段离不开表,表也离不开数据库）
### 表操作-创建一个数据表 create table
语法:`create table 表名(字段名 字段类型 [字段属性])[表选项];`
     `create table 数据库名字.表名(字段名 字段类型 [字段属性])[表选项];`
实例:`create table class(name varchar(10));`就会看到创建了一个class表，字段为name且对应字段属性为varchar(10)；
    `create table mydatabase2.class(name varchar(10));`就能在不进入mydatabase2这个数据库的情况下创建一个表名为class的表，还有一个字段为name且对应字段属性为varchar(10)；

补充说明：varchar是可变字符串长度；
[字段属性]、[表选项]都是可写可不写的部分，create table时还可以同时创建多个字段名只需要这样写：`create table 表名(字段名 字段类型 [字段属性],字段名 字段类型 [字段属性],字段名 字段类型 [字段属性]....)[表选项]；`就能在创建一个数据表时创建多个字段；
有空了解一下字段属性和表选项；

### 表操作-复制某个已存在的表的结构(其实是特殊的创建表) create table like
语法:`create table like 数据库.表名;` 
     `create table like 数据库.表名(字段名 字段类型 [字段属性])[表选项];` 
实例:`create table like mydatabase2.class(name varchar(10));`，实际只会复制其他数据库的表的结构，但不复制数据(表名不变)


### 表操作-显示全部或某些指定数据表show tables 或show tables like
语法：
显示当前数据库里所有表:`show tables;`
匹配显示当前数据库里特定的表:`show tables like '匹配模式';`(注意两个都带s,匹配模式和之前一样,善用_和%来搞定条件)
每创建一个数据表就会在对应数据库的文件夹里创建对应数据表的文件
介绍一下mysql的结构存在data里,而数据存在mysql根目录下的ibdata1里,了解即可

### 表操作-显示某个数据表的结构(不显示数据) desc
语法：`desc 表名;`
`describe 表名;`
`show column from 表名;`
实例:`desc class;`就会看到本数据库里的class表里的全部字段
其中第一种最常用，实际三种写法意思都是一样，展示某个表里的全部字段信息，包括名字\类型\属性等(非数据)


### 表操作-显示某个数据表被创建的语句(多维度显示表) show create table
语法:`show create table 表名;`
会显示表被创建时的属性，但代码不完全一样，所以只是看看当初创建的大致结构是什么样的，另外有`show create table 表名\G`会调转表的显示（MYSQL多个结束符号 ; \g 还有\G）
实例：`show create table class;`


### 表操作-设置某个表的选项/属性(尽量不要随便修改,因为存储很多数据的时候修改表选项会出问题) alter table
语法:`alter table 表名 表选项 值;`
实际例子:`alter table class charset gbk;`

这部分基本上修改的表选项就是engine\charset\collate(存储引擎\字符集\校准集)，每次改完都可以`show create table 表名;`看看设置的效果


### 表操作-修改某个表的结构（修改表名或表选项）rename table
语法:
改表名`rename table 旧表名 to 新表名;`
改表选项`alter table 表名 表选项 新值;`（实际就是上边设置表选项/属性）
实例:`rename table student to my_student;`，就会把当前数据库里的student表名改为my_student


### 表操作-删除某个表结构
语法:`drop table 表名;`
补充删除多个的语法:`drop table 表名,表名2,表名3.....;`
实例:`drop table my_student,class,teacher;`

__________________________________________
## 进入字段操作部分

### 字段操作-表中新增一个字段 alter table ... add
语法:`alter table 表名 add[column] 新字段名 列类型[列属性] [位置 first/after 字段名];`
column、列属性、位置都是可有可无的；
实例:`alter table my_student add column age int;`
    `alter table my_student add column number int after name;`
    `alter table my_student add email int first;`
第一个实例会看到age添到了表的最后(默认)类型为int,第二个实例会看到number排在了name的后面(name在表的第一列)类型为int，第三个实例会看到email直接排到了表的最前面类型为int；

### 字段操作-修改表中某个字段名字和位置 alter table...change
语法:`alter table 表名 change 旧字段名 新字段名 字段类型 [列属性] [新位置];`(字段类型一定要重新指定!!)
实例:`alter table my_student change age nj int after name;`会看到age改名为nj，指定为int整型，并重调位置排在了name字段后面

### 字段操作-修改表中某个字段的属性或类型
语法:`alter table 表名 modify 字段名 新字段类型 [新字段属性] [新字段位置];`
实例:alter table my_student modify name varchar(20);将表my_student的name字段的varchar属性改为varchar(20)

### 字段操作-删除某个字段里某个字段
语法:`alter table 表名 drop 字段名;`
实例:`alter table my_student drop nj;`会看到表my_student里的nj字段被删除

__________________________________________
经历了库操作,表操作,字段操作
现在开始进行数据的操作:
## 进入数据库的数据操作部分

### 数据操作-在某个表的某个字段中插入数据  insert into...values...
将数据以SQL形式存储到指定数据表的字段里(!!!需要提前有这个表而且对应结构没有出错)
语法:`insert into 表名[(字段列表)] values(对应字段列表的字段值);`//将values插入到某个表里的某些字段里(按书写顺序也就是按结构来插入)
     `insert into 表名 values(对应表结构);`//将values插入到某个表中的所有字段里，依然需要值与结构能对的上
实例:(use my_database2;并且在my_database2这个库里有school这个表,同时name和dress字段都存在的情况下)
- `insert into school (name,dress) values ("wezhong","wenzhongpo");`会看到值被成功地填入表school的对应字段中，需要注意的是数据库本身并不会管这个值是否正确对应某个字段，值只要类型没问题就会被填入字段中 ，所以千万要注意值和字段的对应！
- 如果只写了一个字段名`insert into school (name) values ("wezhong");`也是ok的，因为依然字段对应数据
- 如果不写字段名`insert into school values ("wezhong","wencang");`表示的是向school这个表中的所有字段插入值"wezhong","wencang"（值的结构一定一定要与表结构对应的上才行）

### 数据操作-查询数据 select...from...where
语法：
查询某个表中的全部数据 `select * from 表名;`
查询某个表中得部分字段 `select 字段列表 from 表名;` //明确搜索是表中哪个字段，不用通配符了
简单条件查询数据 `select 字段列表或者* from 表名 where 字段名 = 值;`//进一步明确搜索是某个表中的特定字段，且用另一个字段要符合条件值
实例：`select * from teacher;`搜索teacher这个表里的全部数据并显示出来
`select name from teacher;`搜索teacher这个表里的全部带name字段的数据并显示出来
`select name from teacher where age = 30;`就表示在表teacher搜索全部符合age为30的对象并显示其name字段


### 数据操作-删除数据 delete from
语法:`delete from 表名 [where 条件];`//如果不带条件就是默认删除该表里所有数据
实例:`delete from my_teacher;`删除my_teacher表里所有的数据
    `delete from my_teacher where age = 30;`删除my_teacher表里年龄为30岁的老师
 
### 数据操作-更新数据 update...set
语法:`updata 表名 set 字段名 = 新值;`//将某个表中特定字段的值全部统一改成新值
     `updata 表名 set 字段名 = 新值[where 条件];`//将修改某个表中特定字段的值，会根据另一个字段值(where 条件)来决定是否
实例：`updata my_teacher set age = 28 where name = 'Han';`表示更新my_teacher这个表里的数据，根据条件为name字段值为'Han'找到符合条件的对象并将其age字段更新值为28