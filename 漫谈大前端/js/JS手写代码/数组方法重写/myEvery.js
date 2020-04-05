//myEvery    检测数值元素的每个元素是否都符合条件
Array.prototype.myEvery = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (!callback(item, i, this)) {
            return false;
        }
    }
    return true;
}

let arr = [1, 2, 3, 4];
let res = arr.myEvery((item)=>{
    return item > 2;
});
console.log(res);