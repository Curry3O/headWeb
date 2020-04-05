#### 什么是Promise
> 介绍：Promise最早由社区提出并实现，典型的一些库有Q，when， bluebird等；它们的出现是为了更好地解决JavaScript中异步编程的问题，传统的异步编程最大的特点就是地狱般的回调嵌套，一旦嵌套次数过多，就很容易使我们的代码难以理解和维护。而Promise则可以让我们通过链式调用的方法去解决回调嵌套的问题，使我们的代码更容易理解和维护，而且Promise还增加了许多有用的特性，让我们处理异步编程得心应手。

> Promise 是异步编程的一种解决方案：从语法上讲，promise是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。promise有三种状态：pending(等待态)，fulfiled(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造promise实例后，它会立即执行。


#### 回调地狱
```js
请求1(function(请求结果1){
    请求2(function(请求结果2){
        请求3(function(请求结果3){
            请求4(function(请求结果4){
                请求5(function(请求结果5){
                    请求6(function(请求结果3){
                        ...
                    })
                })
            })
        })
    })
})
```
> Promise 的常规写法：
```js
new Promise(请求1)
    .then(请求2(请求结果1))
    .then(请求3(请求结果2))
    .then(请求4(请求结果3))
    .then(请求5(请求结果4))
    .catch(处理异常(异常信息))
```

> 回调地狱带来的负面作用有以下几点：
    - 代码臃肿。
    - 可读性差。
    - 耦合度过高，可维护性差。
    - 代码复用性差。
    - 容易滋生 bug。
    - 只能在回调里处理异常。

> promise是用来解决问题：
    - 回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象
    - promise可以支持多个并发的请求，获取并发请求中的数据
    - 这个promise可以解决异步的问题，本身不能说promise是异步的



#### 创建Promise
> ES5的语法
```js
var promise = new Promise(function(resolve, reject) {
    var flag = Math.random();
    setTimeout(function() {
        if(flag) {
            resolve('success');
        }
        else {
            reject('fail');
        }
    }, 1000);
});

console.log(promise); // 在浏览器的控制台运行的话，它返回的是一个包含了许多属性的Promise对象；在Node.js环境中控制台输出 Promise { <pending> }。

promise.then(function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
}); 
// 1s后这里的输出可能是fail也可能是success
```
> 解释：
    1.因为Promise是一个构造函数，所以我们使用了new操作符来创建promise。

    2.构造函数Promise的参数是一个函数（暂时叫它func），这个函数（func）有两个参数resolve和reject，它们分别是两个函数，这两个函数的作用就是将promise的状态从pending（等待）转换为resolved（已解决）或者从pending（等待）转换为rejected（已失败）。

    3.创建后的promise有一些方法，then和catch。当然我们也可以人为的在Promise函数上添加一些满足我们自己需求的方法，方便每一个promise对象使用。


> ES6的语法
```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('success') : reject('fail');
    }, 1000)
});

console.log(p);

p.then((result) => {
    console.log(result);
}, (err) => {
    console.log(err);
});
```
> Promise函数体的内部包裹着一个异步的请求或者操作或者函数；然后我们可以在这个异步的操作完成的时候使用resolve函数将我们获得的结果传递出去，或者使用reject函数将错误的消息传递出去。



#### Promise 构造函数
> Promise构造函数做的事情
    - 初始化 Promise 状态（pending）
    - 初始化 then(..) 注册回调处理数组（then 方法可被同一个 promise 调用多次）
    - 立即执行传入的 fn 函数，传入Promise 内部 resolve、reject 函数

```js
class Promise{
    constructor(executor){
        //控制状态，使用了一次之后，接下来的都不被使用
        this.status = 'pendding'
        this.value = undefined
        this.reason = undefined
    
        //定义resolve函数
        let resolve = (data)=>{
            //这里pendding，主要是为了防止executor中调用了两次resovle或reject方法，而我们只调用一次
            if(this.status==='pendding'){
                this.status = 'resolve'
                this.value = data
            } 
        }

        //定义reject函数
        let reject = (data)=>{
            if(this.status==='pendding'){
                this.status = 'reject'        
                this.reason = data
            } 
        }

        //executor方法可能会抛出异常，需要捕获
        try{
            //将resolve和reject函数给使用者      
            executor(resolve,reject)      
        }catch(e){
            //如果在函数中抛出异常则将它注入reject中
            reject(e)
        }
    }
}
```
> 分析上面代码
    - executor：这是实例Promise对象时在构造器中传入的参数，一般是一个function(resolve,reject){}

    - status：``Promise的状态，一开始是默认的pendding状态，每当调用道resolve和reject方法时，就会改变其值，在后面的then方法中会用到

    - value：resolve回调成功后，调用resolve方法里面的参数值

    - reason：reject回调成功后，调用reject方法里面的参数值

    - resolve：声明resolve方法在构造器内，通过传入的executor方法传入其中，用以给使用者回调

    - reject：声明reject方法在构造器内，通过传入的executor方法传入其中，用以给使用者回调



#### then
> then方法是Promise中最为重要的方法，他的用法大家都应该已经知道，就是将Promise中的resolve或者reject的结果拿到，那么我们就能知道这里的then方法需要两个参数，成功回调和失败回调

> 源码
```js
then(onFufilled,onRejected){  
    if(this.status === 'resolve'){
        onFufilled(this.value)
    }
    if(this.status === 'reject'){
        onRejected(this.reason)
    }
}
```

> Promise 对象的 then 方法接受两个参数：
    promise.then(onFulfilled, onRejected);

> onFulfilled 和 onRejected 都是可选参数。如果 onFulfilled 或 onRejected 不是函数，其必须被忽略。

> onFulfilled 特性
    - 当 promise 状态变为成功时必须被调用，其第一个参数为 promise 成功状态传入的值（ resolve 执行时传入的值）

    - 在 promise 状态改变前其不可被调用

    - 其调用次数不可超过一次

> onRejected 特性
    - 当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值（ reject 执行时传入的值）

    - 在 promise 状态改变前其不可被调用

    - 其调用次数不可超过一次

> 多次调用
    then 方法可以被同一个 promise 对象调用多次。当 promise 成功状态时，所有 onFulfilled 需按照其注册顺序依次回调。当 promise 失败状态时，所有 onRejected 需按照其注册顺序依次回调。

> then 方法必须返回一个新的 promise 对象
    promise2 = promise1.then(onFulfilled, onRejected);

> 因此 promise 支持链式调用
    promise1.then(onFulfilled1, onRejected1).then(onFulfilled2, onRejected2);

> 1.如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
    - 若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的onFulfilled 或者 onRejected 函数的参数.

    - 若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。

```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})
promise2 = promise1.then(res => {
  // 返回一个普通值
  return '这里返回一个普通值'
})
promise2.then(res => {
  console.log(res) //1秒后打印出：这里返回一个普通值
})
```

```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})
promise2 = promise1.then(res => {
  // 返回一个Promise对象
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     resolve('这里返回一个Promise')
    }, 2000)
  })
})
promise2.then(res => {
  console.log(res) //3秒后打印出：这里返回一个Promise
})
```

> 2.如果 onFulfilled 或者onRejected 抛出一个异常 e ，则 promise2 必须变为失败（Rejected），并返回失败的值 e，例如：
```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
promise2 = promise1.then(res => {
  throw new Error('这里抛出一个异常e')
})
promise2.then(res => {
  console.log(res)
}, err => {
  console.log(err) //1秒后打印出：这里抛出一个异常e
})
```

> 3.如果onFulfilled 不是函数且 promise1 状态为成功（Fulfilled）， promise2 必须变为成功（Fulfilled）并返回 promise1 成功的值，例如：
```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
promise2 = promise1.then('这里的onFulfilled本来是一个函数，但现在不是')
promise2.then(res => {
  console.log(res) // 1秒后打印出：success
}, err => {
  console.log(err)
})

```

> 4.如果 onRejected 不是函数且 promise1 状态为失败（Rejected），promise2必须变为失败（Rejected） 并返回 promise1 失败的值，例如：
```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('fail')
  }, 1000)
})
promise2 = promise1.then(res => res, '这里的onRejected本来是一个函数，但现在不是')
promise2.then(res => {
  console.log(res)
}, err => {
  console.log(err)  // 1秒后打印出：fail
})
```

> 例子：
```js
let p = new Promise((resolve, reject) => {
    let flag = Math.random() > 0.5 ? true : false;
    if(flag) {
        console.log('使用resolve将promise状态从pending变为resolved');
        resolve('success');
    }
    else {
        console.log('使用reject将promise状态从pending变为rejected');
        reject('fail');
    }
});

// @1
p.then((result) => {
    console.log('接受resolved的结果');
    console.log(result);
}, (err) => {
    console.log('捕获错误的结果');
    console.log(err);
});
```

> 我们可以看到，then方法可以接受两个函数作为参数，第一个函数是用来处理resolve的结果，第二个是可选的，用来处理reject的结果。也就是说，我们在创建p这个Promise对象的时候，通过函数resolve传递出去的结果可以被p的第一个then方法中的第一个函数捕获然后作为它的参数。通过函数reject传递出去的结果可以被p的第一个then方法中的第二个函数捕获然后作为它的参数。


> 当然我们还可以在每一个then方法中创建新的Promise，然后将这个Promise对象返回，之后我们就可以在后面的then方法中继续对这个对象进行操作。下面是一个简单的例子：
```js
let p1 = new Promise((resolve, reject) => {
    let flag = Math.random() > 0.5 ? true : false;
    resolve();
});
// @2 使用then方法进行链式的调用
p1.then(() => {
    return 1;
}).then((result) => {
    console.log(result);
    return 'hello'
}).then((result) => {
    console.log(result);
});

// @3 在then方法内部可以再次使用异步的操作
p1.then(() => {
    console.log('******');
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(123);
        }, 1000);
    });
    return p1;
}).then((result) => {
    console.log(result);
});
```
> 从上面的代码中我们可以看到，一旦创建一个Promise对象之后，我们就可以使用then方法来进行链式的调用，而且我们可以把每一次的结果都返还给下一个then方法，然后在下一个then方法中对这个值进行处理。每一个then方法中都可以再次新创建一个Promise对象，然后返还给下一个then方法处理。



#### catch
> catch这个方法是用来捕获Promise中的reject的值，也就是相当于then方法中的onRejected回调函数
```js
//catch方法
catch(onRejected){
    return this.then(null,onRejected)
}
```
> 该方法是挂在Promise原型上的方法。当我们调用catch传callback的时候，就相当于是调用了then方法

> catch方法和then的第二个参数一样，用来指定reject的回调。
```js
let p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('success') : reject('fail');
    }, 1000)
});

p.then((result) => {
    console.log(result);
}, (err) => {
    console.log(err);
});

//等同于
p.then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
})
```

> 效果和写在then的第二个参数里面一样。不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。请看下面的代码：
```js
p.then((data) => {
    console.log('resolved',data);
    console.log(somedata); //此处的somedata未定义
})
.catch((err) => {
    console.log('rejected',err);
});
//报错：ReferenceError: somedata is not defined
```
> 在resolve的回调中，我们console.log(somedata);而somedata这个变量是没有被定义的。代码运行到这里就直接在控制台报错了。

> 也就是说进到catch方法里面去了，而且把错误原因传到了reason参数中。即便是有错误的代码也不会报错了，这与我们的try/catch语句有相同的功能



#### resolve/reject
> Promise 实例化时立即执行传入的 fn 函数，同时传递内部 resolve 函数作为参数用来改变 promise 状态。resolve 函数简易版逻辑大概为：判断并改变当前 promise 状态，存储 resolve(..) 的 value 值。判断当前是否存在 then(..) 注册回调执行函数，若存在则依次异步执行 onResolved 回调。
    - 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise

    - 如果 x 为 Promise ，则使 promise 接受 x 的状态

    - 如果 x 为对象或函数
        1.把 x.then 赋值给 then
        2.如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
        3.如果 then 是函数，将 x 作为函数的作用域 this 调用之 
        4.如果 x 不为对象或者函数，以 x 为参数执行 promise


```js
//resolve方法
Promise.resolve = function(val){
    return new Promise((resolve,reject)=>{
        resolve(val)
    })
}
//reject方法
Promise.reject = function(val){
    return new Promise((resolve,reject)=>{
        reject(val)
    })
}
```

> 使用 Promise.resolve 和 Promise.reject 方法，用于将于将非 Promise 实例包装为 Promise 实例
```js
Promise.resolve({name:'winty'})
Promise.reject({name:'winty'})
// 等价于
new Promise((resolve,reject) => resolve({name:'winty'}))
new Promise((resolve,reject) => reject({name:'winty'}))
```
> Promise.resolve 的入参可能有以下几种情况：
    - 无参数 [直接返回一个resolved状态的 Promise 对象]
    - 普通数据对象 [直接返回一个resolved状态的 Promise 对象]
    - 一个Promise实例 [直接返回当前实例]
    - 一个thenable对象(thenable对象指的是具有then方法的对象) [转为 Promise 对象，并立即执行thenable对象的then方法。]
    
>例子
```js
let arr = [null, 0, 'hello',
    { then: function() { console.log(' a thenable obj')}}
];

arr.map((value) => {
    return Promise.resolve(value);
});

console.log(arr);
//输出：[ null, 0, 'hello', { then: [Function: then] } ] 和 a thenable obj
//a thenable obj解释：Promise.resolve方法会将具有then方法的对象转换为一个Promise对象，然后就立即执行then方法。
```
    


#### Promise.all
> Promise.all(iterable) 返回一个新的 Promise 实例。此实例在 iterable 参数内所有的 promise 都 fulfilled 或者参数中不包含 promise 时，状态变成 fulfilled；如果参数中 promise 有一个失败 rejected，此实例回调失败，失败原因的是第一个失败 promise 的返回结果。
    let p = Promise.all([p1, p2, p3]);

> p的状态由 p1,p2,p3决定，分成以下；两种情况：
    1.只有p1、p2、p3的状态都变成 fulfilled，p的状态才会变成 fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

    2.只要p1、p2、p3之中有一个被 rejected，p的状态就变成 rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

> Promise.all 的特点
    - 如果传入的参数为空的可迭代对象， Promise.all 会 同步 返回一个已完成状态的 promise
    - 如果传入的参数中不包含任何 promise, Promise.all 会 异步 返回一个已完成状态的 promise
    - 其它情况下， Promise.all 返回一个 处理中（pending） 状态的 promise

> Promise.all 返回的 promise 的状态
    - 如果传入的参数中的 promise 都变成完成状态， Promise.all 返回的 promise 异步地变为完成。
    - 如果传入的参数中，有一个 promise 失败， Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成
    - 在任何情况下， Promise.all 返回的 promise 的完成状态的结果都是一个数组

> 源码
```js
Promise.all = function (promiseArrs) { //在Promise类上添加一个all方法，接受一个传进来的promise数组
    return new Promise((resolve, reject) => { //返回一个新的Promise
        let arr = []; //定义一个空数组存放结果
        let i = 0;
        function handleData(index, data) { //处理数据函数
            arr[index] = data;
            i++;
            if (i === promiseArrs.length) { //当i等于传递的数组的长度时 
                resolve(arr); //执行resolve,并将结果放入
            }
        }
        for (let i = 0; i < promiseArrs.length; i++) { //循环遍历数组
            promiseArrs[i].then((data) => {
                handleData(i, data); //将结果和索引传入handleData函数
            }, reject)
        }
    })
}
```


> 例子：
```js
let arr = [1, 2, 3].map(
    (value) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve(value) : reject(value);
            }, value * 1000);
        });
    }
);

let promises = Promise.all(arr)
.then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
```



#### Promise.race
> 多个 Promise 任务同时执行，返回最先执行结束的 Promise 任务的结果，不管这个 Promise 结果是成功还是失败。

> 源码
```js
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject);
        }
    })
}
```

> 例子：
```js
 //请求某个图片资源
function requestImg(){
    var p = new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.src = '图片的路径';
    });
    return p;
}
//延时函数，用于给请求计时
function timeout(){
    var p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}
Promise.race([requestImg(), timeout()]).then((data) =>{
    console.log(data);
}).catch((err) => {
    console.log(err);
});
```
> requestImg函数会异步请求一张图片，我把地址写为"图片的路径"，所以肯定是无法成功请求到的。timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，如果5秒之内图片请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟图片还未成功返回，那么timeout就跑赢了，则进入catch，报出“图片请求超时”的信息。




#### Promise.allSettled
> Promise.allSettled()方法返回一个promise，该promise在所有给定的promise已被解析或被拒绝后解析，并且每个对象都描述每个promise的结果。

> 举例说明, 比如各位用户在页面上面同时填了3个独立的表单, 这三个表单分三个接口提交到后端, 三个接口独立, 没有顺序依赖, 这个时候我们需要等到请求全部完成后给与用户提示表单提交的情况。在多个promise同时进行时咱们很快会想到使用Promise.all来进行包装, 但是由于Promise.all的短路特性, 三个提交中若前面任意一个提交失败, 则后面的表单也不会进行提交了, 这就与咱们需求不符合。
```js
let p = Promise.allSettled([
  Promise.resolve('a'),
  Promise.reject('b'),
]);

p.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})
```



#### Promise.finally
> finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

> 在实际应用的时候，我们很容易会碰到这样的场景，不管Promise最后的状态如何，都要执行一些最后的操作。我们把这些操作放到 finally 中，也就是说 finally 注册的函数是与 Promise 的状态无关的，不依赖 Promise 的执行结果。
```js
Promise.finally = function(onDone){
    this.then(onDone,onDone);
}
```



#### Promise语法糖 deferred
> 源码
```js
//promise语法糖 也用来测试
Promise.deferred = Promise.defer = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
```

> 例子
```js
let fs = require('fs')
let Promise = require('./promises')
//Promise上的语法糖，为了防止嵌套，方便调用
//坏处 错误处理不方便
function read(){
    let defer = Promise.defer()
    fs.readFile('./1.txt','utf8',(err,data)=>{
        if(err)defer.reject(err)
        defer.resolve(data)
    })
    return defer.Promise
}
```