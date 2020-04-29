### JSON (JavaScript Object Notation)
> JSON(JavaScript Object Notation)是一种轻量级的数据交换格式，它基于JavaScript的一个子集，易于人的编写和阅读，也易于机器解析。 JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, C++, C#, Java, JavaScript, Perl, Python等）。 这些特性使JSON成为理想的数据交换语言。



#### JSON的2种结构形式
###### 键值对形式
> 键值对的无序集合 —— 对象(或者叫记录、结构、字典、哈希表、有键列表或关联数组等)

> 数据规则：
    对象是一个无序键值对的集合，以"{"开始，同时以"}"结束，键值对之间以":"相隔，不同的键值对之间以","相隔，举例

```json
{
  "person": {
    "name": "pig",
    "age": "18",
    "sex": "man",
    "hometown": {
      "province": "江西省",
      "city": "抚州市",
      "county": "崇仁县"
    }
  }
}
```




###### 数组形式
> 值的有序列表 —— 数组

> 数据规则：
    数组是值（value）的有序集合。一个数组以“[”（左中括号）开始，“]”（右中括号）结束。值之间使用“,”（逗号）分隔。

> 值（value）可以是双引号括起来的字符串（string）、数值(number)、true、false、 null、对象（object）或者数组（array）。这些结构可以嵌套。

```json
["pig", 18, "man", "江西省抚州市崇仁县"]
```



#### JOSN的6种数据类型
> 上面两种JSON形式内部都是包含value的，那JSON的value到底有哪些类型，而且上期我们说JSON其实就是从Js数据格式中提取了一个子集，那具体有哪几种数据类型呢？
    - string：字符串，必须要用双引号引起来。
    - number：数值，与JavaScript的number一致，整数（不使用小数点或指数计数法）最多为 15 位。小数的最大位数是 17。
    - object：JavaScript的对象形式，{ key:value }表示方式，可嵌套。
    - array：数组，JavaScript的Array表示方式[ value ]，可嵌套。
    - true/false：布尔类型，JavaScript的boolean类型。
    - null：空值，JavaScript的null。




#### JSON使用场景
###### 接口返回数据
> JSON用的最多的地方莫过于Web了，现在的数据接口基本上都是返回的JSON，具体细化的场景有：
    - Ajxa异步访问数据
    - RPC远程调用
    - 前后端分离后端返回的数据
    - 开放API，如百度、高德等一些开放接口
    - 企业间合作接口

> 这种API接口一般都会提供一个接口文档，说明接口的入参、出参等，一般的接口返回数据都会封装成JSON格式，比如类似下面这种
```json
{
    "code": 1,
    "msg": "success",
    "data": {
        "name": "pig",
        "age": "18",
        "sex": "man",
        "hometown": {
            "province": "江西省",
            "city": "抚州市",
            "county": "崇仁县"
        }
    }
}
```




###### 序列化
> 程序在运行时所有的变量都是保存在内存当中的，如果出现程序重启或者机器宕机的情况，那这些数据就丢失了。一般情况运行时变量并不是那么重要丢了就丢了，但有些内存中的数据是需要保存起来供下次程序或者其他程序使用。

> 保存内存中的数据要么保存在数据库，要么保存直接到文件中，而将内存中的数据变成可保存或可传输的数据的过程叫做序列化。

> 正常的序列化是将编程语言中的对象直接转成可保存或可传输的，这样会保存对象的类型信息，而JSON序列化则不会保留对象类型！




###### 生成Token
> 首先声明Token的形式多种多样，有JSON、字符串、数字等等，只要能满足需求即可，没有规定用哪种形式。JSON格式的Token最有代表性的莫过于JWT（JSON Web Tokens）。随着技术的发展，分布式web应用的普及，通过Session管理用户登录状态成本越来越高，因此慢慢发展成为Token的方式做登录身份校验，然后通过Token去取Redis中的缓存的用户信息，随着之后JWT的出现，校验方式更加简单便捷化，无需通过Redis缓存，而是直接根据Token取出保存的用户信息，以及对Token可用性校验，单点登录更为简单。

> JWT登录认证有哪些优势：
    - 性能好：服务器不需要保存大量的session
    - 单点登录（登录一个应用，同一个企业的其他应用都可以访问）：使用JWT做一个登录中心基本搞定，很容易实现。
    - 兼容性好：支持移动设备，支持跨程序调用，Cookie 是不允许垮域访问的，而 Token 则不存在这个问题。
    - 安全性好：因为有签名，所以JWT可以防止被篡改。




###### 配置文件
> 说实话JSON作为配置文件使用场景并不多，最具代表性的就是npm的package.json包管理配置文件了，下面就是一个npm的package.json配置文件内容。
```json
{
  "name": "server",       //项目名称
  "version": "0.0.0",
  "private": true,
  "main": "server.js",   //项目入口地址，即执行npm后会执行的项目
  "scripts": {
    "start": "node ./bin/www"  ///scripts指定了运行脚本命令的npm命令行缩写
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",  //指定项目开发所需的模块
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "morgan": "~1.9.0"
  }
}
```
> 但其实JSON并不合适做配置文件，因为它不能写注释、作为配置文件的可读性差等原因。配置文件的格式有很多种如：toml、yaml、xml、ini等，目前很多地方开始使用yaml作为配置文件。





#### JSON和XML的区别
> XML定义：扩展标记语言 (Extensible Markup Language, XML)
    用于标记电子文件使其具有结构性的标记语言，可以用来标记数据、定义数据类型，是一种允许用户对自己的标记语言进行定义的源语言。 XML使用DTD(document type definition)文档类型定义来组织数据;格式统一，跨平台和语言，早已成为业界公认的标准。XML是标准通用标记语言 (SGML) 的子集，非常适合 Web 传输。XML 提供统一的方法来描述和交换独立于应用程序或供应商的结构化数据。XML 被设计用来传输和存储数据。

> JSON定义JSON(JavaScript Object Notation)一种轻量级的数据交换格式
    具有良好的可读和便于快速编写的特性。可在不同平台之间进行数据交换。JSON采用兼容性很高的、完全独立于语言文本格式，同时也具备类似于C语言的习惯(包括C, C++, C#, Java, JavaScript, Perl, Python等)体系的行为。这些特性使JSON成为理想的数据交换语言。JSON基于JavaScript Programming Language , Standard ECMA-262 3rd Edition - December 1999 的一个子集。

> JSON是一种简单的数据交换格式。能够在服务器之间交换数据，特点和优势如下：
    - 与XML类似之处：
        - JSON是纯文本。
        - JSON具有良好的自我描述性，便于阅读。
        - JSON具有层级结构（值中存在值）。
        - JSON可通过JavaScript进行解析。
        - JSON数据可使用AJAX进行传输。
    - 与XML不同之处
        - 没有结束标签
        - 读写速度更快
        - 不使用保留字
        - 结构简单，生成和解析都比较方便






###### XML的优缺点
> XML的优点
    - 格式统一，符合标准；

    - 容易与其他系统进行远程交互，数据共享比较方便。

> XML的缺点
    - XML文件庞大，文件格式复杂，传输占带宽；

    - 服务器端和客户端都需要花费大量代码来解析XML，导致服务器端和客户端代码变得异常复杂且不易维护；

    - 客户端不同浏览器之间解析XML的方式不一致，需要重复编写很多代码；

    - 服务器端和客户端解析XML花费较多的资源和时间。




###### JSON优缺点
> 总结：
    - 数据格式比较简单, 易于读写, 格式都是压缩的, 占用带宽小

    - 易于解析这种语言, 客户端JavaScript可以简单的通过eval()进行JSON数据的读取（浏览器解析）

    - 因为JSON格式能够直接为服务器端代码使用, 大大简化了服务器端和客户端的代码开发量, 但是完成的任务不变, 且易于维护。能够被大多数后端语言支持

    - JSON的轻量级数据交换格式能够替代XML的工作

> 优点：
    - 数据格式比较简单，易于读写，格式都是压缩的，占用带宽小；

    - 易于解析，客户端JavaScript可以简单的通过eval()进行JSON数据的读取；

    - 支持多种语言，包括ActionScript, C, C#, ColdFusion, Java, JavaScript, Perl, PHP, Python, Ruby等服务器端语言，便于服务器端的解析；

    - 在PHP世界，已经有PHP-JSON和JSON-PHP出现了，偏于PHP序列化后的程序直接调用，PHP服务器端的对象、数组等能直接生成JSON格式，便于客户端的访问提取；

    - 因为JSON格式能直接为服务器端代码使用，大大简化了服务器端和客户端的代码开发量，且完成任务不变，并且易于维护。

> 缺点：
    - 没有XML格式这么推广的深入人心和喜用广泛，没有XML那么通用性

    - JSON格式目前在Web Service中推广还属于初级阶段




#### JSON.parse()
##### 介绍
> 实现从 JSON 转换为对象(用于从一个字符串中解析出json对象)



##### 用例
```js
var obj = JSON.parse('{"a": "Hello", "b": "World"}');  //这是一个对象，注意键名也是可以使用引号包裹的
console.log(obj); //{a: 'Hello', b: 'World'}
```
> 注意：单引号写在{}外，每个属性名都必须用双引号，否则会抛出异常。



##### 高级用法
> JSON.parse() 可以接受第二个参数，它可以在返回之前转换对象值。比如这例子中，将返回对象的属性值大写：
```js
const user = {
  name: 'John',
  email: 'john@awesome.com',
  plan: 'Pro'
};
 
const userStr = JSON.stringify(user);
 
const newUserStr = JSON.parse(userStr, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
});
 
console.log(newUserStr); //{name: "JOHN", email: "JOHN@AWESOME.COM", plan: "PRO"} 
```
> 注：尾随逗号在JSON 中无效，所以如果传递给它的字符串有尾随逗号，JSON.parse()将会抛出错误。



##### 实现一个JSON.parse
###### 直接调用 eval
```js
function jsonParse(opt) {
    return eval('(' + opt + ')');
}
jsonParse(JSON.stringify({x : 5}));  // Object { x: 5}
jsonParse(JSON.stringify([1, "false", false]));  // [1, "false", falsr]
jsonParse(JSON.stringify({b: undefined}));  // Object { b: "undefined"}
```
> 避免在不必要的情况下使用 eval，eval() 是一个危险的函数， 他执行的代码拥有着执行者的权利。如果你用 eval()运行的字符串代码被恶意方（不怀好意的人）操控修改，您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。它会执行JS代码，有XSS漏洞。

> 如果你只想记这个方法，就得对参数json做校验。
```js
var rx_one = /^[\],:{}\s]*$/;
var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
if (
    rx_one.test(
        json
            .replace(rx_two, "@")
            .replace(rx_three, "]")
            .replace(rx_four, "")
    )
) {
    var obj = eval("(" +json + ")");
}
```




###### Function
> 核心：Function与eval有相同的字符串参数特性。
```js
var func = new Function(arg1, arg2, ..., functionBody);
```

> 在转换JSON的实际应用中，只需要这么做:
```js
var jsonStr = '{ "age": 20, "name": "jack" }'
var json = (new Function('return ' + jsonStr))();
```
> eval 与 Function 都有着动态编译js代码的作用，但是在实际的编程中并不推荐使用。




#### JSON.stringify()
##### 介绍
> 实现从对象转换为 JSON 字符串(用于从一个对象解析出字符串)




##### 用例
```js
var json = JSON.stringify({a: 'Hello', b: 'World'}); //这是一个 JSON 字符串，本质是一个字符串
console.log(json);  //'{"a": "Hello", "b": "World"}'

let a = {name:null};
console.log(JSON.stringify(a));  //'{"name":null}'

let b = {age:undefined};
console.log(JSON.stringify(b));  //'{}'

let c = [null];
console.log(JSON.stringify(c));  //'[null]'

let d = [undefined];
console.log(JSON.stringify(d));  //'[null]'

let e = null;
console.log(JSON.stringify(e));  //'null'

let f = undefined;
console.log(JSON.stringify(f));  //undefined
```




##### 高级用法
> JSON.stringify(value, replacer, space) 可以带两个额外的参数，第一个是替换函数，第二个间隔字符串，用作隔开返回字符串。
> 参数：
    - value ： 将要转为JSON字符串的javascript对象。

    - replacer ：该参数可以是多种类型,如果是一个函数,则它可以改变一个javascript对象在字符串化过程中的行为, 如果是一个包含 String 和 Number 对象的数组,则它将作为一个白名单。只有那些键存在域该白名单中的键值对才会被包含进最终生成的JSON字符串中。如果该参数值为null或者被省略,则所有的键值对都会被包含进最终生成的JSON字符串中。第二个参数replacer可以传入function或者Array，但是它也可以传如一个伪数组，模拟传入Array的情况。

    - space ：该参数可以是一个 String 或 Number 对象,作用是为了在输出的JSON字符串中插入空白符来增强可读性. 如果是Number对象, 则表示用多少个空格来作为空白符; 最大可为10,大于10的数值也取10.最小可为1,小于1的数值无效,则不会显示空白符。如果是个 String对象, 则该字符串本身会作为空白符,字符串最长可为10个字符.超过的话会截取前十个字符。如果该参数被省略 (或者为null), 则不会显示空白符。

> 替换函数可以用来过滤值，因为任何返回 undefined 的值将不在返回的字符串中：
```js
const user = {
    id: 229,
    name: 'John',
    email: 'john@awesome.com'
};

function replacer(key, value) {
    console.log(typeof value);  //object number string string
    if (key === 'email') {
        return undefined;
    }
    return value;
}

const userStr = JSON.stringify(user, replacer);
console.log(userStr);  //{"id":229,"name":"John"}
```


> 传入一个间隔参数的示例：
```js
const user = {
    name: 'John',
    email: 'john@awesome.com',
    plan: 'Pro'
};

const userStr = JSON.stringify(user, null, '...');
console.log(userStr);
/* 
{
..."name": "John",
..."email": "john@awesome.com",
..."plan": "Pro"
}
*/
```




##### toJSON方法
> 如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化
```js
var obj = {
    foo: 'foo',
    toJSON:function(){
        return 'bar';
    }
}
JSON.stringify(obj);//'"bar"'
JSON.stringify({x:obj});//'{"x":"bar"}'
```
> 利用toJSON方法，我们可以修改对象转换成JSON的默认行为。




##### 用 JSON.stringify 来格式化对象
> 在实际使用中,我们可能会格式化一些复杂的对象，这些对象往往对象内嵌套对象。直接看起来并不那么直观,结合上面的的 replacer 和 space 参数,我们可以这样格式化复杂对象：
```js
var censor = function (key, value) {
    if (typeof (value) == 'function') {
        return Function.prototype.toString.call(value)
    }
    return value;
}
var foo = {
    bar: "1",
    baz: 3,
    o: {
        name: 'xiaoli',
        age: 21,
        info: {
            sex: '男',
            getSex: function () {
                return 'sex';
            }
        }
    }
};
console.log(JSON.stringify(foo, censor, 4));
/* 
实际返回的字符串:
    {
        "bar": "1",
        "baz": 3,
        "o": {
            "name": "xiaoli",
            "age": 21,
            "info": {
                "sex": "男",
                "getSex": "function (){return 'sex';}"
            }
        }
    }
*/
```




##### 实现一个JSON.stringify
> JSON.stringify(value[, replacer [, space]])
    - Boolean | Number| String 类型会自动转换成对应的原始值。
    - undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
    - 不可枚举的属性会被忽略
    - 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。

```js
function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== "object") {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = []
        let arr = Array.isArray(obj)
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}

console.log(jsonStringify({ x: 5 }));  //{"x":5}
console.log(jsonStringify([1, "false", false]));  //[1,"false",false]
console.log(jsonStringify({ b: undefined}));  //{"b":"undefined"}
```