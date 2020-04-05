//myUnshift 数组入队
Array.prototype.myUnshift = function () {
    var L = this.length;
    for (var i = L + arguments.length - 1; i >= 0; i--) {
        if (i > arguments.length - 1) {
            this[i] = this[i - arguments.length];
        } else {
            this[i] = arguments[i];
        }
    }
    return this.length;
}

let arr = [3,4,5,6];
arr.myUnshift(1,2);
console.log(arr);