//myShift()数组出队
Array.prototype.myShift = function () {
    if (this.length == 0) {
        return undefined;
    }
    var firstElement = this[0];
    for (var i = 1; i < this.length; i++) {
        this[i - 1] = this[i];
    }
    this.length = this.length - 1;
    return firstElement;
}

let arr = [1, 2, 3, 4];
arr.myShift();
console.log(arr);