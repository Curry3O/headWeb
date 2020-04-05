//myPop() 数组出栈
Array.prototype.myPop = function () {
    if (this.length == 0) {
        return undefined;
    }
    var last = this[this.length - 1];
    this.length = this.length - 1;
    return last;
}

let arr = [1, 2, 3, 4];
arr.myPop();
console.log(arr);