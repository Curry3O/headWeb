### call
> 语法：
    function.call(thisObj,arg1,arg2,...)

> 定义：调用一个对象的一个方法，以另一个对象替换当前对象。

> 说明： call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。改变 this 的指向，并立即执行函数

> thisObj的取值有以下几种情况：
    - 不传，浏览器环境中普通模式下this是window，在严格模式下this是undefined；node环境中普通模式下this是global，在严格模式下this是undefined
    
    - 传null，浏览器环境中普通模式下this是window，在严格模式下this是null；node环境中普通模式下this是global，在严格模式下this是null

    - 传undefined，浏览器环境中普通模式下this是window，在严格模式下this是undefined；node环境中普通模式下this是global，在严格模式下this是undefined

    - 传递另一个函数的函数名，函数中的this指向这个函数的引用

    - 传递字符串、数值或布尔类型等基础类型，函数中的this指向其对应的包装对象，如 String、Number、Boolean

    - 传递一个对象，函数中的this指向这个对象
> 例子：
```js
function a(){   
  console.log(this);   //输出函数a中的this对象
}       

function b(){}       

var c={name:"call"};    //定义对象c  

//浏览器环境中测试
a.call();   //window
a.call(null);   //window
a.call(undefined);   //window
a.call(1);   //Number
a.call('');   //String
a.call(true);   //Boolean
a.call(b);   //function b(){}
a.call(c);   //Object
```



### apply
> 语法：
    function.apply([thisObj,[argArray]])

> 定义：应用某一对象的一个方法，用另一个对象替换当前对象。
> 说明：如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。

###### call、apply的区别
> 他们俩之间的差别在于参数的区别，call和aplly的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

> 例子：
```js
function class1(args1,args2){       
  this.name=function(){      
   console.log(args1,args2);      
  }     
}     
function class2(){    
  var args1="1";
  var args2="2";
  class1.call(this,args1,args2);  
  //或者：
  class1.apply(this,[args1,args2]);
}

var c=new class2();   
c.name(); //输出：1 2
```

###### 分场景灵活使用
> 在JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，当你的参数是明确知道数量时用 call ；而不确定的时候用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个类数组对象来遍历所有的参数。


### bind
> 语法：
    function.bind(thisObj,arg1,arg2,...)

> 定义：应用某一对象的一个方法，用另一个对象替换当前对象。
> 说明：bind的thisObj参数也和call方法一样，thisObj如果未传，那么 Global 对象被用作 thisObj。arg1 … argN可传可不传。如果不传，可以在调用的时候再传。如果传了，调用的时候则可以不传，调用的时候如果你还是传了，则不生效。

> 例子：
```js
var person = {
    name:"tsrot",
    age:24,
    sayHello:function(age){
        console.log(this.name);
        console.log(age);
    }
};
var son = {
	name:"xieliqun"
};
//传参情况1：
var boundFunc = person.sayHello.bind(son);
boundFunc(25); // xieliqun  25
//传参情况2：
var boundFunc = person.sayHello.bind(son,25);
boundFunc(); // xieliqun  25
//传参情况3：
var boundFunc = person.sayHello.bind(son,25);
boundFunc(30); // xieliqun  25
```

在ECMAScript5中扩展了叫bind的方法（IE6,7,8不支持），bind 方法返回的函数是一种特殊类型的函数对象，称为绑定函数(BF)。BF 中包含原始函数对象，调用 BF 时会执行该函数。

> bind() 函数会创建一个新函数（称为绑定函数）
    - bind是ES5新增的一个方法
    - 传参和call类似
    - 不会执行对应的函数，call或apply会自动执行对应的函数
    - 返回对函数的引用


###### call、apply与bind的共同点
> apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；三者第一个参数都是this要指向的对象，也就是想指定的上下文（函数的每次调用都会拥有一个特殊值 ———— 本次调用的上下文（context）———— 这就是this关键字的值）；三者都可以利用后续参数传参。

###### call、apply与bind的差别
> call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数,需要再一次调用。
> bind属于硬绑定，返回的 boundFunction 的 this 指向无法再次通过bind、apply或 call 修改；call与apply的绑定只适用当前调用，调用完就没了，下次要用还得再次绑。



### call、apply和bind的应用
>1.求数组的最大值和最小值
```js
var ary = [23, 34, 24, 12, 35, 36, 14, 25];
//方法1：
var max = Math.max.call(null, ...ary); 
var min = Math.min.call(null, ...ary); 
//方法1：
var max = Math.max.apply(null, ary); 
var min = Math.min.apply(null, ary); 
//方法1：
var max = Math.max.bind(null, ...ary)();
var min = Math.min.bind(null, ...ary)();
console.log(min, max);
```

> 2.将类数组(伪数组)转换数组
```js
var arrayLike = {
  0: 'qianlong',
  1: 'ziqi',
  2: 'qianduan',
  length: 3
}
var arr = Array.prototype.slice.call(arrayLike);
//或者
var arr = [].slice.call(arrayLike);
//或者
var arr = Function.prototype.call.bind(Array.prototype.slice)(arrayLike);
```

> 3.数组追加
```js
var array1 = [1 , 2 , 3, 5];
var array2 = ["xie" , "li" , "qun" , "tsrot"];
Array.prototype.push.apply(array1, array2);
console.log(array1); //[1, 2, 3, 5, "xie", "li", "qun", "tsrot"]
```

> 4.判断变量类型
```js
function isArray(obj){
    return Object.prototype.toString.call(obj) == '[object Array]';
}
isArray([]) // true
isArray('qianlong') // false
```

> 5.实现继承
```js
function Animal(name) {
    this.name = name;
    this.showName = function () {
        console.log(this.name);
    }
}
function Cat(name) {
    Animal.call(this, name); //Cat继承了Animal的showName方法
}
var cat = new Cat('Black Cat');
cat.showName(); //Black Cat
```

> 6.保存this变量
```js
// 正常情况下使用变量保存 this 值
var foo = {
    bar : 1,
    eventBind: function(){
        var _this = this ;
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(_this.bar);     //1
        });
    }
}
// 使用 bind 进行函数绑定
var foo = {
    bar : 1,
    eventBind: function(){
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(this.bar);      //1
        }.bind(this));
    }
}
```

> 7.原型扩展
```js
//在原型函数上扩展和自定义方法，从而不污染原生函数。例如：我们在 Array 上扩展一个 forEach
function test(){
    // 检测arguments是否为Array的实例
    console.log(
        arguments instanceof Array, //false
        Array.isArray(arguments)  //false
    );
    // 判断arguments是否有forEach方法
    console.log(arguments.forEach); 
    // undefined
    // 将数组中的forEach应用到arguments上
    Array.prototype.forEach.call(arguments,function(item){
        console.log(item); // 1 2 3 4
    });
}
test(1,2,3,4);
```

> 8.让函数拥有预设的参数
```js
//使用bind()方法使函数拥有预设的初始参数，这些参数会排在最前面，传给绑定函数的参数会跟在它们后面
function list(){
    // 让类数组arguments拥有数组的方法slice，这个函数实现了简单把类数组转换成数组
    return Array.prototype.slice.call(arguments);
}
list(1,2,3);//[1,2,3]

//给list绑定一个预设参数4 
var list1 = list.bind(undefined,4);
list1();//[4]
list1(1,2,3);//[4,1,2,3]
```

###### call 方法经典例子
```js
Function.prototype.call=function call(context){
    // [native code]
    // call方法的功能
    // 1. 把指定函数中的this指向context
    // 2. 把指定函数执行
    
    // 那么call方法中的this，即为指定函数。也就是说
    // 1. 把this中 的 this关键字指向context;
    // 2. 把指定函数执行this();
};
```
> 题目：
```js
function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
fn1.call(fn2); // 1
//1.call 方法中的this是fn1
//2.把call方法中的this（fn1）中的this指向fn2
//3.调用 call方法中的this
//所以调用的是 fn1 ，此时fn1中的 this 指向的是 fn2。但是这个方法里面并没有使用this，而是直接输出了1。
```
> 首先fn1通过原型链查找机制找到Function.prototype上的call方法，并且让call方法执行，此时call这个方法中的this就是要操作的fn1。在call方法代码执行的过程过程中，首先让fn1中的“this关键字”变为fn2，然后再让fn1这个方法执行。在执行call方法的时候，fn1中的this的确会变为fn2，但是在fn1的方法体中输出的内容中并没有涉及到任何和this相关的内容，所以还是输出1。


```js
function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
fn1.call.call(fn2); // 2
//1.call 方法中的 this 是 fn1.call [所有函数都可以调用call，调用的是原型上call方法]
//2.把call方法中的this (fn1.call) 中的this 指向fn2
//3.调用call方法中的this
//所以调用的是 fn2，此时fn1.call中的this指向的是fn2。它改变了call方法（Function.prototype原型上的call）的this指向。此处调用了call方法中的this，即调用了fn2，输出了2。
```

> 首先fn1通过原型链找到Function.prototype上的call方法，然后再让call方法通过原型再找到Function原型上的call（因为call本身的值也是一个函数，所以同样可以让Function.prototype），在第二次找到call的时候再让方法执行，方法中的this是fn1.call，首先让这个方法中的this变为fn2，然后再让fn1.call执行。

> 这个例子有点绕了，不过一步一步来理解。在最开始的时候，fn1.call.call(fn2) 这行代码的最后一个call中的this是fn1.call，根据前面的理解可以知道 fn1.call 的原理大致为：
```js
Function.prototype.call = function (context) {
    // 改变fn中的this关键字
    // eval(....);
    
    // 让fn方法执行
    this(); // 此时的this就是fn1
};
```
> 将上面的代码写为另一种形式：
```js
Function.prototype.call = test1;
function test1 (context) {
    // 改变fn中的this关键字
    // eval(....);
    
    // 让fn方法执行
    this(); // 此时的this就是fn1
};
```
> 我们知道，这两种形式的写法的作用是一样的。那么此时可以将 fn1.call.call(fn2) 写成 test1.call(fn2) ，call中的的this就是test1：
```js
Function.prototype.call = function (context) {
    // 改变fn中的this关键字
    // eval(....);
    
    // 让fn方法执行
    this(); // 此时的this就是test1
};
```
> 此时call中的的this就是test1。然后再将call中this替换为fn2，那么test1方法变为：
```js
Function.prototype.call = function (context) {
    // 省略其他代码
    
    fn2(); 
};
```


### 总结
> 总体来说,call apply bind 三个函数的作用都是用来改变this的指向。目前的 js 还存在回调函数这一现象，尤其在框架中一些异步回调也是十分的常见，难免this会迷失方向。三者既有不同也有相似

        方法名        作用          是否自动执行        参数列表
        ------------------------------------------------------
        call     改变 this 指向       自动执行	        一般列表
        apply    改变 this 指向       自动执行	        数组形式
        bind     改变 this 指向     返回一个函数        一般列表