//柯里化实现1
const currying = (fn) => {
    if (fn.length <= 1) return fn;
    const generator = (args, rest) => (!rest ? fn(...args) : arg => generator([...args, arg], rest - 1));
    return generator([], fn.length);
};

//测试
const sum = (a, b, c) => a + b + c;
const curriedSum = currying(sum);
const res = curriedSum(1)(2)(3)
console.log(res); // 6

const log = (a, b, c) => {
    console.log(a, b, c);
};
const curriedLog = currying(log);
curriedLog('a')('b')('c'); // a b c