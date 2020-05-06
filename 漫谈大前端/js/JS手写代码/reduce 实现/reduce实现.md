## reduce
### 定义
> 对数组中的每个元素执行一个自定义的累计器，将其结果汇总为单个返回值



### 语法
> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
    - 参数
        - callback：回调函数(必选)
        - initialValue：初始值(可选)

    - 回调函数的参数
        - accumulator：累计器完成计算的返回值(必选)
        - currentValue：数组中正在处理的元素(必选)
        - 数组中正在处理的当前元素的索引(可选)
        - 调用 reduce() 的数组(可选)

    - 过程
        - 以accumulator作为累计结果的初始值，不设置accumulator则以数组第一个元素为初始值
        - 开始遍历，使用累计器处理currentValue，将currentValue的映射结果累计到accumulator上，结束此次循环，返回accumulator
        - 进入下一次循环，重复上述操作，直至数组最后一个元素
        - 结束遍历，返回最终的accumulator


###  reduceRight
> 该方法用法与reduce()其实是相同的，只是遍历的顺序相反，它是从数组的最后一项开始，向前遍历到第一项。



### reduce 实现
```js
Array.prototype.myreduce = function (fn, initialValue) {
    // 判断调用对象是否为数组
    if (Object.prototype.toString.call([]) !== '[object Array]') {
        throw new TypeError('not a array')
    }
    // 判断调用数组是否为空数组
    const sourceArray = this
    if (sourceArray.length === 0) {
        throw new TypeError('empty array')
    }
    // 判断传入的第一个参数是否为函数
    if (typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`)
    }

    // 第二步
    // 回调函数参数初始化
    let accumulator,
        currentValue,
        currentIndex;
    if (initialValue) {
        accumulator = initialValue
        currentIndex = 0
    } else {
        //如果提供了initialValue，则起始索引号为0，否则从索引1起始。
        accumulator = arr[0]
        currentIndex = 1
    }

    // 第三步
    // 开始循环
    while (currentIndex < sourceArray.length) {
        if (Object.prototype.hasOwnProperty.call(sourceArray, currentIndex)) {
            currentValue = sourceArray[currentIndex]
            accumulator = fn(accumulator, currentValue, currentIndex, sourceArray)
        }

        currentIndex++
    }

    // 第四步
    // 返回结果
    return accumulator
}
```




### reduce 用法
#### 累加累乘
```js
function Accumulation(...vals) {
    return vals.reduce((t, v) => t + v, 0);
}

function Multiplication(...vals) {
    return vals.reduce((t, v) => t * v, 1);
}

Accumulation(1, 2, 3, 4, 5); // 15
Multiplication(1, 2, 3, 4, 5); // 120
```


#### 权重求和
```js
const scores = [
    { score: 90, subject: "chinese", weight: 0.5 },
    { score: 95, subject: "math", weight: 0.3 },
    { score: 85, subject: "english", weight: 0.2 }
];

const result = scores.reduce((t, v) => t + v.score * v.weight, 0); // 90.5
```


#### 代替reverse
```js
function Reverse(arr = []) {
    return arr.reduceRight((t, v) => (t.push(v), t), []);
}

Reverse([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]
```


#### 代替map和filter
```js
const arr = [0, 1, 2, 3];

// 代替map：[0, 2, 4, 6]
const a = arr.map(v => v * 2);
const b = arr.reduce((t, v) => [...t, v * 2], []);

// 代替filter：[2, 3]
const c = arr.filter(v => v > 1);
const d = arr.reduce((t, v) => v > 1 ? [...t, v] : t, []);

// 代替map和filter：[4, 6]
const e = arr.map(v => v * 2).filter(v => v > 2);
const f = arr.reduce((t, v) => v * 2 > 2 ? [...t, v * 2] : t, []);
```


#### 代替some和every
```js
const scores = [
    { score: 45, subject: "chinese" },
    { score: 90, subject: "math" },
    { score: 60, subject: "english" }
];

// 代替some：至少一门合格
const isAtLeastOneQualified = scores.reduce((t, v) => t || v.score >= 60, false); // true

// 代替every：全部合格
const isAllQualified = scores.reduce((t, v) => t && v.score >= 60, true); // false
```


#### 数组分割
```js
function Chunk(arr = [], size = 1) {
    return arr.length ? arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]]) : [];
}

const arr = [1, 2, 3, 4, 5];
Chunk(arr, 2); // [[1, 2], [3, 4], [5]]
```


#### 数组过滤
```js
function Difference(arr = [], oarr = []) {
    return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), []);
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 6]
Difference(arr1, arr2); // [1, 4, 5]
```


#### 数组填充
```js
function Fill(arr = [], val = "", start = 0, end = arr.length) {
    if (start < 0 || start >= end || end > arr.length) return arr;
    return [
        ...arr.slice(0, start),
        ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),
        ...arr.slice(end, arr.length)
    ];
}

const arr = [0, 1, 2, 3, 4, 5, 6];
Fill(arr, "aaa", 2, 5); // [0, 1, "aaa", "aaa", "aaa", 5, 6]
```


#### 数组扁平
```js
function Flat(arr = []) {
    return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])
}

const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
Flat(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```


#### 数组去重
```js
function Uniq(arr = []) {
    return arr.reduce((t, v) => t.includes(v) ? t : [...t, v], []);
}

const arr = [2, 1, 0, 3, 2, 1, 2];
Uniq(arr); // [2, 1, 0, 3]
```


#### 数组最大最小值
```js
function Max(arr = []) {
    return arr.reduce((t, v) => t > v ? t : v);
}

function Min(arr = []) {
    return arr.reduce((t, v) => t < v ? t : v);
}

const arr = [12, 45, 21, 65, 38, 76, 108, 43];
Max(arr); // 108
Min(arr); // 12
```


#### 数组成员独立拆解
```js
function Unzip(arr = []) {
    return arr.reduce(
        (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
        Array.from({ length: Math.max(...arr.map(v => v.length)) }).map(v => [])
    );
}

const arr = [["a", 1, true], ["b", 2, false]];
Unzip(arr); // [["a", "b"], [1, 2], [true, false]]
```


#### 数组成员个数统计
```js
//此方法是字符统计和单词统计的原理，入参时把字符串处理成数组即可
function Count(arr = []) {
    return arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {});
}

const arr = [0, 1, 1, 2, 2, 2];
Count(arr); // { 0: 1, 1: 2, 2: 3 }
```


#### 数组成员位置记录
```js
function Position(arr = [], val) {
    return arr.reduce((t, v, i) => (v === val && t.push(i), t), []);
}

const arr = [2, 1, 5, 4, 2, 1, 6, 6, 7];
Position(arr, 2); // [0, 4]
```


#### 字符串翻转
```js
function ReverseStr(str = "") {
    return str.split("").reduceRight((t, v) => t + v);
}

const str = "reduce最牛逼";
ReverseStr(str); // "逼牛最ecuder"
```


#### 异步累计
```js
async function AsyncTotal(arr = []) {
    return arr.reduce(async(t, v) => {
        const at = await t;
        const todo = await Todo(v);
        at[v] = todo;
        return at;
    }, Promise.resolve({}));
}

const result = await AsyncTotal(); // 需要在async包围下使用
```


#### 斐波那契数列
```js
function Fibonacci(len = 2) {
    const arr = [...new Array(len).keys()];
    return arr.reduce((t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t), [0, 1]);
}

Fibonacci(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```


#### URL参数反序列化
```js
function ParseUrlSearch() {
    return location.search.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
        const [key, val] = v.split("=");
        t[key] = decodeURIComponent(val);
        return t;
    }, {});
}

// 假设URL为：https://www.baidu.com?age=25&name=TYJ
ParseUrlSearch(); // { age: "25", name: "TYJ" }
```


#### URL参数序列化
```js
function StringifyUrlSearch(search = {}) {
    return Object.entries(search).reduce(
        (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
        Object.keys(search).length ? "?" : ""
    ).replace(/&$/, "");
}

StringifyUrlSearch({ age: 27, name: "YZW" }); // "?age=27&name=YZW"
```


#### 返回对象指定键值
```js
function GetKeys(obj = {}, keys = []) {
    return Object.keys(obj).reduce((t, v) => (keys.includes(v) && (t[v] = obj[v]), t), {});
}

const target = { a: 1, b: 2, c: 3, d: 4 };
const keyword = ["a", "d"];
GetKeys(target, keyword); // { a: 1, d: 4 }
```


#### 数组转对象
```js
const people = [
    { area: "GZ", name: "YZW", age: 27 },
    { area: "SZ", name: "TYJ", age: 25 }
];
const map = people.reduce((t, v) => {
    const { name, ...rest } = v;
    t[name] = rest;
    return t;
}, {}); // { YZW: { area: 'GZ', age: 27 }, TYJ: { area: 'SZ', age: 25 } }
```


#### Redux Compose函数原理
```js
function Compose(...funs) {
    if (funs.length === 0) {
        return arg => arg;
    }
    if (funs.length === 1) {
        return funs[0];
    }
    return funs.reduce((t, v) => (...arg) => t(v(...arg)));
}
```