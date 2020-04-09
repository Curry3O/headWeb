#### Generator函数简介
> Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态，但是只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。

> 有这样一段代码：
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

//调用及运行结果：
hw.next()// { value: 'hello', done: false }
hw.next()// { value: 'world', done: false }
hw.next()// { value: 'ending', done: true }
hw.next()// { value: undefined, done: true }
```

> 由结果可以看出，Generator函数被调用时并不会执行，只有当调用next方法、内部指针指向该语句时才会执行，即函数可以暂停，也可以恢复执行。每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。




#### Generator函数暂停恢复执行原理
> 协程的概念：一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

> 协程是一种比线程更加轻量级的存在。普通线程是抢先式的，会争夺cpu资源，而协程是合作的，可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程。它的运行流程大致如下：
    - 协程A开始执行
    - 协程A执行到某个阶段，进入暂停，执行权转移到协程B
    - 协程B执行完成或暂停，将执行权交还A
    - 协程A恢复执行

> 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。




#### 执行器
> 通常，我们把执行生成器的代码封装成一个函数，并把这个执行生成器代码的函数称为执行器,co 模块就是一个著名的执行器。

> Generator 是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。两种方法可以做到这一点：
    - 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
    - Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

> 一个基于 Promise 对象的简单自动执行器：
```js
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}
```
> 我们使用时，可以这样使用即可：
```js

function* foo() {
    let response1 = yield fetch('https://xxx') //返回promise对象
    console.log('response1')
    console.log(response1)
    let response2 = yield fetch('https://xxx') //返回promise对象
    console.log('response2')
    console.log(response2)
}
run(foo);
```
> 上面代码中，只要 Generator 函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。通过使用生成器配合执行器，就能实现使用同步的方式写出异步代码了，这样也大大加强了代码的可读性。




#### async/await
> ES7 提出的async 函数，这种方式能够彻底告别执行器和生成器，实现更加直观简洁的代码。async 函数是 Generator 函数的语法糖，并对Generator函数进行了改进。使用关键字 async 来表示，在函数内部使用 await 来表示异步。

> 前文中的代码，用async实现是这样：
```js
const foo = async () => {
    let response1 = await fetch('https://xxx') 
    console.log('response1')
    console.log(response1)
    let response2 = await fetch('https://xxx') 
    console.log('response2')
    console.log(response2)
}
```

> 想较于 Generator，Async 函数的改进在于下面四点：

    1.内置执行器
        - Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。

    2.更好的语义
        - async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

    3.更广的适用性
        - co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

    4.返回值是 Promise
        - async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。


> 这里的重点是自带了执行器，相当于把我们要额外做的(写执行器/依赖co模块)都封装了在内部。比如：
```js
async function fn(args) {
  // ...
}
```
> 等同于：
```js
function fn(args) {
  return spawn(function* () {
    // ...
  });
}

function spawn(genF) { //spawn函数就是自动执行器，跟简单版的思路是一样的，多了Promise和容错处理
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```





##### Async 与其他异步操作的对比
> 先定义一个 Fetch 方法用于获取 github user 的信息：
```js
function fetchUser() { 
    return new Promise((resolve, reject) => {
        fetch('https://api.github.com/users/superman66')
        .then((data) => {
            resolve(data.json());
        }, (error) => {
            reject(error);
        })
    });
}
```

> 1.Promise 方式
```js
function getUserByPromise() {
    fetchUser()
        .then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        })
}
getUserByPromise();

//Promise 的方式虽然解决了 callback hell，但是这种方式充满了 Promise的 then() 方法，如果处理流程复杂的话，整段代码将充满 then。语义化不明显，代码流程不能很好的表示执行流程。
```

> 2.Generator 方式
```js
function* fetchUserByGenerator() {
    const user = yield fetchUser();
    return user;
}

const g = fetchUserByGenerator();
const result = g.next().value;
result.then((v) => {
    console.log(v);
}, (error) => {
    console.log(error);
});

//Generator 的方式解决了 Promise 的一些问题，流程更加直观、语义化。但是 Generator 的问题在于，函数的执行需要依靠执行器，每次都需要通过 g.next() 的方式去执行。
```

> 3.Async 方式
```js
async function getUserByAsync(){
    let user = await fetchUser();
    return user;
}
getUserByAsync()
.then(v => console.log(v));

//async 函数完美的解决了上面两种方式的问题。流程清晰，直观、语义明显。操作异步流程就如同操作同步流程。同时 async 函数自带执行器，执行的时候无需手动加载。
```




##### 语法
###### 1.凡是在前面添加了async的函数在执行后都会自动返回一个Promise对象
> 例子：
```js
async function test() {
    
}

let result = test()
console.log(result)  //即便代码里test函数什么都没返回，我们依然打出了Promise对象
```
> async 函数内部 return 返回的值。会成为 then 方法回调函数的参数。



###### 2.await必须在async函数里使用，不能单独使用
> 错误的例子：
```js
function test() {
    let result = await Promise.resolve('success')
    console.log(result)
}

test()   //执行以后会报错
```

> 正确的例子：
```js
async test() {
    let result = await Promise.resolve('success')
    console.log(result)
}
test()
```



###### 3.await后面需要跟Promise对象，不然就没有意义，而且await后面的Promise对象不必写then，因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数
> 正确的例子：
```js
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        })
    })
}

async test() {
    let result = await fn() //因为fn会返回一个Promise对象
    console.log(result)    //这里会打出Promise成功后传递过来的'success'
}

test()
```

> 没有意义的例子（不会报错）：
```js
async test() {
    let result = await 123
    console.log(result)
}

test()
```



###### 4.async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变
> 也就是说，只有当 async 函数内部的异步操作都执行完，才会执行 then 方法的回调。
```js
const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'
```



###### 5.正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise
> 如下面这个例子：
```js
async function  f() {
    return await 1
};
f().then( (v) => console.log(v)) // 1

//如果返回的是 reject 的状态，则会被 catch 方法捕获。
```




##### async/await的错误处理方式
###### 1.关于错误处理，如规则三所说，await可以直接获取到后面Promise成功状态传递的参数，但是却捕捉不到失败状态。在这里，我们通过给包裹await的async函数添加then/catch方法来解决，因为根据规则一，async函数本身就会返回一个Promise对象。
> 一个包含错误处理的完整的async/await例子：
```js
let promiseDemo = new Promise((resolve, reject) => {
    setTimeout(() => {
        let random = Math.random()
        if (random >= 0.5) {
            resolve('success')
        } else {
            reject('failed')
        }   
    }, 1000)
})

async function test() {
    let result = await promiseDemo
    return result  //这里的result是promiseDemo成功状态的值，如果失败了，代码就直接跳到下面的catch了
}

test().then(response => {
    console.log(response) 
}).catch(error => {
    console.log(error)
})

//上面的代码需要注意两个地方，一是async函数需要主动return一下，如果Promise的状态是成功的，那么return的这个值就会被下面的then方法捕捉到；二是，如果async函数有任何错误，都被catch捕捉到！
```



###### 2.async 函数的语法不难，难在错误处理上。
> 先来看下面的例子：
```js
let a;
async function f() {
    await Promise.reject('error');
    a = await 1; // 这段 await 并没有执行
}
f().then(v => console.log(a));

//当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。
```

> 解决办法：可以添加 try/catch
```js
// 正确的写法
let a;
async function correct() {
    try {
        await Promise.reject('error')
    } catch (error) {
        console.log(error);
    }
    a = await 1;
    return a;
}

correct().then(v => console.log(a)); // 1

//如果有多个 await 则可以将其都放在 try/catch 中。
```




##### async/await的业务场景
###### 1.我们需要发送多个请求，而后面请求的发送总是需要依赖上一个请求返回的数据。对于这个问题，我们既可以用的Promise的链式调用来解决，也可以用async/await来解决，然而后者会更简洁些。
> 使用Promise链式调用来处理：
```js
function request(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

request(500).then(result => {
    return request(result + 1000)
}).then(result => {
    return request(result + 1000)
}).then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
}) 
```

> 使用async/await的来处理：
```js
function request(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

async function getResult() {
    let p1 = await request(500)
    let p2 = await request(p1 + 1000)
    let p3 = await request(p2 + 1000)
    return p3
}

getResult().then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})

//相对于使用then不停地进行链式调用，使用async/await会显的更加易读一些。
```



###### 2.在循环中使用await。如果在是循环中使用await，就需要牢记一条：必须在async函数中使用。
> 在for...of中使用await:
```js
let request = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

let times = [1000, 500, 2000]
async function test() {
    let result = []
    for (let item of times) {
        let temp = await request(item)
        result.push(temp)
    }
    return result
}

test().then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})
```





##### async/await执行顺序
###### 例子1
> 通过上面的分析，我们知道async隐式返回 Promise 作为结果的函数,那么可以简单理解为，await后面的函数执行完毕时，await会产生一个微任务(Promise.then是微任务)。但是我们要注意这个微任务产生的时机，它是执行完await之后，直接跳出async函数，执行其他代码(此处就是协程的运作，A暂停执行，控制权交给B)。其他代码执行完毕后，再回到async函数去执行剩下的代码，然后把await后面的代码注册到微任务队列当中。我们来看个例子：
```js
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})

console.log('script end')

//答案：
// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout
```

> 分析这段代码：

    - 执行代码，输出script start。
  
    - 执行async1(),会调用async2(),然后输出async2 end,此时将会保留async1函数的上下文，然后跳出async1函数。
  
    - 遇到setTimeout，产生一个宏任务
  
    - 执行Promise，输出Promise。遇到then，产生第一个微任务
  
    - 继续执行代码，输出script end

    - 代码逻辑执行完毕(当前宏任务执行完毕)，开始执行当前宏任务产生的微任务队列，输出promise1，该微任务遇到then，产生一个新的微任务

    - 执行产生的微任务，输出promise2,当前微任务队列执行完毕。执行权回到async1

    - 执行await,实际上会产生一个promise返回，即：let promise_ = new Promise((resolve,reject){ resolve(undefined)}); 执行完成，执行await后面的语句，输出async1 end

    - 最后，执行下一个宏任务，即执行setTimeout，输出setTimeout


> 注意:
    新版的chrome浏览器中不是如上打印的，因为chrome优化了,await变得更快了,输出为:
        script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout


    解释：
        如果await 后面直接跟的为一个变量，比如：await 1；这种情况的话相当于直接把await后面的代码注册为一个微任务，可以简单理解为promise.then(await下面的代码)。然后跳出async1函数，执行其他代码，当遇到promise函数的时候，会注册promise.then()函数到微任务队列，注意此时微任务队列里面已经存在await后面的微任务。所以这种情况会先执行await后面的代码（async1 end），再执行async1函数后面注册的微任务代码(promise1,promise2)。


> 如果await后面跟的是一个异步函数的调用，比如上面的代码，将代码改成这样：
```js
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(()=>{
        console.log('async2 end1')
    })
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})

console.log('script end')
```
> 输出为：
    script start => async2 end => Promise => script end =>async2 end1 => promise1 => promise2 => async1 end => setTimeout

> 解释：
    此时执行完awit并不先把await后面的代码注册到微任务队列中去，而是执行完await之后，直接跳出async1函数，执行其他代码。然后遇到promise的时候，把promise.then注册为微任务。其他代码执行完毕后，需要回到async1函数去执行剩下的代码，然后把await后面的代码注册到微任务队列当中，注意此时微任务队列中是有之前注册的微任务的。所以这种情况会先执行async1函数之外的微任务(promise1,promise2)，然后才执行async1内注册的微任务(async1 end)。






###### 例子2
> 很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的函数会先执行一遍(比如await Fn()的Fn ,并非是下一行代码)，然后就会跳出整个async函数来执行后面js栈的代码。等本轮事件循环执行完了之后又会跳回到async函数中等待await后面表达式的返回值，如果返回值为非promise则继续执行async函数后面的代码，否则将返回的promise放入Promise队列（Promise的Job Queue）

> 例子：
```js
function testSometing() {
    console.log("testSomething");
    return "return testSomething";
}

async function testAsync() {
    console.log("testAsync");
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");

    const testFn1 = await testSometing();
    console.log(testFn1);

    const testFn2 = await testAsync();
    console.log(testFn2);

    console.log('test end...');
}

test();

var promiseFn = new Promise((resolve)=> { 
    console.log("promise START...");
    resolve("promise RESOLVE");
});
promiseFn.then((val)=> console.log(val));

console.log("===END===")
```
> 输出：
    test start...
    testSomething
    promise START...
    ===END===
    return testSomething
    testAsync
    promise RESOLVE
    hello async
    test end...

> 解释：
    - 首先test()打印出test start...
  
    - 然后 testFn1 = await testSomething(); 的时候，会先执行testSometing()这个函数打印出“testSometing”的字符串。
  
    - 之后因为await会让出线程就会去执行后面的。testAsync()执行完毕返回resolve，触发promiseFn打印出“promise START...”。
  
    - 接下来会把返回的Promiseresolve("promise RESOLVE")放入Promise队列（Promise的Job Queue），继续执行打印“===END===”。
  
    - 等本轮事件循环执行结束后，又会跳回到async函数中（test()函数），等待之前await 后面表达式的返回值，因为testSometing() 不是async函数，所以返回的是一个字符串“returntestSometing”。
  
    - test()函数继续执行，执行到testFn2()，再次跳出test()函数，打印出“testAsync”，此时事件循环就到了Promise的队列，执行promiseFn.then((val)=> console.log(val));打印出“promise RESOLVE”。

    - 之后和前面一样 又跳回到test函数继续执行console.log(testFn2)的返回值，打印出“hello async”。
  
    - 最后打印“test end...”。
  

> 让testSomething()变成async
```js
async function testSometing() {
    console.log("testSomething");
    return "return testSomething";
}

async function testAsync() {
    console.log("testAsync");
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");

    const testFn1 = await testSometing();
    console.log(testFn1);

    const testFn2 = await testAsync();
    console.log(testFn2);

    console.log('test end...');
}

test();

var promiseFn = new Promise((resolve)=> { 
    console.log("promise START...");
    resolve("promise RESOLVE");
});
promiseFn.then((val)=> console.log(val));

console.log("===END===")
```
> 输出：
    test start...
    testSomething
    promise START...
    ===END===
    promise RESOLVE
    return testSomething
    testAsync
    hello async
    test end...

> 解释：
    和上一个例子比较发现promiseFn.then((val)=> console.log(val)); 先于console.log(testFn1) 执行。原因是因为现在的版本async函数会被await resolve

```js
function testSometing() {
    console.log("testSomething");
    return "return testSomething";
}
console.log(Object.prototype.toString.call(testSometing)) // [object Function]
console.log(Object.prototype.toString.call(testSometing())) // [object String]

async function testSometing() {
    console.log("testSomething");
    return "return testSomething";
}
console.log(Object.prototype.toString.call(testSometing)) // [object AsyncFunction]
console.log(Object.prototype.toString.call(testSometing())) // [object Promise]
```
> testSomething()已经是async函数，返回的是一个Promise对象需要等它 resolve 后将当前Promise 推入队列，随后先清空调用栈，所以会"跳出" test() 函数执行后续代码，随后才开始执行该 Promise。