//js解决0.1+0.2==0.3的问题的几种方法

//在JavaScript中的二进制的浮点数0.1和0.2并不是十分精确，在他们相加的结果并非正好等于0.3，而是一个比较接近的数字 0.30000000000000004 

//为什么0.1 + 0.2 不等于0.3?
//因为计算机不能精确表示0.1、0.2这样的浮点数(JS遵循IEEE 754规范采用双精度存储,占 64bit,1位表示符号位,11位表示指数,52位表示尾数),计算时使用的是带有舍入误差的数,存在精度缺失

//并不是所有的浮点数在计算机内部都存在舍入误差，比如0.5就没有舍入误差


//解决方法
//设置一个误差范围值，通常称为”机器精度“，js中这个值通常是2^-52 ，ES6中Number.EPSILON这个值正等于2^-52 

//1.ES6提供的Number.EPSILON方法
//Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了
function numbersequal(a, b){
    return Math.abs(a - b) < Number.EPSILON;
}
let a = 0.1 + 0.2;
let b = 0.3;
console.log(numbersequal(a, b));

//解决兼容性问题(这是一个自调用函数，当JS文件刚加载到内存中，就会去判断并返回一个结果)
Number.EPSILON = (function () { 
    return Number.EPSILON ? Number.EPSILON : Math.pow(2, -52);
})();

//2.把计算数字 提升 10 的N次方 倍 再 除以 10的N次方。N>1.
let c = (0.1*1000 + 0.2*1000) / 1000;
console.log(c === 0.3);