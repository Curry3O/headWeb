## this的指向
> 如果用一句话说明 this 的指向，那么即是: 谁调用它，this 就指向谁。
但是仅通过这句话，我们很多时候并不能准确判断 this 的指向。因此我们需要借助一些规则去帮助自己：

#### this 的指向可以按照以下顺序判断:

###### 全局环境中的 this
> 浏览器环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象 window;
> node 环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部），this 都是空对象 {};

###### 是否是 new 绑定
> 如果是 new 绑定，并且构造函数中没有返回 function 或者是 object，那么 this 指向这个新对象。如下:

构造函数返回值不是 function 或 object。 newSuper() 返回的是 this 对象。
```js
function Super(age){
    this.age = age;
}
let instance = new Super('26');
console.log(instance.age); //26
```

构造函数返回值是 function 或 object， newSuper()是返回的是Super种返回的对象。
```js
function Super(age){
    this.age = age;
    let obj = {a : 1};
    return obj;
}
let instance = _new(Super, '26');
console.log(instance); //{ a: 1 }
console.log(instance.age); //undefined
```

###### 函数是否通过 call,apply 调用，或者使用了 bind 绑定，如果是，那么this绑定的就是指定的对象【归结为显式绑定】
```js
function info(){
    console.log(this.age);
}
var person = {
    age : 20,
    info
}
var age = 28;
var info = person.info;
info.call(person); //20
info.apply(person); //20
info.bind(person)(); //20
```
> call、apply、bind传参方式不同：
    - xxx.call(thisArg,arg1,arg2,...)第一个参数是 this 指向的对象,其它参数依次传入
    - xxx.apply(thisArg,[argsArray])第一个参数是 this 指向的对象,第二个参数是数组或类数组
    - xxx.bind(thisArg,arg1,arg2,...)()第一个参数是 this 指向的对象,其它参数依次传入

> 这里同样需要注意一种特殊情况，如果 call,apply 或者 bind 传入的第一个参数值是 undefined或者 null，严格模式下 this 的值为传入的值 null /undefined。非严格模式下，实际应用的默认绑定规则，this 指向全局对象(node环境为global，浏览器环境为window)

```js
function info(){
    //node环境中：非严格模式 global，严格模式 null
    //浏览器环境中：非严格模式 window，严格模式 null
    console.log(this);
    console.log(this.age);
}
var person = {
    age : 20,
    info
}
var age = 28;
var info = person.info;
//严格模式抛出错误
//非严格模式：node环境下输出undefined（因为全局的age不会挂在 global 上）
//非严格模式：浏览器环境下输出28（因为全局的age会挂在 window 上）
info.call(null);
```

###### 隐式绑定，函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的隐式调用为: xxx.fn()

```js
function info(){
    console.log(this.age);
}
var person = {
    age : 20,
    info
}
var age = 28;
//执行的是隐式绑定
person.info(); //20
```

###### 默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。
> 非严格模式：node环境，执行全局对象 global，浏览器环境，执行全局对象 window。

> 严格模式：执行 undefined

```js
function info(){
    console.log(this.age);
}
var age = 28;
//严格模式：抛错,因为 this 此时是 undefined
//非严格模式：node输出 undefined（因为全局的age不会挂在 global 上）
//非严格模式：浏览器环境下输出 28（因为全局的age会挂在 window 上）
info(); //undefined
```

###### 箭头函数的情况：
> 箭头函数没有自己的this，继承外层上下文绑定的this。

```js
let obj = {
    age: 20,
    info: function(){
        return ()=>{
            //this继承的是外层上下文绑定的this
            console.log(this.age)
        }
    }
}
let person = {age: 28};
let info = obj.info();
info(); //20

let info2 = obj.info.call(person);
info2(); //28
```
