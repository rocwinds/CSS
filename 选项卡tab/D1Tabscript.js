window.onload = function () {
	//提前声明好提取元素操作，避免后续繁琐重写
	var oTab = document.getElementById("tab")
	var oLi = oTab.getElementsByTagName("li")//div#box里的全部li
	var oTxt = document.getElementById("text")
	var oCon = oTxt.getElementsByTagName("div")//div#textd里的全部div的数组对象

	//循环是为了自动执行一系列操作，循环操作数组里的元素添加序号（按数组内的顺序），然后再清除class再命名class当钩子配合提前写好的样式即时改变
	for (var i = 0; i < oLi.length; i++) {
		
		oLi[i].index = i;
		
		oLi[i].onclick = function () {
			for (var i = 0; i < oLi.length; i++) {
				oLi[i].className = "";
				oCon[i].className = "";
			}
			this.className = "sec";
			oCon[this.index].className = "cur";
		}
	}
}

//添加移入触发事件，事件为循环为各li元素和oTxt.div元素添加序号，根据序号自动循环修改属性className，就可以配合之前写好的指定className才会变化的样式来达到自动改样式的效果 


// 第一是实现点击按钮的移入实时响应和动态效果;(onmouseover、用自定序号当钩子同步修改样式字体和背景当高亮)
// 第二是实现对应的内容切换(其实就是用this和循环添加自定序号当钩子来实现)
// 如果发现js执行不了就点开浏览器检查是否存在js代码错误（编辑器里没运行肯定看不出问题，在浏览器里运行如果js存在什么问题都能看得一清二楚）