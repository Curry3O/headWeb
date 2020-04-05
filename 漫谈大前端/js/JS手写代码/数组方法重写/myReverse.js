//myReverse    反转数组的元素顺序
Array.prototype.myReverse = function () {
    var temp;
    for (var i = 0; i < Math.floor(this.length / 2); i++) {
        temp = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = temp;
    }
    return this;
}

let arr = [1, 2, 3, 4, 5];
let res = arr.myReverse();
console.log(res);