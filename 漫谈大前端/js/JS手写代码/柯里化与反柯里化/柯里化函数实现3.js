//柯里化实现3
function currying(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function () {
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            // 收集传入的参数，进行缓存
            return currying.call(this, fn, newArgs);
        } else {
            // 符合执行条件，执行计算
            return fn.apply(this, newArgs);
        }
    }
}

function multiFn(a, b, c) {
    return a * b * c;
}
var multi = currying(multiFn);
console.log(multi(2)(3)(4));
/* console.log(multi(2, 3, 4));
console.log(multi(2)(3, 4));
console.log(multi(2, 3)(4)); */
