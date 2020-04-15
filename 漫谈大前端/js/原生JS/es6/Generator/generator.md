### Generator
> Generator Function 是 ES6 提供的一种异步流程控制解决方案。在此之前异步编程形式有，回调函数、事件监听、发布/订阅、Promise 等。但仔细思考前面解决方案，实际还是以回调函数作为基础，并没有从语法结构来改变异步写法。

> 区别于普通函数，Generator Function 可以在执行时暂停，后面又能从暂停处继续执行。通常在异步操作时交出函数执行权，完成后在同位置处恢复执行。新语法更容易在异步场景下达到以同步形式处理异步任务。

> 生成器函数继承于 Function 和 Object，不同于普通函数，生成器函数不能作为构造函数调用，仅是返回生成器对象。



#### 迭代器
> 迭代器是一种特殊对象，具有专门为迭代流程设计的 next() 方法。每次调用 next() 都会返回一个包含 value 和 done 属性的对象。
    done (布尔类型)
        - 如果迭代器遍历到迭代序列末端时 done 为 true
        - 如果迭代器仍可继续在序列中遍历时 done 为 false

    value (任何类型)
        - 如果 done 为 false，值为当前迭代元素 value
        - 如果 done 为 true，且迭代器存在 return value 则为相应值
        - 如果没有返回值 则为 undefined

> 简单用 ECMAScript 5 语法创建一个符合迭代器接口示例：
```js
function createIterator (items) {
  var i = 0
  return {
    next: function () {
      var done = (i >= items.length)
      var value = !done ? items[i++] : undefined
      return {
        done: done,
        value: value
      }
    }
  }
}

var iterator = createIterator([1, 2])

console.log(iterator.next())    // {done: false, value: 1}
console.log(iterator.next())    // {done: false, value: 2}
console.log(iterator.next())    // {done: true, value: undefined}
// 之后的所有调用
console.log(iterator.next())    // {done: true, value: undefined}
```



#### 可迭代对象(Iterable)
> 满足可迭代协议的对象是可迭代对象。



##### 可迭代协议
> 对象的[Symbol.iterator]值是一个无参函数，该函数返回一个迭代器。

> 可迭代协议允许 JavaScript 对象去定义它们的迭代行为, 例如在 for...of 结构中什么值可以循环。常用数据类型都内置了可迭代对象并且有默认的迭代行为, 比如 Array、Map, 注意 Object 默认不能使用 for...of 遍历。为了变成可迭代对象，一个对象必须实现 @@iterator 方法， 可以在这个对象（或者原型链上的某个对象）设置 Symbol.iterator 属性，其属性值为返回一个符合迭代器协议对象的无参函数。

> 在ES6中，所有的集合对象（Array、 Set 与 Map）以及String、arguments都是可迭代对象，它们都有默认的迭代器。



##### 迭代器协议
> 迭代器协议定义了一种标准的方式来产生序列值。即迭代器对象必须实现 next() 方法且 next() 包含 done 和 value 属性。

> 简而言之，可迭代对象必须满足可迭代协议有 Symbol.iterator 方法， Symbol.iterator 方法返回符合迭代器协议对象，包含 next 方法。



##### 可迭代对象可以在以下语句中使用
> for...of循环
```js
for (let value of ['a', 'b', 'c']) {
  console.log(value);
}
// "a"
// "b"
// "c"
```

> 扩展运算符
```js
[...'abc'];   // ["a", "b", "c"]
console.log(...['a', 'b', 'c']);   // ["a", "b", "c"]
```

> yield*
```js
function* gen() {
  yield* ['a', 'b', 'c'];
}

let a = gen();
a.next(); // { value: "a", done: false }
a.next(); // { value: "b", done: false }
a.next(); // { value: "c", done: false }
a.next(); // { value: undefined, done: true }
```

> 解构赋值
```js
let [a, b, c] = new Set(['a', 'b', 'c']);
console.log(a);   // 'a'
```



##### 使迭代器可迭代
> 在什么是迭代器部分，我们自定义了一个简单的生成迭代器的函数createIterator，但该函数生成的迭代器并没有实现可迭代协议，所以不能在for...of等语法中使用。可以为该对象实现可迭代协议，在[Symbol.iterator]函数中返回该迭代器自身。
```js
function createIterator(items) {
    var i = 0;
    return {
        next: function () {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        },
        [Symbol.iterator]: function () { return this }
    };
}

var iterator = createIterator([1, 2, 3]);
console.log(...iterator) //1 2 3
```



#### 生成器
> 生成器函数（GeneratorFunction）是能返回一个生成器（generator）的函数。生成器函数由放在 function 关键字之后的一个星号（ * ）来表示，并能使用新的 yield 关键字。

> 调用生成器函数并不会立即执行内部语句，而是返回这个生成器的迭代器对象。迭代器首次调用 next() 方法时，其内部会执行到 yield 后的语句为止。再次调用 next() ，会从当前 yield 之后的语句继续执行，直到下一个 yield 位置暂停。next() 返回一个包含 value 和 done 属性的对象。value 属性表示本次 yield 表达式返回值，done 表示后续是否还有 yield 语句，即生成器函数是否已经执行完毕。
    - Generator.prototype.next()，返回一个由 yield表达式生成的值
    - Generator.prototype.return()，返回给定的值并结束生成器
    - Generator.prototype.throw()，向生成器抛出一个错误

```js
function *aGeneratorfunction(){
  yield 1
  yield 2
  yield 3
};

var aGeneratorObject = aGeneratorfunction()
// 生成器对象
aGeneratorObject.toString()   // "[object Generator]"
```



##### 生成器对象既是迭代器，又是可迭代对象
```js
function *aGeneratorfunction(){
  yield 1
  yield 2
  yield 3
};

var aGeneratorObject = aGeneratorfunction()

// 满足迭代器协议，是迭代器
aGeneratorObject.next()   // {value: 1, done: false}
aGeneratorObject.next()   // {value: 2, done: false}
aGeneratorObject.next()   // {value: 3, done: false}
aGeneratorObject.next()   // {value: undefined, done: true}

// [Symbol.iterator]是一个无参函数，该函数执行后返回生成器对象本身（是迭代器），所以是可迭代对象
aGeneratorObject[Symbol.iterator]() === aGeneratorObject   // true

// 可以被迭代
var aGeneratorObject1 = aGeneratorfunction()
[...aGeneratorObject1]   // [1, 2, 3]
```



##### 在生成器中return
```js
//遍历返回对象的done值为true时迭代即结束，不对该value处理。
function *createIterator() {
  yield 1;
  return 42;
  yield 2;
}

let iterator = createIterator();
iterator.next();   // {value: 1, done: false}
iterator.next();   // {value: 42, done: true}
iterator.next();   // {value: undefined, done: true}
//done值为true时迭代即结束，迭代不对该value处理。所以对这个迭代器遍历，不会对值42处理。
let iterator1 = createIterator();
console.log(...iterator1);   // 1
```



##### 添加[Symbol.iterator]使Object可迭代
> 根据可迭代协议，给Object的原型添加[Symbol.iterator]，值为返回一个对象的无参函数，被返回对象符合迭代器协议。
```js
Object.prototype[Symbol.iterator] = function () {
  var i = 0
  var items = Object.entries(this)
  return {
    next: function () {
      var done = (i >= items.length);
      var value = !done ? items[i++] : undefined;

      return {
          done: done,
          value: value
      };
    }
  }
}

var a = {
  name: 'Jimmy',
  age: 18,
  job: 'actor'
}
console.log(...a)   // [ 'name', 'Jimmy' ] [ 'age', 18 ] [ 'job', 'actor' ]
```


> 使用生成器简化代码
```js
Object.prototype[Symbol.iterator] = function* () {
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      yield [key, this[key]];
    }
  }
}

var a = {
  name: 'Jimmy',
  age: 18,
  job: 'actor'
}
console.log(...a)   // [ 'name', 'Jimmy' ] [ 'age', 18 ] [ 'job', 'actor' ]
```



##### for...of循环
> for...of循环会自动遍历，不用调用next方法，需要注意的是，for...of遇到next返回值的done属性为true就会终止，return返回的不包括在for...of循环中。
```js
function * f(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    return 5;
}
for (let k of f()){
    console.log(k);
}
// 1 2 3 4  没有 5 
```



##### Generator.prototype.throw()
> throw方法用来向函数外抛出错误，并且在Generator函数体内捕获。
```js
let f = function * (){
    try { yield }
    catch (e) { console.log('内部捕获', e) }
}

let a = f();
a.next();

try{
    a.throw('a');
    a.throw('b');
}catch(e){
    console.log('外部捕获',e);
}
// 内部捕获 a
// 外部捕获 b  
```



##### Generator.prototype.return()
> return方法用来返回给定的值，并结束遍历Generator函数，如果return方法没有参数，则返回值的value属性为undefined。
```js
function * f(){
    yield 1;
    yield 2;
    yield 3;
}
let g = f();
g.next();          // {value : 1, done : false}
g.return('leo');   // {value : 'leo', done " true}
g.next();          // {value : undefined, done : true}
```


##### next()/throw()/return()共同点都是用来恢复Generator函数的执行，并且使用不同语句替换yield表达式。
> 1.next()将yield表达式替换成一个值。
```js
let f = function * (x,y){
    let r = yield x + y;
    return r;
}
let g = f(1, 2); 
g.next();   // {value : 3, done : false}
g.next(1);  // {value : 1, done : true}
// 相当于把 let r = yield x + y;
// 替换成 let r = 1;
```

> 2.throw()将yield表达式替换成一个throw语句
```js
let f = function * (x,y){
    let r = yield x + y;
    return r;
}
let g = f(1, 2); 
g.next();   // {value : 3, done : false}
g.throw(new Error('报错'));  // Uncaught Error:报错
// 相当于将 let r = yield x + y
// 替换成 let r = throw(new Error('报错'));
```

> 3.next()将yield表达式替换成一个return语句。
```js
let f = function * (x,y){
    let r = yield x + y;
    return r;
}
let g = f(1, 2); 
g.next();   // {value : 3, done : false}
g.return(2); // {value: 2, done: true}
// 相当于将 let r = yield x + y
// 替换成 let r = return 2;
```




#### yield 关键字
> yield 关键字可以用来暂停和恢复一个生成器函数。yield 后面的表达式的值返回给生成器的调用者，可以认为 yield 是基于生成器版本的 return 关键字。yield 关键字后面可以跟任何值或表达式。一旦遇到 yield 表达式，生成器的代码将被暂停运行，直到生成器的 next() 方法被调用。每次调用生成器的 next() 方法时，生成器都会在 yield 之后紧接着的语句继续执行。直到遇到下一个 yield 或生成器内部抛出异常或到达生成器函数结尾或到达 return 语句停止。

> 注意，yield 关键字只可在生成器内部使用，在其他地方使用会导致语法错误。即使在生成器内部函数中使用也是如此。
```js
function *createIterator (items) {
  items.forEach(item => {
    // 语法错误(forEach参数是个普通函数)
    yield item + 1
  })
}
```



##### 生成器委托 yield*
> yield * 可以用于声明委托生成器，即在 Generator 函数内部调用另一个 Generator 函数。
```js
function* g1() {
  yield 1;
  yield 2;
}

function* g2() {
  yield* g1();
  yield* [3, 4];
  yield* "56";
  yield* arguments;
}

var generator = g2(7, 8);
console.log(...generator);   // 1 2 3 4 "5" "6" 7 8
```



##### yield表达式如果用于另一个表达式之中，必须放在圆括号内
```js
function * a (){
    console.log('a' + yield);     //  SyntaxErro
    console.log('a' + yield 123); //  SyntaxErro
    console.log('a' + (yield));     //  ok
    console.log('a' + (yield 123)); //  ok
}
```



##### yield表达式用做函数参数或放在表达式右边，可以不加括号
```js
function * a (){
    f(yield 'a', yield 'b');    //  ok(做函数参数)
    lei i = yield;              //  ok(放在表达式右边)
}
```




#### next 方法
> Generator.prototype.next() 返回一个包含属性 done 和 value 的对象，也可以接受一个参数用以向生成器传值。返回值对象包含的 done 和 value 含义与迭代器章节一致，没有可过多说道的。值得关注的是，next() 方法可以接受一个参数，这个参数会替代生成器内部上条 yield 语句的返回值。如果不传 yield 语句返回值则为 undefined。
```js
function *createIterator (items) {
  let first = yield 1
  let second = yield first + 2
  yield second + 3
}

let iterator = createIterator()

console.log(iterator.next())    // {value: 1, done: false}
console.log(iterator.next(4))   // {value: 6, done: false}
console.log(iterator.next())    // {value: NaN, done: false}
console.log(iterator.next())    // {value: undefined, done: true}
```

> 有个特例，首次调用 next() 方法时无论传入什么参数都会被丢弃。因为传给 next() 方法的参数会替代上一次 yield 的返回值，而在第一次调用 next() 方法前不会执行任何 yield 语句，所以首次调用时传参是无意义的。



###### next 函数与 yield 个数不对等
```js
function* gen() {
    var ret = yield 1 + 2;
    var num = yield 4;
    ret = yield ret + num;
    console.log(ret);
}

gen = gen(); // 转换为 generator 对象
var g = gen.next(); // 第一步启动
var firstStep = g.value; // 取得第一个 yield 后面的表达式，即 1 + 2 为 3 
g = gen.next(firstStep); // 从 next 函数传入第一步的值，则 ret 值为 3
var secondStep = g.value; // 取得第二步 yield 的值，即 4
g = gen.next(secondStep); // 从 next 函数传入第二步的值， 即 num 为 4
// 由于下面没有了 yield 语句，所以直接执行完函数，ret 为 { value: 7, done: false }
g = gen.next(g.value);
console.log(g.done); // true
```
> 可以看到，其实第一个 next 函数是为了启动 generator，因为在还没有启动的时候，前面还没有 yield 语句，所以即使你往第一个 next 函数中传值也没有用，它不会替代任何一个 yield 语句的值，所以我们会倾向于不向第一个 next 函数中传值(undefined)。然后接下来你可以看到，第一个 next 函数之后每个 next 函数对应着一个 yield 语句, 其实 next 函数通俗来讲就是运行上一个 yield 语句与当前 yield 语句之间的代码, 而 next 函数传进去的值会变成上一个 yield 语句的返回值.由此可知, next 函数调用次数与 yield 语句个数总是不对等, next 函数调用次数总是比 yield 语句多 1, 因为需要第一个进行启动。





#### 异步流程控制
> 单独的生成器作用并不大, 特别是在异步流程控制中, 即使 yield 后面可以添加异步任务, 但是我们仍然需要一个一个地调用 next 函数, 如果需要流程化控制, 就需要自动执行 next 函数.而对于 yield + promise 结合的异步流程控制,核心思想就是通过 next 函数取得 yield 后面的值, 然后将这个值转化为 Promise, 通过 Promise 来控制异步任务,异步任务完成后递归重新调用 next 函数重复上面的操作。
```js
let fetch = require('node-fetch');
function * f(){
    let url = 'http://www.baidu.com';
    let res = yield fetch(url);
    console.log(res.bio);
}
// 执行该函数
let g = f();
let result = g.next();
// 由于fetch返回的是Promise对象，所以用then
result.value.then(function(data){
    return data.json();
}).then(function(data){
    g.next(data);
})
```
> 执行器相关代码先执行 Generator 函数获取遍历器对象，然后使用 next() 执行异步任务的第一阶段，在 fetch 返回的 promise.then 方法中调用 next 方法执行第二阶段操作。可以看出，虽然 Generator 函数把异步操作表示得很简洁，但是流程管理却不方便，需要额外手动添加运行时代码。

> 通常为了省略额外的手动流程管理，会引入自动执行函数辅助运行。假如生成器函数中 yield 关键字后全部为同步操作，很容易递归判断返回值 done 是否为 true 运行至函数结束。但更复杂的是异步操作，需要异步完成后执行迭代器 next(data) 方法，传递异步结果并恢复接下来的执行。但以何种方式在异步完成时执行 next()，需要提前约定异步操作形式。

> 常用的自动流程管理有 Thunk 函数模式 和 co 模块。co 同样可以支持 Thunk 函数和 Promise 异步操作。




##### hunk 函数
> 在 JavaScript 语言中，Thunk 函数指的是将多参数函数替换为一个只接受回调函数作为参数的单参数函数（注：这里多参数函数指的是类似 node 中异步 api 风格，callback 为最后入参）。类似于函数柯里化的转换过程，把接受多个参数变换成只接受一个单参数函数。
```js
// 正常版本的 readFile（多参数）
fs.readFile(fileName, callback)

// Thunk 版本的 readFile (单参数)
const Tunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback)
  }
}

const readFileThunk = readFileThunk(fileName)
readFileThunk(callback)
```

> 其实任何函数参数中包含回调函数，都能写成 Thunk 函数形式。类似函数柯里化过程，简单的 Thunk 函数转换器如下所示。生成环境建议使用 Thunkify 模块，可以处理更多异常边界情况。
```js
// Thunk 转换器
const Thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback)
    }
  }
}

// 生成 fs.readFile Thunk 函数调用
const readFileThunk = Thunk(fs.readFile)
readFileThunk(fileA)(callback)
```



#### 自动流程管理
> 先来介绍基于 Thunk 函数的自动流程管理，我们约定 yield 关键字后的表达式返回只接受 callback 参数的函数，即前面讲的 Thunk 类型函数。基于 Thunk Generator 简单自动执行器如下。
```js
function run(fn) {
    var gen = fn()
    function next(err, data) {
        var result = gen.next(data)
        if (result.done) return
        result.value(next)
    }
    next()
}
```

> 上述自动执行器函数，迭代器首先运行到首个 yield 表达式处，yield 表达式返回只接受参数为 callback 的函数，同时将 next() 递归方法作为 callback 入参执行。当异步处理完成回掉 callback 时恢复执行生成器函数。

> 另外一种是基于 Promise 对象的自动执行机制。实际上 co 模块同样支持，Thunk 函数和 Promise 对象，两种模式自动流程管理。前者是将异步操作包装成 Thunk 函数，在 callback 中交回执行权，后者是将异步操作包装成 Promise 对象，在 then 函数中交回生成器执行权。沿用上述示例，先将 fs 模块的 readFile 方法包装成 Promise 对象。
```js
const fs = require('fs')
const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}
```

> 相较于 Thunk 模式在 callback 处理递归，Promise 对象的自动执行器，则是在 then 方法内调用递归处理方法。简单实现为：
```js
function fun(gen) {
    const g = gen()
    function next(data) {
        var result = g.next(data)
        if (result.done) return result.value
        result.value.then((function (data) {
            next(data)
        }))
    }
    next()
}
```

> 翻阅 co 文档可以发现，yield 后对象支持多种形式：promises、thunks、array（promise）、objects （promise）、generators 和 generator functions。




#### 状态机
> 类似于 Promise，其实 Generator 也是有限状态机，翻阅 ECMAScript 文档 Properties of Generator Instances 会发现，生成器函数内部存在 undefined、suspendedStart、suspendedYield、executing、completed 五种状态。伴随着生成器函数运行，内部状态发生相应变化。




#### Regenerator 转换器
> 由于浏览器端环境表现不一致，并不能全部原生支持 Generator 函数，一般会采用 babel 插件 facebook/regenerator 进行编译成 es5 语法，做到低版本浏览器兼容。regenerator 提供 transform 和 runtime 包，分别用在 babel 转码和 运行时支持。

> 不同于 Promise 对象引入 ployfill 垫片就可以运行，Generator 函数是新增的语法结构，仅仅依靠添加运行时代码是无法在低版本下运行的。Generator 编译成低版本可用大致流程为，编译阶段需要处理相应的抽象语法树（ast），生成符合运行时代码的 es5 语法结构。运行时阶段，添加 runtime 函数辅助编译后语句执行。

> regenerator 网站 提供可视化操作，简单 ast 转码前后示例如下：
```js
function *gen() {
  yield 'hello world'
}

var g = gen()

console.log(g.next())
```

```js
var _marked = regeneratorRuntime.mark(gen);

function gen() {
  return regeneratorRuntime.wrap(function gen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'hello world';

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var g = gen();
console.log(g.next());
```

> regenerator-transform 插件处理 ast 语法结构，regenerator-runtime 提供 运行时 regeneratorRuntime 对象支持。这里涉及到 babel 如何转码以及 运行时框架如何运行，内容较多会新起一篇文章再来细说。具体源码可参考 facebook/regenerator 项目。

> 插个话题，说到 babel 来科普下常见 bable-polyfill、babel-runtime、babel-plugin-transform-runtime 插件功能与区别。babel 只负责 es 语法转换，不会对新的对象或方法进行转换，比如 Promise、Array.from 等。babel-polyfill 或 babel-runtime 可以用来模拟实现相应的对象。

> babel-polyfill 和 babel-runtime 两者的区别在于，polyfill 会引入新的全局对象，修改污染掉原有全局作用域下的对象。runtime 则是将开发者依赖的全局内置对象，抽取成单独的模块，并通过模块导入的方式引入，避免对全局作用域污染。

> babel-runtime 与 babel-plugin-transform-runtime 区别在于，前者是实际导入项目代码的功能模块，后者是用于构建过程的运行时代码抽取转换，将所需的运行时代码引用自 babel-runtime。




#### 例题1
```js
function *f(x){
    let y = 2 * (yield (x+1));
    let z = yield (y/3);
    return (x + y + z);
}
let a = f(5);
a.next();   // {value : 6 ,done : false}
a.next();   // {value : NaN ,done : false}  
a.next();   // {value : NaN ,done : true}
// NaN因为yeild返回的是对象 和数字计算会NaN

let b = f(5);
b.next();     // {value : 6 ,done : false}
b.next(12);   // {value : 8 ,done : false}
b.next(13);   // {value : 42 ,done : false}
// x=5 y=24 z=13
```




#### 例子2
> 分析下面这段代码：
```js
function  *fibs() {
    var a = 0;
    var b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
console.log(first, second, third, fourth, fifth, sixth);  // 0 1 1 2 3 5
```

> 在这段代码里，fibs是一个生成无限长的斐波那契数列的生成器，[a, b] = [b, a + b]是利用解构赋值的交换赋值写法（=赋值是从右到左计算，所以先计算右侧a+b，然后才结构，所有有交换赋值的效果），写成生成有限长的数组的ES5写法如下：
```js
function fibs1(n) {
    var a = 0;
    var b = 1;
    var c = 0;
    var result = []
    for (var i = 0; i < n; i++) {
        result.push(a);
        c = a;
        a = b;
        b = c + b;
    }
    return result;
}
console.log(fibs1(6))   // [0, 1, 1, 2, 3, 5]
```

> 而第一段代码里，就是从fibs()迭代器（生成器是迭代器的子集）中解构出前六个值，代码示例如下：
```js
function  *fibs2(n) {
    var a = 0;
    var b = 1;
    for (var i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}
console.log(...fibs2(6));   // 0 1 1 2 3 5
```