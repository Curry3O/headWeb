### this
> 判断 this 的引用必须先看函数的定义，在实际地查看函数定义时，我们设立了四条规则来查找引用，它们是:
    - 隐式绑定
    - 显式绑定
    - new 绑定
    - window 绑定(默认绑定)
    - 箭头函数绑定

###### 默认绑定
> this默认绑定我们可以理解为函数调用时无任何调用前缀的情景，它无法应对我们后面要介绍的另外四种情况，所以称之为默认绑定，默认绑定时this指向全局对象（非严格模式）：

```js
//这个例子中无论函数声明在哪，在哪调用，由于函数调用时前面并未指定任何对象，这种情况下this指向全局对象window。
function fn1() {
    let fn2 = function () {
        console.log(this); //window
        fn3();
    };
    console.log(this); //window
    fn2();
};
function fn3() {
    console.log(this); //window
};
fn1();
```

> 在严格模式环境中，默认绑定的this指向undefined
```js
function fn() {
    console.log(this); //window
    console.log(this.name);
};

function fn1() {
    "use strict";
    console.log(this); //undefined
    console.log(this.name);
};
var name = '听风是风';

fn(); 
fn1() //TypeError: Cannot read property 'a' of undefined
```

> 函数以及调用都暴露在严格模式中的例子：
```js
"use strict";
var name = '听风是风';
function fn() {
    console.log(this); //undefined
    console.log(this.name);//报错
};
fn();
```

> 在严格模式下调用不在严格模式中的函数，并不会影响this指向
```js
var name = '听风是风';
function fn() {
    console.log(this); //window
    console.log(this.name); //听风是风
};

(function () {
    "use strict";
    fn();
}());
```


###### 隐式绑定
> 请记住，这里的目标是查看使用 this 关键字的函数定义，并判断 this 的指向。执行绑定的第一个也是最常见的规则称为 隐式绑定。80% 的情况下它会告诉你 this 关键字引用的是什么。
```js
const user = {
  name: 'Tyler',
  age: 27,
  greet() {
    alert(`Hello, my name is ${this.name}`);
  }
}
//现在，如果你要调用 user 对象上的 greet 方法，你会用到点号。
user.greet(); // Hello, my name is Tyler

/* 这就把我们带到隐式绑定规则的主要关键点。为了判断 this 关键字的引用，函数被调用时先看一看点号左侧。如果有“点”就查看点左侧的对象，这个对象就是 this 的引用。在上面的例子中，user 在“点号左侧”意味着 this 引用了 user 对象。所以就好像 在 greet 方法的内部 JavaScript 解释器把 this 变成了 user。 */

const user = {
  mother: {
    name: 'Stacey',
    greet() {
      alert(`Hello, my name is ${this.name}`);
    }
  }
}
user.mother.greet(); // Hello, my name is Stacey
/* 每当判断 this 的引用时，我们都需要查看调用过程，并确认“点的左侧”是什么。第一个调用，user 在点左侧意味着 this 将引用 user。第二次调用中，mother 在点的左侧意味着 this 引用 mother。 */
```

```js
//如果函数调用前存在多个对象，this指向距离调用自己最近的对象，比如这样：
function fn() {
    console.log(this.name);
};
let obj = {
    name: '行星飞行',
    func: fn,
};
let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //行星飞行
//如果将obj对象的name属性注释掉，会输出undefined。不要将作用域链和原型链弄混淆了，obj对象虽然是obj1的属性，但它两原型链并不相同，并不是父子关系，由于obj未提供name属性，所以是undefined。

function Fn() {};
Fn.prototype.name = '时间跳跃';

function fn() {
    console.log(this.name);
};

let obj = new Fn();
obj.func = fn;
let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //时间跳跃
//虽然obj对象并没有name属性，但顺着原型链，找到了产生自己的构造函数Fn，由于Fn原型链存在name属性，所以输出时间跳跃了。
```
> 作用域链与原型链的区别:
    - 当访问一个变量时，解释器会先在当前作用域查找标识符，如果没有找到就去父作用域找，作用域链顶端是全局对象window，如果window都没有这个变量则报错。
    - 当在对象上访问某属性时，首选会查找当前对象，如果没有就顺着原型链往上找，原型链顶端是null，如果全程都没找到则返一个undefined，而不是报错。


###### 隐式丢失
> 在特定情况下会存在隐式绑定丢失的问题，最常见的就是作为参数传递以及变量赋值，先看参数传递：
```js
//将 obj.fn 也就是一个函数传递进 fn1 中执行，这里只是单纯传递了一个函数而已，this并没有跟函数绑在一起，所以this丢失这里指向了window。
var name = '行星飞行';
let obj = {
    name: '听风是风',
    fn: function () {
        console.log(this.name);
    }
};

function fn1(param) {
    param();
};
fn1(obj.fn);//行星飞行
```

> 变量赋值导致隐式丢失
```js
var name = '行星飞行';
let obj = {
    name: '听风是风',
    fn: function () {
        console.log(this.name);
    }
};
let fn1 = obj.fn;
fn1(); //行星飞行
```

> 隐式绑定丢失并不是都会指向全局对象，比如下面的例子：
```js
//虽然丢失了 obj 的隐式绑定，但是在赋值的过程中，又建立了新的隐式绑定，这里this就指向了对象 obj1。
var name = '行星飞行';
let obj = {
    name: '听风是风',
    fn: function () {
        console.log(this.name);
    }
};
let obj1 = {
    name: '时间跳跃'
}
obj1.fn = obj.fn;
obj1.fn(); //时间跳跃
```


###### 显式绑定
> 显式绑定是指我们通过call、apply以及bind方法改变this的行为，相比隐式绑定，我们能清楚的感知 this 指向变化过程。来看个例子：
```js
//通过call、apply、bind改变了函数fn的this指向。
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
let obj3 = {
    name: 'echo'
}
var name = '行星飞行';

function fn() {
    console.log(this.name);
};
fn(); //行星飞行
fn.call(obj1); //听风是风
fn.apply(obj2); //时间跳跃
fn.bind(obj3)(); //echo

//在使用call之类的方法改变this指向时，指向参数提供的是null或者undefined，那么 this 将指向全局对象。
fn.call(undefined); //行星飞行
fn.apply(null); //行星飞行
fn.bind(undefined)(); //行星飞行
```
> 在js中，当我们调用一个函数时，我们习惯称之为函数调用，函数处于一个被动的状态；而call与apply让函数从被动变主动，函数能主动选择自己的上下文，所以这种写法我们又称之为函数应用。

> 在js API中部分方法也内置了显式绑定，以forEach为例：
```js
let obj = {
    name: '听风是风'
};

[1, 2, 3].forEach(function () {
    console.log(this.name);//听风是风*3
}, obj);
```



###### new绑定
> js中的构造函数只是使用new 调用的普通函数，它并不是一个类，最终返回的对象也不是一个实例。那么new一个函数究竟发生了什么呢，大致分为三步：
    - 以构造器的prototype属性为原型，创建新对象；
    - 将this(可以理解为上句创建的新对象)和调用参数传给构造器，执行；
    - 如果构造器没有手动返回对象，则返回第一步创建的对象

#### this绑定优先级
> this绑定优先级为：
    - 显式绑定 > 隐式绑定 > 默认绑定
    - new绑定 > 隐式绑定 > 默认绑定

> 为什么显式绑定不和new绑定比较呢？因为不存在这种绑定同时生效的情景，如果同时写这两种代码会直接抛错。
```js
function Fn(){
    this.name = '听风是风';
};
let obj = {
    name:'行星飞行'
}
let echo = new Fn().call(obj); //报错 call is not a function
```

> 举例，首先是显式大于隐式：
```js
//显式>隐式
let obj = {
    name:'行星飞行',
    fn:function () {
        console.log(this.name);
    }
};
obj1 = {
    name:'时间跳跃'
};
obj.fn.call(obj1);// 时间跳跃
```

> new绑定大于隐式：
```js
//new>隐式
obj = {
    name: '时间跳跃',
    fn: function () {
        this.name = '听风是风';
    }
};
let echo = new obj.fn();
console.log(echo.name);//听风是风
```



###### 箭头函数的this
> ES6的箭头函数是另类的存在，为什么要单独说呢，这是因为箭头函数中的this不适用上面介绍的四种绑定规则。准确来说，箭头函数中没有this，箭头函数的this指向取决于外层作用域中的this，外层作用域或函数的this指向谁，箭头函数中的this便指向谁。来看个例子：
```js
function fn() {
    return () => {
        console.log(this.name);
    };
}
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
let bar = fn.call(obj1); // fn this指向obj1
bar.call(obj2); //听风是风

/* 为啥我们第一次绑定this并返回箭头函数后，再次改变this指向没生效呢？前面说了，箭头函数的this取决于外层作用域的this，fn函数执行时this指向了obj1，所以箭头函数的this也指向obj1。除此之外，箭头函数this还有一个特性，那就是一旦箭头函数的this绑定成功，也无法被再次修改，有点硬绑定的意思。 */
```

> 当然，箭头函数的this也不是真的无法修改，我们知道箭头函数的this就像作用域继承一样从上层作用域找，因此我们可以修改外层函数this指向达到间接修改箭头函数this的目的。
```js
function fn() {
    return () => {
        console.log(this.name);
    };
};
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
fn.call(obj1)(); // fn this指向obj1,箭头函数this也指向obj1
fn.call(obj2)(); //fn this 指向obj2,箭头函数this也指向obj2
```