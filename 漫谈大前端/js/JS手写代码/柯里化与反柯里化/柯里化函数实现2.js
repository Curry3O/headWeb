//柯里化实现2
const currying = fn =>
    (arg, args = [arg]) =>
    (!fn.length || args.length === fn.length ? fn(...args) : newArg => currying(fn)(newArg, [...args, newArg]));

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
