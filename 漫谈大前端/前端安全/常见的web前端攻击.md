## 常见的web前端攻击方式
> 在互联网时代，数据安全与个人隐私受到了前所未有的挑战，各种新奇的攻击技术层出不穷。如何才能更好地保护我们的数据？本文主要侧重于分析几种常见的攻击的类型以及防御的方法。



### XSS
> XSS，即 Cross Site Script，中译是跨站脚本攻击；其原本缩写是 CSS，但为了和层叠样式表(Cascading Style Sheet)有所区分，因而在安全领域叫做 XSS。

> XSS 是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等。

> XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，利用这些信息冒充用户向网站发起攻击者定义的请求。

> 跨站脚本攻击有可能造成以下影响:
    - 利用虚假输入表单骗取用户个人信息。
    - 利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。
    - 显示伪造的文章或图片。




#### XSS攻击类型
##### 非持久型 XSS（反射型 XSS ）
> 攻击者将脚本混在URL里，服务端接收到URL将恶意代码当做参数取出并拼接在HTML里返回，浏览器解析此HTML后即执行恶意代码。



###### 反射型 XSS 的攻击步骤
    - 攻击者构造出特殊的 URL，其中包含恶意代码。
    - 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
    - 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
    - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

> 反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

> 举一个例子，比如页面中包含有以下代码：
```html
<select>
    <script>
        document.write(''
            + '<option value=1>'
            +     location.href.substring(location.href.indexOf('default=') + 8)
            + '</option>'
        );
        document.write('<option value=2>English</option>');
    </script>
</select>
```
> 攻击者可以直接通过 URL (类似：https://xxx.com/xxx?default=<script>alert(document.cookie)</script>) 注入可执行的脚本代码。不过一些浏览器如Chrome其内置了一些XSS过滤器，可以防止大部分反射型XSS攻击。



###### 非持久型 XSS 漏洞攻击特征
    - 即时性，不经过服务器存储，直接通过 HTTP 的 GET 和 POST 请求就能完成一次攻击，拿到用户隐私数据。
    - 攻击者需要诱骗点击,必须要通过用户点击链接才能发起
    - 反馈率低，所以较难发现和响应修复
    - 盗取用户敏感保密信息



###### 防止出现非持久型 XSS 漏洞，需确保的事情
    - Web 页面渲染的所有内容或者渲染的数据都必须来自于服务端。
    - 尽量不要从 URL，document.referrer，document.forms 等这种 DOM API 中获取数据直接渲染。
    - 尽量不要使用 eval, new Function()，document.write()，document.writeln()，window.setInterval()，window.setTimeout()，innerHTML，document.createElement() 等可执行字符串的方法。
    - 如果做不到以上几点，也必须对涉及 DOM 渲染的方法传入的字符串参数做 escape 转义。
    - 前端渲染的时候对任何的字段都需要做 escape 转义编码。



###### 防范反射型XSS攻击
> 对字符串进行编码。
```js
//对url的查询参数进行转义后再输出到页面。
app.get('/welcome', function(req, res) {
    //对查询参数进行编码，避免反射型 XSS攻击
    res.send(`${encodeURIComponent(req.query.type)}`); 
});
```




##### 持久型 XSS（存储型 XSS）
> 持久型 XSS 漏洞，一般存在于 Form 表单提交等交互功能，如文章留言，提交文本信息等，黑客利用的 XSS 漏洞，将内容经正常功能提交进入数据库持久保存，当前端页面获得后端从数据库中读出的注入代码时，恰好将其渲染执行。




###### 存储型 XSS 的攻击步骤
    - 攻击者将恶意代码提交到目标网站的数据库中。
    - 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
    - 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
    - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

> 反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

> 反射型 XSS 漏洞常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。




###### 持久型 XSS 有以下几个特点
    - 持久性，植入在数据库中
    - 盗取用户敏感私密信息
    - 危害面广



###### 持久型 XSS 攻击成功需要同时满足的条件
    - POST 请求提交表单后端没做转义直接入库。
    - 后端从数据库中取出数据没做转义直接输出给前端。
    - 前端拿到后端数据没做转义直接渲染成 DOM。



###### 防范存储型XSS攻击
    - 前端数据传递给服务器之前，先转义/过滤(防范不了抓包修改数据的情况)
    - 服务器接收到数据，在存储到数据库之前，进行转义/过滤
    - 前端接收到服务器传递过来的数据，在展示到页面前，先进行转义/过滤




##### 基于DOM
> 基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

> DOM 型 XSS 攻击，实际上就是前端 JavaScript 代码不够严谨，把不可信的内容插入到了页面。在使用 .innerHTML、.outerHTML、.appendChild、document.write()等API时要特别小心，不要把不可信的数据作为 HTML 插到页面上，尽量使用 .innerText、.textContent、.setAttribute() 等。


###### DOM 型 XSS 的攻击步骤
    - 攻击者构造出特殊数据，其中包含恶意代码。
    - 用户浏览器执行了恶意代码。
    - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。



###### 防范 DOM 型 XSS 攻击
> 防范 DOM 型 XSS 攻击的核心就是对输入内容进行转义(DOM 中的内联事件监听器和链接跳转都能把字符串作为代码运行，需要对其内容进行检查)。

> 对于url链接(例如图片的src属性)，那么直接使用 encodeURIComponent 来转义。

> 非url，我们可以这样进行编码：
```js
function encodeHtml(str) {
    return str.replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
```
> DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞。





#### XSS 攻击防御
##### 浏览器的防御
> 防御和“X-XSS-Protection”有关，默认值为1，即默认打开XSS防御，可以防御反射型的XSS，不过作用有限，只能防御注入到HTML的节点内容或属性的XSS，例如URL参数中包含script标签。不建议只依赖此防御手段。




##### CSP(Content Security Policy)
> CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。

> CSP可以通过HTTP头部或<meta>元素配置页面的内容安全策略，以控制浏览器可以为该页面获取哪些资源。比如一个可以上传文件和显示图片页面，应该允许图片来自任何地方，但限制表单的action属性只可以赋值为指定的端点。一个经过恰当设计的内容安全策略应该可以有效的保护页面免受跨站脚本攻击。


> 通常可以通过两种方式来开启 CSP：
    - 设置 HTTP Header 中的 Content-Security-Policy
    - 设置 meta 标签的方式

> 这里以设置 HTTP Header 来举例：
###### 只允许加载本站资源
```js
Content-Security-Policy: default-src 'self'
```


###### 只允许加载 HTTPS 协议图片
```js
Content-Security-Policy: img-src https://*
```


###### 允许加载任何来源框架
```js
Content-Security-Policy: child-src 'none'
```
> 对于这种方式来说，只要开发者配置了正确的规则，那么即使网站存在漏洞，攻击者也不能执行它的攻击代码，并且 CSP 的兼容性也不错。

> 严格的 CSP 在 XSS 的防范中可以起到以下的作用：
    - 禁止加载外域代码，防止复杂的攻击逻辑。
    - 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
    - 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
    - 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
    - 合理使用上报可以及时发现 XSS，利于尽快修复问题。




##### 转义字符(输入检查)
> 用户的输入永远不可信任的，最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义。(对输入内容中的<script><iframe>等标签进行转义或者过滤)
```js
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```

> 但是对于显示富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。
```js
const xss = require('xss')
let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
console.log(html)
```
> 以上示例使用了 js-xss 来实现，可以看到在输出中保留了 h1 标签且过滤了 script 标签。



###### 防御HTML节点内容
> 存在风险的代码：
```html
<template>
    <p>{{username}}</p>
</template>

<script>
    username = "<script>alert('xss')</script>"
</script>
```

> 编译后的代码：
```html
<p>
    <script>alert('xss')</script>
</p>
```

> 以上例子是采用vue语法，但其实在vue这样的框架中，{{username}}中的内容是经过字符串化的，所以是不会被浏览器执行的，若换其他模板语言例如jade，则可能存在风险。下同。

> 防御代码：
```html
<!-- 通过转义<为&lt以及>为&gt来实现防御HTML节点内容 -->
<template>
    <p>{{username}}</p>
</template>
<script>
    escape = function(str){
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
    username = escape("<script>alert('xss')</script>")
</script>
```



###### 防御HTML属性
> 存在风险的代码：
```html
<template>
    <img :src="image" />
</template>
<script>
    image = 'www.a.com/c.png" onload="alert(1)'
</script>
```

> 编译后代码：
```html
<img src="www.a.com/c.png" onload="alert(1)" />
```

> 防御代码：
```html
<!-- 通过转义"为&quto;、'为&#39;来实现防御，一般不转义空格，但是这要求属性必须带引号！ -->
<template>
    <img :src="image" />
</template>
<script>
    escape = function(str){
        return str.replace(/"/g, '&quto;').replace(/'/g, '&#39;').replace(/ /g, '&#32;')
    }
    image = escape('www.a.com/c.png" onload="alert(1)')
</script>
```



###### 防御javaScript代码
> 假设访问页面地址为www.a.com?id=1";alert(1);"

> 风险代码：
```js
var id = getQuery('id')
```

> 编译后代码：
```js
var id = "1";alert(1);""
```

> 防御代码：
```js
//通过将数据进行JSON序列化
escape = function(str){
    return JSON.stringify(str)
}
```




###### 防御富文本
> 风险代码：
```html
<template>
    <p v-html="richTxt"></p>
</template>

<script>
    richTxt = '<a onmouseover=alert(document.cookie)>点击</a>'
</script>
```
> 上面的这段代码中，当鼠标移动到“点击”上面时，就会触发alert弹窗！这在vue中是会发生的。

> 防御富文本是比较复杂的工程，因为富文本可以包含HTML和script，这些难以预测与防御，建议是通过白名单的方式来过滤允许的HTML标签和标签的属性来进行防御，大概的实现方式是：
    - 将HTML代码段转成树级结构的数据
    - 遍历树的每一个节点，过滤节点的类型和属性，或进行特殊处理
    - 处理完成后，将树级结构转化成HTML代码

> 当然，也可以通过开源的第三方库来实现，类似的有js-xss。




##### 设置httpOnly
> 这是预防XSS攻击窃取用户cookie最有效的防御手段。Web应用程序在设置cookie时，将其属性设为HttpOnly，就可以避免该网页的cookie被客户端恶意JavaScript窃取，保护用户cookie信息。(禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。)




##### 验证码
> 防止脚本冒充用户提交危险操作。



#### 总结
> 防范存储型和反射型 XSS 是后端 RD 的责任。而 DOM 型 XSS 攻击不发生在后端，是前端 RD 的责任。防范 XSS 是需要后端 RD 和前端 RD 共同参与的系统工程。转义应该在输出 HTML 时进行，而不是在提交用户输入时。

> 不同的上下文，如 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等，所需要的转义规则不一致。 业务 RD 需要选取合适的转义库，并针对不同的上下文调用不同的转义规则。

> 整体的 XSS 防范是非常复杂和繁琐的，我们不仅需要在全部需要转义的位置，对数据进行对应的转义。而且要防止多余和错误的转义，避免正常的用户输入出现乱码。虽然很难通过技术手段完全避免 XSS，但我们可以总结以下原则减少漏洞的产生：
    - 利用模板引擎 开启模板引擎自带的 HTML 转义功能。例如： 在 ejs 中，尽量使用 <%= data %> 而不是 <%- data %>； 在 doT.js 中，尽量使用 {{! data } 而不是 {{= data }； 在 FreeMarker 中，确保引擎版本高于 2.3.24，并且选择正确的 freemarker.core.OutputFormat。
     
    - 避免内联事件 尽量不要使用 onLoad="onload('{{data}}')"、onClick="go('{{action}}')" 这种拼接内联事件的写法。在 JavaScript 中通过 .addEventlistener() 事件绑定会更安全。
     
    - 避免拼接 HTML 前端采用拼接 HTML 的方法比较危险，如果框架允许，使用 createElement、setAttribute 之类的方法实现。或者采用比较成熟的渲染框架，如 Vue/React 等。
     
    - 时刻保持警惕 在插入位置为 DOM 属性、链接等位置时，要打起精神，严加防范。
     
    - 增加攻击难度，降低攻击后果 通过 CSP、输入长度配置、接口安全措施等方法，增加攻击的难度，降低攻击的后果。
     
    - 主动检测和发现 可使用 XSS 攻击字符串和自动扫描工具寻找潜在的 XSS 漏洞。





### CSRF
> CSRF(Cross Site Request Forgery)，即跨站请求伪造，是一种常见的Web攻击，它利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作。



#### 典型的CSRF攻击流程
    - 受害者登录A站点，并保留了登录凭证（Cookie）。
    - 攻击者诱导受害者访问了站点B。
    - 站点B向站点A发送了一个请求，浏览器会默认携带站点A的Cookie信息。
    - 站点A接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是无辜的受害者发送的请求。
    - 站点A以受害者的名义执行了站点B的请求。
    - 攻击完成，攻击者在受害者不知情的情况下，冒充受害者完成了攻击。

> 完成 CSRF 攻击必须要有三个条件
    - 用户已经登录了站点 A，并在本地记录了 cookie
    - 在用户没有登出站点 A 的情况下（也就是 cookie 生效的情况下），访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点A)。
    - 站点 A 没有做任何 CSRF 防御




#### CSRF的特点
    - 攻击通常在第三方网站发起，如上的站点B，站点A无法防止攻击发生。
    - 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；并不会去获取cookie信息(cookie有同源策略)
    - 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
    - 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

> CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。




#### CSRF的攻击类型
##### GET类型的CSRF
> GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用：
```js
 ![](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ff0cdbee.example/withdraw?amount=10000&for=hacker)
```
> 在受害者访问含有这个img的页面后，浏览器会自动向http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker发出一次HTTP请求。bank.example就会收到包含受害者登录信息的一次跨域请求。




##### POST类型的CSRF
> 这种类型的CSRF利用起来通常使用的是一个自动提交的表单，如：
```html
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```
> 访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。POST类型的攻击通常比GET要求更加严格一点，但仍并不复杂。任何个人网站、博客，被黑客上传页面的网站都有可能是发起攻击的来源，后端接口不能将安全寄托在仅允许POST上面。




##### 链接类型的CSRF
> 链接类型的CSRF并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：
```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
<a/>
```
> 由于之前用户登录了信任的网站A，并且保存登录状态，只要用户主动访问上面的这个html页面，则表示攻击成功。




#### CSRF攻击防御
> 防范 CSRF 攻击可以遵循以下几种规则：
    - Get 请求不对数据进行修改
    -不让第三方网站访问到用户 Cookie
    - 阻止第三方网站请求接口
    - 请求时附带验证信息，比如验证码或者 Token

> CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性。上文中讲了CSRF的两个特点：
    - CSRF（通常）发生在第三方域名。
    - CSRF攻击者不能获取到Cookie等信息，只是使用。

> 针对这两点，我们可以专门制定防护策略，如下：
    - 阻止不明外域的访问
        - 同源检测
        - Samesite Cookie

    - 提交时要求附加本域才能获取的信息
        - CSRF Token
        - 双重Cookie验证




##### 添加验证码(体验不好)
> 验证码能够防御CSRF攻击，但是我们不可能每一次交互都需要验证码，否则用户的体验会非常差，但是我们可以在转账，交易等操作时，增加验证码，确保我们的账户安全。




##### Referer Check(并不安全，Referer可以被更改)
> HTTP Referer是header的一部分，当浏览器向web服务器发送请求时，一般会带上Referer信息告诉服务器是从哪个页面链接过来的，服务器籍此可以获得一些信息用于处理。可以通过检查请求的来源来防御CSRF攻击。正常请求的referer具有一定规律，如在提交表单的referer必定是在该页面发起的请求。所以通过检查http包头referer的值是不是这个页面，来判断是不是CSRF攻击。

> 但在某些情况下如从https跳转到http，浏览器处于安全考虑，不会发送referer，服务器就无法进行check了。若与该网站同域的其他网站有XSS漏洞，那么攻击者可以在其他网站注入恶意脚本，受害者进入了此类同域的网址，也会遭受攻击。出于以上原因，无法完全依赖Referer Check作为防御CSRF的主要手段。但是可以通过Referer Check来监控CSRF攻击的发生。




##### Anti CSRF Token(主流)
> 目前比较完善的解决方案是加入Anti-CSRF-Token。即发送请求时在HTTP 请求中以参数的形式加入一个随机产生的token，并在服务器建立一个拦截器来验证这个token。服务器读取浏览器当前域cookie中这个token值，会进行校验该请求当中的token和cookie当中的token值是否都存在且相等，才认为这是合法的请求。否则认为这次请求是违法的，拒绝该次服务。

> 这种方法相比Referer检查要安全很多，token可以在用户登陆后产生并放于session或cookie中，然后在每次请求时服务器把token从session或cookie中拿出，与本次请求中的token 进行比对。由于token的存在，攻击者无法再构造出一个完整的URL实施CSRF攻击。但在处理多个页面共存问题时，当某个页面消耗掉token后，其他页面的表单保存的还是被消耗掉的那个token，其他页面的表单提交时会出现token错误。

> CSRF攻击之所以能够成功，是因为服务器误把攻击者发送的请求当成了用户自己的请求。那么我们可以要求所有的用户请求都携带一个CSRF攻击者无法获取到的Token。服务器通过校验请求是否携带正确的Token，来把正常的请求和攻击的请求区分开。跟验证码类似，只是用户无感知。
    - 服务端给用户生成一个token，加密后传递给用户
    - 用户在提交请求时，需要携带这个token
    - 服务端验证token是否正确




##### Samesite Cookie属性
> 为了从源头上解决这个问题，Google起草了一份草案来改进HTTP协议，为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax。部署简单，并能有效防御CSRF攻击，但是该属性目前并不是所有浏览器都兼容。

> Samesite = Strict 
    Samesite = Strict 被称为是严格模式,表明这个 Cookie 在任何情况都不可能作为第三方的 Cookie，有能力阻止所有CSRF攻击。此时，我们在B站点下发起对A站点的任何请求，A站点的 Cookie 都不会包含在cookie请求头中。

> Samesite = Lax
    Samesite = Lax 被称为是宽松模式，与 Strict 相比，放宽了限制，允许发送安全 HTTP 方法带上 Cookie，如 Get / OPTIONS 、HEAD 请求。但是不安全 HTTP 方法，如：POST, PUT, DELETE 请求时，不能作为第三方链接的 Cookie

> 为了更好的防御CSRF攻击，我们可以组合使用以上防御手段。



##### 双重Cookie验证
> 在会话中存储CSRF Token比较繁琐，而且不能在通用的拦截上统一处理所有的接口。那么另一种防御措施是使用双重提交Cookie。利用CSRF攻击不能获取到用户Cookie的特点，我们可以要求Ajax和表单请求携带一个Cookie中的值。

> 双重Cookie采用以下流程：
    - 在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如csrfcookie=v8g9e4ksfhw）。
    - 在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw）。
    - 后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。

> 此方法相对于CSRF Token就简单了许多。可以直接通过前后端拦截的的方法自动化实现。后端校验也更加方便，只需进行请求中字段的对比，而不需要再进行查询和存储Token。当然，此方法并没有大规模应用，其在大型网站上的安全性还是没有CSRF Token高，原因我们举例进行说明。

> 由于任何跨域都会导致前端无法获取Cookie中的字段（包括子域名之间），于是发生了如下情况：
    - 如果用户访问的网站为www.a.com，而后端的api域名为api.a.com。那么在www.a.com下，前端拿不到api.a.com的Cookie，也就无法完成双重Cookie认证。
    - 于是这个认证Cookie必须被种在a.com下，这样每个子域都可以访问。
    - 任何一个子域都可以修改a.com下的Cookie。
    - 某个子域名存在漏洞被XSS攻击（例如upload.a.com）。虽然这个子域下并没有什么值得窃取的信息。但攻击者修改了a.com下的Cookie。
    - 攻击者可以直接使用自己配置的Cookie，对XSS中招的用户再向www.a.com下，发起CSRF攻击。



###### 总结
> 用双重Cookie防御CSRF的优点：
    - 无需使用Session，适用面更广，易于实施。
    - Token储存于客户端中，不会给服务器带来压力。
    - 相对于Token，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。

> 缺点：
    - Cookie中增加了额外的字段。
    - 如果有其他漏洞（例如XSS），攻击者可以注入Cookie，那么该防御方式失效。
    - 难以做到子域名的隔离。
    -为了确保Cookie传输安全，采用这种防御方式的最好确保用整站HTTPS的方式，如果还没切HTTPS的使用这种方式也会有风险。




##### 防止网站被利用
> 前面所说的，都是被攻击的网站如何做好防护。而非防止攻击的发生，CSRF的攻击可以来自：
    - 攻击者自己的网站。
    - 有文件上传漏洞的网站。
    - 第三方论坛等用户内容。
    -被攻击网站自己的评论功能等。

> 对于来自黑客自己的网站，我们无法防护。但对其他情况，那么如何防止自己的网站被利用成为攻击的源头呢？
    - 严格管理所有的上传接口，防止任何预期之外的上传内容（例如HTML）。
    - 添加Header X-Content-Type-Options: nosniff 防止黑客上传HTML内容的资源（例如图片）被解析为网页。
    - 对于用户上传的图片，进行转存或者校验。不要直接使用用户填写的图片链接。
    - 当前用户打开其他用户填写的链接时，需告知风险（这也是很多论坛不允许直接在内容中发布外域链接的原因之一，不仅仅是为了用户留存，也有安全考虑）。




#### 总结
> 简单总结一下上文的防护策略：  
    - CSRF自动防御策略：同源检测（Origin 和 Referer 验证）。
    - CSRF主动防御措施：Token验证 或者 双重Cookie验证 以及配合Samesite Cookie。
    - 保证页面的幂等性，后端接口不要在GET页面中做用户操作。

> 为了更好的防御CSRF，最佳实践应该是结合上面总结的防御措施方式中的优缺点来综合考虑，结合当前Web应用程序自身的情况做合适的选择，才能更好的预防CSRF的发生。




### 点击劫持
> 点击劫持是指在一个Web页面中隐藏了一个透明的iframe，用外层假页面诱导用户点击，实际上是在隐藏的frame上触发了点击事件进行一些用户不知情的操作。



#### 典型点击劫持攻击流程
    - 攻击者构建了一个非常有吸引力的网页
    - 将被攻击的页面放置在当前页面的 iframe 中
    - 使用样式将 iframe 叠加到非常有吸引力内容的上方
    - 将iframe设置为100%透明
    - 你被诱导点击了网页内容，你以为你点击的是***，而实际上，你成功被攻击了。



#### 特点
    - 隐蔽性较高，骗取用户操作
    - "UI-覆盖攻击"
    - 利用iframe或者其它标签的属性



#### 点击劫持防御
##### frame busting
> Frame busting
```js
if ( top.location != window.location ){
    top.location = window.location
}
```
> 需要注意的是: HTML5中iframe的 sandbox 属性、IE中iframe的security 属性等，都可以限制iframe页面中的JavaScript脚本执行，从而可以使得 frame busting 失效。



##### X-Frame-Options
> X-FRAME-OPTIONS是微软提出的一个 HTTP 响应头，专门用来防御利用iframe嵌套的点击劫持攻击。并且在IE8、Firefox3.6、Chrome4以上的版本均能很好的支持。

> 该响应头有三个值可选，分别是
    - DENY，表示页面不允许通过 iframe 的方式展示(拒绝任何域加载)
    - SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示(允许同源域下加载)
    - ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示(可以定义允许frame加载的页面地址)



##### JavaScript 防御
> 对于某些远古浏览器来说，并不能支持上面的这种方式，那我们只有通过 JS 的方式来防御点击劫持了。
```html
<head>
  <style id="click-jack">
    html {
      display: none !important;
    }
  </style>
</head>
<body>
  <script>
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
  </script>
</body>
```
> 以上代码的作用就是当通过 iframe 的方式加载页面时，攻击者的网页直接不显示所有内容了。





### URL跳转漏洞
> 定义：借助未验证的URL跳转，将应用程序引导到不安全的第三方区域，从而导致的安全问题。



#### URL跳转漏洞原理
> 黑客利用URL跳转漏洞来诱导安全意识低的用户点击，导致用户信息泄露或者资金的流失。其原理是黑客构建恶意链接(链接需要进行伪装,尽可能迷惑),发在QQ群或者是浏览量多的贴吧/论坛中。安全意识低的用户点击后,经过服务器或者浏览器解析后，跳到恶意的网站中。

> 恶意链接需要进行伪装,经常的做法是熟悉的链接后面加上一个恶意的网址，这样才迷惑用户。

> 诸如伪装成像如下的网址，你是否能够识别出来是恶意网址呢？
```html
http://gate.baidu.com/index?act=go&url=http://t.cn/RVTatrd
http://qt.qq.com/safecheck.html?flag=1&url=http://t.cn/RVTatrd
http://tieba.baidu.com/f/user/passport?jumpUrl=http://t.cn/RVTatrd
```



#### 实现方式
    - Header头跳转
    - Javascript跳转
    - META标签跳转

> 这里我们举个Header头跳转实现方式：
```js
$url=$_GET['jumpto'];
header("Location: $url");
```

```html
http://www.wooyun.org/login.php?jumpto=http://www.evil.com
```
> 这里用户会认为www.wooyun.org都是可信的，但是点击上述链接将导致用户最终访问www.evil.com这个恶意网址。




#### 如何防御
##### referer的限制
> 如果确定传递URL参数进入的来源，我们可以通过该方式实现安全限制，保证该URL的有效性，避免恶意用户自己生成跳转链接



##### 加入有效性验证Token
> 我们保证所有生成的链接都是来自于我们可信域的，通过在生成的链接里加入用户不可控的Token对生成的链接进行校验，可以避免用户生成自己的恶意链接从而被利用，但是如果功能本身要求比较开放，可能导致有一定的限制。





### SQL注入
> SQL注入是一种常见的Web安全漏洞，攻击者利用这个漏洞，可以访问或修改数据，或者利用潜在的数据库漏洞进行攻击。攻击者向服务器提交恶意的sql代码，导致程序执行包含恶意代码的sql。



#### SQL注入的原理
> 我们先举一个万能钥匙的例子来说明其原理：
```html
<form action="/login" method="POST">
    <p>Username: <input type="text" name="username" /></p>
    <p>Password: <input type="password" name="password" /></p>
    <p><input type="submit" value="登陆" /></p>
</form>
```

> 后端的 SQL 语句可能是如下这样的：
```sql
let querySQL = `
    SELECT *
    FROM user
    WHERE username='${username}'
    AND psw='${password}'
`;
// 接下来就是执行 sql 语句...
```
> 这是我们经常见到的登录页面，但如果有一个恶意攻击者输入的用户名是 admin' --，密码随意输入，就可以直接登入系统了。why! ----这就是SQL注入

> 我们之前预想的SQL 语句是:
```sql
SELECT * FROM user WHERE username='admin' AND psw='password'
```

> 但是恶意攻击者用奇怪用户名将你的 SQL 语句变成了如下形式：
```sql
SELECT * FROM user WHERE username='admin' --' AND psw='xxxx'
```

> 在 SQL 中,' --是闭合和注释的意思，-- 是注释后面的内容的意思，所以查询语句就变成了：
```sql
SELECT * FROM user WHERE username='admin'
```

> 所谓的万能密码,本质上就是SQL注入的一种利用方式。

> 一次SQL注入的过程包括以下几个过程：
    - 获取用户请求参数
    - 拼接到代码当中
    - SQL语句按照我们构造参数的语义执行成功

> SQL注入的必备条件： 
    - 可以控制输入的数据
    - 服务器要执行的代码拼接了控制的数据。

> 我们会发现SQL注入流程中与正常请求服务器类似，只是黑客控制了数据，构造了SQL查询，而正常的请求不会SQL查询这一步，SQL注入的本质:数据和代码未分离，即数据当做了代码来执行。



#### 危害
    - 获取数据库信息
        - 管理员后台用户名和密码
        - 获取其他数据库敏感信息：用户名、密码、手机号码、身份证、银行卡信息……
        - 整个数据库：脱裤
    - 获取服务器权限
    - 植入Webshell，获取服务器后门
    - 读取服务器敏感文件



#### 如何防御
    - 严格限制Web应用的数据库的操作权限，给此用户提供仅仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害。

    - 后端代码检查输入的数据是否符合预期，严格限制变量的类型，例如使用正则表达式进行一些匹配处理。

    - 对进入数据库的特殊字符（'，"，\，<，>，&，*，; 等）进行转义处理，或编码转换。基本上所有的后端语言都有对字符串进行转义处理的方法，比如 lodash 的 lodash._escapehtmlchar 库。

    - 所有的查询语句建议使用数据库提供的参数化查询接口，参数化的语句使用参数而不是将用户输入变量嵌入到 SQL 语句中，即不要直接拼接 SQL 语句。例如 Node.js 中的 mysqljs 库的 query 方法中的 ? 占位参数。

    - 在应用发布前，使用专业的sql 注入检测工具进行检测，及时发现和修补sql注入漏洞。





### OS命令注入攻击
> OS命令注入和SQL注入差不多，只不过SQL注入是针对数据库的，而OS命令注入是针对操作系统的。OS命令注入攻击指通过Web应用，执行非法的操作系统命令达到攻击的目的。只要在能调用Shell函数的地方就有存在被攻击的风险。倘若调用Shell时存在疏漏，就可以执行插入的非法命令。

> 命令注入攻击可以向Shell发送命令，让Windows或Linux操作系统的命令行启动程序。也就是说，通过命令注入攻击可执行操作系统上安装着的各种程序。



#### OS命令注入的原理
> 黑客构造命令提交给web应用程序，web应用程序提取黑客构造的命令，拼接到被执行的命令中，因黑客注入的命令打破了原有命令结构，导致web应用执行了额外的命令，最后web应用程序将执行的结果输出到响应页面中。

> 我们通过一个例子来说明其原理，假如需要实现一个需求：用户提交一些内容到服务器，然后在服务器执行一些系统命令去返回一个结果给用户
```js
// 以 Node.js 为例，假如在接口中需要从 github 下载用户指定的 repo
const exec = require('mz/child_process').exec;
let params = {/* 用户输入的参数 */};
exec(`git clone ${params.repo} /some/path`);
```

> 如果 params.repo 传入的是 https://github.com/admin/admin.github.io.git 确实能从指定的 git repo 上下载到想要的代码。但是如果 params.repo 传入的是 https://github.com/xx/xx.git && rm -rf /* && 恰好你的服务是用 root 权限起的就糟糕了。



#### 如何防御
    - 后端对前端提交内容进行规则限制（比如正则表达式）。
    - 在调用系统命令前对所有传入参数进行命令行参数转义过滤。
    - 不要直接拼接命令语句，借助一些工具做拼接、转义预处理，例如 Node.js 的 shell-escape npm包






### 钓鱼攻击
> 攻击者会发送给受害者一个合法链接，当链接被点击时，用户被导向一个似是而非的非法网站，从而达到骗取用户信任、窃取用户资料的目的。



#### 防御措施
    - 对所有的重定向操作进行审核，以避免重定向到一个危险的地方。常见解决方案是白名单，将允许重定向的url加到白名单中，非白名单上的域名重定向时拒绝；

    - 重定向token，在合法的url上加上token，重定向时进行验证。





## 安全扫描工具
> 上面我们介绍了几种常见的前端安全漏洞，也了解一些防范措施，那么我们如何发现自己网站的安全问题呢？没有安全部门的公司可以考虑下面几款开源扫码工具：



### Arachni
> Arachni是基于Ruby的开源，功能全面，高性能的漏洞扫描框架，Arachni提供简单快捷的扫描方式，只需要输入目标网站的网址即可开始扫描。它可以通过分析在扫描过程中获得的信息，来评估漏洞识别的准确性和避免误判。

> Arachni默认集成大量的检测工具，可以实施 代码注入、CSRF、文件包含检测、SQL注入、命令行注入、路径遍历等各种攻击。同时，它还提供了各种插件，可以实现表单爆破、HTTP爆破、防火墙探测等功能。针对大型网站，该工具支持会话保持、浏览器集群、快照等功能，帮助用户更好实施渗透测试。




### Mozilla HTTP Observatory
> Mozilla HTTP Observatory，是Mozilla最近发布的一款名为Observatory的网站安全分析工具，意在鼓励开发者和系统管理员增强自己网站的安全配置。用法非常简单：输入网站URL，即可访问并分析网站HTTP标头，随后可针对网站安全性提供数字形式的分数和字母代表的安全级别。

> 检查的主要范围包括：
    - Cookie
    - 跨源资源共享（CORS）
    - 内容安全策略（CSP）
    - HTTP公钥固定（Public Key Pinning）
    - HTTP严格安全传输（HSTS）状态
    - 是否存在HTTP到HTTPs的自动重定向
    - 子资源完整性（Subresource Integrity）
    - X-Frame-Options
    - X-XSS-Protection




### W3af
> W3af是一个基于Python的Web应用安全扫描器。可帮助开发人员，有助于开发人员和测试人员识别Web应用程序中的漏洞。扫描器能够识别200多个漏洞，包括跨站点脚本、SQL注入和操作系统命令。