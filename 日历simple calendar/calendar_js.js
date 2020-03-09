// 获取今天日期
let curTime = new Date(),
    curYear = curTime.getFullYear(),
    curMonth = curTime.getMonth(),
    curDate = curTime.getDate();
console.log(curTime, curYear, curMonth, curDate)

// 判断平年还是闰年
function isLeapYear(year){
    return (year%400 === 0) || ((year%4 === 0) && (year%100 !== 0))
}

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

// 首次调用render函数
render(curYear, curMonth);

let leftBtn = document.querySelector('.left'),
    rightBtn = document.querySelector('.right');

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