//mySome    检测数组元素中是否有元素符合指定条件
Array.prototype.mySome = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (callback(item, i, this)) {
            return true;
        }

    }
    return false;
}

let arr = [1, 2, 3, 4];
let res = arr.mySome((item) => {
    return item > 2;
});
console.log(res);