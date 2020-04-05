//proxy示例

//修改get、set
var target1 = {a:1,b:2};
var proxy1 = new Proxy(target1, {
    get(target, key, value) {
        if (key === 'c') {
            return '我是自定义的一个结果';
        } else {
            return target[key];
        }
    },
    set(target, key, value) {
        if (value === 4) {
            target[key] = '我是自定义的一个结果';
        } else {
            target[key] = value;
        }
    }
})

console.log(target1.a) // 1
console.log(target1.c) // undefined
console.log(proxy1.a) // 1
console.log(proxy1.c) // 我是自定义的一个结果

target1.name = '李白';
console.log(target1.name); // 李白
target1.age = 4;
console.log(target1.age); // 4

proxy1.name = '李白';
console.log(proxy1.name); // 李白
proxy1.age = 4;
console.log(proxy1.age); // 我是自定义的一个结果


//has(target, propKey)，可以拦截 propKey in proxy 的操作，返回一个布尔值。
// 使用 has 方法隐藏某些属性，不被 in 运算符发现
var target2 = {_prop: 'foo',prop: 'foo'};
var proxy2 = new Proxy(target2, {
    has(target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
});
console.log('_prop' in proxy2); // false


// apply 方法拦截函数的调用、call 和 apply 操作。
//apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组
var target3 = function () {
    return 'I am the target';
};

var proxy3 = new Proxy(target3, {
    apply: function () {
        return 'I am the proxy';
    }
});

console.log(proxy3()); // I am the proxy
//上面代码中，变量proxy3是 Proxy 的实例，当它作为函数调用时（proxy3()），就会被apply方法拦截，返回一个字符串。


function sum(left, right) {
    return left + right;
};

var twice = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments) * 2;
    }
};

var proxy = new Proxy(sum, twice);
console.log(proxy(1, 2)); // 6
console.log(proxy.call(null, 5, 6)); // 22
console.log(proxy.apply(null, [7, 8])); // 30


/* 
ownKeys() 方法可以拦截对象自身属性的读取操作,具体来说，拦截以下操作：
    · Object.getOwnPropertyNames()
    · Object.getOwnPropertySymbols()
    · Object.keys() 
*/

//下面的例子是拦截第一个字符为下划线的属性名，不让它被 for of 遍历到:
let target4 = {
    _bar: 'foo',
    _prop: 'bar',
    prop: 'baz'
};

let proxy4 = new Proxy(target4, {
    ownKeys(target) {
        return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    }
});

for (let key of Object.keys(proxy4)) {
    console.log(target4[key]); // baz
}

console.log(Object.keys(proxy4)); //[ 'prop' ]


//defineProperty()方法拦截了Object.defineProperty操作。
var target5 = {};
var proxy5 = new Proxy(target5, {
    defineProperty(target, key, descriptor) {
        return false;
    }
});
proxy5.foo = 'bar'
console.log(proxy5.foo); //undefined


//测试
const target6 = {
    name: 'Billy Bob',
    age: 15
};
const handler6 = {
    get(target, key, proxy) {
        const today = new Date();
        console.log(`GET request made for ${key} at ${today}`);
        return Reflect.get(target, key, proxy);
    }
};
const proxy6 = new Proxy(target6, handler6);
console.log(proxy6.name);
//GET request made for name at Wed Mar 25 2020 21:47:44 GMT+0800 (GMT+08:00)
//Billy Bob


//construct
//construct 方法用来拦截 new 操作符。它接收三个参数，分别是目标对象、构造函数的参数列表、Proxy 对象，最后需要返回一个对象。

function Person(name, age) {
    this.name = name;
    this.age = age;
}
const proxy7 = new Proxy(Person, {
    construct(target, args, newTarget) {
        console.log('construct');
        return new target(...args);
    }
})
const per = new proxy7('tom', 21); // construct
console.log(per); //Person { name: 'tom', age: 21 }


//我们知道，如果构造函数没有返回任何值或者返回了原始类型的值，那么默认返回的就是 this，如果返回的是一个引用类型的值，那么最终 new 出来的就是这个值。 因此，你可以代理一个空函数，然后返回一个新的对象。

function noop() {}
const Persons = new Proxy(noop, {
    construct(target, args, newTarget) {
        return {
            name: args[0],
            age: args[1]
        }
    }
})
const person = new Persons('tom', 21); 
console.log(person); // { name: 'tom', age: 21 }

