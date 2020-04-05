//使用函数柯里化的参数复用和提前返回实现
Function.prototype.myBind = Function.prototype.myBind || function myBind(thisArg) {
    if (typeof this !== 'function') {
        throw new TypeError(this + ' must be a function');
    }
    var self = this;
    var args = [].slice.call(arguments, 1);
    var bound = function () {
        var boundArgs = [].slice.call(arguments);
        var finalArgs = args.concat(boundArgs);
        if (this instanceof bound) {
            if (self.prototype) {
                function Empty() {}
                Empty.prototype = self.prototype;
                bound.prototype = new Empty();
            }
            var result = self.apply(this, finalArgs);
            var isObject = typeof result === 'object' && result !== null;
            var isFunction = typeof result === 'function';
            if (isObject || isFunction) {
                return result;
            }
            return this;
        } else {
            return self.apply(thisArg, finalArgs);
        }
    };
    return bound;
}

//测试
var ary = [23, 34, 24, 12, 35, 36, 14, 25];
var max = Math.max.myBind(null, ...ary)();
var min = Math.min.myBind(null, ...ary)();
console.log(min, max);
