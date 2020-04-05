//反柯里化函数实现
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

//测试
var push = Array.prototype.push.uncurrying();

//测试一下
(function () {
    push(arguments, 4);
    console.log(arguments); //[1, 2, 3, 4]
})(1, 2, 3)