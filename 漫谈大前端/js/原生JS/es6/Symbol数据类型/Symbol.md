## Symbol
> Symbol 是 ES6 引入了一种新的原始数据类型，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种分别是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）

> 1.Symbol 值通过Symbol函数生成,可以作为对象的属性名使用,保证不会与其他属性名产生冲突；

```js
let s = Symbol();
typeof s  // symbol
```
上面代码表示创建一个Symbol变量，值得注意的是，Symbol函数前不能使用new命令，否则会报错，也就是说Symbol 是一个原始类型的值，不是对象，也不能添加属性；

> 2.Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要用于区分不同的 Symbol 变量

```js
let s1 = Symbol('a');
let s2 = Symbol('b');

s1.toString()  // 'Symbol(a)'
s2.toString()  // 'Symbol(b)'
```

如果用当下比较流行的TypeScript的方式来描述这个Symbol()函数的话，可以表示成：
```js
/**
 * @param  {any} description 描述信息。可以是任何可以被转型成字符串的值，如：字符串、数字、对象、数组等
 */
function Symbol(description?: any): symbol
```

Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的
```js
let s1 = Symbol('a');
let s2 = Symbol('a');

s1 === s2  //false
```

> 3.Symbol 值不能与其他类型的值进行运算，但可以转为布尔值，但是不能转为数值
```js
  let s = Symbol();
  s + '2'       // Cannot convert a Symbol value to a string
  Boolean(s)    // true
  !s            // false
```

> 4.用于对象的属性名，可以保证不会出现同名的属性，对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖；值得注意的是，Symbol 值作为对象属性名时，不能用点运算符，因为点运算符后面是一个字符串

```js
let s = Symbol();

let obj = {};
obj[s] = 'hello world';

//或者

let obj  = {
    [s] : 'hello world'
}

obj.s   // undefined
obj[s]  // hello world
```

> 5.Symbol 作为属性名，不会被常规方法遍历得到，即该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回，但是，它并不是私有属性，可以使用 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名
```js
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';
obj.c  = 'Mine';

for( let key in obj ){
   console.log(key)         // c
}

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols) // [Symbol(a), Symbol(b)]
```

> 6.Symbol.for方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值；它与Symbol()不同的是，Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值，而 Symbol()每次都会返回3不同的Symbol值；
```js
Symbol.for("name") === Symbol.for("name")
// true

Symbol("name") === Symbol("name")
// false
```

> 7.Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key，而Symbol()写法是没有登记机制的
```js
var s1 = Symbol.for("name");
Symbol.keyFor(s1) // "name"

var s2 = Symbol("name");
Symbol.keyFor(s2) // undefined
```

Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值