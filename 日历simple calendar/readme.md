# 原生js实现简单的日历

## 1.需求分析

首先先进行需求分析明确一下日历要实现的功能点：
 - 根据系统时间显示当前的年月日，并将当前日期并高亮；
 - 能够左右跳转上个月和下个月；

细分下来问题就是：
- 1 如何获取当前年月日(new Date()方法)
- 2 不同月份有不同天数，如何需要确认每个月的天数？(需要解决平年闰年天数问题)
- 3 如何解决日历表格每个月的第一天在哪？以及整个月天数要显示几行？(根据今天年月日确认所在月份第一天是星期几)
- 4 如何动态生成显示不同月份的表格？
- 5 如何加入左右切换功能(js绑定事件)

## 2.实现部分-外观

因为使用原生js来实现日历，因此外观部分比较简单，HTML搭好框架，CSS写好基本的样式就足够了，因为主要难点集中在于js的实现。

所以首先是完成HTML基础框架的搭建

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>原生js实现日历</title>
    <!-- 样式之后写，外部引入 -->
</head>
<body>
    <div class="calendar-container">
        <div class="calendar-header">
            <div class="left btn">&lt;</div>
            <div class="year"></div>
            <div class="right btn">&gt;</div>
        </div>
        <div class="calendar-body">
            <div class="week-row">
                <div class="week box">日</div>
                <div class="week box">一</div>
                <div class="week box">二</div>
                <div class="week box">三</div>
                <div class="week box">四</div>
                <div class="week box">五</div>
                <div class="week box">六</div>
            </div>
            <div class="day-rows">
                <!--在这里用js渲染显示日期部分-->
            </div> 
        </div>
    </div>
</body>
</html>
```

接下来是外观部分CSS自行写好就行，根据HTML框架添加进各元素边框和背景色、以及宽高居中等显示属性即可
```css
.calendar-container{
  width: calc(51px*7 + 1px);}
.calendar-header{
    display: flex;
    justify-content: space-between;
    border: 1px solid #6b6b6b;
}
.year{
    text-align: center;
    line-height: 50px;
}
.btn{
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
.calendar-body{
    border-right: 1px solid #6b6b6b;
    border-bottom: 1px solid #6b6b6b;
}
.week-row, .day-rows, .day-row{
    overflow: hidden;
}
.box{
    float: left;
    width: 50px;
    height: 50px;
    border-top: 1px solid #6b6b6b;
    border-left: 1px solid #6b6b6b;
    text-align: center;
    line-height: 50px;
}
.week{
    background: #13a579;
}
.day{
    background: #bdbdbd;
}
.curday{
    background: #ff5722;
}
```



## 3.实现部分-功能

接下来是功能部分，需要用原生js逐个实现

- 1 如何获取当前年月日(new Date()方法)
- 2 不同月份有不同天数，如何需要确认每个月的天数？(需要解决平年闰年天数问题)
- 3 如何解决日历表格每个月的第一天在哪？以及整个月天数要显示几行？(根据今天年月日确认所在月份第一天是星期几)
- 4 如何动态生成显示不同月份的表格？
- 5 如何加入左右切换功能(js绑定事件)

### 当前年月日只需要new Date()方法即可

```
let curTime = new Date()
console.log(curTime)
```
同理还可以用getFullYear()方法获取到当前年份

```
let curTime = new Date();
let curYear = curTime.getFullYear()；
console.log(curYear)
```
继续获取当前月份和当前日期

```
let curTime = new Date();
let curMonth = curTime.getMonth()；
let curDate = curTime.getDate();
console.log(curMonth,curDate)

调用curTime、curYear、curMonthcurDate四个变量即可获取到相对应的当前时间、年、月、日
```
### 不同月份的不同天数如何确定？

其实很简单，只需要根据每个月天数写出12个数字组成数组就行，有一点需要注意2月天数是28天或者29天，所以需要判断一下

 ```
 let daysInMonth = [31, '2月28或者29', 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 ```
 所以问题便成了经典的判断平年闰年问题，根据'四年一闰，百年不闰，四百年又一闰'的说法，有很成熟的写法：

 ```
 function isLeapYear (year) {
     if(year % 4 === 0 && year % 100 !== 0){
         return true;
     } else {
             if(year % 400 === 0){
                 return true;
         	}else{
             	return false;
         }
     }
 }
 
 简写一下其实是：
 function isLeapYear(year){
 	    return (year%400 === 0) || ((year%4 === 0) && (year%100 !== 0))
 }
 ```
因此判断数组daysInMonth[1]是28或者29，可以用三元运算符结合isLeapYear(year)来解决，参数用变量curYear即可判断当前年份是闰年还是平年，整合之后就是：

 ```
 let daysInMonth = [31, isLeapYear(curYear)?29:28 , 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 ```

之后只需要调用daysInMonth数组就可以表示每一年的月份天数了（能根据数组下标来选取某个月来得知当月天数）

### 如何解决日历表格每个月的第一天以及整个月显示问题

首先确定当前月份的第一天是星期几，很简单，用getday()方法即可获取‘某一天’是星期几，这个‘某一天’用new Date()加参数的方法指定为本月1号：

```
let firstDayInMonth = new Date(curYear, curMonth, 1),
    firstDayWeek = firstDayInMonth.getDay();
```

然后根据当前月的天数和当前月第一天星期几这两部分，来确定日历中当前月要显示多少行，周几+月份总天数之后/7即可(说白了根据7格一行来算，一个月至少28天所以最少显示四行，每月1号是周几和一个月28、29、30、31的则会影响最终显示是否会多出一到两行)：

```
let calendarRows = Math.ceil((firstDayWeek + daysInMonth[curMonth])/7);
```

Math.ceil()方法用于取整，根据给定数字向上取整后返回一个整数。

### 接下来根据前面所做的准备工作准备显示日历

也是实现日历功能最难的一部分，因为涉及到生成数据，如何生成想要的数据是需要考虑好的：现在需要的是生成一个每排有七个数字，日期值在1~31之间，按当月日期正确排列的表格，因此实际操作就是按这个要求生成数组，同时过滤掉数组中不符合条件的数字，然后按照找到每月1号该在的位置按当月天数排列好这个月日历表格并显示。

首先需要解决日历表格部分的生成，众所周知日历的列数是固定7列，但日历中行数是不定的，因为要通过每个月的天数和当月1号是周几来确定这个月日历会占几行，所以依旧用之前定义好的变量calendarRows来表示。

可以使用一外一内两个for循环来生成日历表格（不是生成真的表格，而是根据要求计算出日历表格需要的格子数量），外循环的运行次数是calendarRows，循环一次生成一行，在外循环运行时内循环也会跟着运行并且外循环运行一次时内循环运行七次生成七列div，如此下来外for循环结束运行时就代表这个月的日历需要calendarRows*7个格子空间大小（行数为calendarRows，列数为7的表格）

为了清晰理解可以这么说，第一次外循环会生成表格的第一行，同时内循环会跟着输出0-6个格子,然后第二次外循环会生成表格第二行，而内循环会跟着输出7-13，然后第三次外循环生成第三行同时内循环生成14-20......因此可以说calendarRows*7的表格一共生成了i * 7 + j 个格子，为了方便使用可以令idx = i * 7 + j;这个变量idx就表示了全部格子的编号，格子编号是多少有多少并不重要，因为实际只需要看表格第一排的编号0~6，结合当前月份第一天是星期几，就可以显示出月份第一天从第几列开始：如果1号是周日，那么这个月就从编号0格子也就是第一列开始；如果1号是周三，那么这个月就从编号3格子也就是第四列开始；如果1号是周五，那么这个月就从编号5格子也就是第六列开始：画个格子会更简明↓

这是calendarRows*7表格，calendarRows为5，#数字代表了格子编号
![](https://cdn.jsdelivr.net/gh/rocwinds/img-repository@master/img/calendar_sheet1.png)

假设某个有31天的月份的1号落在了编号2的格子上

![](https://cdn.jsdelivr.net/gh/rocwinds/img-repository@master/img/calendar_sheet2.png)

格子编号结合当月1号是周几，就可以确定一个月份的第一天从calendarRows*7表格第一排的哪一个格子开始(哪一列格子)。
所以可以用idx - firstDayWeek + 1来表示月份开头是在第一到第七列的哪一列，为了方便后续使用令date = idx - firstDayWeek + 1;

编号和日期的差值：
![](https://cdn.jsdelivr.net/gh/rocwinds/img-repository@master/img/calendar_sheet3.png)


可以看到上表中的差值有负数，有0，还有超过31的数，这些编号上的日期都不是本月的日期，因此需要过滤掉，可以用date <= 0 || date > daysInMonth[curMonth]表示过滤掉负数和超过31的数，同时加入一个if判断，条件就是刚写的date <= 0 || date > daysInMonth[curMonth]，如果满足条件创建div，但抛弃这部分data不输出``<div class="day box"></div>``；如果不满足条件就创建div之后在其中输出内容date``<div class="day box">${date}</div>``

```
if(date <= 0 || date > daysInMonth[curMonth]){
    rows[i] += `<div class="day box"></div>`
    }else{
         rows[i] += `<div class="day box">${date}</div>`
        }
```

将上述部分稍微整合为外内循环
```JavaScript
let rows = [];
// 外循环生成日历行
for(let i = 0; i < calendarRows; i++){
    rows[i] = `<div class="day-row">`;
    
    //内循环根据外循环日历行来生成日期
    for(let j = 0; j < 7; j++){
        let idx = i * 7 + j,
            date = idx - firstDayWeek + 1;
        //过滤掉无效日期
        if(date <= 0 || date > daysInMonth[curMonth]){
            rows[i] += `<div class="day box"></div>`
        }else{
            rows[i] += `<div class="day box">${date}</div>`
        }
    }
    rows[i] += `</div>`
}
```

### 有关于表格生成最后的工作

将数据结合到一起然后统一输出到html指定好的位置显示，之前循环生成了很多个rows，因此需要用join方法(括号里是数组项之间的分隔用符号)将全部rows放入一个字符串，然后将这个字符串输出到相应位置即可（样式自有css搞定）

```
let dateStr = rows.join('');
document.querySelector('.day-rows').innerHTML = dateStr;
```

```JavaScript
 - 现在上述代码全部整合为render(),之后调用render即可实现表格生成
（顺带补上日历头部的当前年月显示部分）document.querySelector('.year').innerHTML = `${curYear}年${curMonth + 1}月`;


function render(curYear, curMonth){
    document.querySelector('.year').innerHTML = `${curYear}年${curMonth + 1}月`;

    // 判断今年是平年还是闰年，并确定今年的每个月有多少天
    let daysInMonth = [31, isLeapYear(curYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // 确定今天日期所在月的第一天是星期几
    let firstDayInMonth = new Date(curYear, curMonth, 1),
        firstDayWeek = firstDayInMonth.getDay();
    
    // 根据当前月的天数和当前月第一天星期几来确定当前月的行数
    let calendarRows = Math.ceil((firstDayWeek + daysInMonth[curMonth])/7);
    
    // 将每一行的日期放入到rows数组中
    let rows = [];
    
    // 外循环渲染日历的每一行
    for(let i = 0; i < calendarRows; i++){
        rows[i] = `<div class="day-row">`;
        // 内循环渲染日历的每一天
        for(let j = 0; j < 7; j++){
            
            // 内外循环构成了一个calendarRows*7的表格，为当前月的每个表格设置idx索引；
            // 利用idx索引与当前月第一天星期几来确定当前月的日期
            let idx = i*7 + j,
                date = idx - firstDayWeek + 1;
            
            // 过滤掉无效日期、渲染有效日期
            if(date <= 0 || date > daysInMonth[curMonth]){
                rows[i] += `<div class="day box"></div>`
            }else if(date === curDate){
                rows[i] += `<div class="day box curday">${date}</div>`
            }else{
                rows[i] += `<div class="day box">${date}</div>`
            }
        }
        rows[i] += `</div>`
    }
    let dateStr = rows.join('');
    document.querySelector('.day-rows').innerHTML = dateStr;
}
```

### 最后是准备两个按钮，绑定click事件

```
let leftBtn = document.querySelector('.left'),
    rightBtn = document.querySelector('.right');
```
```JavaScript
// 向左切换月份
leftBtn.addEventListener('click', function(){
    curMonth--;
    if(curMonth < 0){
        curYear -= 1;
        curMonth = 11;
    }
    render(curYear, curMonth);
})

// 向右切换月份
rightBtn.addEventListener('click', function(){
    curMonth++;
    if(curMonth > 11){
        curYear += 1;
        curMonth = 0;
    }
    render(curYear, curMonth);
})
```
