你所看到的html为不同功能展示,其中lunar.html是农历demo展示,如果你已使用过Fullcalendar可以直接拿去使用,如果你还只是在调研是否要使用或者想看看复杂度可以继续看接下来的说明

* 首先我们在头部引入了这些css和js

```
	<link href='../packages/core/main.css' rel='stylesheet' />
    <link href='./lunar/daygrid/main.css' rel='stylesheet' />
    <script src='../packages/core/main.js'></script>
    <script src='../packages/interaction/main.js'></script>
    <script src="./lunar/lunar.js"></script>
    <script src='./lunar/daygrid/main.js'></script>
```
  关于这些引入文件的详细说明参考[Plugin Index](https://fullcalendar.io/docs/plugin-index),这里我们引入`daygrid`,正常我们是需要在packages中引入,为了做农历展示我们需要修改 daygrid/main.js,所以copy一份至lunar文件夹下,当然我们需要在daygrid/main.js中使用lunar.js计算农历,所以在前面引入lunar.js

 * 修改插件的代码
 虽然fullcalendar的版本升级了,但是我们修改的位置并没有改变,如以后升级到 5.0、6.0还是按此思路去修改
 
 ```
   // daygrid/main.js 912行
     		// -------- 农历相关代码 --------
            var cTerm = lunar(date).term;
            if (cTerm) {
                html += "<div class='fc-day-cnTerm'>" + cTerm + "</div>";
            }
            var fes = lunar(date).festival();
            if (fes && fes.length > 0) {
                html += "<div class='fc-day-cnTerm'>" + fes[0].desc + "</div>";
            }
            if (!cTerm && (!fes || fes.length == 0)) {
                html += "<div class='fc-day-cnDate'>" + lunar(date).lMonth + "月" + lunar(date).lDate + "</div>";
            }
            // -------- 农历相关代码 --------
 ```
 
 ```
   // daygrid/main.css 末尾添加,你可以修改自己想要的样式
   
   /* 添加农历样式 */

	.fc table>thead>tr>th div {
	  font-weight: bold;
	  color: #25992E;
	  font-size: 16px;
	}
	
	.fc-sat span, .fc-sun div {
	  color: #ED6D23 !important;
	}
	
	.fc-ltr .fc-basic-view .fc-day-top .fc-day-number {
	  width: 100%;
	  text-align: right;
	  display: block;
	  font-size: 20px;
	  font-family: Arial;
	  font-weight: 600;
	  padding: 12px 12px 0 12px;
	  line-height: 23px;
	  height: 23px;
	  color: #555;
	}
	
	.fc-day-cnTerm {
	  text-align: right;
	  padding: 12px 12px 0 12px;
	  color: #6ABA49;
	  font-size: 12px;
	}
	
	.fc-day-cnDate {
	  text-align: right;
	  padding: 12px 12px 0 12px;
	  color: #999;
	  font-size: 12px;
	}
 ```
 
 ```
  // core/mian.js 3437行
   		else {
            return '<div' + attrs + '>' +
                innerHtml +
                '</div>';
        }
  
 ```
 
 更多的功能可以下载去体验也可去官网.
 如有问题请发送邮件至 mtgr1020@gmail.com