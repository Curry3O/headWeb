### 异步加载JS脚本
> 我们都知道渲染引擎遇到 script 标签会停下来，等到执行完脚本，继续向下渲染，如下：
    <script type="text/javascript" src="../a.js" ></script>

> 这样会阻止浏览器的后续解析，只有当前加载完成才能进行下一步操作，所以默认同步执行才是安全的。但是这样如果JS中有输出document内容、修改dom、重定向的行为，就会造成页面阻塞。所以一般建议把`<script>`标签放在`<body>`结尾处，这样尽可能减少页面阻塞。

> 异步加载又被称为非阻塞加载，浏览器在下载JS的同时，还会进行后续页面处理。那么如何实现js异步加载呢?下面整理了多种实现方案供大家参考：

###### 1.Script Dom Element
> 动态创建 script 标签，设置 src 并不会开始下载，而是要添加到文档中，JS文件才会开始下载。
```js
(function(){
    var scriptEle = document.createElement("script");
    scriptEle.type = "text/javasctipt";
    scriptEle.async = true;
    scriptEle.src = "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js";
    var x = document.getElementsByTagName("head")[0];
    x.insertBefore(scriptEle, x.firstChild);       
 })();
```
> `<async>`属性是HTML5中新增的异步支持。此方法被称为Script DOM Element方法
```js
(function(){;
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
```
> 但是这种加载方式执行完之前会阻止onload事件的触发，而现在很多页面的代码都在onload时还执行额外的渲染工作，所以还是会阻塞部分页面的初始化处理。



###### 2.onload时的异步加载
```js
(function(){
    if(window.attachEvent){
        window.attachEvent("load", asyncLoad);
    }else{
        window.addEventListener("load", asyncLoad);
    }
    var asyncLoad = function(){
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    }
})();
```
> 这种方法只是把插入script的方法放在一个函数里面，然后放在window的onload方法里面执行，这样就解决了阻塞onload事件触发的问题。
> 注:DOMContentLoaded与load的区别。前者是在document已经解析完成，页面中的dom元素可用，但是页面中的图片，视频，音频等资源未加载完，作用同jQuery中的ready事件；后者的区别在于页面所有资源全部加载完毕。




###### 3.$(document).ready()
```html
<script src="http://common.cnblogs.com/script/jquery.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function() {
        alert("加载完成！");
    });
</script>
```
> 需要引入jquery，兼容所有浏览器  



###### 4.<script>标签的 async = "async" 属性
    - async属性是HTML5新增属性，需要Chrome、FireFox、IE9+浏览器支持
    - async属性规定一旦脚本可用，则会异步执行
    - async属性仅适用于外部脚本（只有在使用 src 属性时）
    - 此方法不能保证脚本按顺序执行
    - 他们将在onload事件之前完成

```js
<script type="text/javascript" src="xxx.js" async="async"></script>
```



###### 5.<script>标签的 defer = "defer" 属性
    - defer属性规定是否对脚本执行进行延迟，直到页面加载为止
    - 如果脚本不会改变文档的内容，可将defer属性加入到<script>标签中，以便加快处理文档的速度。因为浏览器知道它将能够安全地读取文档的剩余部分而不用执行脚本，它将推迟对脚本的解释，直到文档已经显示给用户为止。
    - 兼容所有浏览器
    - 此方法可以确保所有设置了defer属性的脚本按顺序执行
```html
<script type="text/javascript" defer="defer">
    alert(document.getElementById("p1").firstChild.nodeValue);
</script>
```

> `<script>` 标签中增加 async(html5) 或者 defer(html4) 属性,脚本就会异步加载。   defer 和 async 的区别在于：
    - defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成）,在 window.onload 之前执行
    - async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
    - 如果有多个 defer 脚本，会按照它们在页面出现的顺序加载
    - 多个 async 脚本不能保证加载顺序



###### 6.es6模块 type = "module" 属性
> 浏览器对于带有 type = "module" 的 `<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了 `<script>` 标签的 defer 属性。如下：
```html
<script type="module" src="xxx.js"></script>
```

> ES6模块允许内嵌在网页中，语法行为与加载外部脚本一致，如下：
```html
<script type="module">
   import utils from "./utils.js";
   // other code
</script>
```



###### 7.XHR异步加载JS
> XHR Injection(XHR 注入)：通过 XMLHttpRequest 来获取javascript，然后创建一个script元素插入到DOM结构中。ajax请求成功后设置script.text为请求成功后返回的 responseText。
```js
//获取XMLHttpRequest对象，考虑兼容性。
var getXmlHttp = function(){
    var obj;
    if (window.XMLHttpRequest)
        obj = new XMLHttpRequest();
    else
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    return obj;
};  
//采用Http请求get方式;open()方法的第三个参数表示采用异步(true)还是同步(false)处理
var xmlHttp = getXmlHttp();
xmlHttp.open("GET", "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js", true);
xmlHttp.send(); 
xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var script = document.createElement("script");
        script.text = xmlHttp.responseText;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}		
```



###### 8.XHR Eval
> 与XHR Injection对responseText的执行方式不同，直接把responseText放在eval()函数里面执行。
```js
//获取XMLHttpRequest对象，考虑兼容性。
var getXmlHttp = function(){
    var obj;
    if (window.XMLHttpRequest)
        obj = new XMLHttpRequest();
    else
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    return obj;
};  
//采用Http请求get方式;open()方法的第三个参数表示采用异步(true)还是同步(false)处理
var xmlHttp = getXmlHttp();
xmlHttp.open("GET", "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js", true);
xmlHttp.send(); 
xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        eval(xmlHttp.responseText);
        //alert($);//可以弹出$,表明JS已经加载进来。click事件放在其它地方会出问题，应该是还没加载进来
        $("#btn1").click(function(){
            alert($(this).text());
        });
    }
}		
```



###### 9.Script In Irame
> 在父窗口插入一个iframe元素，然后再iframe中执行加载JS的操作。
```js
var insertJS = function(){alert(2)};
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
//获取iframe中的window要用contentWindow属性。
var doc = iframe.contentWindow.document;
doc.open();
doc.write("<script>var insertJS = function(){};</script><body onload='insertJS()'></body>");
doc.close();
```



###### 10.GMail Mobile
> 业内JS内容被注释，所以不会执行，在需要的时候，获取script中的text内容去掉注释，调用eval()执行。
```html
<script type="text/javascript"> 
    /* 
    var ... 
    */ 
</script>
```



###### 11.使用setTimeout延迟方法的加载时间
> 有些JS代码在某些情况在需要使用，并不是页面初始化的时候就要用到。延迟加载就是为了解决这个问题。将JS切分成许多模块，页面初始化时只加载需要立即执行的JS，然后其它JS的加载延迟到第一次需要用到的时候再加载。类似图片的延迟加载。

> JS的加载分为两个部分：下载和执行。异步加载只是解决了下载的问题，但是代码在下载完成后就会立即执行，在执行过程中浏览器处于阻塞状态，响应不了任何需求。

> 解决思路：为了解决JS延迟加载的问题，可以利用异步加载缓存起来，但不立即执行，需要的时候在执行。如何进行缓存呢？将JS内容作为Image或者Object对象加载缓存起来，所以不会立即执行，然后在第一次需要的时候在执行。
```html
<!-- 延迟加载js代码，给网页加载留出时间 -->
<script type="text/javascript">
    function A(){
        $.post("/lord/login",{name:username,pwd:password},function(){
            alert("Hello World!");
        })
    }
    $(function (){
        setTimeout("A()",1000); //延迟1秒
    })
</script>
```
> JS延迟加载机制(LazyLoad)：简单来说，就是在浏览器滚动到某个位置在触发相关的函数，实现页面元素的加载或者某些动作的执行。如何实现浏览器滚动位置的检测呢？可以通过一个定时器来实现，通过比较某一时刻页面目标节点位置和浏览器滚动条高度来判断是否需要执行函数。