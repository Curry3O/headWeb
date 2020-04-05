//myPush() 数组入栈
Array.prototype.myPush = function () {
    var L = this.length;
    for (var i = L; i < L + arguments.length; i++) {
        this[i] = arguments[i - L];
    }
    return this.length;
}
let arr = [1, 2, 3, 4];

arr.myPush(5);
console.log(arr);